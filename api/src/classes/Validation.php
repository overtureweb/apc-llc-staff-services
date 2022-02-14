<?php

namespace APCSSI\Validation;

interface Validation {

	/**
	 * @param array $arg
	 *
	 * @return mixed
	 */
	public static function is_valid(array $arg);
}