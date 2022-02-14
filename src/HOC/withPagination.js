/**
 * withPagination is an HOC that receives a presentational component, the list data and then splits
 * the list data into an array of pages. This prevents the user from interacting with a page with a seemingly
 * endless list
 */

import React from 'react'
import PageNumber from "../PageNumber";

const withPagination = (Component) => {
	return class extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				pages: [],
				currentPage: 0,
			};

			this.paginateOcrList = this.paginateOcrList.bind(this);
			this.handlePageNumClick = this.handlePageNumClick.bind(this);

		}

		componentDidMount() {
			this.paginateOcrList(this.props);
		}

		componentDidUpdate(prevProps) {
			if (this.props.ocrList !== prevProps.ocrList) {
				this.paginateOcrList(this.props);
			}
		}

		paginateOcrList({ocrList}) {
			let pages = [];
			const pageSize = 25; //TODO, MOVE THIS INTO STATE AND ADD A FEATURE THAT ALLOWS THE USER TO SELECT HOW MANY ROWS TO DISPLAY AT ONCE

			for (let i = 0; i < ocrList.length; i += pageSize) {
				let page = ocrList.slice(i, i + pageSize);
				pages.push(page);
			}

			this.setState({pages: pages});
		}

		handlePageNumClick(pageNumber) {
			this.setState({currentPage: +pageNumber});
		}

		/**
		 * The component is passed the following props: the current page (defaults to the first) and
		 * a boolean whether the current page is the last page (for example, in the OCRList and PayHistory
		 * this value, when true is used to add a total row to the last page, the original list is also passed in props
		 * and then reduced to a total
		 * @returns {*}
		 */
		render() {
			return (
				<React.Fragment>
					<Component list={this.state.pages[this.state.currentPage]}
					           isLastPage={this.state.currentPage === this.state.pages.length - 1}
					           {...this.props}/>
					           {/*TODO need to change to first, last, prev, next and current page*/}
					{this.state.pages.length > 1 && this.state.pages.map((el, i) =>
						<PageNumber handlePageNumClick={this.handlePageNumClick}
						            pageIndex={i}
						            disabled={this.state.currentPage === i}
						            key={i}/>)}

				</React.Fragment>
			)
		}
	}
};

export default withPagination;