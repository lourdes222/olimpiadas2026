function buscar(){

    let texto = document
        .getElementById("busqueda")
        .value
        .toLowerCase();

    if(texto === "inicio"){

        window.location.href = "index.html";

    }else if(texto === "viajes"){

        window.location.href = "viajes.html";

    }else if(texto === "estadias"){

        window.location.href = "estadias.html";

    }else if(texto === "traslados"){

        window.location.href = "traslados.html";

    }else{

        alert("No se encontró la sección 😭");

    }
}

let carrito = [];

function agregarAlCarrito(nombre, precio){

    carrito.push({nombre, precio});

    alert("¡Sumaste " + nombre + " al carrito!");

    console.log(carrito);
}

function abrirLogin(){

    document.getElementById("modal-login")
        .style.display = "block";
}

function cerrarLogin(){

    document.getElementById("modal-login")
        .style.display = "none";
}

function entrar(){

    alert("Iniciando sesión...");

    cerrarLogin();
}

let carrito = 
JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio){

carrito.push({
    nombre: nombre, 
    precio: precio
});

localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
);

alret(nombre + " agregado al carrito");
}
function mostrarCarrito(){
    
    let carrito = 
    JSON.parse(localStorage.getItem("carrito")) || [];
    
    let contenido = 

    docutment.getElementById("lista-carrito");

    let total = 0;
    
    contenedor.innerHTML = "";

    carrito.forEach((producto, indice) => {
        
        contenedor.innerHTML += `
        <p>${producto.nombre} - $${producto.precio}
        <button onclick="eliminarDelCarrito(${indice})">Eliminar</button>
        </p> 
        `;

        total += producto.precio;
    });

    document.getElementById("total").innerText = "Total: $" + total;
}
function eliminarProducto(indice){
    let carrito = 
    JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.splice(indice, 1);

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
    
    mostrarCarrito();
}
function vaciarCarrito(){
    localStorage.removeItem("carrito");
    mostrarCarrito();
}