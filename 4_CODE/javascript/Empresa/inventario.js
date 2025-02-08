const agregar = document.getElementById("agregar");

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