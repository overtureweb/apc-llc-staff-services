function authState(state, action) {
	if (state === undefined) {
		return {
			isAuthenticated: false,
			hasLoggedOut: false,
			servicesList: null,
			userFirstName: '',
			userPicURL: '',
			sessionToken: '',
			staffContactData: null,
		}
	}

	switch (action.type) {
		case "login":
			return {
				...state,
				isAuthenticated: true,
				hasLoggedOut: false
			};
		case "logout":
			return {
				isAuthenticated: false,
				hasLoggedOut: true,
			};
		case "setServices":
			return {
				...state,
				servicesList: action.payload
			};
		case "setUserFirstName":
			return {
				...state,
				userFirstName: action.payload
			};
		case "setUserPicURL":
			return {
				...state,
				userPicURL: action.payload
			};
		case "setSessionToken":
			return {
				...state,
				sessionToken: action.payload
			};
		case "setStaffContactData":
			return {
				...state,
				staffContactData: action.payload
			};
		default:
			return state;
	}
}

export default authState;