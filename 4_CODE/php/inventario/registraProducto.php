<?php
$allowedtypes= array("image/jpg","image/jpeg","image/png");
$descripcion = !empty($_POST['descripcion'])? $_POST['descripcion']:'';
$material = !empty($_POST['material'])? $_POST['material']:'';
$color = !empty($_POST['color'])? $_POST['color']:'';
if(isset($_FILES["imagen"])){
	echo("Imagenes detectadas<br>");
	$mfiles=$_FILES["imagen"];
}
else
{
	echo("No hay imagenes");
}

if (isset($_POST['opciones']) && isset($_POST['cantidades'])) {
    $tallas = $_POST['opciones'];  
    $cantidades = $_POST['cantidades']; 
    include("../conexion.php");

    for ($i = 0; $i < count($tallas); $i++) {

        echo "<h3>Datos Recibidos:</h3>";
    echo "<strong>Descripción:</strong> " . htmlspecialchars($descripcion) . "<br>";
    echo "<strong>Material:</strong> " . htmlspecialchars($material) . "<br>";
    echo "<strong>Color:</strong> " . htmlspecialchars($color) . "<br>";
    echo "<h3>Detalles de productos:</h3>";
        
        $registro = "insert into producto(PRODUCTO_DESCRIPCION,PRODUCTO_MATERIAL,PRODUCTO_COLOR,PRODUCTO_STOCK,PRODUCTO_TALLA,PRODUCTO_ESTADO,PRODUCTO_PRECIO,PRODUCTO_DESCUENTO) values('$descripcion','$material','$color','$cantidades[$i]','$tallas[$i]','pendiente','0','0')";
		echo("producto registrado <br>");
        if (!mysqli_query($conexion, $registro)) {
            die('❌ No se pudo agregar el registro: ' . mysqli_error($conexion));
        }
		
		if(isset($mfiles))
		{
			echo("Imagenes listas<br>");
			$prodnum=mysqli_insert_id($conexion);
			if(!is_dir("../../imagenes/Producto".$prodnum))
				{
					mkdir("../../imagenes/Producto".$prodnum);
				}
				$fi = new FilesystemIterator('../../imagenes/Producto'.$prodnum);
				$imgnum=iterator_count($fi)+1;
				$x=count($mfiles["name"]);
				echo($x." imagenes");
				for($j=0;$j<$x;$j++){
					echo("Procesando imagen".$j."<br>");
					$filename=$mfiles["name"][$j];
					$filetype=$mfiles["type"][$j];
					echo($filetype."<br>");
					if(!in_array($filetype, $allowedtypes))
					{
						echo("Archivo incorrecto, extension invalida para el archivo $filename. Es tipo $filetype <br>");
					}
					else{
						$extension=".png";
						$filelocation="../../imagenes/Producto".$prodnum."/img".$imgnum.$extension;
						$filelocation=(string)$filelocation;
						move_uploaded_file($mfiles["tmp_name"][$j],$filelocation);
						echo("subida exitosa de la imagen".$filelocation);
						$insercion="INSERT INTO imagen(PRODUCTO_ID, IMAGEN_CONTENIDO) VALUES ('$prodnum','$filelocation')";
						if(!mysqli_query($conexion,$insercion))
							{
							echo("Error de insercion<br>");
							}
						$imgnum++;
						}
					}
		}
    }
}

header('Location:../../NicePage/Empresa/inventario.php');
?>