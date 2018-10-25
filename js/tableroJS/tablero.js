const cuad1 = $('#0');
const cuad2 = $('#1');
const cuad3 = $('#2');
const cuad4 = $('#3');
const cuad5 = $('#4');
const cuad6 = $('#5');
const cuad7 = $('#6');
const cuad8 = $('#7');
const cuad9 = $('#8');
const cronometro = new Cronometro(document.getElementById('cronometro'));
const mensajePerder = "Lo sentimos, has perdido";
const mensajeEmpate = "Nadie ha ganado";
const imprimirMensajeFinal = (a, b) => a.innerHTML = b;
const ponerCirculo = a => a.insertAdjacentHTML('afterbegin', '<i class="circulo"></i>');
const ponerEquis = a => a.insertAdjacentHTML('afterbegin', '<i class="equis"></i>');
var cronometroEmpezado = false;
var puntos = 0;
var mensajeGanar = pnts => `Enhorabuena, has ganado con ${pnts} puntos`;
var arrayActivo;
var ganaJugador = false;
var empate = false;
var token = localStorage.getItem("token");
var username = localStorage.getItem("username");

var JUGADOR = {
    HUMANO: 1,
    CPU: 2
};
var ESTADO = {
    JUGANDO: 0,
    ESPERANDO: 1,
    TERMINADO: 2
};

// Se crea un objeto tablero con atributos cuads: compuesto de todos los elementos que forman el tablero, y atributo panel, que es un array compuesto de los cuadrados ocupados, guardando el valor 1 si lo ocupa el humano y 2 si lo ocupa la cpu.
class Tablero {
    constructor() {
        this.panel = [];

        this.cuads = [];
        for (var i = 0; i < 9; i++) {
            this.cuads[i] = $(`#${i}`);
        }
    }
    // Comprobacion del panel para saber si se ha ganado. Se le pasa el numero del jugador para comprobar tanto equis como circulos.
    esGanador(jugador) {
        //HORIZONTAL
        var bool = (this.panel[0] == jugador && this.panel[1] == jugador && this.panel[2] == jugador);
        bool = bool || (this.panel[3] == jugador && this.panel[4] == jugador && this.panel[5] == jugador);
        bool = bool || (this.panel[6] == jugador && this.panel[7] == jugador && this.panel[8] == jugador);
        //VERTical
        bool = bool || (this.panel[0] == jugador && this.panel[3] == jugador && this.panel[6] == jugador);
        bool = bool || (this.panel[1] == jugador && this.panel[4] == jugador && this.panel[7] == jugador);
        bool = bool || (this.panel[2] == jugador && this.panel[5] == jugador && this.panel[8] == jugador);
        //DIAGONAl
        bool = bool || (this.panel[0] == jugador && this.panel[4] == jugador && this.panel[8] == jugador);
        bool = bool || (this.panel[2] == jugador && this.panel[4] == jugador && this.panel[6] == jugador);
        return bool;
    };

    marcable(posicion) {
        return (this.panel[posicion] == 0);
    };

    marcar(turno, posicion) {
        this.panel[posicion] = turno;
    };

    reset() {
        this.panel = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    };

    celdasVacias() {
        var n = this.panel.length;
        for (var i = 0; i < n; i++) {
            if (this.panel[i] == 0)
                return true;
        }
        return false;
    };
}

// Se crea un objeto Juego compuesto de un tablero, un estado, una variable partidas que indica el numero de partidas consecutivas sin refrescar la pagina, 
// la consola (lugar donde se imprimen los mensajes de estado) y se realiza un reset para comenzar la partida a 1.
class Juego {
    constructor() {
        this.partidas = 0;
        this.tablero = new Tablero();
        this.estado = null;
        this.consola = document.getElementById('titulo');
        this.reset();
    }

    reset() {
        this.tablero.reset();
        if (this.partidas % 2 == 1) {
            this.estado = ESTADO.ESPERANDO;
            imprimirMensajeFinal(document.getElementById('titulo'), "Turno del jugador");
            this.tablero.marcar(JUGADOR.CPU, Math.floor(Math.random() * 9));
        }
        this.partidas++;
        this.estado = ESTADO.JUGANDO;
        imprimirMensajeFinal(document.getElementById('titulo'), "Turno del jugador");
    };

    // Se comprueba el estado del juego, si es "esperando", es el turno de la CPU, de lo contrario no hace nada. Si el estado es terminado resetea los paneles del Tablero.
    // Comprueba que la casilla elegida está vacía, si lo está se comprueba si se ha ganado. Si no ha ganado y no quedan casillas vacias, hay empate. Si quedan casillas libres, realiza el movimiento de la IA, que disparará de nuevo las comprobaciones de finalización de la partida.
    logica(posicion) {
        if (this.estado == ESTADO.JUGANDO) {
            if (this.tablero.marcable(posicion)) {
                this.tablero.marcar(JUGADOR.HUMANO, posicion);
                ponerCirculo(document.getElementById(posicion));
                document.getElementById(posicion).classList.remove('activo');
                if (this.tablero.esGanador(JUGADOR.HUMANO)) {
                    this.estado = ESTADO.TERMINADO;
                    juegoGanado('circulo');
                } else if (!this.tablero.celdasVacias()) {
                    this.estado = ESTADO.TERMINADO;
                    cronometro.parar();
                    cronometroEmpezado = false;
                    imprimirMensajeFinal(document.getElementById('titulo'), mensajeEmpate);
                } else {
                    this.estado == ESTADO.ESPERANDO;
                    imprimirMensajeFinal(document.getElementById('titulo'), "Turno de la máquina...");
                    this.movimientoAI();

                    if (this.tablero.esGanador(JUGADOR.CPU)) {
                        this.estado = ESTADO.TERMINADO;
                        juegoGanado('equis');
                        imprimirMensajeFinal(document.getElementById('titulo'), mensajePerder);
                    } else if (!this.tablero.celdasVacias()) {
                        this.estado = ESTADO.TERMINADO;
                        cronometro.parar();
                        cronometroEmpezado = false;
                        imprimirMensajeFinal(document.getElementById('titulo'), mensajeEmpate);
                    } else {
                        imprimirMensajeFinal(document.getElementById('titulo'), "Turno del jugador");
                        this.estado == ESTADO.JUGANDO;
                    }
                }
            }
        } else if (this.estado == ESTADO.TERMINADO) {
            this.reset();
        }
    };

    // Tratamiento del movimiento de la IA, hace uso de la funcion min y max. Por decisión de grupo y para hacerlo competitivo pero no injusto, se crea un numero aleatorio entre 0 y 3.
    // Si ese numero es 0, la maquina realiza un movimiento aleatorio.
    // Si es 1, 2 o 3, la máquina simula el movimiento del Jugador para ganar, y escoge esa posición que será la más favorable para evitar que gane el Jugador y a su vez intentar ganar la máquina.
    // Se recorre todas las celdas del tablero y se marcan si no lo están. 
    movimientoAI() {
        var posicion = 0;
        var aux, mejor = -9999;
        let aleatorioNumero = Math.floor((Math.random() * 4));

        if (aleatorioNumero == 0) {
            posicion = calcularMovimientoAleatorio();
        } else {
            for (let i = 0; i < this.tablero.panel.length; i++) {
                if (this.tablero.marcable(i)) {
                    this.tablero.marcar(JUGADOR.CPU, i);
                    aux = this.min();
                    if (aux > mejor) {
                        mejor = aux;
                        posicion = i;
                    }
                    this.tablero.marcar(0, i);
                }
            }
        }
        this.tablero.marcar(JUGADOR.CPU, posicion);
        ponerEquis(document.getElementById(posicion));
        document.getElementById(posicion).classList.remove('activo');
    };

    // Simulación del turno del Jugador, que intenta hacer que no gane o que empate.
    min() {
        if (this.tablero.esGanador(JUGADOR.CPU)) return 1;
        if (!this.tablero.celdasVacias()) return 0;
        var aux, mejor = 9999;

        for (let i = 0; i < this.tablero.panel.length; i++) {
            if (this.tablero.marcable(i)) {
                this.tablero.marcar(JUGADOR.HUMANO, i);
                aux = this.max();
                if (aux < mejor) {
                    mejor = aux;
                }
                this.tablero.marcar(0, i);
            }
        }
        return mejor;
    }

    // Simula el turno de la máquina y busca el valor más alto para conseguir la victoria.
    max() {
        if (this.tablero.esGanador(JUGADOR.HUMANO)) return -1;
        if (!this.tablero.celdasVacias()) return 0;
        var aux, mejor = -9999;

        for (let i = 0; i < this.tablero.panel.length; i++) {
            if (this.tablero.marcable(i)) {
                this.tablero.marcar(JUGADOR.CPU, i);
                aux = this.min();
                if (aux > mejor) {
                    mejor = aux;
                }
                this.tablero.marcar(0, i);
            }
        }
        return mejor;
    }
}

// Se crea un array y se rellena de elementos html con los cuadrados activos (usando la funcion marcable encontrada en Tablero). Para que la eleccion sea aleatoria se baraja el array. Devuelve el id del primer elemento de ese array de activos aleatorio.
// Como al principio del metodo el arrayActivo se instancia vacio, nunca almacenará los valores previos.
function calcularMovimientoAleatorio() {
    let posicionAleatoriaResult;
    let arrayActivo = [];
    for (let index = 0; index < juego.tablero.panel.length; index++) {
        if (juego.tablero.marcable(index)) {
            arrayActivo.push($(`#${index}`));
        }
    }
    arrayActivo.sort(() => Math.random() - 0.5);
    posicionAleatoriaResult = arrayActivo[0].attr('id');
    return posicionAleatoriaResult;
}

// Boton para resetear el cronometro. Utilizarlo para quedar el primero es trampa, sé legal. Existe por el hecho de demostración.
$(document).on('click', '#resetearCronometro', e => {
    cronometro.resetear();
});

// Tratamiento de juego ganado. Si gana el jugador (circulo) realiza la peticion AJAX para enviar el dato del tiempo y el booleano ganaJugador en true. Tambien se para el cronometro y elimina la clase activo de todos los cuadros del tablero.
function juegoGanado(simbolo) {
    if (simbolo == "circulo") {
        ganaJugador = true;
        puntos = 3;

        imprimirMensajeFinal(document.getElementById('titulo'), mensajeGanar(puntos));
        $.ajax({
                method: "POST",
                url: "http://www.miguelcamposrivera.com:3008/tictactoeapi/battle/create",
                dataType: "json",
                data: {
                    win: ganaJugador,
                    time: conseguirTiempoEnSegundos()
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

                }
            })

            .fail(function (resp) {
                console.log("ERROR RESPUESTA");
                console.log(resp);
            });

        $("#btn-logout").on('click', function () {
            localStorage.removeItem('token')
            localStorage.removeItem('username');
            location.replace('../../html/login.html');

        });
    }
    cronometro.parar();
    cronometroEmpezado = false;
    $('.activo').removeClass('activo');
}

// Encargado de transformar el tiempo a segundos. Utilizado para el ranking.
function conseguirTiempoEnSegundos() {
    let tiempo = Object.values(cronometro)[2];
    let tiempoMin = parseInt(Object.values(tiempo)[0]);
    let tiempoSeg = parseInt(Object.values(tiempo)[1]);
    let tiempoMiliseg = parseInt(Object.values(tiempo)[2]);
    return parseInt(Math.round((tiempoMin * 60) + tiempoSeg + (tiempoMiliseg / 60)));
}

// Sustitución del nombre en la barra superior cogiendo el valor de la sesión.
$(".nombreUsuario").html(username);

// Tratamiendo de cierre de sesión.
$("#btn-logout").on('click', function () {
    localStorage.removeItem('token')
    localStorage.removeItem('username');
    location.replace('../../3EnRaya/html/login.html');
});

// Inicialización del Juego.
var juego = new Juego();
$(document).on('click', ('.activo'), e => {
    if (!cronometroEmpezado)
        cronometro.iniciar();
    juego.logica(parseInt(e.target.id));
});