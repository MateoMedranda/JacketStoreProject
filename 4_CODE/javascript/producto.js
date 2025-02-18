let produselec =JSON.parse(localStorage.getItem("productoSelec"));
let imagenselec=JSON.parse(localStorage.getItem("imagenSelect"));


function cargarImagenes() {
  let carouselInner = document.getElementById("carousel-inner");
  carouselInner.innerHTML = ""; // Limpiar antes de agregar

  imagenselec.forEach((imgSrc, index) => {
      let isActive = index === 0 ? "active" : ""; // La primera imagen es activa
      carouselInner.innerHTML += `
          <div class="carousel-item ${isActive}">
              <img src="${imgSrc}" class="d-block w-100" alt="Imagen ${index + 1}">
          </div>
      `;
  });
}

cargarImagenes();

//Toma de ids

let costoseleccionado= document.getElementById("costoproducto");
if(costoseleccionado){
    costoseleccionado.textContent=produselec.PRODUCTO_PRECIO;
}


if (produselec && document.getElementById("productoSelect")) { 

    document.getElementById("productoSelect").textContent = produselec.PRODUCTO_DESCRIPCION;
}




    function agregarCarrito(){
        let listaProductos = JSON.parse(localStorage.getItem("carrito"));


    if (!listaProductos) {
        listaProductos = [];
    }

    listaProductos.push(produselec);
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
    alert("Se envio correctamente");

    }