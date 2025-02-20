const table = document.getElementById("tablaProductos").getElementsByTagName('tbody')[0];
let listaProductos =JSON.parse(localStorage.getItem("carrito"));
let valortotal=0;
let descuento=0;
let precioOriginal=0;

//preciototal

listaProductos.forEach((producto) => {
    precioOriginal=parseFloat(producto.PRODUCTO_PRECIO);
    descuento=parseFloat(producto.PRODUCTO_DESCUENTO)/100;
    valortotal=valortotal+ (precioOriginal-(precioOriginal*descuento));

});


let pretotal= document.getElementById("preciototal");


if (pretotal) {
    
    pretotal.textContent = valortotal;
    document.getElementById("preciopay").textContent=valortotal + "$";
    

  } else {
    alert("No se encontró ningún elemento con el ID 'imagennew'.");
  }

contador = listaProductos.length > 0 ? listaProductos.length + 1 : 1;

if(table){
    table.innerHTML = ""; 
    listaProductos.forEach((producto) => {
        let nuevaFila = table.insertRow();


        
        nuevaFila.insertCell(0).innerText = producto.PRODUCTO_DESCRIPCION;
        
        nuevaFila.insertCell(1).innerText = producto.PRODUCTO_PRECIO;
        nuevaFila.insertCell(2).innerText = producto.PRODUCTO_DESCUENTO;
      


    });
}
else{
    alert("No funca");
}


        // Función para cerrar el popup
        function closePopup() {
            document.getElementById('popup-abd2').style.display = 'none';
        }

        // Mostrar el popup cuando se haga clic en el enlace de compra
        document.querySelector('.u-dialog-link').addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el enlace predeterminado
            document.getElementById('popup-abd2').style.display = 'block'; // Mostrar el popup
        });
   