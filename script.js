function buscar(){
    let texto=document.getElementById("busqueda").value.toLowerCase();
    if(texto=="inicio"){
        document.getElementById("inicio").scrollIntoView();
    }   else if(texto=="viajes"){
        document.getElementById("viajes").scrollIntoView();
    }else if(texto==="estadias"){
        document.getElementById("estadias").scrollIntoView();
    }else if(texto==="traslados"){
        document.getElementById("traslados").scrollIntoView();
    }else{
        alert("No se encontró la sección buscada. Por favor, intente con 'Inicio', 'Viajes', 'Estadías' o 'Traslados'.");
    }
}
let carrito=[];
function agregarAlCarrito(nombre, precio){
    carrito.push({nombre, precio});
    alert("¡Sumaste"+nombre+" al carrito!");
    console.log("Tu carrito actual: ", carrito);
}
console.log("el archivo cargó")

function abrirLogin(){
    document.getElementById('modal-login').style.display='block';
}
function cerrarLogin(){
    document.getElementById('modal-login').style.display='none'
}
function entrar(){
    alert("Iniciando sesión...");
    cerrarLogin();
}