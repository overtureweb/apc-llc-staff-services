import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const Footer = () => (
	<Container fluid className="footer footer--background">
		<Row className="justify-content-center text-center">
			<Col className="footer__text" lg={4}>&copy; Copyright 2001 - 2019 Alpha Pet Care LLC <br/>All Rights Reserved</Col>
		</Row>
	</Container>
);

export default Footer;