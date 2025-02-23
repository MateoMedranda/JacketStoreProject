<?php
if (isset($_POST['buscar'])) {
    include("../conexion.php");

    $busqueda = trim($_POST['buscar']);
    $palabras = explode(" ", $busqueda);

    $consulta = "SELECT * FROM usuario WHERE ";
    $filtros = [];

    foreach ($palabras as $palabra) {
        $filtros[] = "USUARIO_NOMBRE LIKE '%" . $conexion->real_escape_string($palabra) . "%'";
    }

    $consulta .= implode(" AND ", $filtros);

    $result = $conexion->query($consulta);

    $usuarios = [];
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }

    echo json_encode($usuarios);
}
?>
