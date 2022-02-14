<?php

namespace APCSSI\OCR;

use APCSSI\Db\Db;
use APCSSI\Validation\DateRangeValidation;
use APCSSI\Validation\OCRValidation;

class OCR {
	private int $id = - 1;
	private string $client;
	private string $pets;
	private $start_date;
	private $end_date;
	private $services;
	private string $comments;
	private int $is_active;

	public function __construct( $data ) {
		if ( isset( $data['id'] ) && ! empty( $data['id'] ) ) {
			$this->id = (int) $data['id'];
		}

		if ( isset( $data['client'] ) ) {
			$this->client = strip_tags( trim( $data['client'] ) );
		}

		if ( isset( $data['pets'] ) ) {
			$this->pets = strip_tags( trim( $data['pets'] ) );
		}

		if ( isset( $data['startDate'] ) ) {
			$this->start_date = date( 'Y-m-d', strtotime( $data['startDate'] ) );
		}

		if ( isset( $data['endDate'] ) ) {
			$this->end_date = date( 'Y-m-d', strtotime( $data['endDate'] ) );
		}

		if ( isset( $data['services'] ) ) {
			$this->services = $data['services'];
		}

		if ( isset( $data['comments'] ) ) {
			$this->comments = htmlspecialchars( strip_tags( trim( $data['comments'] ) ), ENT_QUOTES | ENT_HTML5 );
		}

		if ( isset( $data['isActive'] ) ) {
			$this->is_active = (int) $data['isActive'];
		}
	}

	public static function get_ocr( $data ) {
		if ( ! OCRValidation::is_valid_ocr_id( $data['ocrID'] ) ) {
			return false;
		}
		$ocr = [];

		$db    = Db::db_connect_ocr();
		$query = "SELECT ocr_id, client_name, client_pets, start_date, end_date, services, comments, comments_manager FROM ocr WHERE ocr_id = ? AND staff_id = ? AND (status = 'ENTERED' || status = 'PENDING') AND is_active = true LIMIT 1";
		$stmt  = $db->prepare( $query );
		$stmt->bind_param( 'ii', $data['ocrID'], $_SESSION['staff_id'] );
		$stmt->execute();
		$stmt->bind_result( $ocr_id, $client_name, $client_pets, $start_date, $end_date, $services, $comments, $manager_comments );

		while ( $stmt->fetch() ) {
			$ocr = [
				"id"              => $ocr_id,
				"client"          => $client_name,
				"pets"            => $client_pets,
				"startDate"       => date( 'n/j/y', strtotime( $start_date ) ),
				"endDate"         => date( 'n/j/y', strtotime( $end_date ) ),
				"services"        => json_decode( $services, true ),
				"comments"        => htmlspecialchars_decode( $comments, ENT_QUOTES | ENT_HTML5 ),
				"managerComments" => $manager_comments,
			];
		}

		$stmt->close();
		$db->close();

		echo json_encode( $ocr, JSON_PRETTY_PRINT );
	}

	public static function get_ocrs_unpaid() {
		$db    = Db::db_connect_ocr();
		$query = "SELECT client_name AS client, start_date, end_date, services, comm, ocr_id, status FROM ocr WHERE staff_id = ? && (status = 'ENTERED' || status = 'PENDING' || status = 'APPROVED') && is_active = true ORDER BY ocr_id DESC";
		$stmt  = $db->prepare( $query );
		$stmt->bind_param( 'i', $_SESSION['staff_id'] );
		$stmt->execute();
		$stmt->bind_result( $client, $start_date, $end_date, $services, $comm, $id, $status );
		$ocrs = [];
		while ( $stmt->fetch() ) {
			$ocrs[] = [
				"client"   => $client,
				"dates"    => date( 'n/j/y', strtotime( $start_date ) ) . ' - ' . date( 'n/j/y', strtotime( $end_date ) ),
				"services" => $services,
				"comm"     => $comm,
				"id"       => $id,
				"status"   => $status
			];
		}

		$stmt->close();
		$db->close();

		echo strip_tags( json_encode( $ocrs, JSON_PRETTY_PRINT ) ); //todo why is strip tags in here?
	}

	public static function get_ocrs_paid( $data ) {
		$dates['start_date'] = date( 'Y-m-d', strtotime( $data['startDate'] ) );
		$dates['end_date']   = date( 'Y-m-d', strtotime( $data['endDate'] ) );

		if ( ! DateRangeValidation::is_valid( $dates ) ) {
			return;
		}

		$db    = Db::db_connect_ocr();
		$query = "SELECT client_name AS client, start_date, end_date, services, comm, ocr_id, status, paid_date FROM ocr WHERE staff_id = ? && status = 'PAID' && is_active = true && (paid_date >= ? && paid_date <= ?)";
		$stmt  = $db->prepare( $query );
		$stmt->bind_param( 'iss', $_SESSION['staff_id'], $dates['start_date'], $dates['end_date'] );
		$stmt->execute();
		$stmt->bind_result( $client, $start_date, $end_date, $services, $comm, $id, $status, $paid_date );
		$ocrs = [];
		while ( $stmt->fetch() ) {
			$ocrs[] = [
				"client"   => $client,
				"dates"    => date( 'n/j/y', strtotime( $start_date ) ) . ' - ' . date( 'n/j/y', strtotime( $end_date ) ),
				"services" => $services,
				"comm"     => $comm,
				"id"       => $id,
				"status"   => $status,
				"paidDate" => date( 'n/j/y', strtotime( $paid_date ) ),
			];
		}

		$stmt->close();
		$db->close();

		echo strip_tags( json_encode( $ocrs, JSON_PRETTY_PRINT ) );
	}

	public function validate_ocr(): bool {
		$args = [
			"client"     => $this->client,
			"pets"       => $this->pets,
			"start_date" => $this->start_date,
			"end_date"   => $this->end_date,
			"services"   => $this->services,
			"ocr_id"     => $this->id
		];

		return OCRValidation::is_valid( $args );
	}


	public function insert_ocr() {
		$date_object = new \DateTime();
		$date = $date_object->format("Y-m-d H:i:s");
		$services   = json_encode( $this->services );
		$commission = OCR::calculate_commission( $this->services );

		$query = "INSERT INTO ocr (staff_id, client_name, client_pets, services, start_date, end_date, comm, comments, first_entered_datetime ) VALUES (?,?,?,?,?,?,?,?,?)";

		$db   = Db::db_connect_ocr();
		$stmt = $db->prepare( $query );

		$stmt->bind_param( 'isssssdss', $_SESSION['staff_id'], $this->client, $this->pets, $services, $this->start_date, $this->end_date, $commission, $this->comments, $date );

		$stmt->execute();
		$stmt->close();
		$db->close();
	}

	public function update_ocr() {
		$services   = json_encode( $this->services );
		$commission = OCR::calculate_commission( $this->services );

		$query = "UPDATE ocr SET services = ?, start_date = ?, end_date = ?, comm = ?, comments = ?, is_active = ? WHERE ocr_id = ? AND staff_id = ? && ( status = 'ENTERED' || status = 'PENDING') LIMIT 1";

		$db   = Db::db_connect_ocr();
		$stmt = $db->prepare( $query );

		$stmt->bind_param( 'sssdssii', $services, $this->start_date, $this->end_date, $commission, $this->comments, $this->is_active, $this->id, $_SESSION['staff_id'] );

		$stmt->execute();
		$stmt->close();
		$db->close();
	}

	private static function calculate_commission( $services ): int {

		$query = "SELECT PS30, PS45, PS60, DW30, DW45, DW60, OV, HB, HB2, HBPU, HBDO, KEYPU, KEYDO, MNG FROM staff_compensation WHERE staff_id = {$_SESSION['staff_id']} && is_active = true LIMIT 1";
		$db    = Db::db_connect_ocr();
		$stmt  = $db->prepare( $query );
		$stmt->execute();
		$result             = $stmt->get_result();
		$compensation_rates = $result->fetch_assoc();
		$stmt->close();
		$db->close();

		return array_reduce( $services, function ( $acc, $service ) use ( $compensation_rates ) {
			return $acc += $service['serviceCount'] * $compensation_rates[ $service['serviceType'] ];
		}, 0 );
	}
}
