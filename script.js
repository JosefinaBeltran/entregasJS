alert("¡Bienvenido a >CodeMate!")
let opcion = pedirTexto("Ingrese para:\n1 - Comprar video juegos\n2 - Finalizar compra\n3 - Buscar juego\n4 - Filtrar por Categoria\n0 - Salir")
let carrito = []
let total = 0

//array de juegos que se venden en la pagina web
let juegos = [
    { id: 1, nombre: "Dark Souls 3", categoria: "Acción / RPG", precio: 60, plataforma: "PC, PS4" },
    { id: 2, nombre: "Genshin Impact", categoria: "Acción / Aventura / RPG", precio: 10, plataforma: "PC, PS4, PS5" },
    { id: 3, nombre: "Resident Evil 8", categoria: "Horror / Supervivencia", precio: 48, plataforma: "PC, PS4, PS5, Xbox One" },
    { id: 4, nombre: "OverCooked 2", categoria: "Simulación / Estrategia / Multijugador", precio: 5, plataforma: "PC, PS4, Xbox One, Nintendo Switch" },
    { id: 5, nombre: "League of Legends", categoria: "MOBA", precio: 80, plataforma: "PC" }
]

while (opcion !== 0) {
    //Comprar juego
    if (opcion === 1){
        let idJuego = pedirTexto("Ingrese el ID del video juego que desea comprar: \n" + listar(juegos))
        //con el metodo some() buscamos verificar que en el el array juegos existe al menos un ID igual al ID ingresado.
        //Respuestas posibles: True o False
        if (juegos.some( juegos => juegos.id === idJuego)){
            //Con el metodo find() buscamos que nos guarde en la var el juego que tiene el ID ingresado
            let juegoIngresado = juegos.find(juegos => juegos.id === idJuego)
            //Con el metodo findIndex() vamos a buscar comprobar si el juego ya esta en el carrito
            //Respuestas posibles: 1, -1 
            let juegoEnCarrito = carrito.findIndex(juegos => juegos.id === idJuego)
            if (juegoEnCarrito === -1){
                let unidades = pedirTexto("Ingrese cantidad de unidades: ")
                carrito.push({
                        id: juegoIngresado.id, 
                        nombre: juegoIngresado.nombre, 
                        categoria: juegoIngresado.categoria, 
                        precioUnitario: juegoIngresado.precio, 
                        plataforma: juegoIngresado.plataforma,
                        unidades: unidades,
                        subtotal: juegoIngresado.precio * unidades
                    })
            }
            else {
                carrito[juegoEnCarrito].unidades++
                carrito[juegoEnCarrito].subtotal = carrito[juegoEnCarrito].unidades * carrito[juegoEnCarrito].precioUnitario
            }
        }
        else {
            alert("El ID ingresado no existe. Intente nuevamente.")
        }
    }
    //Finalizar Compra
    else if (opcion === 2){
        if(carrito.length > 0){
            //con el metodo reduce() buscamos que se calcule el total de la compra
            let total = carrito.reduce((acumulador, juego) => acumulador + juego.subtotal, 0)
            let descuento = prompt("Usted tiene un descuento en >CodeMate del 30%, si quiere aprovecharlo ingrese el código: CODERHOUSE")
            if(descuento === 'CODERHOUSE'){
                total = aplicarDescuento(total)
                alert("Total: $" + total + " USD.\n¡Gracias por su compra en >CodeMate!")
            }
            else{
                alert("Total: $" + total + " USD.\n¡Gracias por su compra en >CodeMate!")
            }
            //total = 0
            break
        }
        else{
            alert("Su carrito se encuentra vacío.")
        }
    }
    //Buscar juego
    else if (opcion === 3){
        let nombreJuego = prompt("Ingrese el nombre del juego que desea buscar: ")
        let juegoBuscado = juegos.find(juegos => juegos.nombre.toUpperCase().includes(nombreJuego.toUpperCase()))
        if(juegoBuscado){
            alert("Juego encontrado: \n" + juegoBuscado.id + " - " + juegoBuscado.nombre + " | Precio: " + juegoBuscado.precio + " | Categoria: " + juegoBuscado.categoria)
        }
        else{
            alert("El juego ingresado no se encuentra en nuestra página web.")
        }
    }
    //Filtrar por categoría
    else if (opcion === 4){
        let categoriaJuego = prompt("Ingrese la categoría que desea buscar: ")
        let categoriaBuscada = juegos.filter(juego => juego.categoria.toUpperCase().includes(categoriaJuego.toUpperCase()))
        if (categoriaBuscada.length > 0){
            alert("Juegos con la categoría buscada: \n" + listar(categoriaBuscada))
        }
        else{
            alert("La categoría buscada no se encuentra en nuestra página web.")
        }
    }
    opcion = pedirTexto("Ingrese para:\n1 - Comprar video juegos\n2 - Finalizar compra\n3 - Buscar juego\n4 - Filtrar por Categoria\n0 - Salir")
}

function listar(listaJuegos){
    //con el metodo map() buscamos que nos guarde en un nuevo array los juegos que selecciona el cliente
    //Nuevo array
    return listaJuegos.map(juegos => juegos.id + " - " + juegos.nombre + " | Precio: " + juegos.precio + " | Categoria: " + juegos.categoria).join("\n")
}

function pedirTexto(texto) {
    return Number(prompt(texto))
}

function aplicarDescuento(total){
    let descuento = (total * 30) / 100
    let totalConDescuento = total - descuento
    return totalConDescuento
}