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