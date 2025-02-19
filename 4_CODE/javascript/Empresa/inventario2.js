const table = document.getElementById("tablaProductos").getElementsByTagName('tbody')[0];
const editar = document.getElementById("editar");
let listaProductos = [];
let listaAuxiliar = [];
let listaCategorias = [];
let contador;
document.getElementById("buscar").style.display = 'none';

let usuario = JSON.parse(sessionStorage.getItem("usuario"));

if (usuario) {
    console.log("Nombre: " + usuario.nombre);
    console.log("Apellido: " + usuario.apellido);
    document.getElementById("nombreUser").textContent = "" + usuario.nombre + " " + usuario.apellido;
}

fetch(`../../php/mostrar.php`)  
    .then(response => response.json())  
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.error) {
            console.error("Error en la respuesta del servidor:", data.error);
        } else {
            listaProductos = data;
            listaAuxiliar = data;
            cargarCategorias().then(() => llenarTabla());
        }
    })
    .catch(error => console.error("Error en la solicitud fetch:", error));


contador = listaProductos.length > 0 ? listaProductos.length + 1 : 1;

function llenarTabla() {
    table.innerHTML = ""; 

    const productosMap = {};

    listaProductos.forEach((producto) => {
        const stockNumerico = Number(producto.PRODUCTO_STOCK);
        if (!productosMap[producto.PRODUCTO_DESCRIPCION]) {
            productosMap[producto.PRODUCTO_DESCRIPCION] = {
                id: producto.PRODUCTO_ID,
                descripcion: producto.PRODUCTO_DESCRIPCION,
                stock: stockNumerico, 
                precio: producto.PRODUCTO_PRECIO,
                descuento: producto.PRODUCTO_DESCUENTO,
                estado: producto.PRODUCTO_ESTADO,
                categoria: producto.ID_CATEGORIA
            };
        } else {
            productosMap[producto.PRODUCTO_DESCRIPCION].stock += stockNumerico;
        }
    });

    Object.values(productosMap).forEach((producto) => {
        let nuevaFila = table.insertRow();
        let disponibilidad = "";
        let estado = "";

        nuevaFila.insertCell(0).innerText = producto.id;
        nuevaFila.insertCell(1).innerText = producto.descripcion;
        nuevaFila.insertCell(2).innerText = producto.stock;
        nuevaFila.insertCell(3).innerText = "$ " + producto.precio;
        nuevaFila.insertCell(4).innerText = producto.descuento + " %";
        console.log(listaCategorias);
        nuevaFila.insertCell(5).innerText = listaCategorias.find(categoria => categoria.CATEGORIA_ID === producto.categoria)?.CATEGORIA_NOMBRE || "Categoría no encontrada";
        let editar = `<button class="btn btn-warning btn-sm" onclick="obtenerProducto(${producto.id})">✏️</button>`;

        if (producto.stock >= 10) {
            disponibilidad = '<p class="bg-success text-white text-center m-0 p-1">Disponible</p>';
        } else if (producto.stock > 0) {
            disponibilidad = '<p class="bg-warning text-white text-center m-0 p-1">Por agotarse</p>';
        } else {
            disponibilidad = '<p class="bg-danger text-white text-center m-0 p-1">Agotado</p>';
        }

        nuevaFila.insertCell(6).innerHTML = disponibilidad;

        if (producto.estado === "pendiente") {
            estado = '<p class="bg-warning text-white text-center m-0 p-1">Pendiente</p>';
        } else {
            estado = '<p class="bg-success text-white text-center m-0 p-1">Publicado</p>';
        }

        nuevaFila.insertCell(7).innerHTML = estado;
        nuevaFila.insertCell(8).innerHTML = editar;
    });
}

function cargarCategorias() {
    return fetch(`../../php/productos/mostrarCategorias.php`)
        .then(response => response.json())
        .then(data => {
            console.log("Datos recibidos:", data);
            if (data.error) {
                console.error("Error en la respuesta del servidor:", data.error);
                throw new Error(data.error); // Importante para manejar errores en la promesa
            }
            listaCategorias = data;

            let opciones = "";
            data.forEach(categoria => {
                opciones += `<option value="${categoria.CATEGORIA_ID}">${categoria.CATEGORIA_NOMBRE}</option>`;
            });

            document.getElementById("categorias").innerHTML = opciones;
        })
        .catch(error => console.error("Error en la solicitud fetch:", error));
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

function buscarPorNombre(){
    let cadena = document.getElementById("buscar").value;
    fetch("../../php/inventario/buscarNombreProducto.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "buscar=" + cadena
    })
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
    .catch(error => console.error("Error al obtener el producto:", error));
}  

function buscarPorDisponibilidad(cadena){
    fetch("../../php/inventario/buscarPor.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "cadena=" + cadena
    })
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
    .catch(error => console.error("Error al obtener el producto:", error));
}

function buscarPor(){
    let opcion = Number(document.getElementById("tipoBusqueda").value);
    document.getElementById("buscar").style.display = 'none';

    switch(opcion){
        case 0:
            listaProductos = listaAuxiliar;
            llenarTabla();
            break;
        case 1:
            buscarPorDisponibilidad("PRODUCTO_STOCK > 10");
            break;
        case 2:
            buscarPorDisponibilidad("PRODUCTO_STOCK BETWEEN 1 AND 10");
            break;
        case 3:
            buscarPorDisponibilidad("PRODUCTO_STOCK=0");
            break;
        case 4:
            document.getElementById("buscar").style.display = 'inline';
            break;
        case 5:
            buscarPorDisponibilidad("PRODUCTO_ESTADO='pendiente'");
            break;
        case 6:
            buscarPorDisponibilidad("PRODUCTO_ESTADO='publicado'");
            break;
    }
}