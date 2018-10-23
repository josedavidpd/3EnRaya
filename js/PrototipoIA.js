Juego.prototype.movimientoAI = function () {
	var posicion = 0;
	var n = this.tablero.panel.length;
	var aux, mejor = -9999;

	for (var i = 0; i < n; i++) {
		if (this.tablero.marcable(i)) {
			this.tablero.marcar(Jugador.CPU, i);
			aux = this.min();
			if (aux > mejor) {
				mejor = aux;
				posicion = i;
			}
			this.tablero.marcar(0, i);
		}
	}
	this.tablero.marcar(JUGADOR.CPU, posicion);
};

Juego.prototype.min = function () {
	if (esGanador(JUGADOR.CPU)) return 1;
	if (!document.getElementsByClassName('activo').length != 0) return 0;
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
};

Juego.prototype.max = function () {
	if (esGanador(JUGADOR.HUMANO)) return -1;
	if (!document.getElementsByClassName('activo').length != 0) return 0;
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
};