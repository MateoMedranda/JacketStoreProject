let listaProductos = [];  // Inicializamos la lista de productos
let listaAuxiliar = [];

// Realizamos la solicitud fetch y procesamos la respuesta
fetch(`../../php/mostrar.php`)
  .then(response => response.json())  // Convertimos la respuesta a formato JSON
  .then(data => {
    console.log("Datos recibidos:", data);
    
    // Verificamos si hubo un error en la respuesta
    if (data.error) {
      console.error("Error en la respuesta del servidor:", data.error);
    } else {
      listaProductos = data;  // Guardamos los productos en la lista
      listaAuxiliar = data;
      
      // Solo después de recibir los datos, accedemos a los productos
      almacenarProductosEnLocalStorage();
      actualizarElementosHTML();
    }
  })
  .catch(error => {
    alert('Error al obtener los datos:', error);
  });

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
