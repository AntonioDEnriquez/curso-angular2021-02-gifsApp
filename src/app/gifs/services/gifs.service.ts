import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // API de los key
  private apiKey: string = 'pZ4ZvA5Zvh4jytD8PuUvPUTZGNw9N1gh';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  // TODO: Cambiar any por su tipo correspondiente
  // Colocar tipado a las respuestas http
  public resultados: Gif[] = [];

  get historial() {

    return [...this._historial];
  }

  // El constructor solo se va a ejecutar la primera y unica vez cuando el servicio es llamado
  constructor(private http: HttpClient) {
    // Cargar del localSotrage
    // this._historial = localStorage.getItem('historial');

    // Esta es una manera de cargar el localStorage
    /*if (localStorage.getItem('historial')) {
      // el ! al final significa decirla a ts que confie en mi que yo se lo que estoy haciendo, si lo quito marca error por que pueda que devuelva un null
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }*/
    // Esta es otra manera de cargar el localStorage
    // Este local storage puede retornar null y si retorna null retornamos un arreglo vacio, pero tambien tenemos que decirle a ts que confie en mi con el ! al final
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('historialImg')!) || [];

  }

  buscarGifs(query: string = '') {

    // lo convertimos a lowercase para solo tener minusculas
    query = query.trim().toLowerCase();

    // Includes me va a decir si existe o si incluye lo que yo le pongo
    // Si no lo incluye ahi es donde lo voy a insertar
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      // Aqui estamos cortando el arreglo principal
      this._historial = this._historial.splice(0, 10);

      // Guardar informacion en el LocalStorage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    // Peticion a api javaScript
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=pZ4ZvA5Zvh4jytD8PuUvPUTZGNw9N1gh&q=dragon ball z&limit=10').then(respuesta => {
    //   respuesta.json().then(data => console.log(data));
    // });

    // Otra forma seria utilizar una consulta async
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=pZ4ZvA5Zvh4jytD8PuUvPUTZGNw9N1gh&q=dragon ball z&limit=10');
    // const data = await resp.json();

    // Http es para hacer peticions, post, get, delete, pero este trabaja en base a observables, que los observables son mas poderosos que las promesas, permite configurar headers, parametros.
    // El subscribe es muy parecido al then, se va a ejecutar cuando tengamos la resolucion del get
    // (resp: any) es para decirle a ts que la respuesta es de tipo any para que deje recibir los datos, ya que http no tiene manera de saber el typo que son
    // this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=pZ4ZvA5Zvh4jytD8PuUvPUTZGNw9N1gh&q=${query}&limit=10`)
    //   .subscribe((resp: any) => {
    //     console.log(resp.data);
    //     this.resultados = resp.data;
    //   });


    // permite construir los parametros de una manera mas sencilla
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    // console.log(params.toString());



    // Modificamos la peticion http de arriba para cambiarle el tipado
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        // console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('historialImg', JSON.stringify(this.resultados));
      });
    // console.log(this._historial);

  }

}
