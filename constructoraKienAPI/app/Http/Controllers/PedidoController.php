<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //cargar todos los pedidos
        $pedidos = \App\Pedido::with('productos')->get();

        if(count($pedidos) == 0){
            return response()->json(['error'=>'No existen pedidos.'], 404);          
        }else{
            return response()->json(['status'=>'ok', 'pedidos'=>$pedidos], 200);
        } 
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        //NOTA:El parametro estado se debe pasar en el body del la peticion.
        //lat y lng no son requeridos

        $estado = $request->input('estado');

        // Primero comprobaremos si estamos recibiendo todos los campos.
        if (!$request->input('direccion') || !$request->input('descripcion') || !$request->input('referencia') ||
            $estado == null || !$request->input('total') || !$request->input('productos') ||
            !$request->input('usuario_id'))
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        }

        //validaciones
        $aux1 = \App\User::find($request->input('usuario_id'));
        if(count($aux1) == 0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe el usuario al cual se quiere asociar el pedido.'], 409);
        } 

        //Verificar que todos los productos del pedido existen
        $productos = json_decode($request->input('productos'));
        for ($i=0; $i < count($productos) ; $i++) { 
            $aux2 = \App\Producto::find($productos[$i]->producto_id);
            if(count($aux2) == 0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'No existe el producto con id '.$productos[$i]->producto_id], 409);
            }   
        }    

        if($nuevoPedido=\App\Pedido::create($request->all())){

            //Crear las relaciones en la tabla pivote
            for ($i=0; $i < count($productos) ; $i++) { 

                $nuevoPedido->productos()->attach($productos[$i]->producto_id, ['cantidad' => $productos[$i]->cantidad, 'precio' => $productos[$i]->precio]);
                   
            }
            return response()->json(['status'=>'ok', 'pedido'=>$nuevoPedido], 200);
        }else{
            return response()->json(['error'=>'Error al crear el pedido.'], 500);
        }

        /*Primero creo una instancia en la tabla subcategorias*/
        //$pedido = new \App\Pedido;

        // Listado de campos recibidos teóricamente.
        /*$pedido->direccion=$request->input('direccion'); 
        $pedido->descripcion=$request->input('descripcion'); 
        $pedido->referencia=$request->input('referencia'); 
        $pedido->lat=$request->input('lat');
        $pedido->lng=$request->input('lng');
        $pedido->estado=$request->input('estado');
        $pedido->categoria_id=$request->input('categoria_id');
        $pedido->subcategoria_id=$request->input('subcategoria_id');
        $pedido->usuario_id=$request->input('usuario_id');
        $pedido->total=$aux3->costo;

        if($pedido->save()){
           return response()->json(['status'=>'ok', 'pedido'=>$pedido], 200);
        }else{
            return response()->json(['error'=>'Error al crear el pedido.'], 500);
        }*/
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //cargar un pedido
        $pedido = \App\Pedido::find($id);

        if(count($pedido)==0){
            return response()->json(['error'=>'No existe el pedido con id '.$id], 404);          
        }else{

            $pedido->productos = $pedido->productos;
            return response()->json(['status'=>'ok', 'pedido'=>$pedido], 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Comprobamos si el pedido que nos están pasando existe o no.
        $pedido=\App\Pedido::find($id);

        if (count($pedido)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe el pedido con id '.$id], 404);
        }      

        // Listado de campos recibidos teóricamente.
        $direccion=$request->input('direccion'); 
        $descripcion=$request->input('descripcion'); 
        $referencia=$request->input('referencia'); 
        $lat=$request->input('lat');
        $lng=$request->input('lng');
        $total=$request->input('total');
        $estado=$request->input('estado');
        //$productos=$request->input('productos');

        // Creamos una bandera para controlar si se ha modificado algún dato.
        $bandera = false;

        // Actualización parcial de campos.
        if ($direccion != null && $direccion!='')
        {
            $pedido->direccion = $direccion;
            $bandera=true;
        }

        if ($descripcion != null && $descripcion!='')
        {
            $pedido->descripcion = $descripcion;
            $bandera=true;
        }

        if ($referencia != null && $referencia!='')
        {
            $pedido->referencia = $referencia;
            $bandera=true;
        }

        if ($lat != null && $lat!='')
        {
            $pedido->lat = $lat;
            $bandera=true;
        }

        if ($lng != null && $lng!='')
        {
            $pedido->lng = $lng;
            $bandera=true;
        }

        if ($total != null && $total!='')
        {
            $pedido->total = $total;
            $bandera=true;
        }

        if ($estado != null && $estado!='')
        {
            $pedido->estado = $estado;
            $bandera=true;
        }

        if ($bandera)
        {
            // Almacenamos en la base de datos el registro.
            if ($pedido->save()) {
                return response()->json(['status'=>'ok','pedido'=>$pedido], 200);
            }else{
                return response()->json(['error'=>'Error al actualizar el pedido.'], 500);
            }
            
        }
        else
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 304 Not Modified – [No Modificada] Usado cuando el cacheo de encabezados HTTP está activo
            // Este código 304 no devuelve ningún body, así que si quisiéramos que se mostrara el mensaje usaríamos un código 200 en su lugar.
            return response()->json(['error'=>'No se ha modificado ningún dato al pedido.'],304);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Comprobamos si el pedido que nos están pasando existe o no.
        $pedido=\App\Pedido::find($id);

        if (count($pedido)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe el pedido con id '.$id], 404);
        } 
       
        //Eliminar las relaciones(productos) en la tabla pivote
        $pedido->productos()->detach();

        // Eliminamos el pedido.
        $pedido->delete();

        return response()->json(['status'=>'ok', 'message'=>'Se ha eliminado correctamente el pedido.'], 200);
    }
}
