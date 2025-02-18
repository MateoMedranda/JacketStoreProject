let listaProductos = [];
let listaAuxiliar = [];
let listaImagenes = [];
let listaImagenesCompleto=[];

//Proceso fetch para recuperar las imagenes del servidor (solo la primera imagen de cada producto)
Promise.all([
  fetch(`../../php/imgserv.php`).then(response => response.json()), // Recuperar imágenes
  fetch(`../../php/mostrar.php`).then(response => response.json())  // Recuperar productos
])
  .then(([dataImagenes, dataProductos]) => {
    // Procesar imágenes
    if (dataImagenes.error) {
      console.log("Error al obtener imágenes:", dataImagenes.error);
    } else {
      listaImagenes = dataImagenes;
      listaImagenesCompleto = dataImagenes;
    }

    // Procesar productos
    if (dataProductos.error) {
      console.error("Error al obtener productos:", dataProductos.error);
    } else {
      listaProductos = dataProductos;
      mostrarProductosUnicosConTallas(); // Mostrar productos en el HTML
      almacenarProductosEnLocalStorage(); // Guardar productos en localStorage
      actualizarElementosHTML(); // Actualizar elementos HTML si es necesario
    }
  })
  .catch(error => {
    console.error("Error en una de las solicitudes:", error);
  });


//Función para obtener las imagenes de cada producto
function asociarImagen(producto)//Recibe el id del producto
{
	let direccion="";//Crea una direccion de la imagen vacia
	listaImagenes.forEach( foto =>{//recorre la tabla de imagenes
		console.log(foto.IMAGEN_CONTENIDO);
		if(producto == foto.PRODUCTO_ID)//Si el id del producto esta vinculado a una imagen
			{
				direccion = foto.IMAGEN_CONTENIDO;//Toma la direccion de esa imagen
				console.log(direccion);
			}	
	});
	return direccion;//Devuelve la direccion
}


function encontrarImagenes(producto) {
  if (!Array.isArray(listaImagenes)) {
    alert("Error: listaImagenes no está definida o no es un array.");
    return ["ruta/default.jpg"]; // Devuelve una imagen por defecto en caso de error
  }

  let direcciones = listaImagenes
      .filter(foto => foto.PRODUCTO_ID === producto)
      .map(foto => foto.IMAGEN_CONTENIDO);

  return direcciones.length > 0 ? direcciones : ["ruta/default.jpg"];
}


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
    if (producto.PRODUCTO_ESTADO == "publicado") {

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
  contenedor.innerHTML = "";

  console.log(productosUnicos);

  contenedor.innerHTML = productosUnicos.map(producto => {
    let precioOriginal = Number(producto.precio) || 0;
    let precioConDescuento = (precioOriginal * (1 - Number(producto.descuento) / 100)).toFixed(2);
    precioOriginal = precioOriginal.toFixed(2);


    if (producto.estado == "publicado") {
      return `
      <div class="u-align-center u-container-align-center u-container-style u-grey-10 u-products-item u-repeater-item"
        style="padding: 10px;">
        <a onclick="prueba(${producto.id})" href="producto.html"
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

function prueba(id) {
  let productoSelect = listaProductos.find(producto => String(producto.PRODUCTO_ID) === String(id));
  let imagenselect = encontrarImagenes(productoSelect.PRODUCTO_ID);

 
   
  if (imagenselect) {
    console.log("Producto encontrado:"+ productoSelect.PRODUCTO_DESCRIPCION);
    localStorage.setItem("imagenSelect", JSON.stringify(imagenselect));
    

  } else {
    alert("Producto no encontrado");
  }



  if (productoSelect) {
    console.log("Producto encontrado:"+ productoSelect.PRODUCTO_DESCRIPCION);
    localStorage.setItem("productoSelec", JSON.stringify(productoSelect));
    

  } else {
    console.log("Producto no encontrado");
  }
  

}
