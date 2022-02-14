import React from "react";
import ProgressSpinner from "../ProgressSpinner";
import {connect} from "react-redux";
import mapStateToProps from "../Redux/mapStateToProps";
import mapDispatchToProps from "../Redux/mapDispatchToProps";
import Error from "../Error";

const withData = (dataRequestType, dataStore = null, actionType = null) => (Component) => {
	class With extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				data: undefined,
				isFetchError: false
			};
		}

		/**
		 * Some Components don't need to continuously update their dataset. After the first render the data can be saved in the redux store
		 * and then returned if the Component is re-rendered. This checks two conditions:
		 *
		 * First, were the dataStore and actionType params provided and is the dataStore empty?
		 * If all conditions are true than a fetch request is made and the returned value is saved in the redux store and passed to the Component
		 *
		 * Second, if the params weren't provided (and equal null) then it's assumed the data should be updated each time the Component renders
		 *
		 * If neither condition is met it's assumed the data is saved in the redux store and should be passed to the Component
		 *
		 * @returns {Promise<void>}
		 */
		componentDidMount() {

			if (dataStore && actionType && !this.props[dataStore]) {
				return this.getData();
			}

			if (!dataStore || !actionType) {
				return this.getData();
			}
		}

		async getData() {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_URL}/api/type/${dataRequestType}`, {
					credentials: "include",
					headers: new Headers({
						'X-CSRF-Token': this.props.sessionToken
					}),
				});
				const data = await response.json();
				//either call the dispatch method for this action or, if null, just store in component state
				actionType ? this.props[actionType](data) : this.setState({data: data});
			} catch (e) {
				console.log(`An error occurred: ${e}`);
				this.setState({isFetchError: true});
			}
		}

		render() {
			return (
				//render using either redux store value or component state
				this.state.isFetchError ? <Error>Something's not right.<br/>Please try again later.</Error> :
					this.props[dataStore] || this.state.data ?
						<Component data={this.props[dataStore] || this.state.data} {...this.props}/> :
						<ProgressSpinner/>
			)
		}
	}

	return connect(mapStateToProps, mapDispatchToProps)(With);
};

export default withData;