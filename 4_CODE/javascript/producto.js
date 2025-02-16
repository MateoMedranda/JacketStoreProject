let produselec =JSON.parse(localStorage.getItem("productoSelec"));
if (produselec && document.getElementById("productoSelect")) { 
    document.getElementById("productoSelect").textContent = produselec.PRODUCTO_DESCRIPCION;
}
    function agregarCarrito(){
        let listaProductos = JSON.parse(localStorage.getItem("carrito"));


    if (!listaProductos) {
        listaProductos = [];
    }

    listaProductos.push(produselec);
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
    alert("Se agrego correctamente");

    }