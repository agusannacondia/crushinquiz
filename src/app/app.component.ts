import { Component, OnInit } from '@angular/core';
import { JuegoService } from './services/juego.service';
import { Pregunta } from './models/pregunta';
import { Puntaje } from './models/puntaje';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [JuegoService]
})
export class AppComponent implements OnInit{
  title = 'crushin-quiz';

  public esInicio: boolean;
  public esJugando: boolean;
  public esPuntajes: boolean;

  public puntajeActual: Puntaje;
  public listaPuntajes: Array<Puntaje>;
  public preguntaActual: Pregunta;
  public listaPreguntas: Array<Pregunta>;
  
  public resultado;
  public numPreguntaActual: number;

  public tiempoInicio: Date;
  public tiempoFin: Date;

  constructor(
  		private _juegoService: JuegoService
  	){
  	this.esInicio = true;
  	this.esJugando = false;
  	this.esPuntajes = false;
  	this.numPreguntaActual = 1;
  }

  ngOnInit(){
  	this.puntajeActual = new Puntaje('', '', '', 0);
  	this.listaPuntajes = new Array<Puntaje>();
  	this.preguntaActual = new Pregunta('', '', '', '', '', '', '');
  	this.listaPreguntas = new Array<Pregunta>();
  }

  mostrarInicio(){
  	this.numPreguntaActual = 1;
  	this.puntajeActual = new Puntaje('', '', '', 0);
  	this.listaPuntajes = new Array<Puntaje>();
  	this.preguntaActual = new Pregunta('', '', '', '', '', '', '');
  	this.listaPreguntas = new Array<Pregunta>();
  	this.esInicio = true;
  	this.esJugando = false;
  	this.esPuntajes = false;
  }

  mostrarJuego(){
  	
  	this.obtenerPreguntas();

  	this.tiempoInicio = new Date();

  	this.esInicio = false;
  	this.esJugando = true;
  	this.esPuntajes = false;
  }

  mostrarPuntajes(){
  	
  	this.getHighScores();
  	
  	this.esInicio = false;
  	this.esJugando = false;
  	this.esPuntajes = true;
  }

  siguientePregunta(event){

  	this.verificarRespuestaCorrecta(event);

  	if(this.numPreguntaActual < 10){

	  	this.numPreguntaActual++;
		this.preguntaActual = this.listaPreguntas[this.numPreguntaActual - 1];

  	}else{

  		this.tiempoFin = new Date();

  		this.guardarPartida();
  		this.mostrarPuntajes();
  	}
  }

  obtenerPreguntas(){
  	
  	this._juegoService.getQuestions().subscribe(
			response=>{
					this.listaPreguntas = response.preguntas;
					this.preguntaActual = this.listaPreguntas[0];
			},
			error=>{
		    	console.log(error.errorMessage);
			}
	);
  }

  guardarPartida(){

  	let tiempo = new Date(this.tiempoFin.getTime() - this.tiempoInicio.getTime());
  	let tiempoStr = tiempo.getMinutes() + ":" + tiempo.getSeconds() + "." + tiempo.getMilliseconds();

  	this.puntajeActual.tiempo = tiempoStr;

  	this._juegoService.saveGame(this.puntajeActual).subscribe(
			response=>{
					
			},
			error=>{
		    	console.log(error.errorMessage);
			}
	);
  }

  getHighScores(){

  	this._juegoService.getHighScores().subscribe(
			response=>{
				this.listaPuntajes = response.puntajes;
			},
			error=>{
		    	console.log(error.errorMessage);
			}
	);
  }

  verificarRespuestaCorrecta(event){

  	if(event.target.innerText == this.listaPreguntas[this.numPreguntaActual - 1].correcta){
  		this.puntajeActual.correctas++;
  	}

  }

  onSubmitAdd(){

  }
}
