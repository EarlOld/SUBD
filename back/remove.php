<?php
require 'standartDB.php';
$arrObjects = (array)json_decode($_POST['arrObjects']);

if ($arrObjects['table'] === 'object') {
  $result =  $mysqli->query (
    "DELETE FROM `БУдівельний об'єкт`
        WHERE `Код` = '".$arrObjects["Код"]."'"
  ) or die ("<b>Query failed:</b> " . mysql_error());
}
if ($arrObjects['table'] === 'organiz') {
  $result =  $mysqli->query (
    "DELETE FROM `Організація`
        WHERE `Код` = '".$arrObjects["Код"]."'"
  ) or die ("<b>Query failed:</b> " . mysql_error());
}
if ($arrObjects['table'] === 'galuzi') {
  $result =  $mysqli->query (
    "DELETE FROM `Галузі`
        WHERE `Код` = '".$arrObjects["Код"]."'"
  ) or die ("<b>Query failed:</b> " . mysql_error());
}
if ($arrObjects['table'] === 'regions') {
  $result =  $mysqli->query (
    "DELETE FROM `Регіони`
        WHERE `Код` = '".$arrObjects["Код"]."'"
  ) or die ("<b>Query failed:</b> " . mysql_error());
}

  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');

?>
