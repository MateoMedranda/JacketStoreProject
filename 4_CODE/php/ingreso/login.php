<?php
session_start(); 
include('../conexion.php');

$usuario = $_POST['user'];
$clave = $_POST['pasword'];

$consulta = $conexion->prepare("SELECT * FROM usuario WHERE USUARIO_CORREO=? AND USUARIO_CLAVE=?");
$consulta->bind_param("ss", $usuario, $clave);
$consulta->execute();
$resultado = $consulta->get_result();
$fila = $resultado->fetch_assoc();

if ($fila) {
    $_SESSION['usuario'] = [
        'nombre' => $fila['USUARIO_NOMBRE'],
        'apellido' => $fila['USUARIO_APELLIDO'],
        'rol' => (int)$fila['ROL_ID']
    ];

    switch ($_SESSION['usuario']['rol']) {
        case 1:
            header("Location: ../../NicePage/Empresa/index.php");
            break;
        case 2:
            header("Location: ../../NicePage/Empresa/Inventario.php");
            break;
        case 3:
            header("Location: ../../NicePage/InicioTiendaVirtual/index.php");
            break;
    }
    exit();
} else {
    header("Location: ../../NicePage/InicioTiendaVirtual/loginerror.html");
    exit();
}
?>
