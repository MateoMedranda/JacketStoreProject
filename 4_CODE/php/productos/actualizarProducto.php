<?php
if (isset($_POST['descripcion'])) {
    include("../conexion.php");

    $producto_des = $_POST['descripcion'];
    $precio = $_POST['precio'];
    $descuento = $_POST['descuento'];

    $registro = "UPDATE producto SET 
                PRODUCTO_PRECIO= '$precio', 
                PRODUCTO_DESCUENTO= '$descuento', 
                PRODUCTO_ESTADO= 'publicado'
              WHERE PRODUCTO_DESCRIPCION= '$producto_des'";

    if (!mysqli_query($conexion, $registro)) {
        die('❌ No se pudo agregar el registro: ' . mysqli_error($conexion));
    }
}

header('Location:../../NicePage/Empresa/Productos.html');
?>
