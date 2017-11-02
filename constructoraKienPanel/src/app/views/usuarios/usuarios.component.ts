import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';

import { ModalDirective } from 'ngx-bootstrap/modal/modal.component'; //modales


export class Cliente {
  id: number;
  user: string;
  nombre: string;
  telefono: string;
}

@Component({
  selector: 'app-p',
  templateUrl: 'usuarios.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})

export class UsuariosComponent {

  private data:any;
  public productList:any;

  selectedCliente: any;
  clienteAEliminar: any;
  eliminar_id: any;
  eliminar_user: any;

  public loading = false;

  prueba = 'prueba binding';

    constructor(private http: HttpClient) {

    }

    ngOnInit(): void {
      this.loading = true;
      this.http.get('http://localhost/gitHub/proyConstructoraKien/constructoraKienAPI/public/usuarios?token='+localStorage.getItem('constructora_token'))
      //this.http.get('http://manappger.internow.com.mx/constructoraKienAPI/public/usuarios?token='+localStorage.getItem('constructora_token'))
         .toPromise()
         .then(
           data => { // Success
             console.log(data);
             this.data=data;
             this.productList = this.data.usuarios;
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
                  alert(msg.error.error);
                  //ir a login
              }
              //sin usuarios
              else if(msg.status == 404){ 
                  alert(msg.error.error);
              }
              

           }
         );
    }

    ver(cliente: any): void {
      this.selectedCliente = cliente;
      console.log(this.selectedCliente);
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
    }

    eliminarModal(): void{
      this.loading = true;
      //this.myModal.hide();
    }

    atras(): void {
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
