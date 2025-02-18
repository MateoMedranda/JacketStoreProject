let produselec =JSON.parse(localStorage.getItem("productoSelec"));
let imagenselec=localStorage.getItem("imagenSelect");




//Toma de ids
let imagenElement = document.getElementById("imagennew");
let imagenElementtwo= document.getElementById("imagennewtwo");
let costoseleccionado= document.getElementById("costoproducto");
if(costoseleccionado){
    costoseleccionado.textContent=produselec.PRODUCTO_PRECIO;
}


if (imagenElement) {
    
    imagenElement.alt = "imagenselec";
    imagenElement.src=imagenselec;

  } else {
    alert("No se encontró ningún elemento con el ID 'imagennew'.");
  }


  if (imagenElementtwo) {
   
    imagenElementtwo.alt = "imagenselec";
    imagenElementtwo.src=imagenselec;

  } else {
    alert("No se encontró ningún elemento con el ID 'imagennew'.");
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