<?php


namespace APCSSI\Data;

use APCSSI\Db\Db;

/**
 * Class Clients
 * @package APCSSI\Data
 */
class Clients {
	/**
	 * @param $search_string
	 */

	public static function get_clients( $search_string ) {

		$isText = '/^[a-zA-Z \-.\']+$/';

		if ( ! preg_match( $isText, strip_tags( trim( $search_string ) ) ) ) {
			return;
		}

		//concat % to the end of the search string to do a LIKE query in mysql
		$search_string .= '%';

		$db    = Db::db_connect_client();
		$query = "SELECT CONCAT(client_info_lastname, ', ', client_info_firstname) AS client, client_info_id, pet_name, pet_type, pet_dog_breed, pet_pic_link, pet_color, pet_weight, pet_age_month, pet_age_year, pet_gender, pet_neutered, pet_good_health, pet_chipped, pet_feeding, pet_meds, pet_vet, pet_vet_phone FROM client_info, pet_info WHERE client_info_lastname LIKE ? && client_info_account_is_active = 'Y' && client_info_id = pet_info.client_id && pet_active = 'Y' ORDER BY client_info_id";
		$stmt  = $db->prepare( $query );
		$stmt->bind_param( 's', $search_string );
		$stmt->execute();
		$result    = $stmt->get_result();
		$clients   = [];
		$client_id = - 1;
		$index     = - 1;
		$pets      = [];

		while ( $row = $result->fetch_array( MYSQLI_ASSOC ) ) {
			if ( $row['client_info_id'] !== $client_id ) {
				$client_id = $row['client_info_id'];
				$index ++;
				$clients[] = array( 'client' => $row['client'], 'client_info_id' => $row['client_info_id'] );
				$pets      = [];
			}
			$pets[]                    = array(
				"name"        => $row['pet_name'],
				"type"        => $row['pet_type'],
				"dog breed"   => $row['pet_dog_breed'],
				"pic_link"    => $row['pet_pic_link'],
				"color"       => $row['pet_color'],
				"weight"      => $row['pet_weight'] . 'lbs',
				"age"         => $row['pet_age_month'] . '/' . $row['pet_age_year'],
				"gender"      => $row['pet_gender'],
				"neutered"    => $row['pet_neutered'],
				"good health" => $row['pet_good_health'],
				"chipped"     => $row['pet_chipped'],
				"feeding"     => $row['pet_feeding'],
				"meds"        => $row['pet_meds'],
				"vet"         => $row['pet_vet'],
				"vet phone"   => $row['pet_vet_phone']
			);
			$clients[ $index ]['pets'] = $pets;
		}
		$stmt->close();
		$db->close();

		echo json_encode( $clients, JSON_PRETTY_PRINT );
	}
}