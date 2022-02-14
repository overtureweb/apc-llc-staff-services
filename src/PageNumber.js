import React, {Component} from "react";

class PageNumber extends Component {
	constructor(props) {
		super(props);

		this.handlePageNumClick = this.handlePageNumClick.bind(this);
	}

	handlePageNumClick({target: {dataset: {pageNumber}}}) {
		this.props.handlePageNumClick(pageNumber)
	}

	render() {
		return (
			<button
				disabled={this.props.disabled}
				onClick={this.handlePageNumClick}
				data-page-number={this.props.pageIndex}
				className="btn btn-outline-dark m-1">{this.props.pageIndex + 1}</button>
		)
	}
}

export default PageNumber;
