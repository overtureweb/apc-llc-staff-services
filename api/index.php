<?php

namespace APCSSI;

use \APCSSI\Auth\Auth;
use \APCSSI\Auth\Token;
use \APCSSI\Data\StaffContacts;
use \APCSSI\Data\Clients;
use \APCSSI\OCR\OCR;
use \APCSSI\Data\Services;

require __DIR__ . '/' . 'vendor/autoload.php';

function is_ssl(): bool { //TODO THIS SHOULD BE MOVED TO THE AUTH CLASS?
	if ( isset( $_SERVER['HTTPS'] ) ) {
		if ( 'on' == strtolower( $_SERVER['HTTPS'] ) ) {
			return true;
		}
		if ( '1' == $_SERVER['HTTPS'] ) {
			return true;
		}
	} elseif ( isset( $_SERVER['SERVER_PORT'] ) && ( '443' == $_SERVER['SERVER_PORT'] ) ) {
		return true;
	}

	return false;
}

function end_session() { //TODO THIS SHOULD BE MOVED TO A LOGOUT CLASS?
	setcookie( session_name(), '', time() - 3600, '/' );
	$_SESSION = [];
	session_destroy();

	return;
}

if ( ! is_ssl() ) {
	return;
}

if ( ! isset( $_GET['type'] ) ) {
	return;
}

if ( $_GET['type'] === 'login' ) {

	$authenticate = new Auth( $_POST );

	if ( ! $authenticate->validate_login() || ! $authenticate->get_authenticated_user() ) {
		echo $authenticate->invalid_user();

		return;
	}

	echo $authenticate->set_user_session()
	                  ->send_ajax_response();

	return;
}

session_start();

if ( ! Token::validate_session_token() ) {
	echo "Request not authorized";
	end_session();

	return;
}

//set the timezone to Los Angeles
date_default_timezone_set( 'America/Los_Angeles' );

$data = json_decode( file_get_contents( 'php://input' ), true );

switch ( $_GET['type'] ) {
	case 'getStaffContacts':
		StaffContacts::get_staff_contacts();
		break;
	case 'getOCR':
		OCR::get_ocr( $data );
		break;
	case 'getOCRS':
		OCR::get_ocrs_unpaid();
		break;
	case 'getClients':
		Clients::get_clients( $data['searchString'] );
		break;
	case 'getServices':
		Services::get_services();
		break;
	case 'logout':
		end_session();
		break;
	case 'insertOCR':
		$ocr = new OCR( $data );
		if ( $ocr->validate_ocr() ) {
			$ocr->insert_ocr();
		}
		break;
	case 'updateOCR':
		$ocr = new OCR( $data );
		if ( $ocr->validate_ocr() ) {
			$ocr->update_ocr();
		}
		break;
	case 'getPayHistory':
		OCR::get_ocrs_paid( $data );
		break;
	case 'insertCheckIn':
		$check_in = new CheckIns( $_SESSION['staff_id'], $data );
		$check_in->post_check_in()->get_response();
		break;
	case 'getCheckIn':
		$check_in = new CheckIns( $_SESSION['staff_id'] );
		$check_in->get_check_in()->get_response();
		break;
	case 'updateCheckIn':
		$check_in = new CheckIns( $_SESSION['staff_id'], $data );
		$check_in->update_check_in()->get_response();
		break;
	default:
		break;
}

