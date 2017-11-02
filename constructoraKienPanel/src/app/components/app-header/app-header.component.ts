import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeader {

  public usuario: string;

  constructor(private el: ElementRef) { }

  //wait for the component to render completely
  ngOnInit(): void {

    this.usuario = localStorage.getItem('constructora_user_nombre');

    var nativeElement: HTMLElement = this.el.nativeElement,
    parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
  }

  logaut(): void {
      //alert('Saliendo...');
      localStorage.removeItem('constructora_token');
    }
}
