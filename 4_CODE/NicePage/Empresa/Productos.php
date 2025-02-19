<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: ../../NicePage/InicioTiendaVirtual/login.html"); 
    exit();
}

$nombre = $_SESSION['usuario']['nombre'];
$apellido = $_SESSION['usuario']['apellido'];
?>

<!DOCTYPE html>
<html style="font-size: 16px;" lang="es">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="utf-8">
  <meta name="keywords" content="Inventario">
  <meta name="description" content="">
  <title>Productos</title>
  <link rel="stylesheet" href="nicepage.css" media="screen">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="Productos.css" media="screen">
  <script class="u-script" type="text/javascript" src="jquery.js" defer=""></script>
  <script class="u-script" type="text/javascript" src="nicepage.js" defer=""></script>
  <meta name="generator" content="Nicepage 7.3.1, nicepage.com">



  <link id="u-theme-google-font" rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
  <script type="application/ld+json">{
		"@context": "http://schema.org",
		"@type": "Organization",
		"name": "",
		"logo": "images/logotipo-Photoroom-removebg-preview.png"
}</script>
  <meta name="theme-color" content="#478ac9">
  <meta property="og:title" content="Productos">
  <meta property="og:type" content="website">
  <meta data-intl-tel-input-cdn-path="intlTelInput/">
</head>

<body data-path-to-root="./" data-include-products="false" class="u-body u-xl-mode" data-lang="es"
  style="background-image: url(../../imagenes/fondoProductos.jpg);">
  <header class="shadow u-clearfix u-grey-15 u-header u-header" id="header">
    <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-xl u-sheet-1">
      <a href="#" class="u-image u-logo u-image-1" data-image-width="519" data-image-height="481">
        <img src="images/logotipo-Photoroom-removebg-preview.png" class="u-logo-image u-logo-image-1">
      </a>
      <span class="u-icon u-text-palette-1-base u-icon-1"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice"
          viewBox="0 0 55 55" style="">
          <use xlink:href="#svg-3b78"></use>
        </svg><svg class="u-svg-content" viewBox="0 0 55 55" x="0px" y="0px" id="svg-3b78"
          style="enable-background:new 0 0 55 55;">
          <path d="M55,27.5C55,12.337,42.663,0,27.5,0S0,12.337,0,27.5c0,8.009,3.444,15.228,8.926,20.258l-0.026,0.023l0.892,0.752
	c0.058,0.049,0.121,0.089,0.179,0.137c0.474,0.393,0.965,0.766,1.465,1.127c0.162,0.117,0.324,0.234,0.489,0.348
	c0.534,0.368,1.082,0.717,1.642,1.048c0.122,0.072,0.245,0.142,0.368,0.212c0.613,0.349,1.239,0.678,1.88,0.98
	c0.047,0.022,0.095,0.042,0.142,0.064c2.089,0.971,4.319,1.684,6.651,2.105c0.061,0.011,0.122,0.022,0.184,0.033
	c0.724,0.125,1.456,0.225,2.197,0.292c0.09,0.008,0.18,0.013,0.271,0.021C25.998,54.961,26.744,55,27.5,55
	c0.749,0,1.488-0.039,2.222-0.098c0.093-0.008,0.186-0.013,0.279-0.021c0.735-0.067,1.461-0.164,2.178-0.287
	c0.062-0.011,0.125-0.022,0.187-0.034c2.297-0.412,4.495-1.109,6.557-2.055c0.076-0.035,0.153-0.068,0.229-0.104
	c0.617-0.29,1.22-0.603,1.811-0.936c0.147-0.083,0.293-0.167,0.439-0.253c0.538-0.317,1.067-0.648,1.581-1
	c0.185-0.126,0.366-0.259,0.549-0.391c0.439-0.316,0.87-0.642,1.289-0.983c0.093-0.075,0.193-0.14,0.284-0.217l0.915-0.764
	l-0.027-0.023C51.523,42.802,55,35.55,55,27.5z M2,27.5C2,13.439,13.439,2,27.5,2S53,13.439,53,27.5
	c0,7.577-3.325,14.389-8.589,19.063c-0.294-0.203-0.59-0.385-0.893-0.537l-8.467-4.233c-0.76-0.38-1.232-1.144-1.232-1.993v-2.957
	c0.196-0.242,0.403-0.516,0.617-0.817c1.096-1.548,1.975-3.27,2.616-5.123c1.267-0.602,2.085-1.864,2.085-3.289v-3.545
	c0-0.867-0.318-1.708-0.887-2.369v-4.667c0.052-0.52,0.236-3.448-1.883-5.864C34.524,9.065,31.541,8,27.5,8
	s-7.024,1.065-8.867,3.168c-2.119,2.416-1.935,5.346-1.883,5.864v4.667c-0.568,0.661-0.887,1.502-0.887,2.369v3.545
	c0,1.101,0.494,2.128,1.34,2.821c0.81,3.173,2.477,5.575,3.093,6.389v2.894c0,0.816-0.445,1.566-1.162,1.958l-7.907,4.313
	c-0.252,0.137-0.502,0.297-0.752,0.476C5.276,41.792,2,35.022,2,27.5z"></path>
        </svg></span>
      <nav class="u-menu u-menu-one-level u-offcanvas u-menu-1">
        <div class="menu-collapse" style="font-size: 1rem; letter-spacing: 0px;">
          <a class="u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-top-bottom-menu-spacing u-hamburger-link u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base u-hamburger-link-1"
            href="#">
            <svg class="u-svg-link" viewBox="0 0 24 24">
              <use xlink:href="#menu-hamburger"></use>
            </svg>
            <svg class="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px"
              xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
              <g>
                <rect y="1" width="16" height="2"></rect>
                <rect y="7" width="16" height="2"></rect>
                <rect y="13" width="16" height="2"></rect>
              </g>
            </svg>
          </a>
        </div>
        <div class="u-custom-menu u-nav-container">
          <ul class="u-nav u-unstyled u-nav-1">
            <li class="u-nav-item"><a
                class="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="./"
                style="padding: 10px 20px;">Inicio</a>
            </li>
            <li class="u-nav-item"><a
                class="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
                href="inventario.php" style="padding: 10px 20px;">Inventario</a>
            </li>
            <li class="u-nav-item"><a
                class="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
                href="Productos.php" style="padding: 10px 20px;">Productos</a>
            </li>
          </ul>
        </div>
        <div class="u-custom-menu u-nav-container-collapse">
          <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
            <div class="u-inner-container-layout u-sidenav-overflow">
              <div class="u-menu-close"></div>
              <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2">
                <li class="u-nav-item"><a class="u-button-style u-nav-link" href="./">Inicio</a>
                </li>
                <li class="u-nav-item"><a class="u-button-style u-nav-link" href="inventario.php">Inventario</a>
                </li>
                <li class="u-nav-item"><a class="u-button-style u-nav-link" href="Productos.php">Productos</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
        </div>
      </nav>
      <i><p id="nombreUser" class="u-text u-text-default u-text-1"><?php echo $nombre . ' ' . $apellido; ?></p></i>
      <span class="u-file-icon u-icon u-icon-2 btn"><a href="../../php/ingreso/logout.php"><img src="images/906811.png" alt=""></a></span>
    </div>
  </header>
  <section class="u-clearfix u-section-1" id="block-2">
    <div class="u-clearfix u-sheet u-sheet-1">
      <h2 class="u-text u-text-default u-text-1"><b>Lista de productos</b></h2>
      <div class="u-container-style u-expanded-width u-group u-palette-2-light-3 u-group-1 shadow">
        <div class="m-3 col-6 align-content-center justify-content-center">
          <div class="d-flex align-items-center">
            <label class="form-label fw-bold col-2">Buscar productos:</label>
            <select id="tipoBusqueda" class="form-select shadow w-50" onchange="buscarPor()">
              <option value="0">Selecciona una opción</option>
              <option value="1">Disponibles</option>
              <option value="2">Por agotarse</option>
              <option value="3">Agotados</option>
              <option value="4">Por nombre</option>
              <option value="5">Pendientes</option>
              <option value="6">Publicados</option>
            </select>
            <input type="text" id="buscar" class="form-control w-50 shadow" style="margin-left: 4%;" onkeypress="buscarPorNombre()" placeholder="Ej: Chompa Jean">
          </div>
        </div>
      </div>
      <div class="u-container-style u-expanded-width u-group u-white u-group-2 shadow">
        <div class="u-container-layout u-container-layout-2">
          <div class="u-expanded-width u-table u-table-responsive u-table-1">
            <table class="u-table-entity" id="tablaProductos">
              <colgroup>
                <col width="5.8%">
                <col width="18.1%">
                <col width="10.3%">
                <col width="7.7%">
                <col width="7.7%">
                <col width="15.1%">
                <col width="10.7%">
                <col width="6.9%">
                <col width="17.7%">
              </colgroup>
              <thead class="u-align-center u-table-header u-white u-table-header-1">
                <tr style="height: 21px;">
                  <th class="u-border-2 u-border-black u-border-no-left u-border-no-right u-table-cell">Id</th>
                  <th class="u-border-2 u-border-black u-border-no-left u-border-no-right u-table-cell">Descripción</th>
                  <th class="u-border-2 u-border-black u-border-no-left u-border-no-right u-table-cell">Stock</th>
                  <th class="u-border-2 u-border-black u-border-no-left u-border-no-right u-table-cell">Precio</th>
                  <th class="u-border-2 u-border-black u-border-no-left u-border-no-right u-table-cell">Descuento</th>
                  <th class="u-border-2 u-border-black u-border-no-left u-border-no-right u-table-cell">Categoría</th>
                  <th class="u-border-2 u-border-black u-border-no-left u-border-no-right u-table-cell">Disponibilidad
                  </th>
                  <th class="u-border-2 u-border-black u-border-no-left u-border-no-right u-table-cell">Estado</th>
                  <th class="u-border-2 u-border-black u-border-no-left u-border-no-right u-table-cell"></th>
                </tr>
              </thead>
              <tbody class="u-table-alt-grey-10 u-table-body text-center">

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <dialog id="editar" class="w-50 mt-5 p-4 border rounded shadow">
    <h3 class="text-center bg-dark bg-gradient text-white">Producto</h3>

    <form id="productoForm" method="post" action="../../php/productos/actualizarProducto.php">
      <div class="row">
        <input type="number" id="idProducto" name="idProducto" style="display: none;">

        <div class="col-md-7">
          <div class="mb-3 row">
            <label class="form-label fw-bold">Descripción del producto:</label>
            <textarea id="descripcion" name="descripcion" class="form-control shadow" rows="3"
              placeholder="Ej: descripción breve, nombre del producto" required readonly></textarea>
          </div>
          <div class="row mb-3">
            <label class="form-label fw-bold">Categoría del producto:</label>
            <select id="categorias" name="categorias" class="form-control form-select shadow border-info">
            
            </select>
          </div>
        </div>

        <div class="col-md-4 mt-3">
          <div class="d-flex flex-wrap shadow p-3">
            <div id="actualizarForm" class="col-9">
              <label class="form-label" for="tallaA">Tallas</label>
              <input id="tallaA" name="tallaA" type="text" class="form-control border-black" readonly>
              <br>
              <label class="form-label" for="cantidadA">Cantidad Total</label>
              <input id="cantidadA" name="cantidadA" type="number" class="w-50" placeholder="Ej: 23" readonly>
            </div>
          </div>
        </div>

      </div>

      <div class="row mt-4">
        <div class="col-3">
          <label class="form-label fw-bold">Precio ($):</label>
          <div class="d-flex">
            <input id="precio" step="0.01" min="0" name="precio" type="number" class="w-75 shadow border-info" placeholder="Ej: 23.35">
          </div>
        </div>
        <div class="col-3">
          <label class="form-label fw-bold">Descuento (%):</label>
          <div class="d-flex">
            <input id="descuento" name="descuento" type="number" class="w-75 shadow border-info" placeholder="Ej: 20" >
          </div>
        </div>
      </div>

      <div class="text-center mt-4">
        <button type="submit" class="btn btn-warning" id="actualizar">Publicar</button>
        <button type="reset" class="btn btn-danger" onclick="cerrarEditar()">Cancelar</button>
      </div>
    </form>
  </dialog>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
  <script src="../../javascript/Empresa/inventario2.js"></script>

</body>

</html>