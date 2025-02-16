<?php

if (isset($_POST['producto_id'])) {
    include("../conexion.php");
    $producto_id = intval($_POST['producto_id']);

    $query = "SELECT * FROM producto WHERE PRODUCTO_ID = $producto_id";
    $result = $conexion->query($query);

    if ($result->num_rows > 0) {
        $producto = $result->fetch_assoc();

        $producto["Talla"] = explode(",", $producto["tallas"]);
        $producto["cantidades"] = json_decode($producto["cantidades"], true);

        echo json_encode($producto);
    } else {
        echo json_encode(["error" => "Producto no encontrado"]);
    }
}

?>