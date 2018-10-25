//Se crea una clase cronometro, con sus atributos , constructores y métodos, como en java
class Cronometro {
  ejecutando: boolean;
  pantalla: { innerText: string };
  tiempo!: {
    minutos: number;
    segundos: number;
    milisegundos: number;
  };
  reloj: number | undefined;

  constructor(pantalla: any) {
    this.ejecutando = false;
    this.pantalla = pantalla;
    this.resetear();
    this.imprimir();
  }

  //Función para resetear el cronometro
  resetear() {
    this.tiempo = {
      minutos: 0,
      segundos: 0,
      milisegundos: 0
    };
  }

  //Funcion para imprimir el tiempo en un formato
  imprimir() {
    this.pantalla.innerText = this.format(this.tiempo);
  }
  //Funcion para decir el formato en el que vamos a imprimir el tiempo
  format(tiempo: any) {
    return `${rellenar0(tiempo.minutos)}:${rellenar0(
      tiempo.segundos
    )}:${rellenar0(Math.floor(tiempo.milisegundos))}`;
  }

  //Para iniciar el cronometro
  iniciar() {
    if (!this.ejecutando) {
      this.ejecutando = true;
      this.reloj = setInterval(() => this.avanzar(), 10);
    }
  }
  avanzar() {
    if (!this.ejecutando) return;
    this.calcular();
    this.imprimir();
  }
  calcular() {
    this.tiempo.milisegundos += 1;
    if (this.tiempo.milisegundos >= 100) {
      this.tiempo.segundos += 1;
      this.tiempo.milisegundos = 0;
    }
    if (this.tiempo.segundos >= 60) {
      this.tiempo.minutos += 1;
      this.tiempo.segundos = 0;
    }
  }

  //Funcion para para parar el cronometro
  parar() {
    this.ejecutando = false;
    clearInterval(this.reloj);
  }
}
function rellenar0(valor: any) {
  let resultado = valor.toString();
  if (resultado.length < 2) {
    resultado = "0" + resultado;
  }
  return resultado;
}
