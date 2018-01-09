<?php 

header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(array('status' => false));
  exit;
}

//Borrar el archivo actual de la carpeta si existe
if(is_file("./registroApp/registroApp.png")){
  unlink("./registroApp/registroApp.png");
}
//unlink("./fondoApp/fondoApp.png");

$path = 'registroApp/';

if (isset($_FILES['file'])) {
  $originalName = $_FILES['file']['name'];
  //$ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
  $ext = '.png';
  //$generatedName = md5($_FILES['file']['tmp_name']).$ext;
  $generatedName = 'registroApp'.$ext;
  $filePath = $path.$generatedName;

  if (!is_writable($path)) {
    echo json_encode(array(
      'status' => false,
      'msg'    => 'Destination directory not writable.'
    ));
    exit;
  }

  if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
    echo json_encode(array(
      'status'        => true,
      'originalName'  => $originalName,
      'generatedName' => $generatedName
    ));
  }
}
else {
  echo json_encode(
    array('status' => false, 'msg' => 'No file uploaded.')
  );
  exit;
}