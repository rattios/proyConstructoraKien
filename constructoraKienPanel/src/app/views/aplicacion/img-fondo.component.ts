import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

//import { ModalDirective } from 'ngx-bootstrap/modal/modal.component'; //modales
import { ModalDirective } from 'ngx-bootstrap/modal';

import { RutaBaseService } from '../../services/ruta-base.service';

import { FormBuilder, FormArray, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-img-fondo',
  templateUrl: 'img-fondo.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls : ['aplicacion.css']
})

export class ImgFondoComponent {

  private data:any;

  public loading = false;
  public mostrar = true;

  public alerta = false;
  public alerta_boton = false;
  public alerta_tipo: any; //success info warning danger  
  public alerta_msg: any;

  public subiendoImg = false;

  public img_fondo_id: any;
  public img_fondo: any;
  public fondoAux: any;

    constructor(private http: HttpClient,private router: Router, private rutaService: RutaBaseService) {
      if (localStorage.getItem('constructora_user_tipo') != '0') {
          this.router.navigate(['dashboard']);
      }
    }

    ngOnInit(): void {
      this.loading = true;
      this.http.get(this.rutaService.getRutaApi()+'constructoraKienAPI/public/aplicacion?token='+localStorage.getItem('constructora_token'))
         .toPromise()
         .then(
           data => { // Success
             console.log(data);
             this.data=data;
             this.img_fondo = this.data.aplicacion.img_fondo+'?'+ new Date();
             this.img_fondo_id = this.data.aplicacion.id;

             this.loading = false;
           },
           msg => { // Error
             console.log(msg);
             console.log(msg.error.error);

             this.loading = false;

             //token invalido/ausente o token expiro
             if(msg.status == 400 || msg.status == 401){ 
                  //alert(msg.error.error);
                  //ir a login

                  this.alerta_tipo = 'warning';
                  this.alerta_msg = msg.error.error;
                  this.alerta_boton = true;
                  this.mostrar = false;
              }
              //sin usuarios
              else if(msg.status == 404){ 
                  //alert(msg.error.error);

                  this.alerta_tipo = 'info';
                  this.alerta_msg = msg.error.error;
                  this.alerta = true;
                  setTimeout(()=>{this.alerta = false;},4000);
              }
              

           }
         );
    }

    //Alerta cuando se vence el token
    ok_alerta(): void {
      this.router.navigate(['pages']);
    }

    cerrarAlerta(): void {
      this.alerta = false
    }

    actualizarFondo(): void{

      var datos= {
        token: localStorage.getItem('constructora_token'),
        img_fondo: this.fondoAux
      }

      this.http.put(this.rutaService.getRutaApi()+'constructoraKienAPI/public/aplicacion/'+this.img_fondo_id+'?token='+localStorage.getItem('constructora_token'), datos)
         .toPromise()
         .then(
           data => { // Success
             console.log(data);
             this.data=data;
             this.img_fondo = this.data.aplicacion.img_fondo+'?'+ new Date();

             this.alerta_tipo = 'success';
             this.alerta_msg = this.data.message;
             this.alerta = true;
             setTimeout(()=>{this.alerta = false;},4000);

             this.subiendoImg = false;
           },
           msg => { // Error
             console.log(msg);
             console.log(msg.error.error);

             this.subiendoImg = false;

             //token invalido/ausente o token expiro
             if(msg.status == 400 || msg.status == 401){ 
                  //alert(msg.error.error);
                  //ir a login

                  this.alerta_tipo = 'warning';
                  this.alerta_msg = msg.error.error;
                  this.alerta_boton = true;
                  this.mostrar = false;
              }
              else if(msg.status == 404 || msg.status == 409){ 
                  //alert(msg.error.error);

                  this.alerta_tipo = 'info';
                  this.alerta_msg = msg.error.error;
                  this.alerta = true;
                  setTimeout(()=>{this.alerta = false;},4000);
              }
              

           }
         );
    }

    //Subir imagen----<
    uploadFile: any;
    hasBaseDropZoneOver: boolean = false;
    options: Object = {
      url: this.rutaService.getRutaImages()+'uploadFondoApp.php'
    };
    sizeLimit = 2000000;
   
    handleUpload(data): void {
      /*setTimeout(() => {
         this.subiendoImg = false;
       },1000);*/
      
      if (data && data.response) {
        data = JSON.parse(data.response);
        this.uploadFile = data;
        this.fondoAux = this.rutaService.getRutaImages()+'fondoApp/'+this.uploadFile.generatedName;
        //this.actualizarFondo();
        setTimeout(() => {
         this.actualizarFondo();
       },100);
      }
    }
   
    fileOverBase(e:any):void {
      this.hasBaseDropZoneOver = e;
    }
   
    beforeUpload(uploadingFile): void {
      this.subiendoImg = true;
      if (uploadingFile.size > this.sizeLimit) {
        uploadingFile.setAbort();
        alert('File is too large');
      }
    }
    //Subir imagen---->
  
}
