import React, {Component} from "react";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import withPagination from "./HOC/withPagination";

class OCRSList extends Component {
	constructor(props) {
		super(props);

		this.convertToUSD = this.convertToUSD.bind(this);
		this.getOcrTotal = this.getOcrTotal.bind(this);
	}

	getOcrTotal({ocrList}) {
		return ocrList.reduce((total, {comm}) => total + +comm, 0);
	}

	convertToUSD(amount) {
		return amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
	}

	render() {
		return (
			<React.Fragment>
				{
					this.props.list
						?
						<div>
							<Table className="mt-4 ocr-list__table" striped bordered responsive hover>
								<thead>
								<tr>
									<th className="ocr-list__column-header">ID</th>
									<th className="ocr-list__column-header">Client</th>
									<th className="ocr-list__column-header">Dates</th>
									<th className="ocr-list__column-header">Services</th>
									<th className="ocr-list__column-header">Commission</th>
									{this.props.showPaidDates && <th className="ocr-list__column-header">Paid Date</th>}
									{this.props.isEditable && <th>&nbsp;</th>}
								</tr>
								</thead>
								<tbody>
								{this.props.list.map(({client, dates, services, comm, id, paidDate}, idx) => {
									const servicesParsed = JSON.parse(services).map((service, i, arr) =>
										`${service['serviceType']}: ${service['serviceCount']}${i < arr.length - 1 ? ' \uFF5C ' : ''}`);
									return (
										<tr key={idx}>
											<td className="text-nowrap">{id}</td>
											<td className="text-nowrap">{client}</td>
											<td className="text-nowrap">{dates}</td>
											<td className="text-nowrap">{servicesParsed}</td>
											<td className="text-nowrap">{this.convertToUSD(parseFloat(comm))}</td>
											{this.props.showPaidDates &&
											<td className="text-nowrap">{paidDate || "N/A"}</td>}
											{this.props.isEditable && <td className="text-nowrap">
												<Link className="btn btn-outline-dark"
												      to={`/staffservices/ocr/${id}/true/`}>Edit
												</Link>
											</td>}
										</tr>)
								})}
								{/*show list totals on last page only*/}
								{this.props.isLastPage &&
								<tr>
									<td className="text-right" colSpan={4}><strong>TOTAL</strong></td>
									<td><strong>{this.convertToUSD(this.getOcrTotal(this.props))}</strong></td>
									{this.props.showPaidDates && <td>&nbsp;</td>}
									{this.props.isEditable && <td>&nbsp;</td>}
								</tr>}
								</tbody>
							</Table>
						</div>
						:
						<p className="alert alert-dark mt-5 col-md-6 text-center text-lg-left">
									<span role="img"
									      aria-label="sadface"
									      className="ocr-list--alert-emoji">😭
							</span> There are no OCRs to display.
						</p>
				}
			</React.Fragment>
		)
	}

}

export default withPagination(OCRSList);