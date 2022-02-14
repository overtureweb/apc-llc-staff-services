import React, {Component} from "react";
import {Col, Row, Container} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import Ocrs from "./Ocrs";
import Ocr from "./Ocr";
import StaffContacts from "./StaffContacts";
import StaffServicesNavbar from "./StaffServicesNavbar";
import Footer from "./Footer";
import PayHistory from "./PayHistory";
import mapStateToProps from "./Redux/mapStateToProps";
import mapDispatchToProps from "./Redux/mapDispatchToProps";
import {connect} from "react-redux";
import Error from "./Error";
import PetInfo from "./PetInfo";
import Covid19Policies from "./Covid19Policies";
import ClientCheckIn from "./ClientCheckIn";

const MAX_IDLE_TIME = 900;

class StaffServices extends Component {
	constructor(props) {
		super(props);

		this.state = {startTime: Date()};
		this.timer = null;
		this.alex = false;
	}

	componentDidMount() {
		this.startIdleTimeMonitor();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.clearIdleTimeMonitor();
		if (prevState.startTime !== Date()) { //todo why is this necessary? they'll always be different and this will always be false, test console log checks
			this.setState({startTime: Date()});
		}
		this.startIdleTimeMonitor();
	}

	componentWillUnmount() {
		this.clearIdleTimeMonitor();
	}

	startIdleTimeMonitor() {
		this.timer = setInterval(() => this.checkElaspsedTime(), 1000);
	}

	clearIdleTimeMonitor() {
		clearInterval(this.timer);
	}

	/**
	 * checkElapsedTime: After 15 minutes of inactivity log out the user
	 * When the component mounts, the current timestamp is stored in state and then once each second the total elapsed time is checked.
	 * Each time the component is updated (ie, user clicks a link) the state is overwritten, the timer is cleared and a new timer starts.
	 * On component unmount the timer is cleared
	 */
	checkElaspsedTime() {
		if (this.getElapsedTime() >= MAX_IDLE_TIME) {
			clearInterval(this.timer);
			this.handleLogout();
		}
	}

	getElapsedTime() {
		return (Date.parse(Date()) - Date.parse(this.state.startTime)) / 1000;
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
			<div className="d-flex flex-column content__wrapper">
				<StaffServicesNavbar/>
				<Container fluid={true} className="mt-5 content">
					<Row className="justify-content-center">
						<Col md={10} xl={8}>
							<Switch>
								<Route exact path="/staffservices/" component={Ocrs}/>
								<Route path="/staffservices/clientcheckin/" component={ClientCheckIn}/>
								<Route path="/staffservices/ocrs/" component={Ocrs}/>
								<Route path="/staffservices/ocr/:ocrID?/:isEdit?/" component={Ocr}/>
								<Route path="/staffservices/payhistory/" component={PayHistory}/>
								<Route path="/staffservices/petinfo" component={PetInfo}/>
								<Route path="/staffservices/staffcontacts/" component={StaffContacts}/>
								<Route path="/staffservices/updatePassword/"
								       render={() => <Error>This feature is coming soon.<br/>Please check back
									       later.</Error>}/>
								<Route path="/staffservices/covid-19" component={Covid19Policies}/>
								<Route render={(props) => <Error>That's a
									404. <a href={props.match.path}>Try again.</a></Error>}/>
							</Switch>
						</Col>
					</Row>
				</Container>
				<Footer/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffServices);