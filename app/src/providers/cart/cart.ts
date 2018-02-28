import {Injectable} from '@angular/core';
import {StorageProvider} from '../storage/storage';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CartProvider {
  cartObj: any = {};
  codigos: any = [];
  products: any;

  constructor(public storage: StorageProvider, public http: HttpClient) {
    let code = this.storage.getObject('codeKien');
    let item = this.storage.getObject('cartKien');
    if (item) {
      this.cartObj.cart = item.cart;
      this.cartObj.total = item.total;
      this.cartObj.cantidad = item.cantidad;
      this.cartObj.id = this.storage.get('userKien');
    }
    if (code) {
      this.codigos = code;
      this.http.get('http://constructorakien.internow.com.mx/constructoraKienAPI/public/productos/buscar/codigos?codigos='+JSON.stringify(this.codigos))
      .toPromise()
      .then(
      data => {
        console.log(data); 
        this.products = data;
        this.consultProducts(this.products);    
      },
      msg => {
        
      });
    } else {
      this.codigos = [];
      this.cartObj.cart = [];
      this.cartObj.total = 0;
      this.cartObj.cantidad = 0;
      this.cartObj.id = this.storage.get('userKien');
    }
    console.log(this.codigos);
  }

  consultProducts(products){
    let item = this.storage.getObject('cartKien');
    if (item) {
      for (var i = 0; i < item.cart.length; ++i) {
        let index = products.productos.findIndex((items) => items.codigo === item.cart[i].codigo);
        console.log(index);
        if(index !== -1){
          products.productos[index].check = item.cart[i].check;
          products.productos[index].cantidad = item.cart[i].cantidad;
          this.cartObj.cart[i] = products.productos[index];
        } else {
          this.removeProduct(item.cart[i]).subscribe(
            success => {
              console.log(success);
            },
            error => {
            }
          );
        }
      }
    } 
  }

  addProduct(product, quantity) {
 	  return Observable.create(observer => {
      if(this.cartObj.cart.some(x => x.id === product.id)){
  			observer.error('Este producto ya esta incluido en el pedido');
  			observer.complete();
  		} else{
        product.cantidad = quantity;
  		  this.cartObj.cart.push(product);
        this.codigos.push({"id": product.id, "codigo": product.codigo});
  			this.cartObj.cantidad += 1;	
  			this.cartObj.total += parseFloat(product.costo);
  			this.storage.setObject('cartKien', this.cartObj);
        this.storage.setObject('codeKien', this.codigos);
  			observer.next(this.cartObj);
  			observer.complete();
        console.log(this.codigos);
  		}
    });
  }

  updateProduct(product, quantity) {
     return Observable.create(observer => {
       console.log(this.cartObj);
      if(this.cartObj.cart.some(x => x.id === product.id)){
        product.cantidad = quantity;
        this.cartObj.total = 0;
        if (quantity.indexOf('/') !== -1) {
          const [first, second] = quantity.split('/');
          if (second !== '') {
            let costot = first/second;
            this.cartObj.cart.forEach((elem) => {
              if (elem.id === product.id){
                this.cartObj.total += parseFloat(product.costo)*costot;
              } else{
                var cant = elem.cantidad.toString();
                if (cant.indexOf('/') !== -1) {
                  const [first2, second2] = cant.split('/');
                  if (second2 !== '') {
                    let costot2 = first2/second2;
                    this.cartObj.total += parseFloat(elem.costo)*costot2;
                  }
                } else {
                  this.cartObj.total += parseFloat(elem.costo)*elem.cantidad;
                } 
              }
            });
          }
        } else {
          this.cartObj.cart.forEach((elem) => {
            if (elem.id === product.id){
              this.cartObj.total += parseFloat(product.costo)*quantity;
            } else{
              var cant = elem.cantidad.toString();
              if (cant.indexOf('/') !== -1) {
                const [first2, second2] = cant.split('/');
                if (second2 !== '') {
                  let costot2 = first2/second2;
                  this.cartObj.total += parseFloat(elem.costo)*costot2;
                }
              } else {
                this.cartObj.total += parseFloat(elem.costo)*elem.cantidad;
              } 
            }
          });
        }
        if (isNaN(this.cartObj.total)) {  
          observer.error('Ingrese una cantidad válida');
          observer.complete();
        } else {
          this.storage.setObject('cartKien', this.cartObj);
          console.log(this.cartObj);
          observer.next(this.cartObj);
          observer.complete();
        }
      } else{
        observer.error('Este producto no está en el pedido');
        observer.complete();
      }
    });
  }

  getCartContents() {
  	return this.cartObj.cart;
  }

  getCartCount(){
  	return this.cartObj.cantidad;
  }
  
  getCartTotal(){
  	return this.cartObj.total;
  }

  getCartId(){
    return this.cartObj.id;
  }
 
  removeProduct(product) {
    return Observable.create(observer => {
    	let index = this.cartObj.cart.findIndex((item) => item.id === product.id);
      if(index !== -1){
      	this.cartObj.cart.splice(index, 1);
  			this.cartObj.cantidad -= 1;	
        var cant = product.cantidad.toString();
        if (cant.indexOf('/') !== -1) {
          const [first2, second2] = cant.split('/');
          if (second2 !== '') {
            let costot2 = first2/second2;
            this.cartObj.total -= parseFloat(product.costo)*costot2;
          }
        } else {
          this.cartObj.total -= parseFloat(product.costo)*product.cantidad;
        }

        let index1 = this.codigos.findIndex((item) => item.id === product.id);
        if(index1 !== -1){
          this.codigos.splice(index1, 1);
          this.storage.setObject('codeKien', this.codigos);
        }
        console.log(this.codigos);
       
        if (this.cartObj.cantidad === 0) {
          this.storage.remove('cartKien');
        } else {
          this.storage.setObject('cartKien', this.cartObj);
        }
  			observer.next(this.cartObj);
  			observer.complete();
  		} else{
  			observer.error('Este servicio no esta incluido en el pedido');
  			observer.complete(); 
  		}
    });
  }

  deleteCar(){
    this.cartObj.cart = [];
    this.cartObj.total = 0;
    this.cartObj.cantidad = 0;
    this.cartObj.id = '';
    this.codigos = [];
    this.storage.setObject('cartKien',this.cartObj);
    this.storage.setObject('codeKien', this.codigos);
  }
}

