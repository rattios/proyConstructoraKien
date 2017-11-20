import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { RutaBaseService } from '../../services/ruta-base.service';

import {NgxPermissionsService, NgxRolesService} from 'ngx-permissions';

@Component({
  templateUrl: 'login.component.html',
  styleUrls : ['login.css']
})
export class LoginComponent implements OnInit {

  user= ''
  password='';
  private data:any;
  public loading = false;

  constructor(private http: HttpClient,private router: Router, private rutaService: RutaBaseService) { }

  ngOnInit() {
    //alert(this.rutaService.getRutaApi());

    let OneSignal = window['OneSignal'] || [];
    
    OneSignal.push(["init", {
      appId: "b38c24e4-50a3-4267-940d-e60ee61a8ff2",
      autoRegister: true, // Set to true to automatically prompt visitors
      subdomainName: 'https://construkien.os.tc',

      httpPermissionRequest: {
        enable: true,
        modalTitle: 'Constructora Kien',
        modalMessage: 'Gracias por suscribirse a las notificaciones!',
        modalButtonText:'OK'

      },
      welcomeNotification:{
         "title": "Constructora Kien",
        "message": "Gracias por suscribirse a las notificaciones!"
      },
      notifyButton: {
          enable: false 
      }
    }]);
    
  }

  Ingresar(){

  	this.loading = true;
   
    var datos= {
    	user: this.user,
    	password: this.password
    }

    
      //this.http.post('http://constructorakien.internow.com.mx/constructoraKienAPI/public/login/web', datos)
      this.http.post(this.rutaService.getRutaApi()+'constructoraKienAPI/public/login/web', datos)
        .toPromise()
        .then(
          data => { // Success
            console.log(data);
            this.data=data;
            localStorage.setItem('constructora_token', this.data.token);
            localStorage.setItem('constructora_user_id', this.data.user.id);
            localStorage.setItem('constructora_user_nombre', this.data.user.nombre);
            localStorage.setItem('constructora_user_tipo', this.data.user.tipo);
            
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
