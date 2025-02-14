<?php
$descripcion = !empty($_POST['descripcion'])? $_POST['descripcion']:'';
$material = !empty($_POST['material'])? $_POST['material']:'';
$color = !empty($_POST['color'])? $_POST['color']:'';

if (isset($_POST['opciones']) && isset($_POST['cantidades'])) {
    $tallas = $_POST['opciones'];  
    $cantidades = $_POST['cantidades']; 
    include("conexion.php");

    for ($i = 0; $i < count($tallas); $i++) {

        echo "<h3>Datos Recibidos:</h3>";
    echo "<strong>Descripción:</strong> " . htmlspecialchars($descripcion) . "<br>";
    echo "<strong>Material:</strong> " . htmlspecialchars($material) . "<br>";
    echo "<strong>Color:</strong> " . htmlspecialchars($color) . "<br>";
    echo "<h3>Detalles de productos:</h3>";
        
        $registro = <<<FIN
        insert into producto(PRODUCTO_DESCRIPCION,PRODUCTO_MATERIAL,PRODUCTO_COLOR,PRODUCTO_STOCK,PRODUCTO_TALLA,PRODUCTO_ESTADO,PRODUCTO_PRECIO,PRODUCTO_DESCUENTO)
        values('$descripcion','$material','$color','$cantidades[$i]','$tallas[$i]','pendiente','0','0')
        FIN;
        if (!mysqli_query($conexion, $registro)) {
            die('❌ No se pudo agregar el registro: ' . mysqli_error($conexion));
        }
    }
}

header('Location:../NicePage/Empresa/inventario.html');
?>