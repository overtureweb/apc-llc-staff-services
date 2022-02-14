<?php


namespace APCSSI\Validation;

use DateTime;
use Exception;

class DateRangeValidation implements Validation {

	public static function is_valid( array $dates ): bool {
		$end = null;
		$current_timestamp = (new DateTime())->getTimestamp();

		try {
			$start = new DateTime( $dates['start_date'] );
			$end   = new DateTime( $dates['end_date'] );
		} catch ( Exception $e ) {

		}

		return ( isset( $start ) && isset( $end ) && ! $start->diff( $end )->invert && $current_timestamp >= $end->getTimestamp() );
	}
}