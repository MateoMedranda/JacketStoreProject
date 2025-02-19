<?php

include("../conexion.php");
$consulta = 'select * from categoria';
$resultado = mysqli_query($conexion,$consulta);

if($resultado){
    $datos = $resultado->fetch_all(MYSQLI_ASSOC);
    echo json_encode($datos);
}else {
    echo json_encode(["error" => "Error en la consulta"]);
}

?>