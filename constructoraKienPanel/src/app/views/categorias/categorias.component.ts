import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

//import { ModalDirective } from 'ngx-bootstrap/modal/modal.component'; //modales
import { ModalDirective } from 'ngx-bootstrap/modal';

import { RutaBaseService } from '../../services/ruta-base.service';

@Component({
  selector: 'app-p',
  templateUrl: 'categorias.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})

export class CategoriasComponent {

  /*Modal automatica
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  public isModalShown:boolean = true;
 
  public showModal():void {
    this.isModalShown = true;
  }
 
  public hideModal():void {
    this.autoShownModal.hide();
  }
 
  public onHidden():void {
    this.isModalShown = false;
  }*/

  private data:any;
  public productList:any;

  //public myModal;
  @ViewChild('myModal') public myModal:ModalDirective;

  objAEditar: any;
  objAEliminar: any;
  objAAgregar = {
    nombre : '',
    imagen : ''
  };
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

    constructor(private http: HttpClient,private router: Router, private rutaService: RutaBaseService) {

    }

    ngOnInit(): void {
      this.loading = true;

      this.http.get(this.rutaService.getRutaApi()+'constructoraKienAPI/public/categorias?token='+localStorage.getItem('constructora_token'))
      //this.http.get('http://constructorakien.internow.com.mx/constructoraKienAPI/public/categorias?token='+localStorage.getItem('constructora_token'))
         .toPromise()
         .then(
           data => { // Success
             console.log(data);
             this.data=data;
             this.productList = this.data.categorias;
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
              //sin categorias
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

    aEditar(obj): void {
      this.editando = true;
      this.objAEditar = obj;
      console.log(this.objAEditar);
    }

    atras(): void {
      this.editando = false;
      this.agregando = false;
      this.objAEditar = null;
      //console.log(this.objAEditar);

      this.objAAgregar.nombre = '';
      this.objAAgregar.imagen = '';

      this.uploadFile = null;
    }

    aEliminar(obj): void {
      this.objAEliminar = obj;
      //console.log(this.objAEliminar);
      this.eliminar_id = this.objAEliminar.id;
      this.eliminar_nombre = this.objAEliminar.nombre;
      //this.myModal.show();
    }

    eliminar(): void {
      console.log(this.objAEliminar);
      
      this.loading = true;

      var datos= {
        token: localStorage.getItem('constructora_token')
      }

      this.http.delete(this.rutaService.getRutaApi()+'constructoraKienAPI/public/categorias/'+this.eliminar_id+'?token='+localStorage.getItem('constructora_token'))
      //this.http.delete('http://constructorakien.internow.com.mx/constructoraKienAPI/public/categorias/'+this.eliminar_id+'?token='+localStorage.getItem('constructora_token'))
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
      console.log(this.objAAgregar);
      
      var imgAux: any;
      
      if(this.uploadFile){
        imgAux = this.rutaService.getRutaImages()+'uploads/'+this.uploadFile.generatedName;
        //imgAux = 'http://constructorakien.internow.com.mx/images_uploads/uploads/'+this.uploadFile.generatedName;        
      }
      else{
        imgAux = '';
      }
      
      this.loading = true;

      var datos= {
        token: localStorage.getItem('constructora_token'),
        nombre: this.objAAgregar.nombre,
        imagen: imgAux
      }

      this.http.post(this.rutaService.getRutaApi()+'constructoraKienAPI/public/categorias', datos)
      //this.http.post('http://constructorakien.internow.com.mx/constructoraKienAPI/public/categorias', datos)
         .toPromise()
         .then(
           data => { // Success
              console.log(data);
              this.data = data;

              if(!this.productList){
                this.productList = [];
              }
           
              this.productList.push(this.data.categoria);

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

    editar(): void {
     
      var imgAux: any;
      
      if(this.uploadFile){
        imgAux = this.rutaService.getRutaImages()+'uploads/'+this.uploadFile.generatedName; 
        //imgAux = 'http://constructorakien.internow.com.mx/images_uploads/uploads/'+this.uploadFile.generatedName;        
      }
      else{
        imgAux = this.objAEditar.imagen;
      }
      
      this.loading = true;

      var datos= {
        token: localStorage.getItem('constructora_token'),
        nombre: this.objAEditar.nombre,
        imagen: imgAux
      }

      this.http.put(this.rutaService.getRutaApi()+'constructoraKienAPI/public/categorias/'+this.objAEditar.id, datos)
      //this.http.put('http://constructorakien.internow.com.mx/constructoraKienAPI/public/categorias/'+this.objAEditar.id, datos)
         .toPromise()
         .then(
           data => { // Success
              console.log(data);
              this.data = data;

              for (var i = 0; i < this.productList.length; ++i) {
                if (this.productList[i].id == this.objAEditar.id) {
                   this.productList[i].nombre = this.objAEditar.nombre;
                   this.productList[i].imagen = imgAux;
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
              }/*else if (this.productList[i].id.indexOf(this.inputName)>=0) {
                 this.filteredItems.push(this.productList[i]);
              }*/
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
        this.objAAgregar.imagen = this.rutaService.getRutaImages()+'uploads/'+this.uploadFile.generatedName;
        this.objAEditar.imagen = this.rutaService.getRutaImages()+'uploads/'+this.uploadFile.generatedName;
        //this.objAAgregar.imagen = 'http://constructorakien.internow.com.mx/images_uploads/uploads/'+this.uploadFile.generatedName;
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
