const table = document.getElementById("tablaProductos").getElementsByTagName('tbody')[0];
let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
let contador =  listaProductos.length > 0 ? listaProductos.length + 1 : 1;
let editar = '<button class="btn btn-warning btn-sm" onclick="editarFila(this)">✏️</button>';

if(listaProductos.length != 0){

    listaProductos.forEach((producto) => {
        let nuevaFilaA = table.insertRow();
        let disponibilidadA = "";
        let estadoA = "";

        nuevaFilaA.insertCell(0).innerHTML = producto.contador;
        nuevaFilaA.insertCell(1).innerText = producto.descripcion;
        nuevaFilaA.insertCell(2).innerText = producto.talla;
        nuevaFilaA.insertCell(3).innerText = "$ 0";
        nuevaFilaA.insertCell(4).innerText = "0 %";
        nuevaFilaA.insertCell(5).innerText = "Sin agregar";

        if(producto.cantidad>=10){
            disponibilidadA = '<p class="bg-success text-white text-center m-0 p-1">Disponible</p>';
        }else if(producto.cantidad<10 && producto.cantidad!=0){
            disponibilidadA = '<p class="bg-warning text-white text-center m-0 p-1">Por agotarse</p>';
        }else {
            disponibilidadA = '<p class="bg-danger text-white text-center m-0 p-1">Agotado</p>';
        }

        nuevaFilaA.insertCell(6).innerHTML = disponibilidadA;

        if(producto.estadoP == "pendiente"){
            estadoA = '<p class="bg-warning text-white text-center m-0 p-1">Pendiente</p>';
        }else {
            estadoA = '<p class="bg-success text-white text-center m-0 p-1">Publicado</p>';
        }

        nuevaFilaA.insertCell(7).innerHTML = estadoA;
        nuevaFilaA.insertCell(8).innerHTML = editar;
    });   
}