<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    //return view('welcome');
    
});

Route::group(  ['middleware' =>'cors'], function(){

    //----Pruebas DocumentacionController
    Route::get('/documentacion','DocumentacionController@index');

    //----Pruebas LoginController
    Route::post('/login/web','LoginController@loginWeb');
    Route::post('/login/app','LoginController@loginApp'); 

    //----Pruebas PasswordController
    Route::get('/password/cliente/{correo}','PasswordController@generarCodigo');
    Route::get('/password/codigo/{codigo}','PasswordController@validarCodigo');
     
    //Registro de clientes   
    Route::post('/clientes','UsuarioController@storeCliente');
    //Registro de socios
    Route::post('/socios','SocioController@store');
    Route::get('/categorias/subcategorias','CategoriaController@categoriasSubcategorias');

        //----Pruebas UsuarioController
        Route::get('/usuarios','UsuarioController@index');
        Route::get('/usuarios/pedidos','UsuarioController@usuariosPedidos');
        Route::post('/usuarios','UsuarioController@store');
        Route::put('/usuarios/{id}','UsuarioController@update');
        Route::delete('/usuarios/{id}','UsuarioController@destroy');
        Route::get('/usuarios/{id}','UsuarioController@show');
        Route::get('/usuarios/{id}/pedidos','UsuarioController@usuarioPedidos');

        //----Pruebas SocioController
        Route::get('/socios','SocioController@index');
        Route::get('/socios/servicios','SocioController@sociosServicios');
        Route::get('/socios/pedidos','SocioController@sociosPedidos');
        //Route::post('/socios','SocioController@store');
        Route::put('/socios/{id}','SocioController@update');
        Route::delete('/socios/{id}','SocioController@destroy');
        Route::get('/socios/{id}','SocioController@show');
        Route::get('/socios/{id}/servicios','SocioController@socioServicios');
        Route::get('/socios/{id}/pedidos','SocioController@socioPedidos');

        //----Pruebas CategoriaController
        Route::get('/categorias','CategoriaController@index');
        //Route::get('/categorias/subcategorias','CategoriaController@categoriasSubcategorias');
        Route::post('/categorias','CategoriaController@store');
        Route::put('/categorias/{id}','CategoriaController@update');
        Route::delete('/categorias/{id}','CategoriaController@destroy');
        Route::get('/categorias/{id}','CategoriaController@show');
        Route::get('/categorias/{id}/subcategorias','CategoriaController@categoriaSubcategorias');

        //----Pruebas SubcategoriaController
        Route::get('/subcategorias','SubcategoriaController@index');
        Route::post('/subcategorias','SubcategoriaController@store');
        Route::put('/subcategorias/{id}','SubcategoriaController@update');
        Route::delete('/subcategorias/{id}','SubcategoriaController@destroy');
        Route::get('/subcategorias/{id}','SubcategoriaController@show');

        //----Pruebas ServicioController
        Route::get('/servicios','ServicioController@index');
        Route::get('/servicios/socio','ServicioController@serviciosSocio');
        Route::post('/servicios/{socio_id}','ServicioController@store');
        Route::put('/servicios/{id}','ServicioController@update');
        Route::delete('/servicios/{id}','ServicioController@destroy');
        Route::get('/servicios/{id}','ServicioController@show');
        Route::get('/servicios/{id}/socio','ServicioController@servicioSocio');
        Route::get('/servicios/socio/subcategoria/{subcategoria_id}','ServicioController@serviciosSocioSubcat');
        
        //----Pruebas PedidoController
        Route::get('/pedidos','PedidoController@index');
        Route::get('/pedidos/informacion','PedidoController@pedidosInformacion');
        Route::post('/pedidos','PedidoController@store');
        Route::put('/pedidos/{id}','PedidoController@update');
        Route::delete('/pedidos/{id}','PedidoController@destroy');
        Route::get('/pedidos/{id}','PedidoController@show');
        Route::get('/pedidos/{id}/informacion','PedidoController@pedidoInformacion');

        //----Pruebas CalificacionController
        Route::get('/calificaciones','CalificacionController@index');
        Route::post('/calificaciones/{pedido_id}','CalificacionController@store');
        Route::put('/calificaciones/{pedido_id}','CalificacionController@update');
        Route::delete('/calificaciones/{pedido_id}','CalificacionController@destroy');
        Route::get('/calificaciones/{pedido_id}','CalificacionController@show');

    Route::group(['middleware' => 'jwt-auth'], function(){

        

    });
});
