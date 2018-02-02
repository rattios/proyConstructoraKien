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

  

  //Modal automatica
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  public isModalShown:boolean = false;
 
  public showModal():void {
    this.isModalShown = true;
  }
 
  public hideModal():void {
    this.autoShownModal.hide();
  }
 
  public onHidden():void {
    this.isModalShown = false;
  }

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

  public productList2:any;

  public habCategoria:any;

  public catSelecAux:any;

  public mostrarSwiches = true;

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

      this.uploadFile = null;
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

    apagarSwiche(): void{
      //this.catSelecAux.estado = 'OFF';

      /*for (var i = 0; i < this.items.length; ++i) {
        if (this.items[i].id == this.catSelecAux.id) {
          this.items[i].estado = 'OFF';
        }
      }*/

      this.mostrarSwiches = true;

    }

    cambioSwicheCat(obj): void{
      //console.log(obj.estado);

      /*setTimeout(()=>{obj.estado = 'ON';
        console.log(obj.estado);
      },2000);

      setTimeout(()=>{obj.estado = 'OFF';
        console.log(obj.estado);
      },4000);*/

      this.catSelecAux = obj;

      if (obj.estado == 'ON') {
        //Apagando categoria
        this.cambiarEstado(obj);
      }else{
        //Encendiendo categoria
        this.cargarProductos(obj);
      }
    }

    cargarProductos(obj): void {

      this.loading = true;

      this.http.get(this.rutaService.getRutaApi()+'constructoraKienAPI/public/categorias/'+obj.id+'/productos?token='+localStorage.getItem('constructora_token'))
         .toPromise()
         .then(
           data => { // Success
              console.log(data);
              this.data=data;
              this.productList2 = this.data.categoria.productos;
              this.filteredItems2 = this.productList2;
              //console.log(this.productList2);

              this.init2();
              
              this.loading = false;

              if (this.productList2.length == 0) {
                //alert('La categoria no tiene productos');
                //Se cambia solo el estado de la categoria
                this.cambiarEstado(obj);
              }else{
                //alert('La categoria tiene '+this.productList2.length+' productos');
                //Se muestra la modal para elgir los productos q se quieren habilitar junto con la categoria
                this.habCategoria = obj;
                this.showModal();
                this.mostrarSwiches = false;
              }
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

    //Para la categoria
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

      this.http.put(this.rutaService.getRutaApi()+'constructoraKienAPI/public/categorias/'+obj.id, datos)
         .toPromise()
         .then(
           data => { // Success
              console.log(data);
              //this.data = data;

              obj.estado = v_estado;
              
           },
           msg => { // Error
             console.log(msg);
             console.log(msg.error.error);

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

    cambioSwicheProd(objProd): void {

      if (objProd.estado == 'ON') {
        objProd.estado = 'OFF';
      }else{
        objProd.estado = 'ON';
      }

    }


    habilitarCat(): void{
      //console.log(this.productList2);

      //this.cambiarEstado(this.habCategoria);

      //alert(JSON.stringify(this.productList2));

      /*var auxProductos = [];

      for (var i = 0; i < this.productList2.length; ++i) {
        auxProductos.push(this.productList2[i]);
      }

      alert(JSON.stringify(auxProductos));*/

      this.mostrarSwiches = true;

      this.loading = true;

      setTimeout(()=>{

        var datos= {
          token: localStorage.getItem('constructora_token'),
          estado: 'ON',
          productos: JSON.stringify(this.productList2)
          //productos: JSON.stringify(auxProductos)
          //productos: this.productos
          //productos: JSON.stringify(this.productos)
          //productos: '[{"id":1,"cantidad":3,"estado":"ON"},{"id":3,"cantidad":3,"estado":"OFF"}]'
        }

        this.http.put(this.rutaService.getRutaApi()+'constructoraKienAPI/public/categorias/'+this.habCategoria.id, datos)
           .toPromise()
           .then(
             data => { // Success
                console.log(data);
                this.data = data;

                this.habCategoria.estado = 'ON';
                //auxProductos = [];

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

        },300);

      
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
              if (this.productList[i].nombre.toUpperCase().indexOf(this.inputName.toUpperCase())>=0) {
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

   //Tabla2 Productos de la categoria X----<
   filteredItems2 : any;
   pages2 : number = 4;
   pageSize2 : number = 5;
   pageNumber2 : number = 0;
   currentIndex2 : number = 1;
   items2: any;
   pagesIndex2 : Array<number>;
   pageStart2 : number = 1;
   inputName2 : string = '';

   init2(){
         this.currentIndex2 = 1;
         this.pageStart2 = 1;
         this.pages2 = 4;

         this.pageNumber2 = parseInt(""+ (this.filteredItems2.length / this.pageSize2));
         if(this.filteredItems2.length % this.pageSize2 != 0){
            this.pageNumber2 ++;
         }
    
         if(this.pageNumber2  < this.pages2){
               this.pages2 =  this.pageNumber2;
         }
       
         this.refreshItems2();
         console.log("this.pageNumber2 :  "+this.pageNumber2);
   }

   FilterByName2(){
      this.filteredItems2 = [];
      if(this.inputName2 != ""){
            for (var i = 0; i < this.productList2.length; ++i) {
              if (this.productList2[i].nombre.toUpperCase().indexOf(this.inputName2.toUpperCase())>=0) {
                 this.filteredItems2.push(this.productList2[i]);
              }else if (this.productList2[i].costo.toString().indexOf(this.inputName2)>=0) {
                 this.filteredItems2.push(this.productList2[i]);
              }else if (this.productList2[i].cantidad.toString().indexOf(this.inputName2)>=0) {
                 this.filteredItems2.push(this.productList2[i]);
              }else if (this.productList2[i].unidad.toUpperCase().indexOf(this.inputName2.toUpperCase())>=0) {
                 this.filteredItems2.push(this.productList2[i]);
              }
            }

            // this.productList.forEach(element => {
            //     if(element.nombre.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
            //       this.filteredItems.push(element);
            //    }
            // });
      }else{
         this.filteredItems2 = this.productList2;
      }
      console.log(this.filteredItems2);
      this.init2();
   }
   fillArray2(): any{
      var obj = new Array();
      for(var index = this.pageStart2; index< this.pageStart2 + this.pages2; index ++) {
                  obj.push(index);
      }
      return obj;
   }
   refreshItems2(){
       this.items2 = this.filteredItems2.slice((this.currentIndex2 - 1)*this.pageSize2, (this.currentIndex2) * this.pageSize2);
       this.pagesIndex2 =  this.fillArray2();
   }
   prevPage2(){
      if(this.currentIndex2>1){
         this.currentIndex2 --;
      } 
      if(this.currentIndex2 < this.pageStart2){
         this.pageStart2 = this.currentIndex2;
      }
      this.refreshItems2();
   }
   nextPage2(){
      if(this.currentIndex2 < this.pageNumber2){
            this.currentIndex2 ++;
      }
      if(this.currentIndex2 >= (this.pageStart2 + this.pages2)){
         this.pageStart2 = this.currentIndex2 - this.pages2 + 1;
      }
 
      this.refreshItems2();
   }
    setPage2(index : number){
         this.currentIndex2 = index;
         this.refreshItems2();
    }
    //Tabla2 Productos de la categoria X---->

    //Subir imagen----<
    uploadFile: any;
    hasBaseDropZoneOver: boolean = false;
    options: Object = {
      url: this.rutaService.getRutaImages()+'upload.php'
      //url: 'http://constructorakien.internow.com.mx/images_uploads/upload.php'
    };
    sizeLimit = 2000000;
   
    handleUpload(data): void {
      setTimeout(() => {
         this.subiendoImg = false;
       },1000);
      
      if (data && data.response) {
        data = JSON.parse(data.response);
        this.uploadFile = data;
        //this.objAAgregar.imagen = this.rutaService.getRutaImages()+'uploads/'+this.uploadFile.generatedName;
        this.myFormAgregar.patchValue({imagen : this.rutaService.getRutaImages()+'uploads/'+this.uploadFile.generatedName});
        //this.objAEditar.imagen = this.rutaService.getRutaImages()+'uploads/'+this.uploadFile.generatedName;
        this.myFormEditar.patchValue({imagen : this.rutaService.getRutaImages()+'uploads/'+this.uploadFile.generatedName});
        
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
