<?php
require 'standartDB.php';
$arrObjects = (array)json_decode($_POST['arrObjects']);

if ($arrObjects['table'] === 'object') {
  $result =  $mysqli->query (
    "UPDATE `БУдівельний об'єкт`
    (`Назва`, `Регіон`, `Галузі`,
      `Організації`, `1 квартал`, `2 квартал`,
      `3 квартал`, `4 квартал`)
        VALUES ('".$arrObjects['Назва']."',
        '".(int)$arrObjects['Регіон']."',
        '".(int)$arrObjects['Галузі']."',
        '".(int)$arrObjects['Організації']."',
        '".(float)$arrObjects['1 квартал']."',
        '".(float)$arrObjects['2 квартал']."',
        '".(float)$arrObjects['3 квартал']."',
        '".(float)$arrObjects['4 квартал']."'
        )"
  ) or die ("<b>Query failed:</b> " . mysql_error());
}
if ($arrObjects['table'] === 'organiz') {
  $result =  $mysqli->query (
    "INSERT INTO `Організація`
      (`Назва`) VALUES ('".$arrObjects['Назва']."')"
  ) or die ("<b>Query failed:</b> " . mysql_error());
}
if ($arrObjects['table'] === 'galuzi') {
  $result =  $mysqli->query (
    "INSERT INTO `Галузі`
      (`Назва`) VALUES ('".$arrObjects['Назва']."')"
  ) or die ("<b>Query failed:</b> " . mysql_error());
}
if ($arrObjects['table'] === 'regions') {
  $result =  $mysqli->query (
    "INSERT INTO `Регіони`
        (`Назва`) VALUES ('".$arrObjects['Назва']."')"
  ) or die ("<b>Query failed:</b> " . mysql_error());
}

  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
?>
