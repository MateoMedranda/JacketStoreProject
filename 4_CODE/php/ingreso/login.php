<?php
	include('../conexion.php');
	$usuario=$_POST['user'];
	$clave=$_POST['pasword'];
	$consulta="select * from usuario where USUARIO_CORREO='$usuario' and USUARIO_CLAVE='$clave'";
	$resultado=mysqli_query($conexion,$consulta);
	$fila=mysqli_fetch_assoc($resultado);
	if($fila)
	{
		echo("Usuario hallado<br>");
		$rol=(int)$fila['ROL_ID'];
		echo($rol);
		switch ($rol)
		{
			case 1:
				header('Location: ../../NicePage/Empresa/index.html');
			break;
			case 2:
				header('Location: ../../NicePage/Empresa/Inventario.html');
			break;
			case 3:
				header('Location: ../../NicePage/InicioTiendaVirtual/index.html');
			break;
		}
	}
else{
	header('Location: ../../NicePage/InicioTiendaVirtual/loginerror.html');
}
?>