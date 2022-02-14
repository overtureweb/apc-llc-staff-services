import React from "react";
import {Alert} from "react-bootstrap";

/**
 *  NOT CURRENTLY IN USE, JUST AN EXAMPLE OF AN HOC
 *  HOC to wrap react-bootstrap-alert with additional data: the BS class to use for the alert and the message to display
 *
 * @param Component
 * @returns {function(props): Component}
 */

const withAlerts = (Component) => (props) => {
	return (
		<Component className={`alert alert-${props.bsClass} mt-3`}>{props.alertMessage}</Component>
	);
};

export const Alerts = withAlerts(Alert);
