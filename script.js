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

async function entrar() {

    const usuario =
        document.getElementById("usuario").value;

    const password =
        document.getElementById("password").value;

    const respuesta = await fetch(
        "http://localhost:3000/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario,
                password
            })
        }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {

        alert(datos.mensaje);
        return;

    }

    localStorage.setItem(
        "rol",
        datos.usuario.rol
    );

    localStorage.setItem(
        "usuario",
        datos.usuario.usuario
    );

    alert(
        "Bienvenido " +
        datos.usuario.usuario
    );

    window.location.href =
        "index.html";
}

function cerrarSesion() {

    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");

    window.location.href =
        "registro.html";

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
async function registrar() {

    const usuario =
        document.getElementById(
            "nuevoUsuario"
        ).value;

    const email =
        document.getElementById(
            "nuevoEmail"
        ).value;

    const password =
        document.getElementById(
            "nuevoPassword"
        ).value;

    if (
        usuario === "" ||
        email === "" ||
        password === ""
    ) {

        alert(
            "Completa todos los campos"
        );

        return;
    }

    const respuesta = await fetch(
        "http://localhost:3000/registro",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                usuario,
                email,
                password
            })
        }
    );

    const datos =
        await respuesta.json();

    alert(datos.mensaje);

    if (respuesta.ok) {

        window.location.href =
            "iniciosesion.html";

    }
}
async function mostrarViajes() {

    const respuesta =
        await fetch(
            "http://localhost:3000/viajes"
        );

    const viajes =
        await respuesta.json();

    const contenedor =
        document.getElementById(
            "listaProductos"
        );

    if (!contenedor) return;

    contenedor.innerHTML = "";

    viajes.forEach((viaje) => {

        contenedor.innerHTML += `
            <p>

                <b>${viaje.nombre}</b>

                - ${viaje.descripcion}

                - $${viaje.precio}

                <button
                onclick="eliminarViaje(${viaje.id})">

                    Eliminar

                </button>

            </p>
        `;
    });

}

async function agregarViaje() {

    const nombre =
        document.getElementById(
            "nombreViaje"
        ).value;

    const descripcion =
        document.getElementById(
            "descripcionViaje"
        ).value;

    const precio =
        document.getElementById(
            "precioViaje"
        ).value;

    const imagen =
        document.getElementById(
            "imagenViaje"
        ).value;

    const respuesta =
        await fetch(
            "http://localhost:3000/viajes",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    nombre,
                    descripcion,
                    precio,
                    imagen
                })
            }
        );

    const datos =
        await respuesta.json();

    alert(datos.mensaje);

    mostrarViajes();

}

async function eliminarViaje(id) {

    const respuesta =
        await fetch(
            `http://localhost:3000/viajes/${id}`,
            {
                method: "DELETE"
            }
        );

    const datos =
        await respuesta.json();

    alert(datos.mensaje);

    mostrarViajes();

}
async function cargarViajes() {

    const respuesta =
        await fetch(
            "http://localhost:3000/viajes"
        );

    const viajes =
        await respuesta.json();

    const contenedor =
        document.getElementById(
            "productosAdmin"
        );

    if (!contenedor) return;

    contenedor.innerHTML = "";

    viajes.forEach((viaje) => {

        contenedor.innerHTML += `

            <div class="tarjeta-viaje">

                <img
                    src="${viaje.imagen}"
                    alt="${viaje.nombre}">

                <h3>
                    ${viaje.nombre}
                </h3>

                <p>
                    ${viaje.descripcion}
                </p>

                <span class="precio">
                    $${viaje.precio}
                </span>

                <button
                    onclick="agregarAlCarrito(
                        '${viaje.nombre}',
                        ${viaje.precio}
                    )">

                    Agregar al carrito

                </button>

            </div>

        `;

    });

}
async function registrar() {

    const usuario =
        document.getElementById("nuevoUsuario").value;

    const email =
        document.getElementById("nuevoEmail").value;

    const password =
        document.getElementById("nuevoPassword").value;

    if (
        usuario === "" ||
        email === "" ||
        password === ""
    ) {

        alert("Completa todos los campos");
        return;

    }

    try {

        const respuesta =
            await fetch(
                "http://localhost:3000/registro",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        usuario,
                        email,
                        password
                    })
                }
            );

        const datos =
            await respuesta.json();

        console.log(datos);

        alert(datos.mensaje);

        if (respuesta.ok) {

            window.location.href =
                "iniciosesion.html";

        }

    } catch (error) {

        console.log(error);

        alert(
            "No se pudo conectar con el servidor"
        );

    }

}
function cargarPerfil() {

    const usuario =
        localStorage.getItem("usuario");

    const rol =
        localStorage.getItem("rol");

    const nombre =
        document.getElementById("nombreUsuario");

    const rolSpan =
        document.getElementById("rolUsuario");

    if (nombre) {

        nombre.innerText =
            usuario || "No identificado";

    }

    if (rolSpan) {

        rolSpan.innerText =
            rol || "cliente";

    }

}
function cargarPerfil() {

    const usuario =
        localStorage.getItem("usuario");

    const rol =
        localStorage.getItem("rol");

    const nombre =
        document.getElementById("nombreUsuario");

    const rolSpan =
        document.getElementById("rolUsuario");

    if (nombre) {
        nombre.innerText =
            usuario || "No identificado";
    }

    if (rolSpan) {
        rolSpan.innerText =
            rol || "cliente";
    }

}

function cerrarSesionPerfil() {

    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");

    window.location.href =
        "registro.html";

}
window.addEventListener(
    "DOMContentLoaded",
    () => {

        const adminLink =
            document.getElementById(
                "adminLink"
            );

        if (
            adminLink &&
            localStorage.getItem("rol")
            === "admin"
        ) {

            adminLink.hidden = false;

        }

        const linkPerfil =
            document.getElementById(
                "linkPerfil"
            );

        if (!linkPerfil) return;

        if (
            localStorage.getItem(
                "usuario"
            )
        ) {

            linkPerfil.href =
                "perfil.html";

        } else {

            linkPerfil.href =
                "registro.html";

        }

    }
);