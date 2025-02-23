const table = document.getElementById("tablaProductos").getElementsByTagName('tbody')[0];
let listaProductos =JSON.parse(localStorage.getItem("carrito"));
let valortotal=0;
let descuento=0;
let precioOriginal=0;

//preciototal
function recarga(){
listaProductos.forEach((producto) => {
    precioOriginal=parseFloat(producto.PRODUCTO_PRECIO);
    descuento=parseFloat(producto.PRODUCTO_DESCUENTO)/100;
    valortotal=valortotal+ (precioOriginal-(precioOriginal*descuento));

});
}
recarga();

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
        let editar = '<button class="btn btn-warning btn-sm" onclick="obtenerProducto('+ producto.PRODUCTO_ID+')"></button><button class="ms-3 btn btn-danger btn-sm" onclick="borrarFila(this)">🗑️</button>';
        

        let celdaID = nuevaFila.insertCell(0);
        celdaID.innerText = producto.PRODUCTO_ID; // La primera celda contiene el ID

        // Ocultar la primera celda
        celdaID.style.display = 'none'; 
       
        nuevaFila.insertCell(1).innerText = producto.PRODUCTO_DESCRIPCION;
        
        nuevaFila.insertCell(2).innerText = producto.PRODUCTO_PRECIO;
        nuevaFila.insertCell(3).innerText = producto.PRODUCTO_DESCUENTO;
       
        nuevaFila.insertCell(4).innerHTML = editar;


    });
}
else{
    alert("No funca");
}



function actualizarTotales() {

}

function borrarFila(button) {

    let row = button.closest('tr');  // Encuentra la fila más cercana al botón clicado

    let rowIndex = row.rowIndex - 1;   // Obtén el índice de la fila (ajustado por si la tabla tiene encabezado)
      // Muestra el índice de la fila en un alerta
    
    // Muestra los valores de las celdas antes de eliminar
    let idToDelete = row.cells[0].innerText;  
 
    table.deleteRow(rowIndex);

    listaProductos = listaProductos.filter(producto => producto.PRODUCTO_ID !== idToDelete);

    
    localStorage.setItem("carrito", JSON.stringify(listaProductos));

    
    valortotal=0;
    recarga();
    document.getElementById("preciopay").textContent=valortotal + "$";
    document.getElementById("preciototal").textContent=valortotal + "$";
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
   