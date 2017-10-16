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
        $pedidos = \App\Pedido::all();

        if(count($pedidos) == 0){
            return response()->json(['error'=>'No existen pedidos.'], 404);          
        }else{
            return response()->json(['status'=>'ok', 'pedidos'=>$pedidos], 200);
        } 
    }

    public function pedidosInformacion()
    {
        //cargar todos los pedidos con toda su informacion asociada
        $pedidos = \App\Pedido::with('usuario')->with('servicio')
                ->with('socio')->with('categoria')
                ->with('subcategoria')->with('calificacion')->get();

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

    //Nota: no esta en uso
    public function storeFull(Request $request)
    {
        //NOTA:El parametro estado se debe pasar en el body del la peticion.

        $estado = $request->input('estado');

        // Primero comprobaremos si estamos recibiendo todos los campos.
        if (!$request->input('direccion') || !$request->input('descripcion') || !$request->input('referencia') ||
            $estado == null || !$request->input('categoria_id') || !$request->input('subcategoria_id') ||
            !$request->input('usuario_id') || !$request->input('socio_id') || !$request->input('servicio_id'))
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        }

        //validaciones
        $aux2 = \App\Categoria::find($request->input('categoria_id'));
        if(count($aux2) == 0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe la categoría a la cual se quiere asociar la subcategoría.'], 409);
        }

        $aux3 = \App\Subcategoria::find($request->input('subcategoria_id'));
        if(count($aux3) == 0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe la subcategoría a la cual se quiere asociar la subcategoría.'], 409);
        }

        $aux4 = \App\User::find($request->input('usuario_id'));
        if(count($aux4) == 0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe el usuario al cual se quiere asociar el pedido.'], 409);
        }

        $aux5 = \App\Socio::find($request->input('socio_id'));
        if(count($aux5) == 0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe el socio al cual se quiere asociar el pedido.'], 409);
        }

        $aux6 = \App\Servicio::find($request->input('servicio_id'));
        if(count($aux6) == 0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe el servicio al cual se quiere asociar el pedido.'], 409);
        }        

        /*if($nuevoPedido=\App\Pedido::create($request->all())){
           return response()->json(['status'=>'ok', 'pedido'=>$nuevoPedido], 200);
        }else{
            return response()->json(['error'=>'Error al crear el pedido.'], 500);
        }*/

        /*Primero creo una instancia en la tabla subcategorias*/
        $pedido = new \App\Pedido;

        // Listado de campos recibidos teóricamente.
        $pedido->direccion=$request->input('direccion'); 
        $pedido->descripcion=$request->input('descripcion'); 
        $pedido->referencia=$request->input('referencia'); 
        $pedido->lat=$request->input('lat');
        $pedido->lng=$request->input('lng');
        $pedido->total=$aux6->costo;
        $pedido->estado=$request->input('estado');
        $pedido->categoria_id=$request->input('categoria_id');
        $pedido->subcategoria_id=$request->input('subcategoria_id');
        $pedido->usuario_id=$request->input('usuario_id');
        $pedido->socio_id=$request->input('socio_id');
        $pedido->servicio_id=$request->input('servicio_id');

        if($pedido->save()){
           return response()->json(['status'=>'ok', 'pedido'=>$pedido], 200);
        }else{
            return response()->json(['error'=>'Error al crear el pedido.'], 500);
        }
    }

    public function store(Request $request)
    {
        //NOTA:El parametro estado se debe pasar en el body del la peticion.

        $estado = $request->input('estado');

        // Primero comprobaremos si estamos recibiendo todos los campos.
        if (!$request->input('direccion') || !$request->input('descripcion') || !$request->input('referencia') ||
            $estado == null || !$request->input('categoria_id') || !$request->input('subcategoria_id') ||
            !$request->input('usuario_id'))
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        }

        //validaciones
        $aux2 = \App\Categoria::find($request->input('categoria_id'));
        if(count($aux2) == 0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe la categoría a la cual se quiere asociar la subcategoría.'], 409);
        }

        $aux3 = \App\Subcategoria::find($request->input('subcategoria_id'));
        if(count($aux3) == 0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe la subcategoría a la cual se quiere asociar la subcategoría.'], 409);
        }

        $aux4 = \App\User::find($request->input('usuario_id'));
        if(count($aux4) == 0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe el usuario al cual se quiere asociar el pedido.'], 409);
        }     

        /*if($nuevoPedido=\App\Pedido::create($request->all())){
           return response()->json(['status'=>'ok', 'pedido'=>$nuevoPedido], 200);
        }else{
            return response()->json(['error'=>'Error al crear el pedido.'], 500);
        }*/

        /*Primero creo una instancia en la tabla subcategorias*/
        $pedido = new \App\Pedido;

        // Listado de campos recibidos teóricamente.
        $pedido->direccion=$request->input('direccion'); 
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
        }
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
            return response()->json(['status'=>'ok', 'pedido'=>$pedido], 200);
        }
    }

    public function pedidoInformacion($id)
    {
        //cargar un pedido con toda su informacion asociada
        $pedido = \App\Pedido::where('id', $id)->with('usuario')->with('servicio')
                ->with('socio')->with('categoria')
                ->with('subcategoria')->with('calificacion')->get();

        if(count($pedido)==0){
            return response()->json(['error'=>'No existe el pedido con id '.$id], 404);          
        }else{
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
        //$costo=$request->input('costo');
        $estado=$request->input('estado');
        //$categoria_id=$request->input('categoria_id');
        //$subcategoria_id=$request->input('subcategoria_id');
        //$usuario_id=$request->input('usuario_id');
        //$socio_id=$request->input('socio_id');
        $servicio_id=$request->input('servicio_id');



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

        if ($estado != null && $estado!='')
        {
            $pedido->estado = $estado;
            $bandera=true;
        }

        /*if ($socio_id != null && $socio_id!='')
        {
            $aux5 = \App\Socio::find($request->input('socio_id'));
            if(count($aux5) == 0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'No existe el socio al cual se quiere asociar el pedido.'], 409);
            }

            $pedido->socio_id = $socio_id;
            $bandera=true;
        }*/

        if ($servicio_id != null && $servicio_id!='')
        {
            $aux6 = \App\Servicio::find($request->input('servicio_id'));
            if(count($aux6) == 0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'No existe el servicio al cual se quiere asociar el pedido.'], 409);
            } 

            //$pedido->total=$aux6->costo;
            $pedido->servicio_id = $servicio_id;
            $pedido->socio_id = $aux6->socio_id;
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
       
        $calificacion = $pedido->calificacion;

        if (sizeof($calificacion) > 0 )
        {
            // Eliminamos la calificacion del pedido.
            $calificacion->delete();
        }

        // Eliminamos el pedido.
        $pedido->delete();

        return response()->json(['status'=>'ok', 'message'=>'Se ha eliminado correctamente el pedido.'], 200);
    }
}
