import React from "react";
import Login from "./Login";
import StaffServices from "./StaffServices";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import mapStateToProps from "./Redux/mapStateToProps";
import Error from "./Error";

const App = (props) => {
	return (
		<Router basename={process.env.REACT_APP_API_URL}>
			<Switch>
				<Route exact path="/" component={Login}/>
				<Route path="/staffservices/"
				       render={(routeProps) => props.isAuthenticated ?
					       <StaffServices {...routeProps}/> :
					       <Redirect to={{pathname: "/"}}/>}
				/>
				<Route render={(props) => <Error>That's a
					404. <a href={props.match.path}>Try again.</a></Error>}/>
			</Switch>
		</Router>
	);
};

export default connect(mapStateToProps)(App);