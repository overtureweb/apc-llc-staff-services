<?php


namespace APCSSI\Auth;

/**
 * Class Token
 *
 * @package APCSSI\Auth
 */
class Token {
	/**
	 * @return string
	 */
	public static function set_session_token(): string {
		return bin2hex( openssl_random_pseudo_bytes( 32 ) );
	}

	/**
	 * @param null $token
	 *
	 * @return bool
	 */
	public static function validate_session_token($token = null): bool {
		// some installations of PHP using FASTCGI or PHPFPM do not have getallheaders() installed, this is a workaround
		if ( ! function_exists( 'getallheaders' ) ) {
			function getallheaders(): array {
				$headers = [];
				foreach ( $_SERVER as $name => $value ) {
					if ( substr( $name, 0, 5 ) == 'HTTP_' ) {
						$headers[ str_replace( ' ', '-', ucwords( strtolower( str_replace( '_', ' ', substr( $name, 5 ) ) ) ) ) ] = $value;
					}
				}
				return $headers;
			}
		}

		//the CSRF key in the headers array may change depending on the installation of Apache/PHP:

		//use this line for the local MAMP installation
		return isset( getallheaders()['x-csrf-token'] ) && getallheaders()['x-csrf-token'] === $_SESSION['token'];

		//use this line for dev/prod bitnami servers
		//return isset( getallheaders()['X-Csrf-Token'] ) && getallheaders()['X-Csrf-Token'] === $_SESSION['token'];
	}
}