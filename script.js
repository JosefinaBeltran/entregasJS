fetch('./info.json')
    .then(respuesta => respuesta.json())
    .then(juego => main(juego))
    .catch(error => console.log(error))


function crearTarjetasJuegos(juegos) {
    let contenedorJuegos = document.getElementById("grid")
    contenedorJuegos.innerHTML = ""
    juegos.forEach(juego => {
        let nodoJuego = document.createElement("div")
        nodoJuego.className = "juego" 
        nodoJuego.innerHTML = `
            <img class=juego__imagen src=${juego.img} alt=imagen_juego>
            <div class="juego__informacion">
                <p class="juego__nombre">${juego.nombre}</p>
                <p class="juego__precio">$${juego.precio}</p>
                <button id=${juego.id} class="formulario__submit">Agregar Carrito</button>
            </div>
        `
        contenedorJuegos.appendChild(nodoJuego)
        let botonAgregarCarrito = document.getElementById(juego.id)
        botonAgregarCarrito.addEventListener("click", (e) => agregarAlCarrito(e, juegos))
    })
}

function crearFiltrosPorCategoria(listaJuegos) {
    let categorias = []
    let contenedorFiltros = document.getElementById("filtros__categoria")
    listaJuegos.forEach(juego => {
        if(!categorias.includes(juego.categoria)){
            categorias.push(juego.categoria)

            let botonFiltroCategoria = document.createElement("button")
            botonFiltroCategoria.innerText = juego.categoria
            botonFiltroCategoria.value = juego.categoria
            botonFiltroCategoria.className = "formulario__submit"

            botonFiltroCategoria.addEventListener("click", (e) => filtrarPorCategoria(e, listaJuegos, `${juego.categoria}`))

            contenedorFiltros.appendChild(botonFiltroCategoria)
        }
    })

    let botonTodos = document.getElementById("todos")
    let textoToast = "Filtro borrado"
    botonTodos.addEventListener("click", (e) => filtrarPorCategoria(e, listaJuegos, textoToast))
}

function filtrarPorNombre(juegos, valorBusqueda) {
    let valorBusquedaLower = valorBusqueda.toLowerCase()
    let juegosFiltrados = juegos.filter(juego => juego.nombre.toLowerCase().includes(valorBusquedaLower))
    crearTarjetasJuegos(juegosFiltrados)
    alertaToast(`Buscando: ${valorBusqueda}`)
}

function filtrarPorCategoria(e, juegos, texto) {
    let juegosFiltrados = juegos.filter(juego => juego.categoria.includes(e.target.value))
    crearTarjetasJuegos(juegosFiltrados)
    alertaToast(texto)
}


function setearCarrito(carrito) {
    let carritoJSON = JSON.stringify(carrito)
    localStorage.setItem("carrito",carritoJSON)
}

function obtenerCarrito() {
    let carrito = []
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }
    return carrito
}

function setearTotal(total) {
    localStorage.setItem("total", total)
}

function obtenerTotal() {
    let total = localStorage.getItem("total");
    return total ? Number(total) : 0
}


function agregarAlCarrito(e, juegos) {
    let carrito = obtenerCarrito()
    let idJuego = Number(e.target.id)
    let juegoBuscado = juegos.find(juego => juego.id === idJuego)
    let indiceJuegoCarrito = carrito.findIndex(juego => juego.id === idJuego)
    if(indiceJuegoCarrito != -1) {
        carrito[indiceJuegoCarrito].unidades++
        carrito[indiceJuegoCarrito].subtotal = carrito[indiceJuegoCarrito].precioUnitario * carrito[indiceJuegoCarrito].unidades
    }else{
        carrito.push({
            id: juegoBuscado.id,
            nombre: juegoBuscado.nombre,
            precioUnitario: juegoBuscado.precio,
            unidades: 1,
            subtotal: juegoBuscado.precio
        })
    }
    setearCarrito(carrito)
    actualizarContadorCarrito()
    renderizarCarrito(carrito)
    calcularTotal(carrito)
    mostrarTotal()
    alertaToast('Juego agregado al carrito')
}

function renderizarCarrito(carrito) {
    let contenedorCarrito = document.getElementById("contenedorCarrito");
    contenedorCarrito.innerHTML = ""

    carrito.forEach(juego => {
        contenedorCarrito.innerHTML += `
            <div id="tc${juego.id}" class="tarjeta__juego__carrito">
                <p>Nombre: ${juego.nombre}</p>
                <p>Precio Unitario: $${juego.precioUnitario}</p>
                <div class="cantidades">
                    <button id="br${juego.id}" class="formulario__submit btn__cantidad">-</button>
                    <p>${juego.unidades}</p>
                    <button id="bs${juego.id}" class="formulario__submit btn__cantidad">+</button>
                </div>
                <p>Subtotal: $${juego.subtotal}</p>
                <button id="be${juego.id}" class="formulario__submit btn__cantidad">Eliminar</button>
            </div>
        `
    })

    carrito.forEach(juego => {
        let botonEliminar = document.getElementById(`be${juego.id}`)
        botonEliminar.addEventListener("click", (e) => eliminarJuegoCarrito(e))

        let botonSumar = document.getElementById(`bs${juego.id}`)
        botonSumar.addEventListener("click", (e) => sumarUnidad(e))

        let botonRestar = document.getElementById(`br${juego.id}`)
        botonRestar.addEventListener("click", (e) => restarUnidad(e))
    })
}



function sumarUnidad(e) {
    let id = Number(e.target.id.substring(2))
    let carrito = obtenerCarrito()
    let juegoBuscado = carrito.find(juego => juego.id === id)
    
    if (juegoBuscado) {
        juegoBuscado.unidades++
        juegoBuscado.subtotal = juegoBuscado.unidades * juegoBuscado.precioUnitario
        setearCarrito(carrito)
        renderizarCarrito(carrito)
        actualizarContadorCarrito()
        calcularTotal(carrito)
        mostrarTotal()
        alertaToast('Unidad agregada del carrito')
    }
}

function restarUnidad(e) {
    let id = Number(e.target.id.substring(2))
    let carrito = obtenerCarrito()
    let juegoBuscado = carrito.find(juego => juego.id === id)
    
    if (juegoBuscado && juegoBuscado.unidades > 1) {
        juegoBuscado.unidades--
        juegoBuscado.subtotal = juegoBuscado.unidades * juegoBuscado.precioUnitario
        setearCarrito(carrito)
        renderizarCarrito(carrito)
        actualizarContadorCarrito()
        calcularTotal(carrito)
        mostrarTotal()
        alertaToast('Unidad quitada del carrito')
    } else if (juegoBuscado.unidades === 1) {
        eliminarJuegoCarrito(e)
    }
}

function eliminarJuegoCarrito(e) {
    let id = Number(e.target.id.substring(2))
    let carrito = obtenerCarrito()

    carrito = carrito.filter(juego => juego.id !== id)
    
    setearCarrito(carrito)
    renderizarCarrito(carrito)
    actualizarContadorCarrito()
    calcularTotal(carrito)
    mostrarTotal()
    alertaToast('Juego eliminado del carrito')
}


function calcularTotal(carrito) {
    let total = carrito.reduce((acum, juego) => acum + juego.subtotal, 0)
    localStorage.setItem("total", total)
    mostrarTotal()
}

function mostrarTotal() {
    let total = obtenerTotal()
    let contenedorTotal = document.getElementById("total")
    contenedorTotal.innerHTML = total > 0 ? `<h3>TOTAL: $${total}</h3>` : ""
}

function actualizarContadorCarrito() {
    let memoria = JSON.parse(localStorage.getItem("carrito")) || []
    let cuenta = memoria.reduce((acum, current) => acum + current.unidades, 0)
    let contadorCarrito = document.getElementById("cuenta-carrito")
    contadorCarrito.innerText = cuenta
}


function finalizarCompra() {
    let carrito = obtenerCarrito()

    if (carrito.length === 0){
        alertaToast("El carrito esta vacio")
    } else {
        alertaCartel()
        localStorage.removeItem("carrito")
        localStorage.removeItem("total")
        renderizarCarrito([])
        actualizarContadorCarrito()
        mostrarTotal()
    }
}


function mostrarOcultarCarrito() {
    let contenedorJuegos = document.getElementById("grid")
    let contenedorCarrito = document.getElementById("paginaCarrito")
    let botonCarrito = document.getElementById("btnCarrito")
    let busquedaReset = document.getElementById("busqueda__reset")
    let filtrosCategoria = document.getElementById("filtros__categoria")
    let contenedorFiltros = document.getElementById("filtros")

    if (contenedorCarrito.className === "oculto") {
        botonCarrito.innerText = "JUEGOS"
        contenedorFiltros.classList.add("rowReverse")
        alertaToast("Carrito mostrado")
    } else {
        botonCarrito.innerText = "CARRITO"
        contenedorFiltros.classList.remove("rowReverse")
        alertaToast("Juegos mostrados")
    }
    contenedorCarrito.classList.toggle("oculto")
    contenedorJuegos.classList.toggle("oculto")
    busquedaReset.classList.toggle("oculto")
    filtrosCategoria.classList.toggle("oculto")
}


const Toast = Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
})

function alertaToast(titulo) {
    Toast.fire({
        icon:'success',
        title: titulo
    })
}

function alertaCartel() {
    Swal.fire({
        title: 'Compra realizada con exito!',
        text: 'Gracias por su compra en >CodeMate!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#FFCE00',
        color: 'black'
    })
}



function main(juegos){
    crearTarjetasJuegos(juegos)
    crearFiltrosPorCategoria(juegos)  
    
    let carrito = obtenerCarrito()
    renderizarCarrito(carrito)
    actualizarContadorCarrito()
    
    let inputFiltro = document.getElementById("inputFiltros")
    let btnBuscar = document.getElementById("btnBuscar")

    btnBuscar.addEventListener("click", () => filtrarPorNombre(juegos, inputFiltro.value))

    let btnVerCarrito = document.getElementById("btnCarrito")
    btnVerCarrito.addEventListener("click", mostrarOcultarCarrito)

    let botonComprar = document.getElementById("btnComprar")
    botonComprar.addEventListener("click", () => finalizarCompra())

    let contadorCarritoCompras = document.getElementById("cart")
    contadorCarritoCompras.addEventListener("click", mostrarOcultarCarrito)
}