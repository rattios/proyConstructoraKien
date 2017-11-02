import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  constructor( ) { }

  ngOnInit() {
  	//alert('hola '+localStorage.getItem('constructora_user_nombre'));
  	//alert('token '+localStorage.getItem('constructora_token'));
  }

}
