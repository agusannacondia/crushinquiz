import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs-compat/Observable';
import { Global } from './global';

@Injectable()
export class JuegoService{

	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;	
	}

	testService(){
		return "Probando service";
	}

	saveGame(game){
		let params = JSON.stringify(game);
		console.log("params:" + params);
		let headers = new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'});

		return this._http.post(this.url + 'puntaje', params, {headers: headers});
	}

	getHighScores():Observable<any>{
		let headers = new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'});

		return this._http.get(this.url + 'highscores', {headers: headers});
	}

	getQuestions():Observable<any>{
		let headers = new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'});

		return this._http.get(this.url + 'preguntas', {headers: headers});
	}
}