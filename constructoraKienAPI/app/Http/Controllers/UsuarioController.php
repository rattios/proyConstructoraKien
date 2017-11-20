<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
//use Illuminate\Support\Facades\DB;
use Hash;
use DB;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //cargar todos los usuarios
        $usuarios = \App\User::where('tipo', 1)->get();

        if(count($usuarios) == 0){
            return response()->json(['error'=>'No existen usuarios.'], 404);          
        }else{
            return response()->json(['status'=>'ok', 'usuarios'=>$usuarios], 200);
        } 
    }

    public function usuariosClientesPedidos()
    {
        //cargar todos los usuarios clientes con sus pedidos del dia actual
        //$usuarios = \App\User::all();
        $usuarios = \App\User::where('tipo',1)->with(['pedidos' => function ($query) {
            $query->where(DB::raw('DAY(created_at)'),DB::raw('DAY(now())'))
            ->where(DB::raw('MONTH(created_at)'),DB::raw('MONTH(now())'))
            ->where(DB::raw('YEAR(created_at)'),DB::raw('YEAR(now())'))
            ->with('productos')->orderBy('id', 'desc');
        }])->get();

        if(count($usuarios) == 0){
            return response()->json(['error'=>'No existen usuarios clientes.'], 404);          
        }else{
            return response()->json(['status'=>'ok', 'usuarios'=>$usuarios], 200);
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
        // Listado de campos recibidos teóricamente.
        /*$user=$request->input('user'); 
        $password=$request->input('password'); 
        $correo=$request->input('correo'); 
        $nombre=$request->input('nombre');
        $telefono=$request->input('telefono');*/
        $tipo=$request->input('tipo');

        // Primero comprobaremos si estamos recibiendo todos los campos.
        if ( !$request->input('user') || !$request->input('password') ||
            !$request->input('correo') || !$request->input('nombre') ||
            !$request->input('telefono') || 
            $tipo == null || $tipo == '')
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        } 
        
        $aux = \App\User::where('user', $request->input('user'))
            ->orWhere('correo', $request->input('correo'))->get();
        if(count($aux)!=0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Ya existe un usuario con esas credenciales.'], 409);
        }

        /*Primero creo una instancia en la tabla usuarios*/
        $usuario = new \App\User;
        $usuario->user = $request->input('user');
        $usuario->password = Hash::make($request->input('password'));
        $usuario->correo = $request->input('correo');
        $usuario->nombre = $request->input('nombre');
        $usuario->telefono = $request->input('telefono');
        $usuario->tipo = $request->input('tipo');

        if($usuario->save()){
           return response()->json(['status'=>'ok', 'usuario'=>$usuario], 200);
        }else{
            return response()->json(['error'=>'Error al crear el usuario.'], 500);
        }

        /*$request->password = Hash::make($request->input('password'));

        if($nuevoUsuario=\App\User::create($request->all())){
           return response()->json(['status'=>'ok', 'usuario'=>$nuevoUsuario], 200);
        }else{
            return response()->json(['error'=>'Error al crear el usuario.'], 500);
        } */
    }

    public function storeCliente(Request $request)
    {
        // Primero comprobaremos si estamos recibiendo todos los campos.
        if ( !$request->input('user') || !$request->input('password') ||
            !$request->input('correo') || !$request->input('nombre') ||
            !$request->input('telefono') )
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        } 
        
        $aux = \App\User::where('user', $request->input('user'))
            ->orWhere('correo', $request->input('correo'))->get();
        if(count($aux)!=0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Ya existe un usuario con esas credenciales.'], 409);
        }

        /*Primero creo una instancia en la tabla usuarios*/
        $usuario = new \App\User;
        $usuario->user = $request->input('user');
        $usuario->password = Hash::make($request->input('password'));
        $usuario->correo = $request->input('correo');
        $usuario->nombre = $request->input('nombre');
        $usuario->telefono = $request->input('telefono');
        $usuario->tipo = 1;

        if($usuario->save()){
           return response()->json(['status'=>'ok', 'usuario'=>$usuario], 200);
        }else{
            return response()->json(['error'=>'Error al crear el usuario.'], 500);
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
        //cargar un usuario
        $usuario = \App\User::find($id);

        if(count($usuario)==0){
            return response()->json(['error'=>'No existe el usuario con id '.$id], 404);          
        }else{

            return response()->json(['status'=>'ok', 'usuario'=>$usuario], 200);
        }
    }

    public function usuarioPedidos($id)
    {
        //cargar un usuario
        $usuario = \App\User::find($id);
        //$usuario = \App\User::where('id',$id)->with('pedidos')->get();

        if(count($usuario)==0){
            return response()->json(['error'=>'No existe el usuario con id '.$id], 404);          
        }else{

            //cargar los pedidos del usuario
            $usuario->pedidos = $usuario->pedidos()->get();

            return response()->json(['status'=>'ok', 'usuario'=>$usuario], 200);
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
        // Comprobamos si el usuario que nos están pasando existe o no.
        $usuario=\App\User::find($id);

        if (count($usuario)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe el usuario con id '.$id], 404);
        }      

        // Listado de campos recibidos teóricamente.
        $user=$request->input('user'); 
        $password=$request->input('password'); 
        $correo=$request->input('correo'); 
        $nombre=$request->input('nombre');
        $telefono=$request->input('telefono');
        $tipo=$request->input('tipo');

        // Creamos una bandera para controlar si se ha modificado algún dato.
        $bandera = false;

        // Actualización parcial de campos.
        if ($user != null && $user!='')
        {
            $aux = \App\User::where('user', $request->input('user'))
            ->where('id', '<>', $usuario->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe otro usuario con ese user.'], 409);
            }

            $usuario->user = $user;
            $bandera=true;
        }

        if ($password != null && $password!='')
        {
            $usuario->password = Hash::make($request->input('password'));
            $bandera=true;
        }

        if ($correo != null && $correo!='')
        {
            $aux = \App\User::where('correo', $request->input('correo'))
            ->where('id', '<>', $usuario->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe otro usuario con ese correo.'], 409);
            }

            $usuario->correo = $correo;
            $bandera=true;
        }

        if ($nombre != null && $nombre!='')
        {
            $usuario->nombre = $nombre;
            $bandera=true;
        }

        if ($telefono != null && $telefono!='')
        {
            $usuario->telefono = $telefono;
            $bandera=true;
        }

        if ($tipo != null && $tipo!='')
        {
            $usuario->tipo = $tipo;
            $bandera=true;
        }

        if ($bandera)
        {
            // Almacenamos en la base de datos el registro.
            if ($usuario->save()) {
                return response()->json(['status'=>'ok','usuario'=>$usuario], 200);
            }else{
                return response()->json(['error'=>'Error al actualizar el usuario.'], 500);
            }
            
        }
        else
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 304 Not Modified – [No Modificada] Usado cuando el cacheo de encabezados HTTP está activo
            // Este código 304 no devuelve ningún body, así que si quisiéramos que se mostrara el mensaje usaríamos un código 200 en su lugar.
            return response()->json(['error'=>'No se ha modificado ningún dato del usuario.'],304);
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
        // Comprobamos si el usuario que nos están pasando existe o no.
        $usuario=\App\User::find($id);

        if (count($usuario)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe el usuario con id '.$id], 404);
        }

        $pedidos = $usuario->pedidos;

        if (sizeof($pedidos) > 0)
        {
            for ($i=0; $i < count($pedidos); $i++) { 
                //Eliminar las relaciones(productos) en la tabla pivote
                $pedidos[$i]->productos()->detach();

                // Eliminamos el pedido.
                $pedidos[$i]->delete();
            }
        }

        // Eliminamos el usuario.
        $usuario->delete();

        return response()->json(['status'=>'ok', 'message'=>'Se ha eliminado correctamente el usuario.'], 200);
    }
}
