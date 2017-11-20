import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicacionComponent } from './aplicacion.component';

const routes: Routes = [
  {
    path: '',
    component: AplicacionComponent,
    data: {
      title: 'APLICACION'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicacionRoutingModule {}
