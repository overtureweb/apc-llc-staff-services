import React, {Component} from "react";
import {Row, Col, Form, Button, Modal, Alert} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ServiceSelectMenu from "./ServiceSelectMenu";
import mapStateToProps from "./Redux/mapStateToProps";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import ProgressSpinner from "./ProgressSpinner";
import check from "./assets/images/animated_check_mark.svg";
import ClientSearch from "./ClientSearch";
import * as moment from "moment";

/** Class representing a Service object, instantiated by OCR methods and stored in the state.ocr.services array */
class Service {
	constructor() {
		this.serviceType = '';
		this.serviceCount = '';
	}
}

class Ocr extends Component {
	constructor(props) {
		super(props);

		this.state = {
			validated: false,
			isValidForm: false,
			isLoading: false,
			isSubmitted: false,
			ocr: {
				client: '',
				pets: '',
				services: [new Service()],
				startDate: new Date(),
				endDate: new Date(),
				comments: '',
				managerComments: '',
				id: '',
				isActive: true
			},
			showModal: false,
		};

		this._datePickerStart = React.createRef();
		this._datePickerEnd = React.createRef();

		this.onClientSelect = this.onClientSelect.bind(this);
		this.handleChangeServiceType = this.handleChangeServiceType.bind(this);
		this.handleChangeServiceCount = this.handleChangeServiceCount.bind(this);
		this.addServiceProvided = this.addServiceProvided.bind(this);
		this.removeServiceProvided = this.removeServiceProvided.bind(this);
		this.handleChangeStart = this.handleChangeStart.bind(this);
		this.handleChangeEnd = this.handleChangeEnd.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeComments = this.handleChangeComments.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.toggleOCRActive = this.toggleOCRActive.bind(this);
	}

	/**
	 * fires when component mounts, checks if the user is editing, if so the OCR is retrieved via API call using the ocr_id
	 */
	componentDidMount() {
		this.props.match.params.isEdit && this.getOCR();
	}

	async getOCR() {
		try {
			this.setState({isLoading: true});
			const response = await fetch(`${process.env.REACT_APP_API_URL}/api/type/getOCR`, {
				method: "POST",
				headers: new Headers({
					'X-CSRF-Token': this.props.sessionToken
				}),
				credentials: "include",
				body: JSON.stringify({ocrID: this.props.match.params.ocrID}),
			});
			const data = await response.json();
			this.setState(({ocr}) => ({ocr: {...ocr, ...data}}));
		} catch (e) {
			console.log(`An error occurred: ${e}`);
		}
		this.setState({isLoading: false});
	}

	handleChangeStart(dateTime) {
		this.checkChronoDateSequence();
		this.setState((prevState) => ({
			ocr: {
				...prevState.ocr, startDate: dateTime
			}
		}));
	}

	handleChangeEnd(dateTime) {
		this.checkValidEndDate(dateTime);
		this.checkChronoDateSequence();
		this.setState((prevState) => ({
			ocr: {
				...prevState.ocr, endDate: dateTime
			}
		}));
	}

	/**
	 * Checks to see if the end date is in the future and sets a custom error if true
	 * @param dateTime
	 */
	checkValidEndDate(dateTime) {
		const dateTimeStamp = moment(dateTime, "MM/DD/YYYY").startOf("date").format("X");
		const nowTimeStamp = moment().format('X');
		const message = dateTimeStamp > nowTimeStamp ? "End date can't be in the future" : "";
		this._datePickerEnd.current.input.setCustomValidity(message);
	}

	/**
	 * Checks to see if the start date and end date are in chronological order and sets a custom error if false
	 */
	checkChronoDateSequence() {
		const startTimeStamp = moment(this._datePickerStart.current.input.value, "MM/DD/YYYY").startOf("date").format("X");
		const endTimeStamp = moment(this._datePickerEnd.current.input.value, "MM/DD/YYYY").endOf("date").format("X");
		const message = startTimeStamp > endTimeStamp ? "Start date can't be before end date" : "";
		this._datePickerStart.current.input.setCustomValidity(message);
	}

	/**
	 * Parses the returned client object and updates the state.
	 *
	 * @param client - the client info portion of the client object
	 * @param pets - array of pet objects. The pet object is an array of pets containing all their data. For
	 * the sake of reusability the shape of the data is the same but in this context we just want a string of pets names, the rest of the returned data is ignored
	 * @param e - the event object
	 */
	onClientSelect({client, pets}, e) {
		const petNameString = pets.reduce((acc, curr, index) => acc + (index > 0 ? ', ' : '') + curr.name, '');
		this.setState(({ocr}) => ({
			ocr: {
				...ocr,
				client: client,
				pets: petNameString
			}
		}));
	}

	handleChangeServiceType({target: {value}, target: {dataset: {index}}}) {
		this.setState(prev => {
			const services = [...prev.ocr.services];
			services[+index].serviceType = value;
			return ({ocr: {...prev.ocr, services: services}})
		});
	};

	handleChangeServiceCount({target: {value}, target: {dataset: {index}}}) {
		this.setState(prevState => {
			const services = [...prevState.ocr.services];
			services[+index].serviceCount = value;
			return ({ocr: {...prevState.ocr, services: services}})
		});
	}

	addServiceProvided() {
		this.setState(prevState => ({
			ocr: {
				...prevState.ocr,
				services: prevState.ocr.services.concat(new Service())
			}
		}));
	}

	removeServiceProvided({target: {dataset: {index}}}) {
		this.setState(prevState => ({
			ocr: {
				...prevState.ocr,
				services: prevState.ocr.services.filter((e, i) => i !== +index)
			}
		}));
	}

	handleChangeComments(e) {
		e.persist();
		this.setState(prevState => ({
			ocr: {
				...prevState.ocr,
				comments: e.target.value
			}
		}));
	}

	toggleOCRActive(e) {
		e.persist();
		this.toggleModal();
		this.setState(({ocr}) => ({
			ocr: {
				...ocr, isActive: !this.state.ocr.isActive
			}
		}));
	}

	toggleModal() {
		this.setState({showModal: !this.state.showModal});
	}

	async handleSubmit(e) {
		this.toggleModal();
		window.scrollTo(0, 0);
		e.preventDefault();
		this.setState({validated: true});
		if (!this._ocrForm.checkValidity()) return;
		this.setState({isLoading: true});
		//set CRUD operation type
		try {
			await fetch(`${process.env.REACT_APP_API_URL}/api/type/${this.props.match.params.isEdit ? "updateOCR" : "insertOCR"}`, {
				method: "POST",
				headers: new Headers({
					'X-CSRF-Token': this.props.sessionToken
				}),
				body: JSON.stringify(this.state.ocr),
				credentials: "include"
			});
		} catch (e) {
			console.log(`An error occurred: ${e}`);
		}
		this.setState({
			isLoading: false,
			isSubmitted: true,
		});
	}

	render() {
		const services = this.state.ocr.services.map((service, index) => (
			<ServiceSelectMenu key={index}
			                   servicesSelected={this.state.ocr.services}
			                   service={service}
			                   index={index}
			                   handleChangeServiceType={this.handleChangeServiceType}
			                   handleChangeServiceCount={this.handleChangeServiceCount}
			                   addServiceProvided={this.addServiceProvided}
			                   removeServiceProvided={this.removeServiceProvided}/>
		));

		return (
			<React.Fragment>
				{this.state.isLoading && <ProgressSpinner/>}
				{!this.state.isSubmitted ? <Row className="justify-content-center">
					<Col md={8} lg={6}>
						<h1 className="mb-4">{this.props.match.params.isEdit ? "Edit" : "Enter"} an OCR</h1>
						{this.state.validated && !this._ocrForm.checkValidity() &&
						<Alert variant="danger">
							Something's Not Right. <span role="img" aria-label="Form Error">🤔</span><br/>Please review
							your entries.
						</Alert>}
						<Form noValidate
						      ref={el => this._ocrForm = el}
						      id="ocrForm"
						      validated={this.state.validated}
						      onSubmit={this.handleSubmit}>
							<ClientSearch handleClick={this.onClientSelect} {...this.props}/>
							<Form.Group>
								<Form.Label className="ocr__input-label">Client</Form.Label>
								<Form.Control value={this.state.ocr.client} readOnly/>
							</Form.Group>
							<Form.Group>
								<Form.Label className="ocr__input-label">Pets</Form.Label>
								<Form.Control value={this.state.ocr.pets} readOnly/>
							</Form.Group>
							<hr/>
							<p className="ocr__section-header ocr__input-label mt-5"><strong>Step 2:</strong> Select the
								start and end dates</p>
							<Form.Row>
								<Form.Group as={Col}>
									<Form.Label className="ocr__input-label">Start Date </Form.Label>
									<DatePicker className="form-control"
									            ref={this._datePickerStart}
									            dropdownMode='select'
									            selected={new Date(this.state.ocr.startDate)}
									            selectsStart
									            startDate={new Date(this.state.ocr.startDate)}
									            endDate={new Date(this.state.ocr.endDate)}
									            todayButton="today"
									            required
									            onChange={this.handleChangeStart}
									            maxDate={new Date(this.state.ocr.endDate)}/>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Label className="ocr__input-label">End Date</Form.Label>
									<DatePicker className="form-control"
									            ref={this._datePickerEnd}
									            dropdownMode="select"
									            selected={new Date(this.state.ocr.endDate)}
									            selectsEnd
									            startDate={new Date(this.state.ocr.startDate)}
									            endDate={new Date(this.state.ocr.endDate)}
									            todayButton="today"
									            required
									            onChange={this.handleChangeEnd}
									            minDate={new Date(this.state.ocr.startDate)}
									            maxDate={new Date()}/>
								</Form.Group>
							</Form.Row>
							<hr/>
							<p className="ocr__section-header ocr__input-label mt-5"><strong>Step 3:</strong> Select
								provided services and enter
								quantities</p>
							{services}
							<hr/>
							<Form.Group>
								<Form.Label className="ocr__section-header ocr__input-label mt-4"><strong>Step
									4: </strong>Comments</Form.Label>
								<Form.Control onChange={this.handleChangeComments}
								              value={this.state.ocr.comments}
								              rows={5}
								              as="textarea"/>
							</Form.Group>
							<Form.Group>
								<Form.Label className="ocr__input-label">Management Comments</Form.Label>
								<Form.Control readOnly
								              value={this.state.ocr.managerComments || undefined}
								              rows={3}
								              as="textarea"/>
							</Form.Group>

							<Button onClick={this.toggleModal}
							        className="btn btn-lg btn-info">Save</Button>

							<Link className="btn btn-lg btn-outline-secondary ml-3" to={"/staffservices/"}>Cancel</Link>

							{this.props.match.params.isEdit === "true" &&
							<Button onClick={this.toggleOCRActive} //changes the value to false and launches the modal
							        className="btn btn-lg btn-danger float-right fi flaticon-trash">Remove</Button>}

							<Modal className="modal-dialog-centered"
							       show={this.state.showModal}
							       onHide={this.toggleModal}>
								<Modal.Header closeButton>
									<Modal.Title>Please Confirm</Modal.Title>
								</Modal.Header>
								<Modal.Body>Do you want to save your changes?</Modal.Body>
								<Modal.Footer>
									<Button
										variant="secondary"
										onClick={this.state.ocr.isActive ? this.toggleModal : this.toggleOCRActive}>
										Cancel
									</Button>
									<Button variant={this.state.ocr.isActive ? "primary" : "danger"}
									        className={!this.state.ocr.isActive && "fi flaticon-trash"}
									        onClick={this.handleSubmit}>
										{this.state.ocr.isActive ? "Save Changes" : "Remove OCR"}
									</Button>
								</Modal.Footer>
							</Modal>
						</Form>
					</Col>
				</Row> : <div className="text-center">
					<img className="my-5"
					     src={`${check}?param=${Math.random().toString()}`}
					     width={150}
					     alt="ocr saved successfully"/>
					<h2 className="mb-3">Your changes have been saved</h2>
					<p className="mb-4">What would you like to do next?</p>
					<p className="mb-5">
						<a style={{minWidth: 185}} className="btn btn-lg btn-info"
						   href={`${process.env.REACT_APP_API_URL}/staffservices/ocr/`}>Enter
							another OCR</a>
					</p>
					<p className="mb-3">
						<Link style={{minWidth: 185}} className="btn btn-lg btn-success" to='/staffservices/'>Go back to
							OCR home</Link>
					</p>
				</div>}
			</React.Fragment>
		)
	}
}

export default connect(mapStateToProps)(Ocr);