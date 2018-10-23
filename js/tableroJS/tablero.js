const cuad1 = $('#1');
const cuad2 = $('#2');
const cuad3 = $('#3');
const cuad4 = $('#4');
const cuad5 = $('#5');
const cuad6 = $('#6');
const cuad7 = $('#7');
const cuad8 = $('#8');
const cuad9 = $('#9');
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
        for (var i = 1; i <= 9; i++) {
            this.cuads[i] = $(`#${i}`);
        }
    }

    esGanador(simbolo) {
        //HORIZONTAL
        var bool = (cuad1.has(`i.${simbolo}`).length != 0 && cuad2.has(`i.${simbolo}`).length != 0 && cuad3.has(`i.${simbolo}`).length != 0);
        bool = bool || (cuad4.has(`i.${simbolo}`).length != 0 && cuad5.has(`i.${simbolo}`).length != 0 && cuad6.has(`i.${simbolo}`).length != 0);
        bool = bool || (cuad7.has(`i.${simbolo}`).length != 0 && cuad8.has(`i.${simbolo}`).length != 0 && cuad9.has(`i.${simbolo}`).length != 0);
        //VERTical
        bool = bool || (cuad1.has(`i.${simbolo}`).length != 0 && cuad4.has(`i.${simbolo}`).length != 0 && cuad7.has(`i.${simbolo}`).length != 0);
        bool = bool || (cuad2.has(`i.${simbolo}`).length != 0 && cuad5.has(`i.${simbolo}`).length != 0 && cuad8.has(`i.${simbolo}`).length != 0);
        bool = bool || (cuad3.has(`i.${simbolo}`).length != 0 && cuad6.has(`i.${simbolo}`).length != 0 && cuad9.has(`i.${simbolo}`).length != 0);
        //DIAGONAl
        bool = bool || (cuad1.has(`i.${simbolo}`).length != 0 && cuad5.has(`i.${simbolo}`).length != 0 && cuad9.has(`i.${simbolo}`).length != 0);
        bool = bool || (cuad3.has(`i.${simbolo}`).length != 0 && cuad5.has(`i.${simbolo}`).length != 0 && cuad7.has(`i.${simbolo}`).length != 0);
        return bool;
    };

    marcable(posicion) {
        return (this.panel[posicion]==0);
    };

    marcar(turno, posicion) {
        this.panel[posicion] = turno;
        console.log(this.panel);
    };

    reset() {
        this.panel=[0,0,0,0,0,0,0,0,0];
    };

    celdasVacias() {
        var n = this.panel.length;
        for (var i=0;i<n;i++) {
		    if (this.panel[i]==0)
			    return true;
	    }
	    return false;
    };
}

class Juego {
    constructor() {
        this.partidas = 0;
        this.tablero = new Tablero();
        this.estado=null;
        this.consola=document.getElementById('titulo');
        this.reset();
    }

    reset() {
        this.tablero.reset();
        if (this.partidas%2==1) {
            this.estado=ESTADO.ESPERANDO;
            imprimirMensajeFinal("titulo","Turno del jugador 2");
            this.tablero.marcar(JUGADOR.CPU,Math.floor(Math.random() * 9));
        }
        this.partidas++;
        this.estado=ESTADO.JUGANDO;
        imprimirMensajeFinal("titulo", "Turno de la maquina");
    };

    logica(posicion) {
        if (this.estado == ESTADO.JUGANDO) {
            if (this.tablero.marcable(posicion)) {
                this.tablero.marcar(JUGADOR.HUMANO, posicion);
                if (this.tablero.esGanador(JUGADOR.HUMANO)) {
                    this.estado = ESTADO.TERMINADO;
                    this.mostrarMensaje("¡HAS GANADO!<br/>Click en una celda para comenzar de nuevo.", "red");
                } else if (!this.tablero.celdasVacias()) {
                    this.estado = ESTADO.TERMINADO;
                    this.mostrarMensaje("¡EMPATE!<br/>Click en una celda para comenzar de nuevo.", "orange");
                } else {
                    this.estado == ESTADO.ESPERANDO;
                    this.mostrarMensaje("Turno de AI...", "blue");
                    this.movimientoAI();

                    if (this.tablero.esGanador(JUGADOR.CPU)) {
                        this.estado = ESTADO.TERMINADO;
                        this.mostrarMensaje("¡AI GANA!<br/>Click en una celda para comenzar de nuevo.", "blue");
                    } else if (!this.tablero.celdasVacias()) {
                        this.estado = ESTADO.TERMINADO;
                        this.mostrarMensaje("¡EMPATE!<br/>Click en una celda para comenzar de nuevo.", "orange");
                    } else {
                        this.mostrarMensaje("Turno del jugador 1", "red");
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
        var n = this.tablero.panel.length;
        var aux, mejor = -9999;

        for (var i = 0; i < n; i++) {
            if (this.tablero.marcable(i)) {
                this.tablero.marcar(JUGADOR.CPU, i);
                aux = this.min();
                if (aux > mejor) {
                    mejor = aux;
                    posicion = i;
                }
                this.tablero.marcar(0, i);
                ponerEquis(arrayActivo[i]);
            }
        }
        this.tablero.marcar(JUGADOR.CPU, posicion);
        ponerEquis(arrayActivo[posicion]);
    };

    min() {
        if (this.tablero.esGanador(JUGADOR.CPU)) return 1;
        if (!this.tablero.celdasVacias()) return 0;
        var n = this.tablero.panel.length;
        var aux, mejor = 9999;

        for (var i = 0; i < n; i++) {
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
        var n = this.tablero.panel.length;
        var aux, mejor = -9999;

        for (var i = 0; i < n; i++) {
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

function calcularMaquina() {
    arrayActivo = document.getElementsByClassName('activo');
    if (arrayActivo.length == 0) {
        cronometro.parar();
        cronometroEmpezado = false;
    } else {
        // let aleatorio = Math.floor((Math.random() * arrayActivo.length));
        // ponerEquis(arrayActivo[aleatorio]);
        // juego.tablero.marcar(JUGADOR.CPU, arrayActivo[aleatorio].id);
        // arrayActivo[aleatorio].classList.remove('activo');
        juego.movimientoAI();
    }
    if (juego.tablero.esGanador('equis'))
        juegoGanado('equis');
}

$(document).on('click', '.activo', e => {
    if (!cronometroEmpezado)
        cronometro.iniciar();
    if (document.getElementsByClassName('activo').length != 0) {
        ponerCirculo(e.target);
        juego.tablero.marcar(JUGADOR.HUMANO, e.target.id);
        e.target.classList.remove('activo');
    }
    if (juego.tablero.esGanador('circulo'))
        juegoGanado('circulo');
    else
        calcularMaquina();
});

$(document).on('click', '.cuad', e => {
    if (document.getElementsByClassName('activo').length == 0) {
        cronometro.parar();
        if (juego.tablero.esGanador('circulo')) {
            let tiempo = Object.values(cronometro)[2];
            let tiempoMin = Object.values(tiempo)[0];
            let tiempoSeg = Object.values(tiempo)[1];
            let tiempoMiliseg = Object.values(tiempo)[2];
            puntos = tiempoMin * tiempoSeg + tiempoMiliseg;
            imprimirMensajeFinal(titulo, mensajeGanar(puntos));
        } else if (juego.tablero.esGanador('equis'))
            imprimirMensajeFinal(titulo, mensajePerder);
        else
            imprimirMensajeFinal(titulo, mensajeEmpate);
        cronometroEmpezado = false;
    }
});

$(document).on('click', '#resetearCronometro', e => {
    cronometro.resetear();
});

function juegoGanado(simbolo) {
    alert(`Ganador ${simbolo}`);
    cronometro.parar();
    cronometroEmpezado = false;
    $('.activo').removeClass('activo');
}

var juego = new Juego();