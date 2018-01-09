<?PHP


	function sendMessage(){

		$postdata = file_get_contents("php://input");
		//$ID= $_SERVER['HTTP_ID'];
		$ID= '0';


			$content = array(
				"en" => 'Se ha realizado un nuevo pedido!'
				);
			
			$fields = array(
				'app_id' => "b38c24e4-50a3-4267-940d-e60ee61a8ff2",
				'included_segments' => array('All'),
				//'include_player_ids' => array("778418b5-3e7b-4c61-ae2a-b2449765a91c"),
				//'include_player_ids' => array($pushes),
				//'include_player_ids' => array($server_output[$i]->push),
	      		'data' => array("foo" => $ID),
	      		'url'=> 'http://constructorakien.internow.com.mx/#/pedidos',
				'contents' => $content
			);
			
			$fields = json_encode($fields);
	    	print("\nJSON sent:\n");
	    	print($fields);
			
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
													   'Authorization: Basic ZDc2NWJiMTQtY2EyYS00ZjIzLTg2MGEtYmExNTNlOGJiODJk'));
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
			curl_setopt($ch, CURLOPT_HEADER, FALSE);
			curl_setopt($ch, CURLOPT_POST, TRUE);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

			$response = curl_exec($ch);
			curl_close($ch);
			$pushes=$pushes.'"'.$server_output[$i]->push.'",';
		//}
		$pushes=substr($pushes, 0,-1);
		echo $pushes;
		
		return $response;
	}
	
	$response = sendMessage();
	$return["allresponses"] = $response;
	$return = json_encode( $return);
	
  print("\n\nJSON received:\n");
	print($return);
  print("\n");
?>