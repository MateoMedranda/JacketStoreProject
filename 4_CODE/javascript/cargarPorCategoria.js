let listaProductos = [];
let listaImagenes = [];
let listaImagenesCompleto = [];

// 🔹 Obtener la categoría desde la URL
function obtenerCategoriaDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("categoria"); // Devuelve el ID de la categoría como string

}

// 🔹 Proceso fetch para recuperar imágenes y productos según la categoría
Promise.all([
  fetch(`../../php/imgserv.php`).then(response => response.json()), // Imágenes
  fetch(`../../php/mostrar.php`).then(response => response.json())  // Productos
])
  .then(([dataImagenes, dataProductos]) => {
    if (!Array.isArray(dataImagenes) || !Array.isArray(dataProductos)) {
      console.error("Error: Datos recibidos no son arrays", { dataImagenes, dataProductos });
      return;
    }

    listaImagenes = dataImagenes;
    listaImagenesCompleto = dataImagenes;
    listaProductos = dataProductos;

    // Filtrar productos por categoría antes de mostrarlos
    const categoriaSeleccionada = obtenerCategoriaDesdeURL();
    if (categoriaSeleccionada) {
        
      listaProductos = listaProductos.filter(
        producto => String(producto.ID_CATEGORIA) === String(categoriaSeleccionada)
      );

      
    }

    mostrarProductosUnicosConTallas();
  })
  .catch(error => console.error("Error en una de las solicitudes:", error));

// 🔹 Asociar imagen con producto
function asociarImagen(productoID) {
  let imagenEncontrada = listaImagenes.find(foto => foto.PRODUCTO_ID === productoID);
  return imagenEncontrada ? imagenEncontrada.IMAGEN_CONTENIDO : "ruta/default.jpg";
}

// 🔹 Mostrar productos filtrados por categoría
function mostrarProductosUnicosConTallas() {
  const productosMap = {};

  listaProductos.forEach(producto => {
    if (producto.PRODUCTO_ESTADO === "publicado") {
      if (!productosMap[producto.PRODUCTO_DESCRIPCION]) {
        productosMap[producto.PRODUCTO_DESCRIPCION] = {
          id: producto.PRODUCTO_ID,
          descripcion: producto.PRODUCTO_DESCRIPCION,
          precio: producto.PRODUCTO_PRECIO,
          descuento: producto.PRODUCTO_DESCUENTO || 0,
          imagen: asociarImagen(producto.PRODUCTO_ID),
          estado: producto.PRODUCTO_ESTADO,
          tallas: []
        };
      }
      productosMap[producto.PRODUCTO_DESCRIPCION].tallas.push(producto.PRODUCTO_TALLA);
    }
  });

  const productosUnicos = Object.values(productosMap);
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = productosUnicos.map(producto => {
    let precioOriginal = Number(producto.precio) || 0;
    let precioConDescuento = (precioOriginal * (1 - Number(producto.descuento) / 100)).toFixed(2);

    return `
      <div class="u-align-center u-container-style u-grey-10 u-products-item u-repeater-item"
        style="padding: 10px;">
        <a onclick="prueba(${producto.id})" href="producto.html"
          style="color:black; text-decoration: none; display: block; overflow: hidden;">
          <div>
            <img alt="Imagen de ${producto.descripcion}"
              class="u-expanded-width u-image u-image-contain u-image-default u-product-control"
              src="${producto.imagen}" 
              style="width: 100%; max-height: 250px; object-fit: contain;">
            <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; 
                      max-width: 100%; display: block; font-size: 16px; 
                      font-weight: bold; margin: 5px 0 0 0; text-align: center;">
              ${producto.descripcion}
            </p>
            <p style="text-align: center; margin: 5px 0; font-size: 14px; color: #555;">
              Tallas disponibles: ${producto.tallas.join(", ")}
            </p>
            <div class="u-align-center u-product-control u-product-price u-product-price-1"
              style="text-align: center; padding: 5px 0 0 0;">
              <div class="u-price-wrapper u-spacing-10">
                ${producto.descuento > 0 ?
        `<div class="u-old-price"
                    style="text-decoration: line-through !important; color: #888; font-size: 14px;">
                    $${precioOriginal.toFixed(2)}
                  </div>` : ""}
                <div class="u-price" style="font-size: 1.25rem; font-weight: 600; color: #17a400;">
                  $${producto.descuento > 0 ? precioConDescuento : precioOriginal.toFixed(2)}
                </div>
              </div>
              <p style="margin: 2px 0 0 0; font-size: 18px; color: #555;">Comprar ahora</p>
            </div>
          </div>
        </a>
      </div>
    `;
  }).join("");
}

// 🔹 Guardar producto seleccionado en LocalStorage
function prueba(id) {
  let productoSelect = listaProductos.find(producto => String(producto.PRODUCTO_ID) === String(id));
  let imagenselect = listaImagenes.filter(foto => foto.PRODUCTO_ID === productoSelect.PRODUCTO_ID)
                                   .map(foto => foto.IMAGEN_CONTENIDO);

  if (productoSelect) {
    localStorage.setItem("productoSelec", JSON.stringify(productoSelect));
    localStorage.setItem("imagenSelect", JSON.stringify(imagenselect.length ? imagenselect : ["ruta/default.jpg"]));
  } else {
    console.log("Producto no encontrado");
  }
}
