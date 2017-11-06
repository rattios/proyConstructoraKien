import { Injectable } from '@angular/core';

@Injectable()
export class RutaBaseService {

	//Local
	public api_base = 'http://localhost/gitHub/proyConstructoraKien/';
	public images_base = 'http://localhost/gitHub/proyConstructoraKien/images_uploads/';

	//Remoto
	//public api_base = 'http://constructorakien.internow.com.mx/';
	//public images_base = 'http://constructorakien.internow.com.mx/images_uploads/';

  constructor() { }

  getRutaApi(){
  	return this.api_base;
  }

  getRutaImages(){
  	return this.images_base;
  }

}
