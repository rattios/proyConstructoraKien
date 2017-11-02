import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public people:any;
  user= 'prueba'
  password='123456789';
  public token:any;
  public loading = false;

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
  }

  Ingresar(){

  	this.loading = true;
  	this.people='esperando...';
   
    var datos= {
    	user: this.user,
    	password: this.password
    }

    

      this.http.post('http://manappger.internow.com.mx/constructoraKienAPI/public/login/app', datos)
        .toPromise()
        .then(
          data => { // Success
            /*console.log(data);
            this.token=data;
            localStorage.setItem('manappger_token', this.token.token);
            console.log(this.token.user.id);
            localStorage.setItem('manappger_user_id', this.token.user.id);
            localStorage.setItem('manappger_user_nombre', this.token.user.nombre);
            localStorage.setItem('manappger_user_sucursal_id', this.token.user.sucursal_id);
            this.people='exito...';*/
            this.router.navigate(['dashboard']);
            this.loading = false;
         },
          msg => { // Error
          	/*console.log(msg.error.error);
          	this.people=msg.error.error;*/
          	console.log(msg)
          	alert('error');
          	this.loading = false;
          }
        );
  }

}
