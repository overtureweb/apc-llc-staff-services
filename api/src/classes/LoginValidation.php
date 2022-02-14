<?php

namespace APCSSI\Validation;

class LoginValidation implements Validation {

	public static function is_valid( array $args ): bool {
		return ( filter_var( $args['username'], FILTER_VALIDATE_EMAIL ) && preg_match( '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/', $args['password'] ) );
	}
}