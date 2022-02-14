import React, {useState, useEffect} from "react";
import ClientSearch from "./ClientSearch";
import mapStateToProps from "./Redux/mapStateToProps";
import {connect} from "react-redux";
import {Alert, Button, FormControl, FormGroup, FormLabel, Modal, Table} from "react-bootstrap";
import moment from "moment";

const ClientCheckIn = (props) => {
	const [show, setShow] = useState(false);
	const closeModal = () => setShow(false);
	const openModal = () => setShow(true);
	const [isCheckedIn, setIsCheckedIn] = useState(false);
	const [checkInData, setCheckInData] = useState(null);
	const [message, setMessage] = useState(null);
	const actions = {
		CHECKIN: "insertCheckIn",
		CHECKOUT: "updateCheckIn"
	}

	//these are client-side error messages, if the fetch request fails to reach the API due to network conditions or the user doesn't give location permissions 
	const errorMessages = {
		"location": "There was a problem retrieving your location. You must enable location services on your device.",
		"server": "Server error. Please reload this page and try again."
	}

	const handleSelect = ({client, client_info_id}) => setCheckInData(prevState => ({
		...prevState,
		client,
		client_info_id,
	}));

	useEffect(() => {
		const getCheckInData = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_URL}/api/type/getCheckIn`, {
					headers: new Headers({
						'X-CSRF-Token': props.sessionToken
					}),
					credentials: "include",
				});
				const {status, body} = await response.json();
				if (status !== "success" || !body) return;
				const [latitude, longitude] = [...body.startCoords.split(",")];
				setCheckInData({...body, latitude, longitude});
				setIsCheckedIn(true);
			} catch (e) {
				console.log(e.message);
				setMessage({status: "error", message: errorMessages.server});
			}
		}
		getCheckInData();
	}, []);

	useEffect(() => {
		if (!checkInData || !checkInData.action) return;
		const postCheckInData = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_URL}/api/type/${checkInData.action}`, {
					method: "POST",
					headers: new Headers({
						'X-CSRF-Token': props.sessionToken
					}),
					credentials: "include",
					body: JSON.stringify({...checkInData}),
				});
				const {status, message} = await response.json();
				setMessage({status, message});
				if (status === "error") return setIsCheckedIn(false);
			} catch (e) {
				console.log(e.message);
				setMessage({status: "error", message: errorMessages.server});
			}
		}
		postCheckInData()
	}, [checkInData])

	const handleCheckIn = () => {
		closeModal();
		navigator.geolocation.getCurrentPosition(
			({coords: {latitude, longitude}, timestamp}) => {
				setCheckInData(prevState => ({
					...prevState,
					latitude,
					longitude,
					timestamp,
					startCoords: `${latitude}, ${longitude}`,
					action: actions.CHECKIN,
				}));
				setIsCheckedIn(true);
			},
			error => {
				setMessage({status: "error", message: errorMessages.location});
				console.log(error.message);
			}
		)
	}

	const handleCheckOut = () => {
		closeModal();
		navigator.geolocation.getCurrentPosition(
			({coords: {latitude, longitude}}) => {
				setCheckInData(prevState => ({
					...prevState,
					endCoords: `${latitude}, ${longitude}`,
					action: actions.CHECKOUT,
				}));
				setIsCheckedIn(false);
				setCheckInData(null);
			},
			error => {
				setMessage({status: "error", message: errorMessages.location});
				console.log(error.message);
			}
		)
	}

	return (
		<>
			{message &&
			<div>
				<Alert variant={message.status === "success" ? "success" : "danger"}>{message.message}</Alert>
			</div>}
			{!isCheckedIn ?
				<div>
					<ClientSearch handleClick={handleSelect} {...props}/>
					<div>
						{checkInData &&
						<>
							<FormGroup>
								<FormLabel>Selected Client</FormLabel>
								<FormControl
									readOnly
									value={checkInData.client}/>
							</FormGroup>
							<Button onClick={openModal}>Check In to your visit</Button>
						</>
						}
					</div>
				</div>
				:
				<div>
					<Button className="mb-5" variant="primary" size="lg" onClick={openModal}>Check Out of your
						visit</Button>
					<Table responsive className="table">
						<thead>
						<tr>
							<th>Client</th>
							<th>Timestamp</th>
							<th>Location</th>
							<th/>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td className="text-nowrap">{checkInData.client}</td>
							<td className="text-nowrap">{moment(checkInData.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</td>
							<td>
								<img height="225" width="300"
								     alt="google map w/ marker showing current location"
								     src={`https://maps.googleapis.com/maps/api/staticmap?center=${checkInData.latitude},${checkInData.longitude}&zoom=18&size=300x225&scale=2&markers=${checkInData.latitude},${checkInData.longitude}&key=AIzaSyDQefAtkJ1NTJhtdqm8dkmnqelrw3908eA`}/>
							</td>
						</tr>
						</tbody>
					</Table>
				</div>
			}

			<Modal show={show} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Do You Want to Check {isCheckedIn ? "Out" : "In"}?</Modal.Title>
				</Modal.Header>
				<Modal.Body>{!isCheckedIn && show &&
				<span>Depending on your device you may be prompted to allow access to your location. These
					permissions are required to complete your check in.</span>}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeModal}>
						Cancel
					</Button>
					<Button variant="primary" onClick={!isCheckedIn ? handleCheckIn : handleCheckOut}>
						Complete Client Check {isCheckedIn ? "Out" : "In"}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default connect(mapStateToProps)(ClientCheckIn);