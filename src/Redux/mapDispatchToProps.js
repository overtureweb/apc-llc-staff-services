export default function mapDispatchToProps(dispatch) {
	return {
		login: () => dispatch({type: "login"}),
		logout: () => dispatch({type: "logout"}),
		setUserSessionData: (userFirstName, userPicURL, sessionToken) => {
			dispatch({type: "setUserFirstName", payload: userFirstName});
			dispatch({type: "setUserPicURL", payload: userPicURL || "generic-user-icon.png"});
			dispatch({type: "setSessionToken", payload: sessionToken});
		},
		setServices: (servicesList) => dispatch({type: "setServices", payload: servicesList}),
		setStaffContactData: (contactData) => dispatch({type: "setStaffContactData", payload: contactData}),
	}
}