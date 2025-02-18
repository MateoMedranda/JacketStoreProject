<?php
    include("conexion.php");
    $consulta = "select * from imagen ";
    $resultado = mysqli_query($conexion,$consulta);

    if($resultado){
        $fotos = $resultado->fetch_all(MYSQLI_ASSOC);
        echo json_encode($fotos);
    }else {
        echo json_encode(["error" => "Error en la consulta"]);
    }
?>