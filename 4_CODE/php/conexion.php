<?php
$servername = "localhost";
$username = "admin";
$password = "admin";
$name = "chompa_bd";

$conexion = new mysqli($servername, $username, $password,$name);

if ($conexion->connect_error) {
  die("Connection failed: " . $conexion->connect_error);
}
?>