<?php

namespace APCSSI\Auth;

use APCSSI\Db\Db;
use APCSSI\Validation\LoginValidation;

/**
 * Class Auth
 * @package APCSSI\Auth
 */
class Auth {
	/**
	 * @param $login_data
	 *
	 * @return bool
	 */
	private string $username;
	private string $password;
	private array $login_query_result = [];

	public function __construct( $login ) {
		if ( isset( $login['username'] ) ) {
			$this->username = strip_tags( trim( $login['username'] ) );
		}
		if ( isset( $login['password'] ) ) {
			$this->password = strip_tags( trim( $login['password'] ) );
		}
	}

	public function validate_login(): bool {
		$args = [
			"username" => $this->username,
			"password" => $this->password
		];

		return LoginValidation::is_valid( $args );
	}

	/**
	 *
	 * @return bool
	 */
	public function get_authenticated_user(): bool {
		$db    = Db::db_connect_ocr();
		$query = "SELECT password, first_name, staff_id, pic FROM staff_login WHERE email = ? AND status = 'active' LIMIT 1";
		$stmt  = $db->prepare( $query );
		$stmt->bind_param( 's', $this->username );
		$stmt->execute();
		$result                   = $stmt->get_result();
		$row                      = $result->fetch_assoc();
		$this->login_query_result = $row;
		$stmt->close();
		$db->close();

		return $result->num_rows === 1 && password_verify( $this->password, $row['password'] );
	}

	/**
	 *
	 */
	public function set_user_session(): Auth {
		session_start();
		$_SESSION['token']    = Token::set_session_token();
		$_SESSION['staff_id'] = $this->login_query_result['staff_id'];

		return $this;
	}

	/**
	 *
	 *
	 * @return false|string
	 */
	public function send_ajax_response() {
		$response = [
			'isValidUser'  => true,
			'sessionToken' => $_SESSION['token'],
			'firstName'    => $this->login_query_result['first_name'],
			'userPicURL'   => $this->login_query_result['pic'],
		];

		return json_encode( $response );
	}

	/**
	 * @return false|string
	 */
	public function invalid_user() {
		return json_encode( [ 'isValidUser' => false ] );
	}


}