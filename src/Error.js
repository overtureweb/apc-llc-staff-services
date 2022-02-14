import React from "react";
import {Col, Row} from "react-bootstrap";

const Error = ({children}) => {
	return (
		<Row>
			<Col className="text-center">
				<h1 className="error-component__title">
					<span className="d-block mb-4" role="img" aria-label="Error">😢</span>
					<p className="error-component__message">{children}</p>
				</h1>
			</Col>
		</Row>
	)
};

export default Error;