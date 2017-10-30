import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';



@Component({
  selector: 'app-p',
  templateUrl: 'widgets.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsComponent {
  

  private data:any;
  //private data:any;
  public data2:any;
  public socios:any;
  public productList:any;

    constructor(private http: HttpClient) {

    }

    ngOnInit(): void {
      this.http.get('http://manappger.internow.com.mx/constructoraKienAPI/public/usuarios')
         .toPromise()
         .then(
           data => { // Success
             console.log(data);
             this.data2 = data;
             this.socios=data;
             this.data=this.socios.usuarios;
             console.log(this.socios);
             /*this.productList = [
                                  {"id": 1, "name": "juice 1", "description": "description 1"},
                                  {"id": 2, "name": "juice 2", "description": "description 2"},
                                  {"id": 3, "name": "juice 3", "description": "description 3"},
                                  {"id": 4, "name": "juice 4", "description": "description 4"},
                                  {"id": 5, "name": "juice 5", "description": "description 5"},
                                  {"id": 6, "name": "juice 6", "description": "description 6"},
                                  {"id": 7, "name": "juice 7", "description": "description 7"},
                                  {"id": 8, "name": "juice 8", "description": "description 8"},
                                  {"id": 9, "name": "juice 9", "description": "description 9"},
                                  {"id": 10, "name": "orange 1", "description": "description 1"},
                                  {"id": 11, "name": "orange 2", "description": "description 2"},
                                  {"id": 12, "name": "orange 3", "description": "description 3"},
                                  {"id": 13, "name": "orange 4", "description": "description 4"},
                                  {"id": 14, "name": "orange 5", "description": "description 5"},
                                  {"id": 15, "name": "orange 6", "description": "description 6"},
                                  {"id": 16, "name": "orange 7", "description": "description 7"},
                                  {"id": 17, "name": "orange 8", "description": "description 8"},
                                  {"id": 18, "name": "orange 9", "description": "description 9"},
                                  {"id": 19, "name": "orange 10", "description": "description 10"},
                                  {"id": 20, "name": "orange 11", "description": "description 11"},
                                  {"id": 21, "name": "orange 12", "description": "description 12"},
                                  {"id": 22, "name": "orange 13", "description": "description 13"},
                                  {"id": 23, "name": "orange 14", "description": "description 14"},
                                  {"id": 24, "name": "orange 15", "description": "description 15"},
                                  {"id": 25, "name": "orange 16", "description": "description 16"},
                                  {"id": 26, "name": "orange 17", "description": "description 17"},
                                ];*/
             this.productList = this.data;
             this.filteredItems = this.productList;
             console.log(this.productList);

             this.init();
           },
           msg => { // Error
             console.log(msg.error.error);

           }
         );
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
