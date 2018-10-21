const cuad1 = document.getElementById('cuad1');
const cuad2 = document.getElementById('cuad2');
const cuad3 = document.getElementById('cuad3');
const cuad4 = document.getElementById('cuad4');
const cuad5 = document.getElementById('cuad5');
const cuad6 = document.getElementById('cuad6');
const cuad7 = document.getElementById('cuad7');
const cuad8 = document.getElementById('cuad8');
const cuad9 = document.getElementById('cuad9');
const cronometro = new Cronometro( document.getElementById('cronometro'));

var ponerCirculo = (a) => a.insertAdjacentHTML('afterbegin', '<i class="circulo"></i>');
var ponerEquis = (a) => a.insertAdjacentHTML('afterbegin', '<i class="equis"></i>');
var cronometroEmpezado = false;


$(document).on('click', '.activo', e => {
    if (!cronometroEmpezado) {
        cronometro.iniciar();
    }
    if (document.getElementsByClassName('activo').length != 0) {
        ponerCirculo(e.target);
        e.target.classList.remove('activo');
    }
});

$(document).on('click', '.cuad', e => {
    if (document.getElementsByClassName('activo').length == 0) {
        cronometro.parar();
        cronometroEmpezado = false;
    }
});

$(document).on('click', '#resetearCronometro', e=> {
    cronometro.resetear();
});