export class Pregunta{
	constructor(
		public _id: string,
		public pregunta: string,
		public correcta: string,
		public opcion1: string,
		public opcion2: string,
		public opcion3: string,
		public opcion4: string
	){
		
	}
}