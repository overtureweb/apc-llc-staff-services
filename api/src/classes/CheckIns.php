<?php

namespace APCSSI;

use APCSSI\Db\Db;


class CheckIns {
	private array $response = [
		"status"  => null,
		"message" => null,
		"body"    => null
	];
	private $client_id;
	private $client_name;
	private $start_coords;
	private $end_coords;
	private $staff_id;

	public function __construct( $staff_id, $data = null ) {
		if ( ! empty( $data ) ) {
			array_walk( $data, function ( $value ) {
				filter_var( trim( $value ), FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW | FILTER_FLAG_STRIP_HIGH );
			} );

			if ( ! empty( $data['client_info_id'] ) ) {
				$this->client_id = $data['client_info_id'];
			}
			if ( ! empty( $data['client'] ) ) {
				$this->client_name = $data['client'];
			}
			if ( ! empty( $data['startCoords'] ) ) {
				$this->start_coords = $data['startCoords'];
			}
			if ( ! empty( $data['endCoords'] ) ) {
				$this->end_coords = $data['endCoords'];
			}
		}
		$this->staff_id = $staff_id;

		return $this;
	}


	public function post_check_in() {
		$db    = Db::db_connect_ocr();
		$query = "SELECT * FROM client_check_ins WHERE staff_id = ? AND check_out_time IS NULL";
		$stmt  = $db->prepare( $query );
		$stmt->bind_param( 'i', $this->staff_id );
		$stmt->execute();
		$stmt->store_result();
		if ( $stmt->num_rows !== 0 ) {
			http_response_code( 404 );
			$this->response = [ "status" => "error", "message" => "A check-in for this associate already exists." ];
			$stmt->close();
			$db->close();

			return false;
		}
		$stmt->close();

		$query = "INSERT INTO client_check_ins (client_id, client_name, staff_id, start_coords) VALUES (?,?,?,?)";
		$stmt  = $db->prepare( $query );
		$stmt->bind_param( 'isis', $this->client_id, $this->client_name, $this->staff_id, $this->start_coords );
		$stmt->execute();
		if ( $stmt->affected_rows === 1 ) {
			$this->response = [ "status" => "success", "message" => "You have successfully checked in." ];
		} else {
			http_response_code( 404 );
			$this->response = [ "status" => "error", "message" => "An error occurred, please try again.." ];
		}
		$stmt->close();
		$db->close();

		return $this;
	}

	public function update_check_in(): CheckIns {
		$db    = Db::db_connect_ocr();
		$query = "UPDATE client_check_ins SET end_coords = ?, check_out_time = NOW() WHERE client_id = ? AND staff_id = ? AND check_out_time IS NULL";
		$stmt  = $db->prepare( $query );
		$stmt->bind_param( 'sii', $this->end_coords, $this->client_id, $this->staff_id );
		$stmt->execute();
		if ( $stmt->affected_rows === 1 ) {
			$this->response = [ "status" => "success", "message" => "You have successfully checked out." ];
		} else {
			http_response_code( 404 );
			$this->response = [ "status" => "error", "message" => "An error occurred, please try again." ];
		}
		$stmt->close();
		$db->close();

		return $this;
	}

	public function get_check_in(): CheckIns {
		$db    = Db::db_connect_ocr();
		$query = "SELECT client_id, client_name, start_coords, check_in_time FROM client_check_ins WHERE staff_id = ? AND check_out_time IS NULL";
		$stmt  = $db->prepare( $query );
		$stmt->bind_param( 'i', $this->staff_id );
		$stmt->execute();
		$stmt->bind_result( $client_id, $client_name, $start_coords, $timestamp );
		$stmt->store_result();
		$stmt->fetch();
		if ( $stmt->num_rows > 0 ) {
			$this->response = [
				"status"  => "success",
				"message" => null,
				"body"    => [
					"client_info_id" => $client_id,
					"client"         => $client_name,
					"startCoords"    => $start_coords,
					"timestamp"      => $timestamp
				]
			];
		} else {
			$this->response = [ "status" => "success", "message" => null ];
		}
		$stmt->close();
		$db->close();

		return $this;
	}

	public function get_response() {
		echo json_encode( $this->response );
	}
}