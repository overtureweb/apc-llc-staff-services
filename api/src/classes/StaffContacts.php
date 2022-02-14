<?php

namespace APCSSI\Data;

use \APCSSI\Db\Db;

class StaffContacts {
	public static function get_staff_contacts() {
		$staff_contacts = [];
		$db    = Db::db_connect_ocr();
		$query   = "SELECT first_name, last_name, email, phone FROM staff_login WHERE status = 'active' ORDER BY sort_code ASC";
		$stmt    = $db->prepare( $query );
		$stmt->execute();
		$stmt->bind_result( $fn, $ln, $email, $phone );

		while ( $stmt->fetch() ) {
			$staff_contacts[] = [ "name" => $fn . ' ' . $ln, "email" => $email, "phone" => $phone ];
		}

		$stmt->close();
		$db->close();

		echo json_encode( $staff_contacts, JSON_PRETTY_PRINT );
	}
}