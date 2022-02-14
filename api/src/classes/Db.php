<?php

namespace APCSSI\Db;

use \mysqli;

class Db {
	public static function db_connect_ocr(): mysqli {
		return new mysqli( $_ENV['host'], $_ENV['user'], $_ENV['pw'], $_ENV['db_ocr'] );
	}

	public static function db_connect_client(): mysqli {
		return new mysqli( $_ENV['host'], $_ENV['user'], $_ENV['pw'], $_ENV['db_client'] );
	}
}