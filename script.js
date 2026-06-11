function buscar() {

    let texto = document
        .getElementById("busqueda")
        .value
        .toLowerCase();

    if (texto === "inicio") {

        window.location.href = "index.html";

    } else if (texto === "viajes") {

        window.location.href = "viajes.html";

    } else if (texto === "estadias") {

        window.location.href = "estadias.html";

    } else if (texto === "traslados") {

        window.location.href = "traslados.html";

    } else {

        alert("No se encontró la sección 😭");

    }
}

/* ========================= */
/* LOGIN */
/* ========================= */

function abrirLogin() {

    let modal = document.getElementById("modal-login");

    if (modal) {
        modal.style.display = "block";
    }
}

function cerrarLogin() {

    let modal = document.getElementById("modal-login");

    if (modal) {
        modal.style.display = "none";
    }
}

function entrar() {

    let usuario =
        document.getElementById("usuario").value;

    let password =
        document.getElementById("password").value;

    if (
        usuario === "admin" &&
        password === "1234"
    ) {

        localStorage.setItem(
            "rol",
            "admin"
        );

        alert("Bienvenido Admin");

        window.location.href =
            "index.html";

    } else {

        alert(
            "Usuario o contraseña incorrectos"
        );

    }
}

function cerrarSesion() {

    localStorage.removeItem("rol");

    window.location.href =
        "index.html";
}

/* ========================= */
/* PROTECCION ADMIN */
/* ========================= */

if (
    window.location.pathname
        .includes("admin.html")
) {

    if (
        localStorage.getItem("rol")
        !== "admin"
    ) {

        window.location.href =
            "index.html";
    }
}

/* ========================= */
/* CARRITO */
/* ========================= */

let carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

function agregarAlCarrito(nombre, precio) {

    carrito.push({
        nombre,
        precio
    });

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    alert(nombre + " agregado al carrito");
}

function mostrarCarrito() {

    let carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];

    let contenedor =
        document.getElementById(
            "lista-carrito"
        );

    if (!contenedor) return;

    let total = 0;

    contenedor.innerHTML = "";

    carrito.forEach((producto, indice) => {

        contenedor.innerHTML += `
            <p>
                ${producto.nombre}
                - $${producto.precio}

                <button onclick="eliminarProducto(${indice})">
                    Eliminar
                </button>
            </p>
        `;

        total += Number(producto.precio);
    });

    let totalElemento =
        document.getElementById("total");

    if (totalElemento) {

        totalElemento.innerText =
            "Total: $" + total;
    }
}

function eliminarProducto(indice) {

    let carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];

    carrito.splice(indice, 1);

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();
}

function vaciarCarrito() {

    localStorage.removeItem("carrito");

    mostrarCarrito();
}

/* ========================= */
/* PRODUCTOS ADMIN */
/* ========================= */

function agregarProducto() {

    let nombre =
        document.getElementById(
            "nombreProducto"
        ).value;

    let precio =
        document.getElementById(
            "precioProducto"
        ).value;

    if (
        nombre === "" ||
        precio === ""
    ) {

        alert(
            "Completa todos los campos"
        );

        return;
    }

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

    document.getElementById(
        "nombreProducto"
    ).value = "";

    document.getElementById(
        "precioProducto"
    ).value = "";
}

function mostrarProductos() {

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

    if (!contenedor) return;

    contenedor.innerHTML = "";

    productos.forEach((p, indice) => {

        contenedor.innerHTML += `
            <p>
                ${p.nombre}
                - $${p.precio}

                <button
                onclick="eliminarProductoAdmin(${indice})">

                    Eliminar

                </button>

            </p>
        `;
    });
}

function mostrarProductosViajes() {

    let productos =
        JSON.parse(
            localStorage.getItem(
                "productos"
            )
        ) || [];

    let contenedor =
        document.getElementById(
            "productosAdmin"
        );

    if (!contenedor) return;

    contenedor.innerHTML = "";

    productos.forEach((p) => {

        contenedor.innerHTML += `
            <div class="tarjeta-viaje">

                <h3>${p.nombre}</h3>

                <span class="precio">
                    $${p.precio}
                </span>

                <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio})">
                    Agregar al carrito
                </button>

            </div>
        `;
    });
}
function eliminarProductoAdmin(indice){

    let productos =
        JSON.parse(
            localStorage.getItem("productos")
        ) || [];

    productos.splice(indice, 1);

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    mostrarProductos();
}

function esAdmin(){

    return localStorage.getItem("rol")
        === "admin";
}
window.addEventListener("DOMContentLoaded", () => {

    const adminLink =
        document.getElementById("adminLink");

    if (!adminLink) return;

    if (
        localStorage.getItem("rol") === "admin"
    ) {

        adminLink.hidden = false;

    } else {

        adminLink.hidden = true;

    }

}); 