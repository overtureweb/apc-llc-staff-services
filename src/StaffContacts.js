import React from "react";
import {Table} from "react-bootstrap";
import withData from "./HOC/withData";

const DATA_REQUEST_TYPE = "getStaffContacts",
	REDUX_STORE_ITEM = "staffContactData",
	REDUX_ACTION_TYPE = "setStaffContactData";

const StaffContacts = (props) => {
	const staffList = props.data.map(({name, email, phone}) =>
		<tr key={email}>
			<td className="text-nowrap">{name}</td>
			<td className="text-nowrap"><a className="contact-list__link" href={'mailto:' + email}>{email}</a></td>
			<td className="text-nowrap"><a className="contact-list__link" href={'tel:' + phone}>{phone}</a></td>
		</tr>
	);
	return (
		<div>
			<h1>Staff Contacts</h1>
			<Table striped bordered responsive hover>
				<thead>
				<tr>
					<th className="contact-list__column-header">Name</th>
					<th className="contact-list__column-header">Email</th>
					<th className="contact-list__column-header">Phone</th>
				</tr>
				</thead>
				<tbody>
				{staffList}
				</tbody>
			</Table>
		</div>
	)
};

export default withData(DATA_REQUEST_TYPE, REDUX_STORE_ITEM, REDUX_ACTION_TYPE)(StaffContacts);