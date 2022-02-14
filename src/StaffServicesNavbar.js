import React, {Component} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavLink, withRouter} from "react-router-dom";
import LogoutButton from "./LogoutButton";
import logo from "./assets/images/APC-New-Logo.png";
import {connect} from "react-redux";
import mapStateToProps from "./Redux/mapStateToProps";

class StaffServicesNavbar extends Component {
	constructor(props) {
		super(props);

		this.state = {isMenuOpen: false, navExpanded: false};
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	//TODO DO I NEED BOTH isMenuOpen and navExpanded?
	toggleMenu() {
		this.setState(({isMenuOpen, navExpanded}) => ({isMenuOpen: !isMenuOpen, navExpanded: !navExpanded}));
	}

	render() {
		const profile = <span><img alt="staff profile pic"
		                           className="mr-2 navbar__profile-pic"
		                           src={`/images/compressed/staff/${this.props.userPicURL}`}/> Hi, {this.props.userFirstName}!</span>;

		return (
			<Navbar bg="dark"
			        variant="dark"
			        expand="lg"
			        onToggle={this.toggleMenu}
				// collapseOnSelect={true}
				// this next prop contains a fix to prevent the toggle animation on larger screens, using NavLink routing component instead of BS Nav.Link, have to manually set the expanded value until I can find a permanent solution
				    expanded={window.innerWidth <= 900 && this.state.navExpanded}>
				<Navbar.Brand>
					<NavLink className="navbar-brand" to="/staffservices/">
						<img alt="Alpha Pet Care Staff Services"
						     height="50"
						     src={logo}/>
					</NavLink>
				</Navbar.Brand>
				<Navbar.Toggle id="nav-icon3"
				               children={<React.Fragment><span/><span/><span/><span/></React.Fragment>}
				               aria-controls="basic-navbar-nav"
				               className={this.state.navExpanded && "open"}/>

				<Navbar.Collapse id="basic-navbar-nav"
				                 className="justify-content-end">
					<Nav>
						<NavLink onClick={this.toggleMenu}
						         className="mb-3 mb-lg-0 fi flaticon-reminder nav-link nav-link--right-margin"
						         to="/staffservices/clientcheckin">Client Check In</NavLink>
						<NavLink onClick={this.toggleMenu} exact
						         className="mb-3 mb-lg-0 fi flaticon-complete nav-link nav-link--right-margin"
						         to="/staffservices/">Manage OCRs</NavLink>
						<NavLink onClick={this.toggleMenu}
						         className="mb-3 mb-lg-0 fi flaticon-reminder nav-link nav-link--right-margin"
						         to="/staffservices/payhistory">Pay History</NavLink>
						<NavLink onClick={this.toggleMenu}
						         className="mb-3 mb-lg-0 fi flaticon-dog-face nav-link nav-link--right-margin"
						         to="/staffservices/petinfo">Pet Search</NavLink>
						<NavLink onClick={this.toggleMenu}
						         className="mb-3 mb-lg-0 fi flaticon-teamwork nav-link nav-link--right-margin"
						         to="/staffservices/staffcontacts">Staff Contacts</NavLink>
						<NavLink onClick={this.toggleMenu}
						         className="mb-3 mb-lg-0 fi flaticon-book nav-link nav-link--right-margin"
						         to="/staffservices/covid-19">Covid-19</NavLink>
						<NavDropdown className="mb-3 mb-lg-0 mr-5" title={profile}>
							<NavLink onClick={this.toggleMenu} style={{whiteSpace: "nowrap"}}
							         className="mt-2 px-3 mx-auto fi flaticon-padlock nav-link nav-link--right-margin dropdown-item"
							         to="/staffservices/updatePassword/">Change Password</NavLink>
							<LogoutButton/>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default withRouter(connect(mapStateToProps)(StaffServicesNavbar));