
const table = document.getElementById("tablaUsuarios").getElementsByTagName('tbody')[0];
let listaUsuarios = [];
let listaAuxiliar = [];
let contador;
document.getElementById("buscar").style.display = 'none';

fetch(`../../php/usuarios/mostrarUsuarios.php`)
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.error) {
            console.error("Error en la respuesta del servidor:", data.error);
        } else {
            listaUsuarios = data;
            listaAuxiliar = data;
            llenarTabla();
        }
    })
    .catch(error => console.error("Error en la solicitud fetch:", error));

function llenarTabla() {
    table.innerHTML = "";
    listaUsuarios.forEach((usuario) => {
        let nuevaFila = table.insertRow();
        let editar = '<button class="btn btn-warning btn-sm" onclick="obtenerProducto(' + usuario.USUARIO_ID + ')">✏️</button>';

        nuevaFila.insertCell(0).innerText = usuario.USUARIO_ID;
        nuevaFila.insertCell(1).innerText = "" + usuario.USUARIO_NOMBRE + " " + usuario.USUARIO_APELLIDO;
        nuevaFila.insertCell(2).innerText = usuario.ROL_ID;
        nuevaFila.insertCell(3).innerText = usuario.USUARIO_CEDULA;
        nuevaFila.insertCell(4).innerText = usuario.USUARIO_TELEFONO;
        nuevaFila.insertCell(5).innerText = usuario.USUARIO_CORREO;
        nuevaFila.insertCell(6).innerHTML = editar;
    });
}

contador = listaProductos.length > 0 ? listaProductos.length + 1 : 1;

function buscarPorNombre(){
    let cadena = document.getElementById("buscar").value;
    fetch("../../php/usuarios/buscarNombreUsuario.php", {
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
            listaUsuarios = data;
            llenarTabla();
        }
    })
    .catch(error => console.error("Error al obtener el producto:", error));
}  

function buscarPorDisponibilidad(cadena){
    fetch("../../php/usuarios/buscarPorUsuario.php", {
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
            listaUsuarios = data;
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
            listaUsuarios = listaAuxiliar;
            llenarTabla();
            break;
        case 1:
            buscarPorDisponibilidad("ROL_ID = 1");
            break;
        case 2:
            buscarPorDisponibilidad("ROL_ID = 2");
            break;
        case 3:
            buscarPorDisponibilidad("ROL_ID = 3");
            break;
        case 4:
            document.getElementById("buscar").style.display = 'inline';
            break;
    }
}