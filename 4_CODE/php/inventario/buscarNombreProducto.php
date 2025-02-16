<?php
if (isset($_POST['buscar'])) {
    include("../conexion.php");

    $busqueda = trim($_POST['buscar']);
    $palabras = explode(" ", $busqueda);

    $consulta = "SELECT * FROM producto WHERE ";
    $filtros = [];

    foreach ($palabras as $palabra) {
        $filtros[] = "PRODUCTO_DESCRIPCION LIKE '%" . $conexion->real_escape_string($palabra) . "%'";
    }

    $consulta .= implode(" AND ", $filtros);

    $result = $conexion->query($consulta);

    $productos = [];
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }

    echo json_encode($productos);
}
?>
