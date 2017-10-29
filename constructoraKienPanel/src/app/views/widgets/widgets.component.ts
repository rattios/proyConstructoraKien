import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';


@Component({
  selector: 'app-p',
  templateUrl: 'widgets.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsComponent {
  title = 'app';
  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Usuarios', name: 'user', sort: '', filtering: {filterString: '', placeholder: 'Buscar usuario'}},
    {title: 'Nombre', name: 'nombre', filtering: {filterString: '', placeholder: 'Buscar nombre'}},
    {title: 'Email', name: 'correo', sort: false, filtering: {filterString: '', placeholder: 'Buscar correo'}},
    {title: 'Teléfono', className: ['office-header', 'text-success'], name: 'telefono', sort: 'asc', filtering: {filterString: '', placeholder: 'Buscar teléfono'}}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data:Array<any> = [];
  //private data:any;
  public data2:any;
  public socios:any;

  public bigTotalItems:number = 175;
  public bigCurrentPage:number = 1;

 
  public pageChanged(event:any):void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

    constructor(private http: HttpClient) {
      this.length = this.data.length;
    }
    p: number = 1;
    collection: any;  
    public term: any;
    ngOnInit(): void {
      this.http.get('http://manappger.internow.com.mx/constructoraKienAPI/public/usuarios')
         .toPromise()
         .then(
           data => { // Success
             console.log(data);
             this.data2 = data;
             this.socios=data;
             this.data=this.socios.usuarios;
             this.collection=this.socios.socios;
             console.log(this.socios);
             //this.bigTotalItems = this.data.lenght;

             this.length = this.data.length;
        console.log(this.length);
             this.onChangeTable(this.config);
 

           },
           msg => { // Error
             console.log(msg.error.error);

           }
         );

         this.onChangeTable(this.config);
    }



  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }
  
}
