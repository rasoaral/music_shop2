let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

const form = document.getElementById('formulario');
form.addEventListener('submit', function (evente){
   let id= document.getElementById('identificacion').value;
   let titulo = document.getElementById('titulos').value;
   let imagen= document.getElementById('pwd').value;
   let precio = document.getElementById('precio').value;
   var select = document.getElementById('categorias').value;
   

   const productos ={
    id: id,
    titulo: titulo,
    imagen: imagen,
    categoria: {
        nombre: select,
        id: select
    },
    precio: precio
   };
   if(localStorage.getItem("productosNuevos") === null){
    let nose = [];
    nose.push(productos);
    localStorage.setItem("productosNuevos",JSON.stringify(nose));
   }else{
   let tareas= JSON.parse(localStorage.getItem('productosNuevos'));
    tareas.push(productos);
    localStorage.setItem("productosNuevos", JSON.stringify(tareas));
   }

})
     

const contenedorAgregado = document.querySelector("#contenedor-agregados");
const contenedorProductos = document.querySelector('#producto-vacio');

//let botonAgregador = document.querySelector(".producto-agregado");
let products = localStorage.getItem("productosNuevos");
        products = JSON.parse(products);
function cargarAgregado(){
    

    if(products && products.length>0){
        contenedorProductos.classList.add("disabled");
    products.forEach(agrega => {
        const div = document.createElement("div");
        div.classList.add("agrega");
        div.innerHTML = `
        <img class="producto-imagen" src="${agrega.imagen}" alt="${agrega.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${agrega.titulo}</h3>
            <button class="carrito-producto-eliminar" id="${agrega.id}" ><a class="boton-menu" href="./agregar.html">Eliminar</a></button>
            
        </div>
        `;
        contenedorAgregado.append(div);
    })

    }
     
    else{
        contenedorProductos.classList.remove("disabled");
    }
    actualizarBotonesEliminar();

    
}
cargarAgregado();
//----------------------------------------------------------------/

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = products.findIndex(producto => producto.id === idBoton);
    products.splice(index, 1);
    cargarAgregado();

    localStorage.setItem("productosNuevos", JSON.stringify(products));
}
