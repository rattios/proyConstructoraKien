import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { FormBuilder, FormArray, FormGroup, Validators  } from '@angular/forms';

import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';

import { LoadingModule, ANIMATION_TYPES  } from 'ngx-loading';

import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    AlertModule.forRoot(),
  	AgmCoreModule.forRoot({
        apiKey: 'AIzaSyA-jqEhc9PPkdmpvjqcNnppOFLj8brNIEQ'
      }),
  	CommonModule,
  	ReactiveFormsModule,
  	FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    LoadingModule.forRoot({
        animationType: '/assets/img/gorbis.gif',
        backdropBackgroundColour: 'rgba(0,0,0,0.5)', 
        backdropBorderRadius: '8px',
        primaryColour: '#ffffff', 
        secondaryColour: '#ffffff', 
        tertiaryColour: '#ffffff'
    })
  ],
  declarations: [ DashboardComponent],
  
})
export class DashboardModule { }
