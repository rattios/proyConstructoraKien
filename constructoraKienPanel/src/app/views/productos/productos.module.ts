import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ProductosComponent } from './productos.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { FormsModule } from '@angular/forms';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

import { LoadingModule, ANIMATION_TYPES  } from 'ngx-loading';

//import { BsModalModule } from 'ng2-bs3-modal';

import { Ng2UploaderModule } from 'ng2-uploader';

//import { HttpClientModule } from '@angular/common/http';

import { AlertModule } from 'ngx-bootstrap/alert';

import { ReactiveFormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    NgxPermissionsModule.forRoot(),
    ReactiveFormsModule,
    AlertModule.forRoot(),
    //HttpClientModule,
    Ng2UploaderModule,
    //BsModalModule,
  	ProductosRoutingModule,
  	CommonModule ,
    BsDropdownModule,
    FormsModule,
    ModalModule.forRoot(),
    LoadingModule.forRoot({
        animationType: '/assets/img/gorbis.gif',
        backdropBackgroundColour: 'rgba(0,0,0,0.5)', 
        backdropBorderRadius: '8px',
        primaryColour: '#ffffff', 
        secondaryColour: '#ffffff', 
        tertiaryColour: '#ffffff',
        fullScreenBackdrop: true
    })
  ],
  declarations: [ ProductosComponent ]
})
export class ProductosModule { }
