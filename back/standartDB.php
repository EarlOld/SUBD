<?php
	$mysqli = new mysqli("localhost", "root", "root", "lab8db");
  if (mysqli_connect_errno()) {
    echo "Подключение невозможно: ".mysqli_connect_error();
  }
  $mysqli->query("SET NAMES utf8 COLLATE utf8_general_ci");
