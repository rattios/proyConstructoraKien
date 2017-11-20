//import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { PagesRoutingModule } from './pages-routing.module';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { LoadingModule, ANIMATION_TYPES  } from 'ngx-loading';

@NgModule({
  imports: [ 
  FormsModule,
  PagesRoutingModule,
  LoadingModule.forRoot({
        animationType: '/assets/img/gorbis.gif',
        backdropBackgroundColour: 'rgba(0,0,0,0.5)', 
        backdropBorderRadius: '8px',
        primaryColour: '#ffffff', 
        secondaryColour: '#ffffff', 
        tertiaryColour: '#ffffff'
    }) ],
  declarations: [
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }]/*,
  bootstrap: [ LoginComponent ]*/
})
export class PagesModule { }
