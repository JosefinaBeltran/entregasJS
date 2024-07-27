alert("¡Bienvenido a >CodeMate!")
let opcion = pedirTexto("Ingrese para:\n1 - Comprar video juegos\n2 - Finalizar compra\n3 - Filtrar por Categoría\n4 - Filtrar por plataforma para jugar\n0 - Salir")
let carrito = []
let total = 0

let juegos = [
    { id: 1, nombre: "Dark Souls 3", categoria: "Acción / RPG", precio: 60, plataforma: "PC, PS4" },
    { id: 2, nombre: "Genshin Impact", categoria: "Acción / Aventura / RPG", precio: 10, plataforma: "PC, PS4, PS5" },
    { id: 3, nombre: "Resident Evil 8", categoria: "Horror / Supervivencia", precio: 48, plataforma: "PC, PS4, PS5, Xbox One" },
    { id: 4, nombre: "OverCooked 2", categoria: "Simulación / Estrategia / Multijugador", precio: 5, plataforma: "PC, PS4, Xbox One, Nintendo Switch" },
    { id: 5, nombre: "League of Legends", categoria: "MOBA", precio: 80, plataforma: "PC" }
]

while (opcion !== 0) {
    if (opcion === 1) {
        total += agregarProductos()
    } else if (opcion === 2) {
        let descuento = prompt("Usted tiene un descuento en >CodeMate del 30%, si quiere aprovecharlo ingrese el código: CODERHOUSE")
        if(descuento === 'CODERHOUSE'){
            total = aplicarDescuento(total)
            alert("Total: $" + total + " USD.\n¡Gracias por su compra en >CodeMate!")
        }
        else{
            alert("Total: $" + total + " USD.\n¡Gracias por su compra en >CodeMate!")
        }
        total = 0
    } else {
        alert("Opción incorrecta, pruebe nuevamente!")
    }
    opcion = pedirTexto("Ingrese para:\n1 - Comprar video juegos\n2 - Finalizar compra\n0 - Salir")
}

function agregarProductos() {
    let opcionCompra = pedirTexto("Ingrese el video juego que desea comprar:\n1 - Dark Souls 3 $60\n2 - Genshin impact $10\n3 - Resident Evil 8 $49\n4 - OverCooked 2 $5\n5 - League of Legends $100\n0 - Salir\n\n*Los precios están en USD.")
    let unidades
    let subtotal
    switch (opcionCompra) {
        case 0:
            alert("¡Adios!. Espero que vuelva pronto")
            break;
        case 1:
            unidades = pedirTexto("Ingrese cantidad de unidades: ")
            subtotal = unidades * 60         
            break;
        case 2:
            unidades = pedirTexto("Ingrese cantidad de unidades: ")
            subtotal = unidades * 10        
            break;
        case 3:
            unidades = pedirTexto("Ingrese cantidad de unidades: ")
            subtotal = unidades * 49    
            break;
        case 4:
            unidades = pedirTexto("Ingrese cantidad de unidades: ")
            subtotal = unidades * 5
            break;
        case 5:
            unidades = pedirTexto("Ingrese cantidad de unidades: ")
            subtotal = unidades * 100
            break;
        default:
            alert("Ingreso número no valido.")
            agregarProductos()
    }
    return subtotal
}

function pedirTexto(texto) {
    return Number(prompt(texto))
}

function aplicarDescuento(total){
    let descuento = (total * 30) / 100
    let totalConDescuento = total - descuento
    return totalConDescuento
}
