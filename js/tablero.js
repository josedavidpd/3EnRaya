var ponerCirculo = (a) => a.insertAdjacentHTML('afterbegin', '<img src="../img/circulo.svg" class="circulo"></img>');
var ponerEquis = (a) => a.insertAdjacentHTML('afterbegin', '<img src="../img/equis.svg" class="equis"></img>');
const cuad1 = document.getElementById('cuad1');
const cuad2 = document.getElementById('cuad2');
const cuad3 = document.getElementById('cuad3');
const cuad4 = document.getElementById('cuad4');
const cuad5 = document.getElementById('cuad5');
const cuad6 = document.getElementById('cuad6');
const cuad7 = document.getElementById('cuad7');
const cuad8 = document.getElementById('cuad8');
const cuad9 = document.getElementById('cuad9');
document.querySelector('.cuad.activo').addEventListener('click', e => {
    console.log(e.target);
    ponerCirculo(e.target);
    e.target.classList.remove('activo');
});