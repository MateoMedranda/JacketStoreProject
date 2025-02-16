<?php
if (isset($_POST['idProducto'])) {
    include("../conexion.php");

    $producto_id = intval($_POST['idProducto']);
    $precio = $_POST['precio'];
    $descuento = $_POST['descuento'];

    $registro = "UPDATE producto SET 
                PRODUCTO_PRECIO= '$precio', 
                PRODUCTO_DESCUENTO= '$descuento', 
                PRODUCTO_ESTADO= 'publicado'
              WHERE PRODUCTO_ID= '$producto_id'";

    if (!mysqli_query($conexion, $registro)) {
        die('❌ No se pudo agregar el registro: ' . mysqli_error($conexion));
    }
}

header('Location:../../NicePage/Empresa/Productos.html');
?>
