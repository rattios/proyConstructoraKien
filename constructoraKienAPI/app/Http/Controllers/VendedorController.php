<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class VendedorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //cargar todos los vendedores
        $vendedores = \App\Vendedor::all();

        if(count($vendedores) == 0){
            return response()->json(['error'=>'No existen vendedores.'], 404);          
        }else{
            return response()->json(['vendedores'=>$vendedores], 200);
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
        // Primero comprobaremos si estamos recibiendo todos los campos.
        if ( !$request->input('nombre')  )
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        } 
        
        if ($request->input('correo')) {
            $aux = \App\Vendedor::where('correo', $request->input('correo'))->get();
            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe un vendedor con ese correo.'], 409);
            }
        }
        

        /*Primero creo una instancia en la tabla vendedors*/
        $vendedor = new \App\Vendedor;
        $vendedor->nombre = $request->input('nombre');
        $vendedor->apellido = $request->input('apellido');
        $vendedor->telefono = $request->input('telefono');
        $vendedor->correo = $request->input('correo');
        $vendedor->estado = 'ON'; //Disponible por defecto

        if($vendedor->save()){
           return response()->json(['vendedor'=>$vendedor], 200);
        }else{
            return response()->json(['error'=>'Error al crear el vendedor.'], 500);
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
        //cargar un vendedor
        $vendedor = \App\Vendedor::find($id);

        if(count($vendedor)==0){
            return response()->json(['error'=>'No existe el vendedor con id '.$id], 404);          
        }else{

            return response()->json(['vendedor'=>$vendedor], 200);
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
        // Comprobamos si el vendedor que nos están pasando existe o no.
        $vendedor=\App\Vendedor::find($id);

        if (count($vendedor)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe el vendedor con id '.$id], 404);
        }      

        // Listado de campos recibidos teóricamente.
        $nombre=$request->input('nombre'); 
        $apellido=$request->input('apellido'); 
        $telefono=$request->input('telefono'); 
        $correo=$request->input('correo');
        $estado=$request->input('estado');

        // Creamos una bandera para controlar si se ha modificado algún dato.
        $bandera = false;

        // Actualización parcial de campos.
        if ($nombre != null && $nombre!='')
        {
            $vendedor->nombre = $nombre;
            $bandera=true;
        }

        if ($apellido != null && $apellido!='')
        {
            $vendedor->apellido = $apellido;
            $bandera=true;
        }

        if ($telefono != null && $telefono!='')
        {
            $vendedor->telefono = $telefono;
            $bandera=true;
        }

        if ($correo != null && $correo!='')
        {
            $aux = \App\Vendedor::where('correo', $request->input('correo'))
            ->where('id', '<>', $vendedor->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe otro vendedor con ese correo.'], 409);
            }

            $vendedor->correo = $correo;
            $bandera=true;
        }

        if ($estado != null && $estado!='')
        {
            $vendedor->estado = $estado;
            $bandera=true;
        }

        if ($bandera)
        {
            // Almacenamos en la base de datos el registro.
            if ($vendedor->save()) {
                return response()->json(['vendedor'=>$vendedor], 200);
            }else{
                return response()->json(['error'=>'Error al actualizar el vendedor.'], 500);
            }
            
        }
        else
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 304 Not Modified – [No Modificada] Usado cuando el cacheo de encabezados HTTP está activo
            // Este código 304 no devuelve ningún body, así que si quisiéramos que se mostrara el mensaje usaríamos un código 200 en su lugar.
            return response()->json(['error'=>'No se ha modificado ningún dato del vendedor.'],409);
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
        // Comprobamos si el vendedor que nos están pasando existe o no.
        $vendedor=\App\Vendedor::find($id);

        if (count($vendedor)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe el vendedor con id '.$id], 404);
        }

        $pedidos = $vendedor->pedidos;

        if (sizeof($pedidos) > 0)
        {
            for ($i=0; $i < count($pedidos); $i++) { 
                //Quitar el vendedor de los pedidos en que esta relacionado
                $pedidos[$i]->vendedor_id = null;

                $pedidos[$i]->save();
            }
        }

        // Eliminamos el vendedor.
        $vendedor->delete();

        return response()->json(['message'=>'Se ha eliminado correctamente el vendedor.'], 200);
    }

    public function vendedoresDisponibles()
    {
        //cargar todos los vendedores en estado ON
        $vendedores = \App\Vendedor::where('estado', 'ON')->get();

        if(count($vendedores) == 0){
            return response()->json(['error'=>'No existen vendedores disponibles.'], 404);          
        }else{
            return response()->json(['vendedores'=>$vendedores], 200);
        } 
    }
}
