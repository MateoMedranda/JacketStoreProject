let listaProductos = [];
let listaAuxiliar = [];

// Realizamos la solicitud fetch y procesamos la respuesta
fetch(`../../php/mostrar.php`)
  .then(response => response.json())  // Convertimos la respuesta a formato JSON
  .then(data => {
    console.log("Datos recibidos:", data);

    if (data.error) {
      console.error("Error en la respuesta del servidor:", data.error);
    } else {
      listaProductos = data;  // Guardamos los productos en la lista
      listaAuxiliar = data;

      mostrarProductosUnicosConTallas();
      almacenarProductosEnLocalStorage();
      actualizarElementosHTML();
    }
  })
  .catch(error => console.error("Error en la solicitud fetch:", error));

// Función para almacenar productos en el localStorage
function almacenarProductosEnLocalStorage() {
  if (listaProductos.length >= 5) {
    // Guardamos los productos en localStorage si hay suficientes productos
    localStorage.setItem("producto-one", JSON.stringify(listaProductos[0]));
    localStorage.setItem("producto-two", JSON.stringify(listaProductos[1]));
    localStorage.setItem("producto-three", JSON.stringify(listaProductos[2]));
    localStorage.setItem("producto-four", JSON.stringify(listaProductos[3]));
    localStorage.setItem("producto-five", JSON.stringify(listaProductos[4]));
  }
}

// Función para actualizar los elementos HTML
function actualizarElementosHTML() {
  // Recuperamos los productos del localStorage y actualizamos el HTML
  const productoOne = JSON.parse(localStorage.getItem("producto-one"));
  const productoTwo = JSON.parse(localStorage.getItem("producto-two"));
  const productoThree = JSON.parse(localStorage.getItem("producto-three"));
  const productoFour = JSON.parse(localStorage.getItem("producto-four"));
  const productoFive = JSON.parse(localStorage.getItem("producto-five"));

  if (productoOne && document.getElementById("producto-one")) {
    document.getElementById("producto-one").textContent = productoOne.PRODUCTO_DESCRIPCION;
  }
  if (productoTwo && document.getElementById("producto-two")) {
    document.getElementById("producto-two").textContent = productoTwo.PRODUCTO_DESCRIPCION;
  }
  if (productoThree && document.getElementById("producto-three")) {
    document.getElementById("producto-three").textContent = productoThree.PRODUCTO_DESCRIPCION;
  }
  if (productoFour && document.getElementById("producto-four")) {
    document.getElementById("producto-four").textContent = productoFour.PRODUCTO_DESCRIPCION;
  }
  if (productoFive && document.getElementById("producto-five")) {
    document.getElementById("producto-five").textContent = productoFive.PRODUCTO_DESCRIPCION;
  }
}

function mostrarProductosUnicosConTallas() {
  const productosMap = {};

  listaProductos.forEach(producto => {
    if (!productosMap[producto.PRODUCTO_DESCRIPCION]) {
      productosMap[producto.PRODUCTO_DESCRIPCION] = {
        descripcion: producto.PRODUCTO_DESCRIPCION,
        precio: producto.PRODUCTO_PRECIO,
        descuento: producto.PRODUCTO_DESCUENTO || 0,
        imagen: producto.PRODUCTO_IMAGEN || "imagenes/default.jpg",
        estado: producto.PRODUCTO_ESTADO,
        tallas: []
      };
    }
    productosMap[producto.PRODUCTO_DESCRIPCION].tallas.push(producto.PRODUCTO_TALLA);
  });

  const productosUnicos = Object.values(productosMap);

  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  contenedor.innerHTML = productosUnicos.map(producto => {
    let precioOriginal = Number(producto.precio) || 0;
    let precioConDescuento = (precioOriginal * (1 - Number(producto.descuento) / 100)).toFixed(2);
    precioOriginal = precioOriginal.toFixed(2);

    if (producto.estado == "publicado") {
      return `
      <div class="u-align-center u-container-align-center u-container-style u-grey-10 u-products-item u-repeater-item"
        style="padding: 10px;">
        <a onclick="prueba('one')" href="producto.html"
          style="color:black; text-decoration: none; display: block; overflow: hidden;">
          <div>
            <!-- Imagen del producto -->
            <img alt="Imagen de ${producto.descripcion}"
              class="u-expanded-width u-image u-image-contain u-image-default u-product-control"
              src="${producto.imagen}" 
              style="width: 100%; max-height: 250px; object-fit: contain;">

            <!-- Nombre del producto -->
            <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; 
                      max-width: 100%; display: block; font-size: 16px; 
                      font-weight: bold; margin: 5px 0 0 0; text-align: center;">
              ${producto.descripcion}
            </p>

            <!-- Tallas disponibles -->
            <p style="text-align: center; margin: 5px 0; font-size: 14px; color: #555;">
              Tallas disponibles: ${producto.tallas.join(", ")}
            </p>

            <!-- Precio del producto -->
            <div class="u-align-center u-product-control u-product-price u-product-price-1"
              style="text-align: center; padding: 5px 0 0 0;">
              <div class="u-price-wrapper u-spacing-10">
                ${producto.descuento > 0 ?
          `<div class="u-old-price"
                    style="text-decoration: line-through !important; color: #888; font-size: 14px;">
                    $${precioOriginal}
                  </div>`
          : ""}

                <div class="u-price" style="font-size: 1.25rem; font-weight: 600; color: #17a400;">
                  $${producto.descuento > 0 ? precioConDescuento : precioOriginal}
                </div>
              </div>
              <p style="margin: 2px 0 0 0; font-size: 18px; color: #555;">Comprar ahora</p>
            </div>
          </div>
        </a>
      </div>
    `;
    }

  }).join("");
}

// Función para manejar la selección de productos
function prueba(id) {
  let productoSelec = null;

  // Dependiendo del id, seleccionamos el producto adecuado
  switch (id) {
    case "one":
      productoSelec = JSON.parse(localStorage.getItem("producto-one"));
      break;
    case "two":
      productoSelec = JSON.parse(localStorage.getItem("producto-two"));
      break;
    case "three":
      productoSelec = JSON.parse(localStorage.getItem("producto-three"));
      break;
    case "four":
      productoSelec = JSON.parse(localStorage.getItem("producto-four"));
      break;
    case "five":
      productoSelec = JSON.parse(localStorage.getItem("producto-five"));
      break;
    default:
      console.log("Producto no encontrado");
  }

  // Si el producto fue encontrado, lo almacenamos en localStorage
  if (productoSelec) {
    localStorage.setItem("productoSelec", JSON.stringify(productoSelec));
  }
}
