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

    marcar(turno, posicion) {
        this.panel[posicion] = turno;
        console.log(this.panel);
    }
}

var tablero = new Tablero();


function calcularMaquina() {
    arrayActivo = document.getElementsByClassName('activo');
    if (arrayActivo.length == 0) {
        cronometro.parar();
        cronometroEmpezado = false;
    } else {
        let aleatorio = Math.floor((Math.random() * arrayActivo.length));
        ponerEquis(arrayActivo[aleatorio]);
        tablero.marcar(JUGADOR.CPU, arrayActivo[aleatorio].id);
        arrayActivo[aleatorio].classList.remove('activo');
    }
    if (tablero.esGanador('equis'))
        juegoGanado('equis');
}

$(document).on('click', '.activo', e => {
    if (!cronometroEmpezado)
        cronometro.iniciar();
    if (document.getElementsByClassName('activo').length != 0) {
        ponerCirculo(e.target);
        tablero.marcar(JUGADOR.HUMANO, e.target.id);
        e.target.classList.remove('activo');
    }
    if (tablero.esGanador('circulo'))
        juegoGanado('circulo');
    else
        calcularMaquina();
});

$(document).on('click', '.cuad', e => {
    if (document.getElementsByClassName('activo').length == 0) {
        cronometro.parar();
        if (tablero.esGanador('circulo')) {
            let tiempo = Object.values(cronometro)[2];
            let tiempoMin = Object.values(tiempo)[0];
            let tiempoSeg = Object.values(tiempo)[1];
            let tiempoMiliseg = Object.values(tiempo)[2];
            puntos = tiempoMin * tiempoSeg + tiempoMiliseg;
            imprimirMensajeFinal(titulo, mensajeGanar(puntos));
        } else if (esGanador('equis'))
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