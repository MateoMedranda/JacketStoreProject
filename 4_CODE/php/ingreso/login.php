<?php
session_start(); 
include('../conexion.php');

// Obtener el usuario y la contraseña del formulario
$usuario = $_POST['user'];
$clave = $_POST['pasword'];

// Preparar la consulta
$consulta = $conexion->prepare("SELECT * FROM usuario WHERE USUARIO_CORREO=?");
$consulta->bind_param("s", $usuario);
$consulta->execute();
$resultado = $consulta->get_result();
$fila = $resultado->fetch_assoc();

if ($fila) {
    // Recuperar la contraseña encriptada de la base de datos
    $contraseña_encriptada = $fila['USUARIO_CLAVE']; // Asegúrate de que el nombre de la columna sea correcto

    // Verificar la contraseña ingresada
    if (password_verify($clave, $contraseña_encriptada)) { // Cambiado a $clave
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
            default:
                header("Location: ../../NicePage/InicioTiendaVirtual/index.php"); // Redirige a un valor predeterminado
                break;
        }
        exit();
    } else {
        header("Location: ../../NicePage/InicioTiendaVirtual/loginerror.html");
        exit();
    }

} else {
    header("Location: ../../NicePage/InicioTiendaVirtual/loginerror.html");
    exit();
}

// Opcional: Cerrar la conexión a la base de datos
$conexion->close();
?>
