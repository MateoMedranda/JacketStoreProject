<?php
include('../conexion.php');

$usuario = $_POST['user'];
$clave = $_POST['pasword'];

$consulta = "SELECT * FROM usuario WHERE USUARIO_CORREO='$usuario' AND USUARIO_CLAVE='$clave'";
$resultado = mysqli_query($conexion, $consulta);
$fila = mysqli_fetch_assoc($resultado);

if ($fila) {
    $nombre = $fila['USUARIO_NOMBRE'];
    $apellido = $fila['USUARIO_APELLIDO'];
    $rol = (int)$fila['ROL_ID'];

    echo "<script>
        let usuario = { nombre: '$nombre', apellido: '$apellido' };
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
    </script>";

    switch ($rol) {
        case 1:
            echo "<script>window.location.href='../../NicePage/Empresa/index.html';</script>";
            break;
        case 2:
            echo "<script>window.location.href='../../NicePage/Empresa/Inventario.html';</script>";
            break;
        case 3:
            echo "<script>window.location.href='../../NicePage/InicioTiendaVirtual/index.html';</script>";
            break;
    }
} else {
    echo "<script>window.location.href='../../NicePage/InicioTiendaVirtual/loginerror.html';</script>";
}
?>
