import React, {Component} from "react";
import {Row, Col, Button, Form, Container, Alert} from "react-bootstrap";
import Redirect from "react-router-dom/Redirect";
import {connect} from "react-redux";
import mapStateToProps from "./Redux/mapStateToProps";
import mapDispatchToProps from "./Redux/mapDispatchToProps"
import logo from "./assets/images/logo.svg";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasErrors: false,
			formIsValid: false,
			errorMessage: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			hasErrors: false,
			formIsValid: e.target.form.checkValidity()
		});
	}

	//TODO change this to async/await and change FormData object to JSON string (on backend change the way it's handled, $_POST vs file_get_contents(php://input)
	handleSubmit(e) {
		e.preventDefault();
		const form = new FormData(e.target);
		fetch(`${process.env.REACT_APP_API_URL}/api/type/login`, {
			method: "POST",
			body: form,
			credentials: "include"
		})
			.then(response => response.json())
			.then(({isValidUser, firstName, userPicURL, sessionToken}) => {
				if (isValidUser === true) {
					this.props.setUserSessionData(firstName, userPicURL, sessionToken);
					this.props.login();
				} else {
					this.setState({
						hasErrors: true,
						errorMessage: "Invalid Username or Password"
					});
				}
			})
			.catch(error => {
				console.log(error);
				this.setState({
					hasErrors: true,
					errorMessage: "An Error Occurred, Please Try Again Later"
				})
			});
	}

	render() {
		return (
			<React.Fragment>
				{this.props.isAuthenticated ?
					<Redirect to="/staffservices/"/> :
					<Container fluid={true} className="py-5">
						<Row className="justify-content-center login">
							<Col xs={11} sm={4} lg={3} xl={3}>
								<div className="text-center">
									<a href="https://www.alphapetcare.com"><img className="login__logo" src={logo}
									     alt="Alpha Pet Care Staff Services"/></a>
									<h1 style={{whiteSpace: "nowrap"}}>Staff Services</h1>
								</div>
								{this.state.hasErrors &&
								<Alert className='alert alert-danger'>{this.state.errorMessage}</Alert>}
								{this.props.hasLoggedOut &&
								<Alert className="alert alert-warning">You have been logged out.</Alert>}
								<Form className="mt-3"
								      onSubmit={this.handleSubmit}
								      noValidate>
									<Form.Group>
										<Form.Label className="login__input-label">Username</Form.Label>
										<Form.Control onChange={this.handleChange}
										              name="username"
										              pattern="\S+"
										              autoComplete="username"
										              required/>
									</Form.Group>
									<Form.Group>
										<Form.Label className="login__input-label">Password</Form.Label>
										<Form.Control onChange={this.handleChange}
										              name="password"
										              type="password"
										              pattern="\S+"
										              autoComplete="current-password"
										              required/>
									</Form.Group>
									<Button className="btn btn-lg" disabled={!this.state.formIsValid}
									        type="submit">Login</Button>
								</Form>
							</Col>
						</Row>
					</Container>
				}
			</React.Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);