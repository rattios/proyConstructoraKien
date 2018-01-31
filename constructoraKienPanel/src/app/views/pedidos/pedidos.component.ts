import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

//import { ModalDirective } from 'ngx-bootstrap/modal/modal.component'; //modales
import { ModalDirective } from 'ngx-bootstrap/modal';

import { RutaBaseService } from '../../services/ruta-base.service';

import { FormBuilder, FormArray, FormGroup, Validators  } from '@angular/forms';

import * as jsPDF from 'jspdf';

import * as html2canvas from 'html2canvas';
//import * as html2canvas from 'html2canvas/dist/html2canvas.js';


@Component({
  selector: 'app-pedidos',
  templateUrl: 'pedidos.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls : ['pedidos.css']
})

export class PedidosComponent {

  

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

  //Formularios
  myFormAgregar: FormGroup;
  myFormEditar: FormGroup;

  //Contadores de los pedidos
  public countPHoy: any;
  public countPAnio: any;

  selectedObj: any;

  public viendo = false;
  public productList2:any;

  @ViewChild('content') public content:ElementRef;

  public downloadPDF(){

    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width':190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('test.pdf');
  }

  public downloadPDF2(){

   /*html2canvas(this.content.nativeElement, <Html2Canvas.Html2CanvasOptions>{
      onrendered: function(canvas: HTMLCanvasElement) {
        var pdf = new jsPDF('p','pt','a4');    
        var img = canvas.toDataURL("image/png");
        pdf.addImage(img, 'PNG', 10, 10, 580, 300);
        pdf.save('web.pdf');
      }
    });*/

    /*html2canvas(document.getElementById("content"), {
            onrendered: function(canvas) {

                var imgData = canvas.toDataURL('image/png');
                console.log('Report Image URL: '+imgData);
                var doc = new jsPDF('p', 'mm', [297, 210]); //210mm wide and 297mm high
                
                doc.addImage(imgData, 'PNG', 10, 10);
                doc.save('sample.pdf');
            }
        });*/

    /*html2canvas(document.querySelector("#content")).then(canvas => {
        document.body.appendChild(canvas);

        var imgData = canvas.toDataURL('image/png');
        console.log('Report Image URL: '+imgData);
        var doc = new jsPDF('p','pt','a4');
        
        doc.addImage(imgData, 'PNG', 10, 10, 580, 300);
        doc.save('pedido.pdf');
    });*/

    html2canvas(document.querySelector("#content")).then(canvas => {
        document.body.appendChild(canvas);

        var imgData = canvas.toDataURL('image/png');
        //console.log('Report Image URL: '+imgData);
        //var doc = new jsPDF('p','pt','a4');
        var doc = new jsPDF();
        
        //doc.addImage(imgData, 'PNG', 5, 5);
        //doc.addImage(imgData, 'PNG', 30, 1);
        //doc.addImage(imgData, 'JPEG', 1, 1);
        doc.addImage(imgData, 'PNG', 10, 1);
        doc.save('pedido.pdf');
    });
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
          
          <style>
            @media print {
              @page { margin: 0; }
              body { margin: 1.6cm; }
              .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {
                    float: left;
               }
               .col-sm-12 {
                    width: 100%;
               }
               .col-sm-9 {
                    width: 75%;
               }
               .col-sm-3 {
                    width: 25%;
               }
               .form-control-static {
                 margin-bottom: 0px;
               }
            }
          </style>

        </head>

      <body onload="window.print();window.close()"> ${printContents} </body>
      </html>`
    );
    popupWin.document.close();
  }

    constructor(private http: HttpClient,private router: Router, private rutaService: RutaBaseService, public fb: FormBuilder) {
      
      this.myFormAgregar = this.fb.group({
        nombre: ['', [Validators.required]],
        imagen: ['', [Validators.required]]
      });

      this.myFormEditar = this.fb.group({
        id: [''],
        nombre: ['', [Validators.required]],
        imagen: ['', [Validators.required]]
      });

    }


    ngOnInit(): void {
      this.loading = true;

      this.http.get(this.rutaService.getRutaApi()+'constructoraKienAPI/public/pedidos/hoy/anio?token='+localStorage.getItem('constructora_token'))
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


             for (var i = 0; i < this.data.pedidosHoy.length; i++) {
               fecha = new Date(this.data.pedidosHoy[i].created_at);
               //this.data.pedidosHoy[i].created_at = new Date(this.data.pedidosHoy[i].created_at);
               dia = fecha.getDate();
               mes = fecha.getMonth() + 1;
               anio = fecha.getFullYear();

               hora = fecha.getHours();
               minutos = fecha.getMinutes();
               segundos = fecha.getSeconds();

               this.data.pedidosHoy[i].fecha = dia+'/'+mes+'/'+anio;
               this.data.pedidosHoy[i].hora = hora+':'+minutos+':'+segundos;
             }

             for (var i = 0; i < this.data.pedidosAnio.length; i++) {
               fecha = new Date(this.data.pedidosAnio[i].created_at);
               //this.data.pedidosAnio[i].created_at = new Date(this.data.pedidosAnio[i].created_at, "dd/MM/yyyy hh:mm:ss");
               dia = fecha.getDate();
               mes = fecha.getMonth() + 1;
               anio = fecha.getFullYear();

               hora = fecha.getHours();
               minutos = fecha.getMinutes();
               segundos = fecha.getSeconds();

               this.data.pedidosAnio[i].fecha = dia+'/'+mes+'/'+anio;
               this.data.pedidosAnio[i].hora = hora+':'+minutos+':'+segundos;

               //console.log(this.data.pedidosAnio[i].fecha);
             }

             setTimeout(()=>{
               this.productList = this.data.pedidosHoy;
               this.filteredItems = this.productList;
               //console.log(this.productList);
               this.countPHoy = this.productList.length;
               this.init();

               this.productList2 = this.data.pedidosAnio;
               this.filteredItems2 = this.productList2;
               this.countPAnio = this.productList2.length;
               this.init2();

               this.loading = false;
             },1000);
           },
           msg => { // Error
             console.log(msg);
             console.log(msg.error.error);

             //token invalido/ausente o token expiro
             if(msg.status == 400 || msg.status == 401){ 
                  //alert(msg.error.error);
                  //ir a login

                  this.loading = false;

                  this.alerta_tipo = 'warning';
                  this.alerta_msg = msg.error.error;
                  this.alerta_boton = true;
                  this.mostrar = false;

              }
              //sin pedidosHoy
              else if(msg.status == 404){ 
                  //alert(msg.error.error);

                 this.countPHoy = 0;

                 var dia : any;
                 var mes : any;
                 var anio : any;
                 var fecha : any;
                 var hora : any;
                 var minutos : any;
                 var segundos : any;

                  for (var i = 0; i < msg.error.pedidosAnio.length; i++) {
                    fecha = new Date(msg.error.pedidosAnio[i].created_at);
                     //this.data.pedidosAnio[i].created_at = new Date(this.data.pedidosAnio[i].created_at, "dd/MM/yyyy hh:mm:ss");
                     dia = fecha.getDate();
                     mes = fecha.getMonth() + 1;
                     anio = fecha.getFullYear();

                     hora = fecha.getHours();
                     minutos = fecha.getMinutes();
                     segundos = fecha.getSeconds();

                     msg.error.pedidosAnio[i].fecha = dia+'/'+mes+'/'+anio;
                     msg.error.pedidosAnio[i].hora = hora+':'+minutos+':'+segundos;

                     //console.log(this.data.pedidosAnio[i].fecha);
                   }

                  setTimeout(()=>{

                    this.loading = false;

                    this.productList2 = msg.error.pedidosAnio;
                    this.filteredItems2 = this.productList2;
                    this.countPAnio = this.productList2.length;
                    this.init2();
                  },1000);

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

    //No esta en uso
    aEditar(obj): void {
      this.editando = true;
      this.objAEditar = Object.assign({},obj);
      console.log(this.objAEditar);

      this.myFormEditar.patchValue({id : this.objAEditar.id});
      this.myFormEditar.patchValue({nombre : this.objAEditar.nombre});
      this.myFormEditar.patchValue({imagen : this.objAEditar.imagen});
    }

    ver(obj): void {
      this.viendo = true;
      this.selectedObj = Object.assign({},obj);
      console.log(this.selectedObj);

      if (this.selectedObj.lat && this.selectedObj.lng) {
        this.selectedObj.lat = parseFloat(this.selectedObj.lat);
        this.selectedObj.lng = parseFloat(this.selectedObj.lng);
      }
    }

    atras(): void {
      this.viendo = false;
      this.selectedObj = null;
      this.objAEliminar = null;
      this.editando = false;
      this.agregando = false;
      this.objAEditar = null;
      //console.log(this.objAEditar);

      this.objAAgregar.nombre = '';
      this.objAAgregar.imagen = '';

      this.uploadFile = null;
      this.myFormAgregar.reset();
      this.myFormAgregar.reset();
    }

    aEliminar(): void {
      this.objAEliminar = this.selectedObj;
      //console.log(this.objAEliminar);
      this.eliminar_id = this.objAEliminar.id;
      this.eliminar_nombre = this.objAEliminar.usuario.nombre;
      //this.myModal.show();
    }

    eliminar(): void {
      console.log(this.objAEliminar);
      
      this.loading = true;

      var datos= {
        token: localStorage.getItem('constructora_token')
      }

      this.http.delete(this.rutaService.getRutaApi()+'constructoraKienAPI/public/pedidos/'+this.eliminar_id+'?token='+localStorage.getItem('constructora_token'))
         .toPromise()
         .then(
           data => { // Success
              console.log(data);
              this.data = data;

              //----<
              if (this.productList) {
                var aux = this.productList;
                this.productList = [];

                for (var i = 0; i < aux.length; ++i) {
                  if (aux[i].id != this.eliminar_id) {
                     this.productList.push(aux[i]);
                  }
                  else{
                    this.countPHoy = this.countPHoy - 1;
                  }
                }

                this.filteredItems = this.productList;
                this.init();
              }
              
              //---->

              //----<
              var aux2 = this.productList2;
              this.productList2 = [];

              for (var i = 0; i < aux2.length; ++i) {
                if (aux2[i].id != this.eliminar_id) {
                   this.productList2.push(aux2[i]);
                }
                else{
                  this.countPAnio = this.countPAnio - 1; 
                }
              }

              this.filteredItems2 = this.productList2;
              this.init2();
              //---->
              
              //console.log(this.productList);
              //alert(this.data.message);

              this.loading = false;
              this.atras();

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

    //No esta en uso
    agregar(): void {
      this.agregando = true;  
    }

    //No esta en uso
    crear(): void {
      console.log(this.myFormAgregar.value);
      
      var imgAux: any;
      
      if(this.uploadFile){
        imgAux = this.myFormAgregar.value.imagen;
        }
      else{
        imgAux = '';
      }
      
      this.loading = true;

      var datos= {
        token: localStorage.getItem('constructora_token'),
        nombre: this.myFormAgregar.value.nombre,
        imagen: this.myFormAgregar.value.imagen
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

              this.uploadFile = null;
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

    //No esta en uso
    editar(): void {
     
      var imgAux: any;
      
      if(this.uploadFile){
        imgAux = this.myFormEditar.value.imagen; 
        //imgAux = 'http://constructorakien.internow.com.mx/images_uploads/uploads/'+this.uploadFile.generatedName;        
      }
      else{
        imgAux = this.myFormEditar.value.imagen;
      }
      
      this.loading = true;

      var datos= {
        token: localStorage.getItem('constructora_token'),
        nombre: this.myFormEditar.value.nombre,
        imagen: this.myFormEditar.value.imagen
      }

      this.http.put(this.rutaService.getRutaApi()+'constructoraKienAPI/public/categorias/'+this.myFormEditar.value.id, datos)
      //this.http.put('http://constructorakien.internow.com.mx/constructoraKienAPI/public/categorias/'+this.objAEditar.id, datos)
         .toPromise()
         .then(
           data => { // Success
              console.log(data);
              this.data = data;

              for (var i = 0; i < this.productList.length; ++i) {
                if (this.productList[i].id == this.myFormEditar.value.id) {
                   this.productList[i].nombre = this.myFormEditar.value.nombre;
                   this.productList[i].imagen = this.myFormEditar.value.imagen;
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

    //No esta en uso
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
              if (this.productList[i].usuario.nombre.toUpperCase().indexOf(this.inputName.toUpperCase())>=0) {
                 this.filteredItems.push(this.productList[i]);
              }else if (this.productList[i].fecha.toUpperCase().indexOf(this.inputName.toUpperCase())>=0) {
                 this.filteredItems.push(this.productList[i]);
              }
              else if (this.productList[i].hora.toUpperCase().indexOf(this.inputName.toUpperCase())>=0) {
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

   //Tabla2 Pedidos historial----<
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
              if (this.productList2[i].usuario.nombre.toUpperCase().indexOf(this.inputName2.toUpperCase())>=0) {
                 this.filteredItems2.push(this.productList2[i]);
              }else if (this.productList2[i].fecha.toUpperCase().indexOf(this.inputName2.toUpperCase())>=0) {
                 this.filteredItems2.push(this.productList2[i]);
              }
              else if (this.productList2[i].hora.toUpperCase().indexOf(this.inputName2.toUpperCase())>=0) {
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
    //Tabla2 Pedidos historial---->

    //No esta en uso
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
