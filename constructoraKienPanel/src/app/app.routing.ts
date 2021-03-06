import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { LoginComponent } from './login/login.component';

// Import Containers
import {
  FullLayout,
  SimpleLayout
} from './containers';

export const routes: Routes = [
  { path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  /*{ path: 'login2',
    component: LoginComponent
  },*/
  { path: '',
    component: FullLayout,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'usuarios',
        loadChildren: './views/usuarios/usuarios.module#UsuariosModule'
      },
      {
        path: 'categorias',
        loadChildren: './views/categorias/categorias.module#CategoriasModule'
      },
      {
        path: 'productos',
        loadChildren: './views/productos/productos.module#ProductosModule'
      },
      {
        path: 'pedidos',
        loadChildren: './views/pedidos/pedidos.module#PedidosModule'
      },
      {
        path: 'aplicacion',
        loadChildren: './views/aplicacion/aplicacion.module#AplicacionModule'
      },
      {
        path: 'vendedores',
        loadChildren: './views/vendedores/vendedores.module#VendedoresModule'
      },
    ]
  },
  {
    path: 'pages',
    component: SimpleLayout,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
