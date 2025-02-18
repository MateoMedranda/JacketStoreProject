<?php
if (isset($_POST['idProducto'])) {
    include("../conexion.php");

    $producto_id = intval($_POST['idProducto']);
    $descripcion = $_POST['descripcion'];
    $material = $_POST['material'];
    $color = $_POST['color'];
    $talla = $_POST['tallaA'];
    $cantidades = $_POST['cantidadA'];

    $registro = "UPDATE producto SET 
                PRODUCTO_DESCRIPCION= '$descripcion', 
                PRODUCTO_MATERIAL= '$material', 
                PRODUCTO_COLOR= '$color', 
                PRODUCTO_TALLA= '$talla', 
                PRODUCTO_STOCK= '$cantidades'
              WHERE PRODUCTO_ID= '$producto_id'";

    if (!mysqli_query($conexion, $registro)) {
        die('❌ No se pudo agregar el registro: ' . mysqli_error($conexion));
    }
}

header('Location:../../NicePage/Empresa/inventario.php');
?>
