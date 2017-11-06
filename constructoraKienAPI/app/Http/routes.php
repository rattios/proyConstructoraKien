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
    Route::post('/validar/token','LoginController@validarToken'); 

    //----Pruebas PasswordController
    Route::get('/password/cliente/{correo}','PasswordController@generarCodigo');
    Route::get('/password/codigo/{codigo}','PasswordController@validarCodigo');
     
    //Registro de clientes   
    Route::post('/clientes','UsuarioController@storeCliente'); //Crea clientes para la app

    Route::get('/productos','ProductoController@index');
    Route::get('/productos/categoria','ProductoController@productosCategoria');
    

    Route::group(['middleware' => 'jwt-auth'], function(){

                //----Pruebas UsuarioController
        Route::get('/usuarios','UsuarioController@index');
        Route::get('/usuarios/pedidos','UsuarioController@usuariosClientesPedidos');
        Route::post('/usuarios','UsuarioController@store'); //Crea admis para el panel
        Route::put('/usuarios/{id}','UsuarioController@update');
        Route::delete('/usuarios/{id}','UsuarioController@destroy');
        Route::get('/usuarios/{id}','UsuarioController@show');
        Route::get('/usuarios/{id}/pedidos','UsuarioController@usuarioPedidos');

        //----Pruebas CategoriaController
        Route::get('/categorias','CategoriaController@index');
        Route::get('/categorias/productos','CategoriaController@categoriasProductos');
        Route::post('/categorias','CategoriaController@store');
        Route::put('/categorias/{id}','CategoriaController@update');
        Route::delete('/categorias/{id}','CategoriaController@destroy');
        Route::get('/categorias/{id}','CategoriaController@show');
        Route::get('/categorias/{id}/productos','CategoriaController@categoriaProductos');

        //----Pruebas ProductoController
        //Route::get('/productos','ProductoController@index');
        //Route::get('/productos/categoria','ProductoController@productosCategoria');
        Route::post('/productos/{categoria_id}','ProductoController@store');
        Route::put('/productos/{id}','ProductoController@update');
        Route::delete('/productos/{id}','ProductoController@destroy');
        Route::get('/productos/{id}','ProductoController@show');
        Route::get('/productos/{id}/categoria','ProductoController@productoCategoria');
        
        //----Pruebas PedidoController
        Route::get('/pedidos','PedidoController@index');
        Route::post('/pedidos','PedidoController@store');
        Route::put('/pedidos/{id}','PedidoController@update');
        Route::delete('/pedidos/{id}','PedidoController@destroy');
        Route::get('/pedidos/{id}','PedidoController@show');

    });
});
