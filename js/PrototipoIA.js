var JUGADOR = { HUMANO:1, CPU:2 };
var ESTADO = { JUGANDO: 0, ESPERANDO: 1, TERMINADO:2 };

Juego.prototype.logica=function(posicion){
	if (this.estado==ESTADO.JUGANDO)
	{
		if (this.tablero.marcable(posicion))
		{
			this.tablero.marcar(JUGADOR.HUMANO,posicion);
 
			if (this.tablero.esGanador(JUGADOR.HUMANO))
			{
				this.estado=ESTADO.TERMINADO;
				this.mostrarMensaje("¡HAS GANADO!<br/>Click en una celda para comenzar de nuevo.","red");
			}
			else if (!this.tablero.document.getElementsByClassName('activo').length != 0)
			{
				this.estado=ESTADO.TERMINADO;
				this.mostrarMensaje("¡EMPATE!<br/>Click en una celda para comenzar de nuevo.","orange");
			}
			else
			{
				this.estado==ESTADO.ESPERANDO;
				this.mostrarMensaje("Turno de AI...","blue");
				this.movimientoAI();
 
				if (this.tablero.esGanador(JUGADOR.CPU))
				{
					this.estado=ESTADO.TERMINADO;
					this.mostrarMensaje("¡AI GANA!<br/>Click en una celda para comenzar de nuevo.","blue");
				}
				else if (!this.tablero.document.getElementsByClassName('activo').length != 0)
				{
					this.estado=ESTADO.TERMINADO;
					this.mostrarMensaje("¡EMPATE!<br/>Click en una celda para comenzar de nuevo.","orange");
				}
				else
				{
					this.mostrarMensaje("Turno del jugador 1","red");
					this.estado==ESTADO.JUGANDO;
				}
			}
		}
		this.tablero.dibujar();
	}
	else if (this.estado==ESTADO.TERMINADO)
	{
		this.reset();
	}
};

Juego.prototype.movimientoAI=function(){
    var posicion=0;
    var n=this.tablero.panel.length;
	var aux, mejor=-9999;
 
	for (var i=0;i<n;i++)
	{
		if (this.tablero.marcable(i))
		{
			this.tablero.marcar(Jugador.CPU,i);
			aux=this.min();
			if (aux>mejor)
			{
				mejor=aux;
				posicion=i;
			}
			this.tablero.marcar(0,i);
		}
	}
	this.tablero.marcar(JUGADOR.CPU,posicion);
};

Juego.prototype.min=function(){
	if (this.tablero.esGanador(JUGADOR.CPU)) return 1;
	if (!this.tablero.document.getElementsByClassName('activo').length != 0) return 0;
	var n=this.tablero.panel.length;
	var aux,mejor=9999;
 
	for (var i=0;i<n;i++)
	{
		if (this.tablero.marcable(i))
		{
			this.tablero.marcar(JUGADOR.HUMANO,i);
			aux=this.max();
			if (aux<mejor)
			{
				mejor=aux;
			}
			this.tablero.marcar(0,i);
		}
	}
	return mejor;
};

Juego.prototype.max=function(){
	if (this.tablero.esGanador(JUGADOR.HUMANO)) return -1;
	if (!this.tablero.document.getElementsByClassName('activo').length != 0) return 0;
	var n=this.tablero.panel.length;
	var aux,mejor=-9999;
 
	for (var i=0;i<n;i++)
	{
		if (this.tablero.marcable(i))
		{
			this.tablero.marcar(JUGADOR.CPU,i);
			aux=this.min();
			if (aux>mejor)
			{
				mejor=aux;
			}
			this.tablero.marcar(0,i);
		}
	}
	return mejor;
};