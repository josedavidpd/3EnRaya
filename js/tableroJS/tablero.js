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

var JUGADOR = {
    HUMANO: 1,
    CPU: 2
};
var ESTADO = {
    JUGANDO: 0,
    ESPERANDO: 1,
    TERMINADO: 2
};

class Tablero {
    constructor() {
        this.panel = [];

        this.cuads = [];
        for (var i = 0; i < 9; i++) {
            this.cuads[i] = $(`#${i}`);
        }
    }

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
            imprimirMensajeFinal(document.getElementById('titulo'), "Turno del jugador 1");
            this.tablero.marcar(JUGADOR.CPU, Math.floor(Math.random() * 9));
        }
        this.partidas++;
        this.estado = ESTADO.JUGANDO;
        imprimirMensajeFinal(document.getElementById('titulo'), "Turno del jugador");
    };

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
                        imprimirMensajeFinal(document.getElementById('titulo'), "Turno del jugador 1");
                        this.estado == ESTADO.JUGANDO;
                    }
                }
            }
        } else if (this.estado == ESTADO.TERMINADO) {
            this.reset();
        }
    };

    movimientoAI() {
        var posicion = 0;
        var aux, mejor = -9999;
        let aleatorioNumero = Math.floor((Math.random() * 4));
        console.log(`Linea156-${aleatorioNumero}`);

        if (aleatorioNumero == 0) {
            for (let i = 0; i < this.tablero.panel.length; i++) {
                if (this.tablero.marcable(i)) {
                    posicion = i;
                    console.log(i);
                    i = this.tablero.panel.length - 1;
                }
            }
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

$(document).on('click', '.cuad', e => {
    if (document.getElementsByClassName('activo').length == 0) {
        cronometro.parar();
        if (juego.tablero.esGanador(1)) {
            let tiempo = Object.values(cronometro)[2];
            let tiempoMin = Object.values(tiempo)[0];
            let tiempoSeg = Object.values(tiempo)[1];
            let tiempoMiliseg = Object.values(tiempo)[2];
            puntos = tiempoMin * tiempoSeg + tiempoMiliseg;
            imprimirMensajeFinal(document.getElementById('titulo'), mensajeGanar(puntos));
        } else if (juego.tablero.esGanador(2))
            imprimirMensajeFinal(document.getElementById('titulo'), mensajePerder);
        else
            imprimirMensajeFinal(document.getElementById('titulo'), mensajeEmpate);
        console.log('hola2');
        cronometroEmpezado = false;
    }
});

$(document).on('click', '#resetearCronometro', e => {
    cronometro.resetear();
});

function juegoGanado(simbolo) {
    if (simbolo == "circulo") {
        let tiempo = Object.values(cronometro)[2];
        let tiempoMin = Object.values(tiempo)[0];
        let tiempoSeg = Object.values(tiempo)[1];
        let tiempoMiliseg = Object.values(tiempo)[2];

        if (tiempoSeg > 0 && tiempoSeg <= 30) {
            puntos = 30
        }

        imprimirMensajeFinal(document.getElementById('titulo'), mensajeGanar(puntos));
    }
    cronometro.parar();
    cronometroEmpezado = false;
    $('.activo').removeClass('activo');
}

var juego = new Juego();
$(document).on('click', ('.activo'), e => {
    if (!cronometroEmpezado)
        cronometro.iniciar();
    juego.logica(parseInt(e.target.id));
});