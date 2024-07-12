alert("¡Bienvenido a >CodeMate!")
let opcion = pedirTexto("Ingrese para:\n1 - Comprar video juegos\n2 - Finalizar compra\n0 - Salir")
let total = 0

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