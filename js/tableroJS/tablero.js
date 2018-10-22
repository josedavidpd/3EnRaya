const cuad1 = document.getElementById('1');
const cuad2 = document.getElementById('2');
const cuad3 = document.getElementById('3');
const cuad4 = document.getElementById('4');
const cuad5 = document.getElementById('5');
const cuad6 = document.getElementById('6');
const cuad7 = document.getElementById('7');
const cuad8 = document.getElementById('8');
const cuad9 = document.getElementById('9');
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
const tablero = new Tablero();

function calcularMaquina() {
    arrayActivo = document.getElementsByClassName('activo');
    if (arrayActivo.length == 0) {
        cronometro.parar();
        cronometroEmpezado = false;
    } else {
        let aleatorio = Math.floor((Math.random() * arrayActivo.length));
        ponerEquis(arrayActivo[aleatorio]);
        arrayActivo[aleatorio].classList.remove('activo');
    }
}

$(document).on('click', '.activo', e => {
    
    if (!cronometroEmpezado) {
        cronometro.iniciar();
    }
    if (document.getElementsByClassName('activo').length != 0) {
        ponerCirculo(e.target);
        e.target.classList.remove('activo');
    }

    calcularMaquina();
    
});

$(document).on('click', '.cuad', e => {
    if (document.getElementsByClassName('activo').length == 0) {
        cronometro.parar();
        if (ganaJugador) {
            let tiempo = Object.values(cronometro)[2];
            let tiempoMin = Object.values(tiempo)[0];
            let tiempoSeg = Object.values(tiempo)[1];
            let tiempoMiliseg = Object.values(tiempo)[2];
            puntos = tiempoMin * tiempoSeg + tiempoMiliseg;
            imprimirMensajeFinal(titulo, mensajeGanar(puntos));
        } else if (empate) {
            imprimirMensajeFinal(titulo, mensajeEmpate);
        } else {
            imprimirMensajeFinal(titulo, mensajePerder);
        }
        cronometroEmpezado = false;
    }
});

$(document).on('click', '#resetearCronometro', e=> {
    cronometro.resetear();
});