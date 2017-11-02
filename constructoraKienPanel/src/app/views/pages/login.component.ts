import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  user= 'freddy'
  password='12345';
  private data:any;
  public loading = false;

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
  }

  Ingresar(){

  	this.loading = true;
   
    var datos= {
    	user: this.user,
    	password: this.password
    }

    
    //http://manappger.internow.com.mx/constructoraKienAPI/public/login/app
      this.http.post('http://localhost/gitHub/proyConstructoraKien/constructoraKienAPI/public/login/web', datos)
        .toPromise()
        .then(
          data => { // Success
            console.log(data);
            this.data=data;
            localStorage.setItem('constructora_token', this.data.token);
            localStorage.setItem('constructora_user_id', this.data.user.id);
            localStorage.setItem('constructora_user_nombre', this.data.user.nombre);
            
            this.router.navigate(['dashboard']);
            this.loading = false;
         },
          msg => { // Error

            console.log(msg)
          	//console.log(msg.error.error);
          	alert('Error: '+msg.error.error);
          	this.loading = false;
          }
        );
  }

}
