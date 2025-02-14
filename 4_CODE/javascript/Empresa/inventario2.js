const table = document.getElementById("tablaProductos").getElementsByTagName('tbody')[0];
let listaProductos = [];
let contador;
let editar = '<button class="btn btn-warning btn-sm" onclick="editarFila(this)">✏️</button>';

fetch(`../../php/mostrar.php`)  
    .then(response => response.json())  
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.error) {
            console.error("Error en la respuesta del servidor:", data.error);
        } else {
            listaProductos = data;
            llenarTabla();
        }
    })
    .catch(error => console.error("Error en la solicitud fetch:", error));


contador = listaProductos.length > 0 ? listaProductos.length + 1 : 1;

function llenarTabla() {
    table.innerHTML = ""; 
    listaProductos.forEach((producto) => {
        let nuevaFila = table.insertRow();
        let disponibilidad = "";
        let estado = "";

        nuevaFila.insertCell(0).innerText = producto.PRODUCTO_ID;
        nuevaFila.insertCell(1).innerText = producto.PRODUCTO_DESCRIPCION;
        nuevaFila.insertCell(2).innerText = producto.PRODUCTO_TALLA;
        nuevaFila.insertCell(3).innerText = producto.PRODUCTO_PRECIO;
        nuevaFila.insertCell(4).innerText = producto.PRODUCTO_DESCUENTO;
        nuevaFila.insertCell(5).innerText = 'AUN NO PROGRAMADO';

        if (producto.PRODUCTO_STOCK >= 10) {
            disponibilidad = '<p class="bg-success text-white text-center m-0 p-1">Disponible</p>';
        } else if (producto.PRODUCTO_STOCK > 0) {
            disponibilidad = '<p class="bg-warning text-white text-center m-0 p-1">Por agotarse</p>';
        } else {
            disponibilidad = '<p class="bg-danger text-white text-center m-0 p-1">Agotado</p>';
        }

        nuevaFila.insertCell(6).innerHTML = disponibilidad;

        if (producto.PRODUCTO_ESTADO === "pendiente") {
            estado = '<p class="bg-warning text-white text-center m-0 p-1">Pendiente</p>';
        } else {
            estado = '<p class="bg-success text-white text-center m-0 p-1">Publicado</p>';
        }

        nuevaFila.insertCell(7).innerHTML = estado;
        nuevaFila.insertCell(8).innerHTML = editar;
    });
}