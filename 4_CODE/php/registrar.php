<?php

$nombre =!empty($_POST["nombre"]) ? $_POST["nombre"]:"";
$rol=3;
$telefono= !empty($_POST["telefono"]) ? $_POST["telefono"]:"";
$clave=!empty($_POST["clave"]) ? $_POST["clave"]:"";
$apellido =!empty($_POST["apellido"]) ? $_POST["apellido"]:"";
$cedula =!empty($_POST["cedula"]) ? $_POST["cedula"]:"";
$email =!empty($_POST["email"]) ? $_POST["email"]:"";
$direccion=!empty($_POST["direccion"]) ? $_POST["direccion"]:"";

if($nombre && $apellido && $cedula && $email){
	include("conexion.php");
	$consulta=<<<FIN
		Insert into usuario( ROL_ID, USUARIO_NOMBRE, USUARIO_APELLIDO, USUARIO_CEDULA, USUARIO_TELEFONO, USUARIO_CLAVE, USUARIO_CORREO, USUARIO_DIRECCION)
		values ("$rol" ,"$nombre", "$apellido", "$cedula", "$telefono","$clave","$email","$direccion") 
		FIN;
	if(!mysqli_query($conexion, $consulta)){
		die ("No se puede agregar al registro");
	}
	
}
header("Location: ../Nicepage/InicioTiendaVirtual/index.html");

?>



