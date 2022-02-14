<?php


namespace APCSSI\Validation;

class OCRValidation implements Validation {
	public function __construct() {
	}

	public static function is_valid( array $args ) {

		return self::is_valid_name( $args['client'] ) &&
		       self::is_valid_pets( $args['pets'] ) &&
		       self::is_valid_dates( $args ) &&
		       self::is_valid_services( $args['services'] ) &&
		       self::is_valid_ocr_id($args['ocr_id']);
	}

	public static function is_valid_name( $name ) {
		return preg_match( '/^[A-Z]+[a-zA-Z0-9 \-.,\']+$/', $name );
	}

	public static function is_valid_pets( $pets ) {
		return preg_match( '/^[A-Z]+[a-zA-Z0-9 \-.,\']+$/', $pets );
	}

	public static function is_valid_services( $services ) {
		$filters = [
			"serviceType"  => [
				"filter"  => FILTER_VALIDATE_REGEXP,
				"options" => [ "regexp" => '/^[A-Z]{2,5}[0-9]{0,2}$/' ]
			],
			"serviceCount" => [
				"filter"  => FILTER_VALIDATE_REGEXP,
				"options" => [ "regexp" => '/^[0-9]{1,2}$/' ]
			]
		];

		foreach ( $services AS $service ) {
			if ( in_array( false, filter_var_array( $service, $filters ) ) ) {
				return false;
			}
			//serviceType and serviceCount refer to the assigned array key names, sorry for the magic values
			foreach ( $service AS $key => $value ) {
				if ( $key !== 'serviceType' && $key !== 'serviceCount' ) {
					return false;
				}
			}
		}

		return true;
	}

	public static function is_valid_dates( $dates ) {
		return DateRangeValidation::is_valid( $dates );
	}

	public static function is_valid_ocr_id($id) {
		return is_numeric($id);
	}

}