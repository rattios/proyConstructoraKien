import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { FormsModule } from '@angular/forms';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

import { LoadingModule, ANIMATION_TYPES  } from 'ngx-loading';

//import { BsModalModule } from 'ng2-bs3-modal';

@NgModule({
  imports: [
    //BsModalModule,
  	UsuariosRoutingModule,
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
        tertiaryColour: '#ffffff'
    })
  ],
  declarations: [ UsuariosComponent ]
})
export class UsuariosModule { }
