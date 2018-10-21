"use strict";
var Cronometro = /** @class */ (function () {
    function Cronometro(pantalla) {
        this.ejecutando = false;
        this.pantalla = pantalla;
        this.resetear();
        this.imprimir();
    }
    Cronometro.prototype.resetear = function () {
        this.tiempo = {
            minutos: 0,
            segundos: 0,
            milisegundos: 0
        };
    };
    Cronometro.prototype.imprimir = function () {
        this.pantalla.innerText = this.format(this.tiempo);
    };
    Cronometro.prototype.format = function (tiempo) {
        return rellenar0(tiempo.minutos) + ":" + rellenar0(tiempo.segundos) + ":" + rellenar0(Math.floor(tiempo.milisegundos));
    };
    Cronometro.prototype.iniciar = function () {
        var _this = this;
        if (!this.ejecutando) {
            this.ejecutando = true;
            this.reloj = setInterval(function () { return _this.avanzar(); }, 10);
        }
    };
    Cronometro.prototype.avanzar = function () {
        if (!this.ejecutando)
            return;
        this.calcular();
        this.imprimir();
    };
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
    Cronometro.prototype.parar = function () {
        this.ejecutando = false;
        clearInterval(this.reloj);
    };
    return Cronometro;
}());
function rellenar0(valor) {
    var resultado = valor.toString();
    if (resultado.length < 2) {
        resultado = '0' + resultado;
    }
    return resultado;
}
