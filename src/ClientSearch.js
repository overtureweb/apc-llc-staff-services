import React, {Component} from "react";
import {Form, InputGroup} from "react-bootstrap";
import debounce from "lodash/debounce";

class ClientSearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clients: [],
			isLoading: false
		};

		this.debounced = debounce(this.getClient, 500);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {

	}

	handleChange(e) {
		e.persist();
		const {target: {value}} = e;
		value.length > 2 ? this.debounced(value) : this.setState({clients: []});

	}

	handleClick(client, e) {
		this.props.handleClick(client,e);
		e.target.parentNode.classList.add("d-none");

	}

	async getClient(value) {
		try {
			this.setState({isLoading: true});
			const response = await fetch(`${process.env.REACT_APP_API_URL}/api/type/getClients`, {
				method: "POST",
				headers: new Headers({
					'X-CSRF-Token': this.props.sessionToken
				}),
				body: JSON.stringify({searchString: value}),
				credentials: "include"
			});
			const data = await response.json();
			this.setState({clients: data});
		} catch (e) {
			console.log(`An error occurred: ${e}`);
		}
		this.setState({isLoading: false});

	}

	render() {
		return (
			<React.Fragment>
				<Form.Group className="client-search client-search--relative">
					<Form.Label className="ocr__section-header ocr__input-label"><strong>Step
						1:</strong> Find Client by Last
						Name</Form.Label>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1">
								<span role="img" aria-label="search">&#x1F50D;</span>
							</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control disabled={this.props.match.params.isEdit === "true"}
						              onKeyUp={this.handleChange}/>
					</InputGroup>
					{this.state.isLoading &&
					<p className="client-search__progress-icon">please wait...</p>}
				</Form.Group>
				{this.state.clients.length > 0 && <div className="client-search__results">
					{this.state.clients.map((client, index) =>
						<p key={index}
						   className="client-search__result"
						   onClick={(e) => this.handleClick(client, e)}>{client['client']}</p>
					)}
				</div>
				}
			</React.Fragment>
		)
	}
}

export default ClientSearch