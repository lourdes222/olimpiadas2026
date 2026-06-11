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

    let usuario =
        document.getElementById("usuario").value;

    let password =
        document.getElementById("password").value;

    if(
        usuario === "admin" &&
        password === "1234"
    ){

        localStorage.setItem(
            "rol",
            "admin"
        );

        alert("Bienvenido administrador");

        window.location.href =
            "admin.html";

    }else{

        alert(
            "Usuario o contraseña incorrectos"
        );

    }
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
function cerrarSesion(){

    localStorage.removeItem("rol");

    window.location.href =
        "index.html";
}
if(
    window.location.pathname
    .includes("admin.html")
){

    if(
        localStorage.getItem("rol")
        !== "admin"
    ){

        window.location.href =
            "index.html";
    }
}
function agregarProducto(){

    let nombre =
        document.getElementById(
            "nombreProducto"
        ).value;

    let precio =
        document.getElementById(
            "precioProducto"
        ).value;

    let productos =
        JSON.parse(
            localStorage.getItem(
                "productos"
            )
        ) || [];

    productos.push({
        nombre,
        precio
    });

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    mostrarProductos();

    alert("Producto agregado");
}
function mostrarProductos(){

    let productos =
        JSON.parse(
            localStorage.getItem(
                "productos"
            )
        ) || [];

    let contenedor =
        document.getElementById(
            "listaProductos"
        );

    if(!contenedor) return;

    contenedor.innerHTML = "";

    productos.forEach((p)=>{

        contenedor.innerHTML += `
            <p>
                ${p.nombre}
                - $${p.precio}
            </p>
        `;
    });
}