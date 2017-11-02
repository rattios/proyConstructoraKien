import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
  	CommonModule ,
    WidgetsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    FormsModule,

  ],
  declarations: [ WidgetsComponent ]
})
export class WidgetsModule { }
