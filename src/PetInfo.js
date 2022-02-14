import React, {Component} from 'react';
import {connect} from "react-redux";
import mapStateToProps from "./Redux/mapStateToProps";
import ClientSearch from "./ClientSearch";
import PetInfoDetails from "./PetInfoDetails";
import {Card, Row, Col} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion"

class PetInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {pets: null, client: ""};

		this.onSelectClient = this.onSelectClient.bind(this);
	}

	onSelectClient({client, pets}) {
		this.setState({pets: pets, client: client});
	}

	render() {
		// TODO consider renaming allpetInfo to petDetails
		const pets = this.state.pets && this.state.pets.map(({name, pic_link, ...petDetails}, index) => (
			<Card className="pet-info"
			      key={index}>
				<Accordion.Toggle as={Card.Header} variant="link" eventKey={index}>
					<img className="pet-info__pet-image" alt={`${name}`}
					     src={`https://www.alphapetcare.com/reservations/${pic_link}`}/>
					<p className="pet-info__pet-name">{name}</p>
				</Accordion.Toggle>
				<Accordion.Collapse style={{backgroundColor: "#AAA"}} eventKey={index}>
					<Card.Body>
						<PetInfoDetails petDetails={petDetails}/>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		));
		return (
			<React.Fragment>
				<Row className="justify-content-center">
					<Col md={8} lg={6}>
						<h1 className="mb-3">Pet Search</h1>
						<ClientSearch handleClick={this.onSelectClient} {...this.props} />
						<div className="form-group">
							<label htmlFor="client" className="pet-info__input-label">Client</label>
							<input id="client" className="form-control" value={this.state.client} readOnly/>
						</div>
						{this.state.pets &&
						<div className="my-3 text-center">
							<small className="d-block mt-4 text-uppercase font-weight-lighter">click an image or name to
								expand</small>
						</div>}
						<Accordion className="mb-5">
							{pets}
						</Accordion>
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

export default connect(mapStateToProps)(PetInfo);