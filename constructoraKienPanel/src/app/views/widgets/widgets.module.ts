import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { FormsModule } from '@angular/forms';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
  	CommonModule ,
    WidgetsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    FormsModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
  ],
  declarations: [ WidgetsComponent ]
})
export class WidgetsModule { }
