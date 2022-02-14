import React, {Component} from "react";
import {Button, Col, Form} from "react-bootstrap";
import withData from "./HOC/withData";

const DATA_REQUEST_TYPE = "getServices",
	REDUX_STATE_ITEM = "servicesList",
	REDUX_ACTION_TYPE = "setServices";

class ServiceSelectMenu extends Component {
	constructor(props) {
		super(props);
		this.handleChangeServiceType = this.handleChangeServiceType.bind(this);
		this.handleChangeServiceCount = this.handleChangeServiceCount.bind(this);
		this.addServiceProvided = this.addServiceProvided.bind(this);
		this.removeServiceProvided = this.removeServiceProvided.bind(this);
	}

	handleChangeServiceType(e) {
		this.props.handleChangeServiceType(e);
	}

	handleChangeServiceCount(e) {
		this.props.handleChangeServiceCount(e);
	}

	addServiceProvided() {
		this.props.addServiceProvided();
	}

	removeServiceProvided(e) {
		this.props.removeServiceProvided(e);
	}

	render() {
		const options = this.props.data.map((option, index) => (
			<option key={index}
			        value={option}
			        disabled={
				        this.props.servicesSelected
					        .reduce((acc, cur) => acc.concat(cur.serviceType), [])
					        .includes(option) && option !== this.props.service.serviceType}>{option}</option>
		));

		return (
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Label className="ocr__input-label">Service</Form.Label>
					<Form.Control data-index={this.props.index}
					              onChange={this.handleChangeServiceType}
					              value={this.props.service.serviceType}
					              required
					              as="select">
						<option value=''>Select...</option>
						{options}}
					</Form.Control>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label className="ocr__input-label">Total</Form.Label>
					<Form.Control data-index={this.props.index}
					              onChange={this.handleChangeServiceCount}
					              pattern="^[1-9]{1}\d?$"
					              value={this.props.service.serviceCount} required/>
				</Form.Group>
				<Form.Group className="d-flex align-items-end">
					<div>
						{this.props.index === 0 &&
						<Button onClick={this.addServiceProvided}
						        className="btn btn-success mx-1 ocr__btns-add-remove">+</Button>
						}
						{this.props.index > 0 &&
						<Button onClick={this.removeServiceProvided}
						        data-index={this.props.index}
						        className="btn btn-danger mx-1 ocr__btns-add-remove">-</Button>
						}
					</div>
				</Form.Group>
			</Form.Row>
		)
	}
}

export default withData(DATA_REQUEST_TYPE, REDUX_STATE_ITEM, REDUX_ACTION_TYPE)(ServiceSelectMenu);