<?php
session_start();
session_destroy();
header("Location: ../../NicePage/InicioTiendaVirtual/login.html");
exit();
?>
