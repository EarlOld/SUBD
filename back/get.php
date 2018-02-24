<?php
require 'standartDB.php';
$group = null;
if ($_GET['table'] === "object") {
  $group =  $mysqli->query("SELECT * FROM `БУдівельний об'єкт`") or die ("<b>Query failed:</b> " . mysql_error());
}
if ($_GET['table'] === "organiz") {
  $group =  $mysqli->query("SELECT * FROM `Організація`") or die ("<b>Query failed:</b> " . mysql_error());
}
if ($_GET['table'] === "galuzi") {
  $group =  $mysqli->query("SELECT * FROM `Галузі`") or die ("<b>Query failed:</b> " . mysql_error());
}
if ($_GET['table'] === "regions") {
  $group =  $mysqli->query("SELECT * FROM `Регіони`") or die ("<b>Query failed:</b> " . mysql_error());
}
	$rezult = array();

	while ($row = $group->fetch_assoc()){
		$rezult[] = $row;
	}
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');

	echo json_encode($rezult);
?>
