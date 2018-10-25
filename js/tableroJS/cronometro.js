"use strict";
// Se crea una clase cronometro, con sus atributos , constructores y métodos, como en java
var Cronometro = /** @class */ (function () {
    function Cronometro(pantalla) {
        this.ejecutando = false;
        this.pantalla = pantalla;
        this.resetear();
        this.imprimir();
    }
    // Función para resetear el cronometro
    Cronometro.prototype.resetear = function () {
        this.tiempo = {
            minutos: 0,
            segundos: 0,
            milisegundos: 0
        };
    };
    // Funcion para imprimir el tiempo en un formato
    Cronometro.prototype.imprimir = function () {
        this.pantalla.innerText = this.format(this.tiempo);
    };
    // Funcion para decir el formato en el que vamos a imprimir el tiempo
    Cronometro.prototype.format = function (tiempo) {
        return rellenar0(tiempo.minutos) + ":" + rellenar0(tiempo.segundos) + ":" + rellenar0(Math.floor(tiempo.milisegundos));
    };
    // Para iniciar el cronometro
    Cronometro.prototype.iniciar = function () {
        var _this = this;
        if (!this.ejecutando) {
            this.ejecutando = true;
            this.reloj = setInterval(function () { return _this.avanzar(); }, 10);
        }
    };
    // Función encargada de realizar la actualización del tiempo en el reloj y la impresión por pantalla.
    Cronometro.prototype.avanzar = function () {
        if (!this.ejecutando)
            return;
        this.calcular();
        this.imprimir();
    };
    // Funcion encargada de realizar el aumento del tiempo milisegundo a milisegundo y convertir los milisegundos a segundos y segundos a minutos.
    Cronometro.prototype.calcular = function () {
        this.tiempo.milisegundos += 1;
        if (this.tiempo.milisegundos >= 100) {
            this.tiempo.segundos += 1;
            this.tiempo.milisegundos = 0;
        }
        if (this.tiempo.segundos >= 60) {
            this.tiempo.minutos += 1;
            this.tiempo.segundos = 0;
        }
    };
    // Funcion para detener el cronometro
    Cronometro.prototype.parar = function () {
        this.ejecutando = false;
        clearInterval(this.reloj);
    };
    return Cronometro;
}());
// Función que rellena con ceros los espacios de tiempo que están inutilizados.
function rellenar0(valor) {
    var resultado = valor.toString();
    if (resultado.length < 2) {
        resultado = "0" + resultado;
    }
    return resultado;
}
