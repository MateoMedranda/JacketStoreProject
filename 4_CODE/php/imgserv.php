<?php
    include("conexion.php");
    $consulta = "select MIN(IMAGEN_ID) as IMAGEN_ID, IMAGEN_CONTENIDO, PRODUCTO_ID from imagen group by PRODUCTO_ID";
    $resultado = mysqli_query($conexion,$consulta);

    if($resultado){
        $fotos = $resultado->fetch_all(MYSQLI_ASSOC);
        echo json_encode($fotos);
    }else {
        echo json_encode(["error" => "Error en la consulta"]);
    }
?>