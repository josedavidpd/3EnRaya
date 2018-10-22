/**https://codepen.io/anon/pen/QZBWxo */

function iniciarJuego() {
    jugadorVsMaquina();
}

function eleccionAleatoria() {
    let espaciosOcupados = tableroJuego.espaciosTablero.map(val => parseInt(val, 10));
    tableroJuego.espaciosDisponibles = tableroJuego.espaciosDisponibles.filter(function (val) {
        return espaciosOcupados.indexOf(parseInt(val, 10)) === -1;
    });
    let randIndex = Math.floor(
        Math.random() * (tableroJuego.espaciosDisponibles.length - 1)
    );
    return tableroJuego.espaciosDisponibles[randIndex];
}

function evitarGanarJugador() {
    let eleccionJug1 = jugador1.espacios;
    let condicionesGanar = tableroJuego.condicionesGanar;
    for (let i = 0; i < condicionesGanar.length; i++) {
        let count = 0;
        let eleccionPrediccion;
        for (let j = 0; j < 3; j++) {
            if (eleccionJug1.indexOf(condicionesGanar[i][j]) !== -1) {
                count++;
            } else {
                eleccionPrediccion = condicionesGanar[i][j];
            }
        }

        if (count === 2 && tableroJuego.idComprobar(String(eleccionPrediccion))) {
            return eleccionPrediccion;
        }
    }
}

function intentarGanarMaquina() {
    let eleccionesMaquina = jugador2.espacios;
    let condicionesGanar = tableroJuego.condicionesGanar;
    for (let i = 0; i < condicionesGanar.length; i++) {
        let count = 0;
        let eleccionPrediccion;
        for (let j = 0; j < 3; j++) {
            if (eleccionesMaquina.indexOf(condicionesGanar[i][j]) !== -1) {
                count++;
            } else {
                eleccionPrediccion = condicionesGanar[i][j];
            }
        }

        if (count === 2 && tableroJuego.idComprobar(String(eleccionPrediccion))) {
            return eleccionPrediccion;
        }
    }
}

function logicaIA() {
    let eleccion;

    // If computer picking can win
    if (intentarGanarMaquina()) {
        return intentarGanarMaquina();
    }

    // If computer picking can stop player from winning
    if (evitarGanarJugador()) {
        return evitarGanarJugador();
    }

    // If computer picking will win
    eleccion = eleccionAleatoria();
    return eleccion;
}

function jugadorVsMaquina() {
    $(".board-espacios").unbind("click");
    jugador2 = new Jugador("Computer", jugador2.simbolo);

    $(".activo").click(function () {
        let id = $(this).attr('id');
        let comprobar = tableroJuego.idComprobar(id);
        if (comprobar) {
            tableroJuego.agregarID(id);
            if (tableroJuego.turnoActual === 1) {
                jugador1.nuevoEspacio(parseInt(id, 10), comprobar);

                if (jugador1.comprobarGanar(tableroJuego.condicionesGanar)) {
                    setTimeout(function () {
                        winner("Player 1");
                        for (let index = 0; index < arrayActivo.length; index++) {
                            arrayActivo[index].classList.remove('activo');
                        }
                    }, 100);
                } else if (tableroJuego.isLleno()) {
                    tableroJuego.turnoActual = 2;
                    setTimeout(function () {
                        empate();
                        for (let index = 0; index < arrayActivo.length; index++) {
                            arrayActivo[index].classList.remove('activo');
                        }
                    }, 100);
                } else {
                    $(".active-turn-1").html("");
                    $(".active-turn-2").html(
                        '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
                    );
                    tableroJuego.turnoActual = 2;
                }
            }

            if (tableroJuego.turnoActual == 2 && !tableroJuego.gameOver) {
                let eleccion = logicaIA();
                tableroJuego.agregarID(String(eleccion));
                jugador2.nuevoEspacio(eleccion, comprobar);
                $(".active-turn-2").html("");
                $(".active-turn-1").html(
                    '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
                );
                if (jugador2.comprobarGanar(tableroJuego.condicionesGanar)) {
                    setTimeout(function () {
                        winner(jugador2.usuario);
                        for (let index = 0; index < arrayActivo.length; index++) {
                            arrayActivo[index].classList.remove('activo');
                        }
                    }, 100);
                } else if (tableroJuego.isLleno()) {
                    setTimeout(function () {
                        empate();
                        for (let index = 0; index < arrayActivo.length; index++) {
                            arrayActivo[index].classList.remove('activo');
                        }
                    }, 100);
                } else {
                    tableroJuego.turnoActual = 1;
                }
            }
        }
    });
}

/* -----------------   Classes   ----------------- */
class Ajustes {
    constructor() {
        this.activeGameButton = 1;
        this.p1Simbolo = "o";
        this.p2Simbolo = "x";
    }
}

class Tablero {
    constructor() {
        this.espaciosTablero = [];
        this.condicionesGanar = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ];
        this.espaciosDisponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.turnoActual = 1;
        this.gameOver = false;
        this.vaPrimero = "player";
    }
    agregarID(val) {
        this.espaciosTablero.push(val);
    }
    idComprobar(val) {
        return this.espaciosTablero.indexOf(val) === -1 ? true : false;
    }
    limpiarEspacios() {
        this.espaciosTablero = [];
        this.espaciosDisponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    isLleno() {
        return this.espaciosTablero.length == 9 ? true : false;
    }
    cambiarTurno() {
        if (this.vaPrimero == "player") {
            this.vaPrimero = "computer";
        } else {
            this.vaPrimero = "player";
        }
        return this.vaPrimero;
    }
}

class Jugador {
    constructor(usuario, simbolo) {
        this.usuario = usuario;
        this.simbolo = simbolo;
        this.espacios = [];
        if (this.simbolo === "x") {
            this.simboloHtml = `<i class="fa fa-times" aria-hidden="true"></i>`;
        } else {
            this.simboloHtml = `<i class="fa fa-circle-o" aria-hidden="true"></i>`;
        }
    }

    get tipoUsuario() {
        return this.usuario;
    }

    cambiarSimbolo() {
        if (this.simbolo === "o") {
            this.simbolo = "x";
            this.simboloHtml = `<i class="fa fa-times" aria-hidden="true"></i>`;
        } else {
            this.simbolo = "o";
            this.simboloHtml = `<i class="fa fa-circle-o" aria-hidden="true"></i>`;
        }
    }

    get espaciosActuales() {
        return this.espacios;
    }
    nuevoEspacio(numeroEspacio, comprobar) {
        if (comprobar) {
            this.espacios.push(numeroEspacio);
            $(`.space${numeroEspacio}`)
                .html(this.simboloHtml)
                .animate({
                    fontSize: "4rem"
                }, 100);
        }
    }

    comprobarGanar(arrayCondicionGanar) {
        for (let i = 0; i < arrayCondicionGanar.length; i++) {
            let comprobar = 0;
            for (let j = 0; j <= 2; j++) {
                if (this.espacios.indexOf(arrayCondicionGanar[i][j]) >= 0) {
                    comprobar++;
                }
            }
            if (comprobar == 3) {
                arrayCondicionGanar[i].forEach(function (val) {
                    $(`#${val}`)
                        .css("color", "rgba(195, 19, 3, 0.9)")
                        .css("backgroundColor", "rgba(100,100,100,0.3)");
                });
                return true;
            }
        }
        return false;
    }

    limpiarEspacios() {
        this.espacios = [];
    }

}
/*****************************************************************/
function noWinner() {
    alert("No Winner!");
    cronometro.parar();
}

function winner(usuario) {
    alert(`${usuario} wins!`);
    cronometro.parar();
}
/* Begin Logic and Variable Initialization */
let ajustes = new Ajustes();
let jugador1 = new Jugador("Player 1", ajustes.p1Simbolo);
let jugador2 = new Jugador("Computer", ajustes.p2Simbolo);
let turnoActual = 1; //if 1, player 1's turn. If 2, player 2's turn.
const tableroJuego = new Tablero();
iniciarJuego();