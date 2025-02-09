const agregar = document.getElementById("agregar");
let contador = 1;

document.getElementById('imageUpload').addEventListener('change', function(event) {
    let preview = document.getElementById('imagePreview');
    let files = event.target.files;

    if (files.length + preview.childElementCount > 10) {
        alert("Solo puedes subir hasta 10 imágenes.");
        event.target.value = "";
        return;
    }

    for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.onload = function(e) {
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

            deleteBtn.addEventListener("click", function() {
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

function cerrarAgregar(){
    document.getElementById("descripcion").value = "";
    document.getElementById("materiales").value = "";
    document.getElementById("tallas").value = "";
    document.getElementById("colores").value = "";
    document.getElementById("stock").value = "";
    agregar.close();
}

function agregarProducto() {
    event.preventDefault();
    const table = document.getElementById("tablaInventario").getElementsByTagName('tbody')[0];
    let descripcion = document.getElementById("descripcion").value;
    let materiales = document.getElementById("materiales").value;
    let tallas = document.getElementById("tallas").value;
    let colores = document.getElementById("colores").value;
    let stock = document.getElementById("stock").value;

    let estado = '<p class="bg-success text-white text-center m-0 p-1">Disponible</p>';
    let editar = '<button class="btn btn-warning btn-sm" onclick="editarFila(this)">✏️</button>';

    let nuevaFila = table.insertRow(); 

    nuevaFila.insertCell(0).innerHTML = '<input type="checkbox">';
    nuevaFila.insertCell(1).innerText = contador;
    nuevaFila.insertCell(2).innerText = descripcion;
    nuevaFila.insertCell(3).innerText = materiales;
    nuevaFila.insertCell(4).innerText = colores;
    nuevaFila.insertCell(5).innerText = "1"; 
    nuevaFila.insertCell(6).innerText = stock;
    nuevaFila.insertCell(7).innerHTML = estado;
    nuevaFila.insertCell(8).innerHTML = editar;

    contador++; 
    cerrarAgregar();
}
