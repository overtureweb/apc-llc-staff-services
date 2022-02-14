import React from "react";
import {Table} from "react-bootstrap";

const PetInfoDetails = ({petDetails}) => {
	const petInfo = Object.entries(petDetails).map(([key, value], index) =>
		// check that async ajax call is complete and don't show the pet ID field
		value && key !== 'id' &&
		<tr key={index}>
			<td>{key}</td>
			<td className="pet-info__input-value">{value}</td>
		</tr>
	);
	return (
		<Table className="pet-info__table" hover>
			<tbody>
			{petInfo}
			</tbody>
		</Table>
	)
};

export default PetInfoDetails;