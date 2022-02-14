export default function MapStateToProps(state) {
	return {
		isAuthenticated: state.isAuthenticated,
		hasLoggedOut: state.hasLoggedOut,
		servicesList: state.servicesList,
		userFirstName: state.userFirstName,
		userPicURL: state.userPicURL,
		sessionToken: state.sessionToken,
		staffContactData: state.staffContactData
	};
}