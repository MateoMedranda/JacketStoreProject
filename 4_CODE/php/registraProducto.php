<?php
$descripcion = !empty($_POST['nombre'])? $_POST['nombre']:'';
$material = !empty($_POST['apellido'])? $_POST['apellido']:'';
$color = !empty($_POST['cedula'])? $_POST['cedula']:'';
$stock = !empty($_POST['correo'])? $_POST['correo']:'';
$talla = !empty($_POST['correo'])? $_POST['correo']:'';
$estado = !empty($_POST['correo'])? $_POST['correo']:'';
$precio = !empty($_POST['correo'])? $_POST['correo']:'';
$descuento = !empty($_POST['correo'])? $_POST['correo']:'';

if($nombre&&$apellido&&$cedula&&$email){
    include("conexion.php");
    $consulta = <<<FIN
    insert into usuarios(Nombre,Apellido,Cedula,Email)
    values('$nombre','$apellido','$cedula','$email')
    FIN;
    if(!mysqli_query($conexion,$consulta)){
        die('No se pudo agregar el registro');
    }
}
header('Location:../index.php');
?>