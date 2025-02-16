const agregar = document.getElementById("agregar");
const table = document.getElementById("tablaInventario").getElementsByTagName('tbody')[0];
let listaProductos = [];
let listaAuxiliar = [];
let contador;

document.getElementById("actualizar").style.display = "none";
document.getElementById("actualizarForm").style.display = "none";
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
        let editar = '<button class="btn btn-warning btn-sm" onclick="obtenerProducto('+ producto.PRODUCTO_ID+')">✏️</button><button class="ms-3 btn btn-danger btn-sm" onclick="borrarFila(this)">🗑️</button>';

        nuevaFila.insertCell(0).innerText = producto.PRODUCTO_ID;
        nuevaFila.insertCell(1).innerText = producto.PRODUCTO_DESCRIPCION;
        nuevaFila.insertCell(2).innerText = producto.PRODUCTO_MATERIAL;
        nuevaFila.insertCell(3).innerText = producto.PRODUCTO_TALLA;
        nuevaFila.insertCell(4).innerText = producto.PRODUCTO_COLOR;
        nuevaFila.insertCell(5).innerText = producto.PRODUCTO_STOCK;

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


document.getElementById('imageUpload').addEventListener('change', function (event) {
    let preview = document.getElementById('imagePreview');
    let files = event.target.files;

    if (files.length + preview.childElementCount > 10) {
        alert("Solo puedes subir hasta 10 imágenes.");
        event.target.value = "";
        return;
    }

    for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let imgContainer = document.createElement("div");
            imgContainer.classList.add("position-relative", "d-inline-block");

            let img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("img-thumbnail", "rounded", "shadow");
            img.style.width = "80px";

            let deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "<b>X<b>";
            deleteBtn.classList.add("btn", "btn-sm", "btn-danger", "position-absolute", "top-0", "end-0", "p-0", "m-1", "rounded-circle");
            deleteBtn.style.width = "20px";
            deleteBtn.style.height = "20px";

            deleteBtn.addEventListener("click", function () {
                imgContainer.remove();
            });

            imgContainer.appendChild(img);
            imgContainer.appendChild(deleteBtn);
            preview.appendChild(imgContainer);
        }
        reader.readAsDataURL(files[i]);
    }
});

function abrirAgregar() {
    agregar.showModal();
}

function cerrarAgregar() {
    document.getElementById("descripcion").value = "";
    document.getElementById("materiales").value = "";
    document.getElementById("colores").value = "";
    document.getElementById("actualizar").style.display = "none";
    document.getElementById("registrar").style.display = "inline";
    document.getElementById("actualizarForm").style.display = "none";
    document.getElementById("tallasFormA").style.display = "inline";
    document.getElementById("tallasFormB").style.display = "inline";
    document.getElementById("stockD").style.display = "inline";
    document.getElementById("idProducto").value = 0;
    agregar.close();
}

function obtenerTallasSeleccionadas() {
    let tallasSeleccionadas = [];

    document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
        tallasSeleccionadas.push(checkbox.value);
    });

    return tallasSeleccionadas;
}

function obtenerCantidades() {
    let tallas = ["xs", "s", "m", "l", "xl", "xxl"];
    let cantidades = {};
    let cont = 0;

    for(let i=0;i<6;i++){
        let checkbox = document.getElementById("talla-"+tallas[i]);
        let inputCantidad = document.getElementById("cantidad" + i);

        if (checkbox.checked) {
            cantidades[cont] = Number(inputCantidad.value);
            cont++;
        }
    }
    return cantidades;
}

function calcularStock() {
    let suma = 0;
    for (let i = 0; i < 6; i++) {
        let id = 'cantidad' + i;
        suma += Number(document.getElementById(id).value);
    }

    document.getElementById("stock").value = suma;
}

function habilitarNum(num) {
    let check = document.getElementById('cantidad' + num);
    check.disabled = !check.disabled;
}

function agregarProducto() {
    event.preventDefault();
    let productos = [];
    let tallas = obtenerTallasSeleccionadas();
    let descripcion = document.getElementById("descripcion").value;
    let materiales = document.getElementById("materiales").value;
    let colores = document.getElementById("colores").value;
    let cantidades = obtenerCantidades();

    for (let i = 0; i < tallas.length; i++) {
        let estado = '<p class="bg-warning text-white text-center m-0 p-1">Pendiente</p>';
        let talla = tallas[i];
        let cantidad = cantidades[i];
        let disponibilidad = "";
        let estadoP = "pendiente";

        if(cantidades[i]>=10){
            disponibilidad = '<p class="bg-success text-white text-center m-0 p-1">Disponible</p>';
        }else if(cantidades[i]<10 && cantidades[i]!=0){
            disponibilidad = '<p class="bg-warning text-white text-center m-0 p-1">Por agotarse</p>';
        }else {
            disponibilidad = '<p class="bg-danger text-white text-center m-0 p-1">Agotado</p>';
        }

        let nuevaFila = table.insertRow();

        nuevaFila.insertCell(0).innerHTML = contador;
        nuevaFila.insertCell(1).innerText = descripcion;
        nuevaFila.insertCell(2).innerText = materiales;
        nuevaFila.insertCell(3).innerText = talla;
        nuevaFila.insertCell(4).innerText = colores;
        nuevaFila.insertCell(5).innerText = cantidad;
        nuevaFila.insertCell(6).innerHTML = disponibilidad;
        nuevaFila.insertCell(7).innerHTML = estado;
        nuevaFila.insertCell(8).innerHTML = editar;

        let nuevoProducto = {contador, descripcion, materiales, talla, colores, cantidad, estadoP};
        listaProductos.push(nuevoProducto);
        contador++;
    }
    localStorage.setItem("productos", JSON.stringify(listaProductos));
    cerrarAgregar();
}

function borrarFila(button) {

    let row = button.closest('tr');

    let rowIndex = row.rowIndex-1;
    alert(rowIndex);
  
    table.deleteRow(rowIndex);
    
  
    let idToDelete = row.cells[0].innerText; 
    listaProductos = listaProductos.filter(producto => producto.contador != idToDelete);
    

    localStorage.setItem("productos", JSON.stringify(listaProductos));
}

function enviarFormulario(accion) {
    var form = document.getElementById('productoForm');

    if (accion === 'actualizar') {
      form.action = '../../php/inventario/actualizar.php';
    } else {
      form.action = '../../php/inventario/registraProducto.php';
    }

    form.submit();
  }

function obtenerProducto(id) {
    document.getElementById("actualizarForm").style.display = "inline";
    document.getElementById("actualizar").style.display = "inline";
    document.getElementById("registrar").style.display = "none";
    document.getElementById("tallasFormA").style.display = "none";
    document.getElementById("tallasFormB").style.display = "none";
    document.getElementById("stockD").style.display = "none";
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
        document.getElementById("materiales").value = data.PRODUCTO_MATERIAL;
        document.getElementById("colores").value = data.PRODUCTO_COLOR;
        document.getElementById("tallaA").value = data.PRODUCTO_TALLA;
        document.getElementById("cantidadA").value = data.PRODUCTO_STOCK;
        

    })
    .catch(error => console.error("Error al obtener el producto:", error));
    abrirAgregar();
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