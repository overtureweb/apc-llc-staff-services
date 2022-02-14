import React from "react";
import {Link} from "react-router-dom";
import OCRSList from "./OCRSList";
import {Tab, Tabs} from "react-bootstrap";
import withData from "./HOC/withData";

const Pending = (props) => (
	<React.Fragment>Pending {props.ocrsLength > 0 &&
	<span className="ocr-list--pending-badge">{props.ocrsLength}</span>}
	</React.Fragment>
);

const Ocrs = (props) => {
	return (
		<div>
			<h1>OCR Management</h1>
			<Link className="btn btn-lg btn-warning mt-4 mb-5" to="/staffservices/ocr/">click to enter a new
				ocr</Link>

			<Tabs className="ocr-list__container" defaultActiveKey="home" id="uncontrolled-tab-example">
				<Tab eventKey="home" title="Entered">
					<OCRSList ocrList={props.data.filter((item) => item.status === "ENTERED")}
					          isEditable={true}/>
				</Tab>
				<Tab eventKey="profile" title={<Pending
					ocrsLength={props.data.filter((item) => item.status === "PENDING").length}/>}>
					<OCRSList ocrList={props.data.filter((item) => item.status === "PENDING")}
					          isEditable={true}/>
				</Tab>
				<Tab eventKey="contact" title="Approved">
					<OCRSList ocrList={props.data.filter((item) => item.status === "APPROVED")}/>
				</Tab>
			</Tabs>
		</div>
	)
};

export default withData("getOCRS")(Ocrs);