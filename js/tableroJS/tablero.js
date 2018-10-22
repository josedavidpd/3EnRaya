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

function esGanador(simbolo) {
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
    if (esGanador('equis'))
        juegoGanado('equis');
}

$(document).on('click', '.activo', e => {
    if (!cronometroEmpezado)
        cronometro.iniciar();
    if (document.getElementsByClassName('activo').length != 0) {
        ponerCirculo(e.target);
        e.target.classList.remove('activo');
    }
    if (esGanador('circulo'))
        juegoGanado('circulo');
    else
        calcularMaquina();
});

$(document).on('click', '.cuad', e => {
    if (document.getElementsByClassName('activo').length == 0) {
        cronometro.parar();
        if (esGanador('circulo')) {
            let tiempo = Object.values(cronometro)[2];
            let tiempoMin = Object.values(tiempo)[0];
            let tiempoSeg = Object.values(tiempo)[1];
            let tiempoMiliseg = Object.values(tiempo)[2];
            puntos = tiempoMin * tiempoSeg + tiempoMiliseg;
            imprimirMensajeFinal(titulo, mensajeGanar(puntos));
        }
        else if (esGanador('equis'))
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
    console.log(document.getElementsByClassName('activo'));
    for (let index = 0; index < document.getElementsByClassName('activo').length; index++) {
        document.getElementsByClassName('activo')[index].classList.remove('activo');
    }
    console.log(document.getElementsByClassName('activo'));
}