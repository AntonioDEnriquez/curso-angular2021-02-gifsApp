import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // buscar(event: KeyboardEvent) {
  //   console.log(event);

  // }
  // Sirve para buscar un elemento dentro del html, ya sea elemento clase o referncia

  // El ! se conoce como no null acerction operator o un operador para asegurarse de que el objeto no es nulo

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  buscar() {

    const valor = this.txtBuscar.nativeElement.value;
    console.log(valor);
    if (valor.trim().length === 0) { return; }

    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';
  }

}
