import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImgFondoComponent } from './img-fondo.component';
import { ImgRegistroComponent } from './img-registro.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'APLICACION'
    },
    children: [
      {
        path: 'img-fondo',
        component: ImgFondoComponent,
        data: {
          title: 'IMAGEN DE FONDO'
        }
      },
      {
        path: 'img-registro',
        component: ImgRegistroComponent,
        data: {
          title: 'IMAGEN DE REGISTRO'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicacionRoutingModule {}
