import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

//import { ModalDirective } from 'ngx-bootstrap/modal/modal.component'; //modales
import { ModalDirective } from 'ngx-bootstrap/modal';

import { RutaBaseService } from '../../services/ruta-base.service';

import { FormBuilder, FormArray, FormGroup, Validators  } from '@angular/forms';

import {NgxPermissionsService, NgxRolesService} from 'ngx-permissions';

@Component({
  selector: 'app-vendedores',
  templateUrl: 'vendedores.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls : ['vendedores.css']
})

export class VendedoresComponent {

  private data:any;
  public productList:any;

  //public myModal;
  @ViewChild('myModal') public myModal:ModalDirective;

  objAEditar: any;
  objAEliminar: any;

  eliminar_id: any;
  eliminar_nombre: any;

  public loading = false;
  public editando = false;
  public agregando = false;
  public mostrar = true;

  public alerta = false;
  public alerta_boton = false;
  public alerta_tipo: any; //success info warning danger  
  public alerta_msg: any;

  public subiendoImg = false;

  //Formularios
  myFormAgregar: FormGroup;
  myFormEditar: FormGroup;

  public habCategoria:any;

  public catSelecAux:any;

  public admin = false;

    constructor(private http: HttpClient,private router: Router, private rutaService: RutaBaseService, public fb: FormBuilder, private permissionsService: NgxPermissionsService) {

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
        this.admin = true;

        //console.log('soy ADMIN');
      }
      
      this.myFormAgregar = this.fb.group({
        nombre: ['', [Validators.required]],
        apellido: [null],
        telefono: [null],
        correo: [null]
      });

      this.myFormEditar = this.fb.group({
        id: [''],
        nombre: ['', [Validators.required]],
        apellido: [null],
        telefono: [null],
        correo: [null]
      });

    }


    ngOnInit(): void {
      this.loading = true;

      this.http.get(this.rutaService.getRutaApi()+'constructoraKienAPI/public/vendedores?token='+localStorage.getItem('constructora_token'))
         .toPromise()
         .then(
           data => { // Success
             console.log(data);
             this.data=data;
             this.productList = this.data.vendedores;
             this.filteredItems = this.productList;
             //console.log(this.productList);

             this.init();

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
              //sin vendedores
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

    aEditar(obj): void {
      this.editando = true;
      this.objAEditar = Object.assign({},obj);
      console.log(this.objAEditar);

      this.myFormEditar.patchValue({id : this.objAEditar.id});
      this.myFormEditar.patchValue({nombre : this.objAEditar.nombre});
      this.myFormEditar.patchValue({apellido : this.objAEditar.apellido});
      this.myFormEditar.patchValue({telefono : this.objAEditar.telefono});
      this.myFormEditar.patchValue({correo : this.objAEditar.correo});
    }

    atras(): void {
      this.editando = false;
      this.agregando = false;
      this.objAEditar = null;
      //console.log(this.objAEditar);

      this.myFormAgregar.reset();
      this.myFormAgregar.reset();
    }

    aEliminar(obj): void {
      this.objAEliminar = obj;
      //console.log(this.objAEliminar);
      this.eliminar_id = this.objAEliminar.id;

      if (this.objAEliminar.apellido) {
        this.eliminar_nombre = this.objAEliminar.nombre+' '+this.objAEliminar.apellido;
      }else{
        this.eliminar_nombre = this.objAEliminar.nombre;
      }
      
      //this.myModal.show();
    }

    eliminar(): void {
      console.log(this.objAEliminar);
      
      this.loading = true;

      var datos= {
        token: localStorage.getItem('constructora_token')
      }

      this.http.delete(this.rutaService.getRutaApi()+'constructoraKienAPI/public/vendedores/'+this.eliminar_id+'?token='+localStorage.getItem('constructora_token'))
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

    agregar(): void {
      this.agregando = true;  
    }

    crear(): void {
      console.log(this.myFormAgregar.value);
      
      var imgAux: any;
      
      this.loading = true;

      var datos= {
        token: localStorage.getItem('constructora_token'),
        nombre: this.myFormAgregar.value.nombre,
        apellido: this.myFormAgregar.value.apellido,
        telefono: this.myFormAgregar.value.telefono,
        correo: this.myFormAgregar.value.correo
      }

      this.http.post(this.rutaService.getRutaApi()+'constructoraKienAPI/public/vendedores', datos)
         .toPromise()
         .then(
           data => { // Success
              console.log(data);
              this.data = data;

              if(!this.productList){
                this.productList = [];
              }
           
              this.productList.push(this.data.vendedor);

              this.filteredItems = this.productList;
              this.init();
              
              //console.log(this.productList);
              //alert(this.data.message);

              this.loading = false;

              this.alerta_tipo = 'success';
              this.alerta_msg = this.data.message;
              this.alerta = true;
              setTimeout(()=>{this.alerta = false;},4000);

              this.myFormAgregar.reset();
  
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
              else { 
                  //alert(msg.error.error);

                  this.alerta_tipo = 'danger';
                  this.alerta_msg = msg.error.error;
                  this.alerta = true;
                  setTimeout(()=>{this.alerta = false;},4000);
              }
           }
         );
    }

    editar(): void {
      
      this.loading = true;

      var datos= {
        token: localStorage.getItem('constructora_token'),
        nombre: this.myFormEditar.value.nombre,
        apellido: this.myFormEditar.value.apellido,
        telefono: this.myFormEditar.value.telefono,
        correo: this.myFormEditar.value.correo
      }

      this.http.put(this.rutaService.getRutaApi()+'constructoraKienAPI/public/vendedores/'+this.myFormEditar.value.id, datos)
         .toPromise()
         .then(
           data => { // Success
              console.log(data);
              this.data = data;

              for (var i = 0; i < this.productList.length; ++i) {
                if (this.productList[i].id == this.myFormEditar.value.id) {
                   this.productList[i].nombre = this.myFormEditar.value.nombre;
                   this.productList[i].apellido = this.myFormEditar.value.apellido;
                   this.productList[i].telefono = this.myFormEditar.value.telefono;
                   this.productList[i].correo = this.myFormEditar.value.correo;
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
              else { 
                  //alert(msg.error.error);

                  this.alerta_tipo = 'danger';
                  this.alerta_msg = msg.error.error;
                  this.alerta = true;
                  setTimeout(()=>{this.alerta = false;},4000);
              }
           }
         );
    }

    cambiarEstado(obj): void {

      var v_estado: any;

      if (obj.estado == 'ON') {
        //obj.estado = 'OFF';
        v_estado = 'OFF';
      }else{
        //obj.estado = 'ON';
        v_estado = 'ON';
      }

      var datos= {
        token: localStorage.getItem('constructora_token'),
        estado: v_estado
      }

      this.http.put(this.rutaService.getRutaApi()+'constructoraKienAPI/public/vendedores/'+obj.id, datos)
         .toPromise()
         .then(
           data => { // Success
              console.log(data);
             
              obj.estado = v_estado;

              /*this.data = data;
              obj.estado = this.data.producto.estado;
              this.filteredItems = this.productList;
              this.init();*/
              
           },
           msg => { // Error
             console.log(msg);
             //console.log(msg.error.error);

             //token invalido/ausente o token expiro
             if(msg.status == 400 || msg.status == 401){ 
                  //alert(msg.error.error);
                  //ir a login

                  this.alerta_tipo = 'warning';
                  this.alerta_msg = msg.error.error;
                  this.alerta_boton = true;
              }
              else { 
                  //alert(msg.error.error);

                  this.alerta_tipo = 'danger';
                  this.alerta_msg = msg.error.error;
                  this.alerta = true;
                  setTimeout(()=>{this.alerta = false;},4000);
              }
           }
         );
    }

   //Tabla----<
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

              if(!this.productList[i].apellido){this.productList[i].apellido = ' ';}
              if(!this.productList[i].telefono){this.productList[i].telefono = ' ';}
              if(!this.productList[i].correo){this.productList[i].correo = ' ';}

              if (this.productList[i].nombre.toUpperCase().indexOf(this.inputName.toUpperCase())>=0) {
                 this.filteredItems.push(this.productList[i]);
              }else if (this.productList[i].apellido.toUpperCase().indexOf(this.inputName.toUpperCase())>=0) {
                this.filteredItems.push(this.productList[i]);
              }else if (this.productList[i].telefono.toUpperCase().indexOf(this.inputName.toUpperCase())>=0) {
                this.filteredItems.push(this.productList[i]);
              }else if (this.productList[i].correo.toUpperCase().indexOf(this.inputName.toUpperCase())>=0) {
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
    //Tabla---->
  
}
