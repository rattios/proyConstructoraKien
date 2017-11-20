import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

//import { ModalDirective } from 'ngx-bootstrap/modal/modal.component'; //modales
import { ModalDirective } from 'ngx-bootstrap/modal';

import { RutaBaseService } from '../../services/ruta-base.service';

import { FormBuilder, FormArray, FormGroup, Validators  } from '@angular/forms';

import {NgxPermissionsService, NgxRolesService} from 'ngx-permissions';

export class Cliente {
  id: number;
  user: string;
  nombre: string;
  telefono: string;
}

@Component({
  selector: 'app-p',
  templateUrl: 'usuarios.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls : ['usuarios.css']
})

export class UsuariosComponent {

  private data:any;
  public productList:any;

  selectedCliente: any;
  clienteAEliminar: any;
  eliminar_id: any;
  eliminar_user: any;

  public loading = false;
  public editando = false;
  public mostrar = true;

  prueba = 'prueba binding';

  public alerta = false;
  public alerta_boton = false;
  public alerta_tipo: any; //success info warning danger  
  public alerta_msg: any;

    constructor(private http: HttpClient,private router: Router, private rutaService: RutaBaseService, private permissionsService: NgxPermissionsService) {
      if (localStorage.getItem('constructora_user_tipo') == '0') {

      const perm = ["SUPER"];
      this.permissionsService.flushPermissions();
      this.permissionsService.loadPermissions(perm);

      //console.log('soy SUPER');
      }
      else if (localStorage.getItem('constructora_user_tipo') == '2') {
        const perm2 = ["ADMIN"];
        this.permissionsService.flushPermissions();
        this.permissionsService.loadPermissions(perm2);

        //console.log('soy ADMIN');
      }
    }

    ngOnInit(): void {
      this.loading = true;
      //this.http.get('http://localhost/gitHub/proyConstructoraKien/constructoraKienAPI/public/usuarios?token='+localStorage.getItem('constructora_token'))
      this.http.get(this.rutaService.getRutaApi()+'constructoraKienAPI/public/usuarios/pedidos?token='+localStorage.getItem('constructora_token'))
         .toPromise()
         .then(
           data => { // Success
             console.log(data);
             this.data=data;

             var dia : any;
             var mes : any;
             var anio : any;
             var fecha : any;
             var hora : any;
             var minutos : any;
             var segundos : any;


             for (var i = 0; i < this.data.usuarios.length; i++) {
               fecha = new Date(this.data.usuarios[i].created_at);
               //this.data.usuarios[i].created_at = new Date(this.data.usuarios[i].created_at);
               dia = fecha.getDate();
               mes = fecha.getMonth() + 1;
               anio = fecha.getFullYear();

               hora = fecha.getHours();
               minutos = fecha.getMinutes();
               segundos = fecha.getSeconds();

               this.data.usuarios[i].fecha = dia+'/'+mes+'/'+anio;
               this.data.usuarios[i].hora = hora+':'+minutos+':'+segundos;

               /*console.log('created_at '+this.data.usuarios[i].created_at);
               console.log('fecha '+fecha);
               console.log('dia '+dia);
               console.log('mes '+mes);
               console.log('anio '+anio);*/
             }

             setTimeout(()=>{
               this.productList = this.data.usuarios;
               this.filteredItems = this.productList;
               //console.log(this.productList);

               this.init();

               this.loading = false;
             },1000);
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

    ver(cliente: any): void {
      this.editando = true;
      this.selectedCliente = cliente;
      console.log(this.selectedCliente);

      if (this.selectedCliente.pedidos) {
        for (var i = 0; i < this.selectedCliente.pedidos.length; i++) {
          if (this.selectedCliente.pedidos[i].lat && this.selectedCliente.pedidos[i].lng) {
            this.selectedCliente.pedidos[i].lat = parseFloat(this.selectedCliente.pedidos[i].lat);
            this.selectedCliente.pedidos[i].lng = parseFloat(this.selectedCliente.pedidos[i].lng);
          }
        }
      }
    }

    aEliminar(cliente): void {
      this.clienteAEliminar = cliente;
      //console.log(this.clienteAEliminar);
      //console.log(this.clienteAEliminar.user);
      this.eliminar_id = this.clienteAEliminar.id;
      this.eliminar_user = this.clienteAEliminar.user;
      //this.myModal.show();
    }

    eliminar(): void {
      //this.selectedCliente = cliente;
      console.log(this.clienteAEliminar);
      //this.myModal.show();

      this.loading = true;

      var datos= {
        token: localStorage.getItem('constructora_token')
      }

      this.http.delete(this.rutaService.getRutaApi()+'constructoraKienAPI/public/usuarios/'+this.eliminar_id+'?token='+localStorage.getItem('constructora_token'))
      //this.http.delete('http://constructorakien.internow.com.mx/constructoraKienAPI/public/productos/'+this.eliminar_id+'?token='+localStorage.getItem('constructora_token'))
         .toPromise()
         .then(
           data => { // Success
              console.log(data);
              this.data = data;

              var aux = this.productList;
              this.productList = [];

              for (var i = 0; i < aux.length; ++i) {
                if (aux[i].id != this.eliminar_id) {
                   this.productList.push(aux[i]);
                }
              }

              this.filteredItems = this.productList;
              this.init();
              
              //console.log(this.productList);
              //alert(this.data.message);

              this.loading = false;

              this.alerta_tipo = 'success';
              this.alerta_msg = this.data.message;
              this.alerta = true;
              setTimeout(()=>{this.alerta = false;},4000);

              
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
              //no encontrada o confilto
              else if(msg.status == 404 || msg.status == 409){ 
                  //alert(msg.error.error);

                  this.alerta_tipo = 'danger';
                  this.alerta_msg = msg.error.error;
                  this.alerta = true;
                  setTimeout(()=>{this.alerta = false;},4000);
              }

           }
         );
    }

    eliminarModal(): void{
      this.loading = true;
      //this.myModal.hide();
    }

    atras(): void {
      this.editando = false;
      this.selectedCliente = null;
      console.log(this.selectedCliente);
    }

   filteredItems : any;
   pages : number = 4;
   pageSize : number = 5;
   pageNumber : number = 0;
   currentIndex : number = 1;
   items: any;
   pagesIndex : Array<number>;
   pageStart : number = 1;
   inputName : string = '';

   init(){
         this.currentIndex = 1;
         this.pageStart = 1;
         this.pages = 4;

         this.pageNumber = parseInt(""+ (this.filteredItems.length / this.pageSize));
         if(this.filteredItems.length % this.pageSize != 0){
            this.pageNumber ++;
         }
    
         if(this.pageNumber  < this.pages){
               this.pages =  this.pageNumber;
         }
       
         this.refreshItems();
         console.log("this.pageNumber :  "+this.pageNumber);
   }

   FilterByName(){
      this.filteredItems = [];
      if(this.inputName != ""){
            for (var i = 0; i < this.productList.length; ++i) {
              if (this.productList[i].nombre.toUpperCase().indexOf(this.inputName.toUpperCase())>=0) {
                 this.filteredItems.push(this.productList[i]);
              }else if (this.productList[i].correo.toUpperCase().indexOf(this.inputName.toUpperCase())>=0) {
                 this.filteredItems.push(this.productList[i]);
              }else if (this.productList[i].user.toUpperCase().indexOf(this.inputName.toUpperCase())>=0) {
                 this.filteredItems.push(this.productList[i]);
              }else if (this.productList[i].telefono.indexOf(this.inputName)>=0) {
                 this.filteredItems.push(this.productList[i]);
              }
              else if (this.productList[i].fecha.toUpperCase().indexOf(this.inputName.toUpperCase())>=0) {
                 this.filteredItems.push(this.productList[i]);
              }
            }

            // this.productList.forEach(element => {
            //     if(element.nombre.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
            //       this.filteredItems.push(element);
            //    }
            // });
      }else{
         this.filteredItems = this.productList;
      }
      console.log(this.filteredItems);
      this.init();
   }
   fillArray(): any{
      var obj = new Array();
      for(var index = this.pageStart; index< this.pageStart + this.pages; index ++) {
                  obj.push(index);
      }
      return obj;
   }
   refreshItems(){
       this.items = this.filteredItems.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
       this.pagesIndex =  this.fillArray();
   }
   prevPage(){
      if(this.currentIndex>1){
         this.currentIndex --;
      } 
      if(this.currentIndex < this.pageStart){
         this.pageStart = this.currentIndex;
      }
      this.refreshItems();
   }
   nextPage(){
      if(this.currentIndex < this.pageNumber){
            this.currentIndex ++;
      }
      if(this.currentIndex >= (this.pageStart + this.pages)){
         this.pageStart = this.currentIndex - this.pages + 1;
      }
 
      this.refreshItems();
   }
    setPage(index : number){
         this.currentIndex = index;
         this.refreshItems();
    }
  
}
