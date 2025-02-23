<?php
if (isset($_POST['cadena'])) {
    include("../conexion.php");

    $busqueda = $_POST['cadena'];

    $consulta = "SELECT * FROM usuario WHERE $busqueda";

    $result = $conexion->query($consulta);

    $productos = [];
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }

    echo json_encode($productos);
}
?>
