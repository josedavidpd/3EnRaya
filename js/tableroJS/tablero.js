const cuad1 = document.getElementById('cuad1');
const cuad2 = document.getElementById('cuad2');
const cuad3 = document.getElementById('cuad3');
const cuad4 = document.getElementById('cuad4');
const cuad5 = document.getElementById('cuad5');
const cuad6 = document.getElementById('cuad6');
const cuad7 = document.getElementById('cuad7');
const cuad8 = document.getElementById('cuad8');
const cuad9 = document.getElementById('cuad9');

var ponerCirculo = (a) => a.insertAdjacentHTML('afterbegin', '<img src="../img/circulo.svg" class="circulo"></img>');
var ponerEquis = (a) => a.insertAdjacentHTML('afterbegin', '<img src="../img/equis.svg" class="equis"></img>');
var timerStarted = false;


$(document).on('click', '.activo', e => {
    if (!timerStarted) {
        // timer.start();
    }
    if (document.getElementsByClassName('activo').length != 0) {
        ponerCirculo(e.target);
        e.target.classList.remove('activo');
    }
});

$(document).on('click', '.cuad', e => {
    if (document.getElementsByClassName('activo').length == 0) {
        // timer.stop();
        timerStarted = false;
    }
});