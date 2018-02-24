<?php
require 'standartDB.php';
$arrObjects = (array)json_decode($_POST['arrObjects']);

if ($arrObjects['table'] === 'object') {
  $result =  $mysqli->query (
    "UPDATE `БУдівельний об'єкт` SET
      `Назва` = '".$arrObjects['Назва']."',
      `Регіон` = '".(int)$arrObjects['Регіон']."',
      `Галузі` = '".(int)$arrObjects['Галузі']."',
      `Організації` = '".(int)$arrObjects['Організації']."',
      `1 квартал` = '".(float)$arrObjects['1 квартал']."',
      `2 квартал` = '".(float)$arrObjects['2 квартал']."',
      `3 квартал` = '".(float)$arrObjects['3 квартал']."',
      `4 квартал` = '".(float)$arrObjects['4 квартал']."'
        WHERE `Код` = '".$arrObjects["Код"]."'"
  ) or die ("<b>Query failed:</b> " . mysql_error());
}
if ($arrObjects['table'] === 'organiz') {
  $result =  $mysqli->query (
    "UPDATE `Організація` SET
      `Назва` = '".$arrObjects['Назва']."'
        WHERE `Код` = '".$arrObjects["Код"]."'"
  ) or die ("<b>Query failed:</b> " . mysql_error());
}
if ($arrObjects['table'] === 'galuzi') {
  $result =  $mysqli->query (
    "UPDATE `Галузі` SET
      `Назва` = '".$arrObjects['Назва']."'
        WHERE `Код` = '".$arrObjects["Код"]."'"
  ) or die ("<b>Query failed:</b> " . mysql_error());
}
if ($arrObjects['table'] === 'regions') {
  $result =  $mysqli->query (
    "UPDATE `Регіони` SET
      `Назва` = '".$arrObjects['Назва']."'
        WHERE `Код` = '".$arrObjects["Код"]."'"
  ) or die ("<b>Query failed:</b> " . mysql_error());
}

  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');

?>
