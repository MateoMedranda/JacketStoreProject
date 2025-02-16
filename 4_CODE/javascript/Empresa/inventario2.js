const table = document.getElementById("tablaProductos").getElementsByTagName('tbody')[0];
const editar = document.getElementById("editar");
let listaProductos = [];
let contador;

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
        nuevaFila.insertCell(3).innerText = "$ " + producto.PRODUCTO_PRECIO;
        nuevaFila.insertCell(4).innerText = producto.PRODUCTO_DESCUENTO + " %";
        nuevaFila.insertCell(5).innerText = 'AUN NO PROGRAMADO';
        let editar = '<button class="btn btn-warning btn-sm" onclick="obtenerProducto('+producto.PRODUCTO_ID+')">✏️</button>';

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

function obtenerProducto(id) {
    document.getElementById("idProducto").value = id;
    console.log("ID enviado:", id);
    fetch("../../php/inventario/editarProducto.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "producto_id=" + id
    })
    .then(response => response.json()) 
    .then(data => {
        console.log("Datos recibidos:", data);
        document.getElementById("descripcion").value = data.PRODUCTO_DESCRIPCION;
        document.getElementById("tallaA").value = data.PRODUCTO_TALLA;
        document.getElementById("cantidadA").value = data.PRODUCTO_STOCK;
        document.getElementById("precio").value = data.PRODUCTO_PRECIO;
        document.getElementById("descuento").value = data.PRODUCTO_DESCUENTO;      
    })
    .catch(error => console.error("Error al obtener el producto:", error));
    abrirEditar();
}

function abrirEditar() {
    editar.showModal();
}

function cerrarEditar() {
    document.getElementById("descripcion").value = "";
    document.getElementById("tallaA").value = "";
    document.getElementById("cantidadA").value = "";
    document.getElementById("idProducto").value = 0;
    editar.close();
}