import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import mapDispatchToProps from "./Redux/mapDispatchToProps";
import mapStateToProps from "./Redux/mapStateToProps";
import {connect} from "react-redux";

class LogoutButton extends Component {
	constructor(props) {
		super(props);

		this.state = {showModal: false};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	toggleModal() {
		this.setState({showModal: !this.state.showModal});
	}

	async handleLogout() {
		try {
			await fetch(`${process.env.REACT_APP_API_URL}/api/type/logout`, {
				headers: new Headers({
					'X-CSRF-Token': this.props.sessionToken
				}),
			});
			this.props.logout();
			sessionStorage.removeItem('state');
		} catch (e) {
			console.log(`An error occurred: ${e}`);
		}
	}

	render() {
		return (
			<React.Fragment>
				<Button className="my-3 ml-3"
				        variant="outline-light"
				        onClick={this.toggleModal}><span className="fi flaticon-exit">logout</span></Button>
				<Modal className="modal-dialog-centered" show={this.state.showModal} onHide={this.toggleModal}>
					<Modal.Header closeButton>
						<Modal.Title>Please Confirm</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want to logout?</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary"
						        onClick={this.toggleModal}>
							Cancel
						</Button>
						<Button onClick={this.handleLogout}
						        variant="danger"
						        type="button">
							<span className="fi flaticon-exit">Logout</span>
						</Button>
					</Modal.Footer>
				</Modal>
			</React.Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);