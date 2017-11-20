<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AplicacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //cargar todos los registros
        $aplicacion = \App\Aplicacion::all();

        if(count($aplicacion) == 0){
            return response()->json(['error'=>'No se ha configurado la app.'], 404);          
        }else{
            return response()->json(['status'=>'ok', 'aplicacion'=>$aplicacion[0]], 200);
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
        if ( !$request->input('img_fondo'))
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        } 

        if($nuevoFondo=\App\Aplicacion::create($request->all())){
           return response()->json(['status'=>'ok','message'=>'Fondo creado con exito.',
             'aplicacion'=>$nuevoFondo], 200);
        }else{
            return response()->json(['error'=>'Error al crear el fondo.'], 500);
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
        //
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
        // Comprobamos si el id que nos están pasando existe o no.
        $aplicacion=\App\Aplicacion::find($id);

        if (count($aplicacion)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe el registro con id '.$id], 404);
        }      

        // Listado de campos recibidos teóricamente.
        $img_fondo=$request->input('img_fondo');

        // Creamos una bandera para controlar si se ha modificado algún dato.
        $bandera = false;

        // Actualización parcial de campos.
        if ($img_fondo != null && $img_fondo!='')
        {
            $aplicacion->img_fondo = $img_fondo;
            $bandera=true;
        }

        if ($bandera)
        {
            // Almacenamos en la base de datos el registro.
            if ($aplicacion->save()) {
                return response()->json(['status'=>'ok', 'message'=>'Fondo cambiado con éxito.',
                    'aplicacion'=>$aplicacion], 200);
            }else{
                return response()->json(['error'=>'Error al cambiar el fondo.'], 500);
            }
            
        }
        else
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 304 Not Modified – [No Modificada] Usado cuando el cacheo de encabezados HTTP está activo
            // Este código 304 no devuelve ningún body, así que si quisiéramos que se mostrara el mensaje usaríamos un código 200 en su lugar.
            return response()->json(['error'=>'No se ha modificado el fondo.'],409);
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
        //
    }
}
