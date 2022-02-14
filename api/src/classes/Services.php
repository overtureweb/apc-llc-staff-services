<?php


namespace APCSSI\Data;

use APCSSI\Db\Db;

class Services {
	public static function get_services() {
		$db    = Db::db_connect_ocr();
		$query = "SELECT PS30, PS45, PS60, DW30, DW45, DW60, OV, HB, HB2, HBPU, HBDO, KEYPU, KEYDO, MNG from staff_compensation WHERE staff_id = ? LIMIT 1";
		$stmt  = $db->prepare( $query );
		$stmt->bind_param( 'i', $_SESSION['staff_id'] );
		$stmt->execute();
		$result = $stmt->get_result();
		/**
		 * null values in the query result represent service categories not performed by the user and are therefore omitted from the AJAX response
		 **/
		$row      = array_filter( $result->fetch_array( MYSQLI_ASSOC ), function ( $v ) {
			return ! is_null( $v );
		} );
		$services = array_keys( $row );

		$stmt->close();
		$db->close();

		echo json_encode( $services, JSON_PRETTY_PRINT );
	}
}