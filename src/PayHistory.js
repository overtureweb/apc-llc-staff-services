import React, {Component} from "react";
import DatePicker from "react-datepicker";
import {Button, Col, Form} from "react-bootstrap";
import mapStateToProps from "./Redux/mapStateToProps";
import {connect} from "react-redux";
import OCRSList from "./OCRSList";
import debounce from "lodash/debounce";
import ProgressSpinner from "./ProgressSpinner";

class PayHistory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			startDate: new Date(),
			endDate: new Date(),
			isFormValid: true,
			isLoading: false,
			data: [],
		};
		this.debouncedGetData = debounce(this.getData, 3000, {leading: true});
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleStartDateChange(date) {
		this.setState({startDate: date}, this.setFormValidState); //due to the async nature of setState, the update to the isFormValid is wrapped in a func and provided as a callback to ensure the start and end dates are updated first
	}

	handleEndDateChange(date) {
		this.setState({endDate: date}, this.setFormValidState);
	}

	setFormValidState() {
		this.setState({isFormValid: this._form.checkValidity()});
	}

	handleSubmit(e) {
		e.preventDefault();
		e.target.checkValidity();
		this.debouncedGetData();
	}

	async getData() {
		try {
			this.setState({isLoading: true});
			const response = await fetch(`${process.env.REACT_APP_API_URL}/api/type/getPayHistory`, {
				method: "POST",
				credentials: "include",
				headers: new Headers({
					'X-CSRF-Token': this.props.sessionToken
				}),
				body: JSON.stringify({startDate: this.state.startDate, endDate: this.state.endDate})
			});
			const data = await response.json();
			this.setState({data: data});

		} catch (e) {
			console.log(`An error occurred: ${e}`);
		}
		this.setState({isLoading: false});
	}

	render() {
		return (
			<React.Fragment>
				{this.state.isLoading && <ProgressSpinner/>}
				<h1 className="mb-5">Pay History</h1>
				<Form noValidate
				      onSubmit={this.handleSubmit}
				      ref={el => this._form = el}>
					<p className="alpha-green--dark ocr__input-label">select a date range:</p>
					<Form.Row style={{backgroundColor: "rgba(167, 191, 68, .5)"}}
					          className="mb-5 p-4 d-block d-md-flex">
						<Form.Group as={Col} className="col-md-3 col-xl-2">
							<Form.Label className="ocr__input-label">Start Date </Form.Label>
							<DatePicker className="form-control"
							            dropdownMode='select'
							            selected={new Date(this.state.startDate)}
							            selectsStart
							            startDate={new Date(this.state.startDate)}
							            endDate={new Date(this.state.endDate)}
							            todayButton="today"
							            required
							            onChange={this.handleStartDateChange}
							            maxDate={new Date(this.state.endDate)}/>
						</Form.Group>
						<Form.Group as={Col} className="col-md-3 col-xl-2">
							<Form.Label className="ocr__input-label">End Date</Form.Label>
							<DatePicker className="form-control"
							            dropdownMode="select"
							            selected={new Date(this.state.endDate)}
							            selectsEnd
							            startDate={new Date(this.state.startDate)}
							            endDate={new Date(this.state.endDate)}
							            todayButton="today"
							            required
							            onChange={this.handleEndDateChange}
							            minDate={new Date(this.state.startDate)}
							            maxDate={new Date()}/>
						</Form.Group>
						<Button className="align-self-center" style={{margin: "12px 6px 0"}} type="submit"
						        disabled={!this.state.isFormValid}>Search</Button>
					</Form.Row>

				</Form>
				<hr/>
				<OCRSList ocrList={this.state.data} showPaidDates="true"/>
			</React.Fragment>
		)
	}
}

export default connect(mapStateToProps)(PayHistory);