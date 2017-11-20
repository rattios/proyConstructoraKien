<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //cargar todas las cat
        $categorias = \App\Categoria::all();

        if(count($categorias) == 0){
            return response()->json(['error'=>'No existen categorías.'], 404);          
        }else{
            return response()->json(['status'=>'ok', 'categorias'=>$categorias], 200);
        } 
        
    }

    //Usada en el panel
    public function categoriasHabilitadas()
    {
        //cargar todas las cat en estado ON
        $categorias = \App\Categoria::where('estado', 'ON')->get();

        if(count($categorias) == 0){
            return response()->json(['error'=>'No existen categorías habilitadas.'], 404);          
        }else{
            return response()->json(['status'=>'ok', 'categorias'=>$categorias], 200);
        } 
        
    }

    public function categoriasProductos()
    {
        //cargar todas las cat con sus productos habilitados
        $categorias = \App\Categoria::where('estado', 'ON')->with(['productos' => function ($query) {
            $query->where('estado', 'ON');
        }])->get();

        if(count($categorias) == 0){
            return response()->json(['error'=>'No hay categorías disponibles.'], 404);          
        }else{
            return response()->json(['status'=>'ok', 'categorias'=>$categorias], 200);
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
        //$nombre=$request->input('nombre'); 
        //$imagen=$request->input('imagen');

        // Primero comprobaremos si estamos recibiendo todos los campos.
        if ( !$request->input('nombre') || !$request->input('imagen'))
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        } 
        
        $aux = \App\Categoria::where('nombre', $request->input('nombre'))->get();
        if(count($aux)!=0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Ya existe una categoría con ese nombre.'], 409);
        }

        /*Primero creo una instancia en la tabla categorias*/
        $categoria = new \App\Categoria;
        $categoria->nombre = $request->input('nombre');
        $categoria->estado = 'OFF';
        $categoria->imagen = $request->input('imagen');


        if($categoria->save()){
           return response()->json(['status'=>'ok', 'message'=>'Categoría creada con éxito.',
             'categoria'=>$categoria], 200);
        }else{
            return response()->json(['error'=>'Error al crear la categoría.'], 500);
        }

        /*if($nuevaCategoria=\App\Categoria::create($request->all())){
           return response()->json(['status'=>'ok','message'=>'Categoría creada con éxito.',
             'categoria'=>$nuevaCategoria], 200);
        }else{
            return response()->json(['error'=>'Error al crear la categoría.'], 500);
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
        //cargar una cat
        $categoria = \App\Categoria::find($id);

        if(count($categoria)==0){
            return response()->json(['error'=>'No existe la categoría con id '.$id], 404);          
        }else{
            return response()->json(['status'=>'ok', 'categoria'=>$categoria], 200);
        } 
    }

    public function categoriaProductos($id)
    {

        //cargar una cat con sus subcat
        $categoria = \App\Categoria::find($id);

        if(count($categoria)==0){
            return response()->json(['error'=>'No existe la categoría con id '.$id], 404);          
        }else{

            //cargar las subcat de la cat
            //$categoria = $categoria->with('subcategorias')->get();
            $categoria->productos = $categoria->productos()->get();
            //$categoria = $categoria->subcategorias;

            return response()->json(['status'=>'ok', 'categoria'=>$categoria], 200);
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
        // Comprobamos si la categoria que nos están pasando existe o no.
        $categoria=\App\Categoria::find($id);

        if (count($categoria)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe la categoría con id '.$id], 404);
        }      

        // Listado de campos recibidos teóricamente.
        $nombre=$request->input('nombre');
        $estado=$request->input('estado');
        $imagen=$request->input('imagen');
        $productos=$request->input('productos');


        // Creamos una bandera para controlar si se ha modificado algún dato.
        $bandera = false;

        // Actualización parcial de campos.
        if ($nombre != null && $nombre!='')
        {
            $aux = \App\Categoria::where('nombre', $request->input('nombre'))
            ->where('id', '<>', $categoria->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe otra categoría con ese nombre.'], 409);
            }

            $categoria->nombre = $nombre;
            $bandera=true;
        }

        if ($estado != null && $estado!='')
        {

            if ($estado == 'OFF') {
                $productos = $categoria->productos;

                if (sizeof($productos) > 0)
                {
                    for ($i=0; $i < count($productos) ; $i++) { 
                        $productos[$i]->estado = $estado;
                        $productos[$i]->save();
                    }
                }
            }

            $categoria->estado = $estado;
            $bandera=true;
        }

        if ($imagen != null && $imagen!='')
        {
            $categoria->imagen = $imagen;
            $bandera=true;
        }

        if (sizeof($productos) > 0 /*$productos != null && $productos!=''*/)
        {
            $bandera=true;

            $productos = json_decode($productos);
            for ($i=0; $i < count($productos) ; $i++) {

                if ($productos[$i]->estado == 'ON') {

                    $producto = \App\Producto::find($productos[$i]->id);

                    if(count($producto) == 0){
                       // Devolvemos un código 409 Conflict. 
                        return response()->json(['error'=>'No existe el producto con id '.$productos[$i]->id], 409);
                    }else{
                        $producto->estado = $productos[$i]->estado;
                        $producto->save();
                    }
                }  
            }
        }

        if ($bandera)
        {
            // Almacenamos en la base de datos el registro.
            if ($categoria->save()) {
                return response()->json(['status'=>'ok', 'message'=>'Categoría editada con éxito.',
                    'categoria'=>$categoria], 200);
            }else{
                return response()->json(['error'=>'Error al actualizar la categoría.'], 500);
            }
            
        }
        else
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 304 Not Modified – [No Modificada] Usado cuando el cacheo de encabezados HTTP está activo
            // Este código 304 no devuelve ningún body, así que si quisiéramos que se mostrara el mensaje usaríamos un código 200 en su lugar.
            return response()->json(['error'=>'No se ha modificado ningún dato la categoría.'],409);
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
        // Comprobamos si la categoria existe o no.
        $categoria=\App\Categoria::find($id);

        if (count($categoria)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe la categoría con id '.$id], 404);
        }
       
        $productos = $categoria->productos;

        if (sizeof($productos) > 0)
        {
            // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Esta categoría no puede ser eliminada porque posee productos asociados.'], 409);
        }

        // Eliminamos la categoria si no tiene relaciones.
        $categoria->delete();

        return response()->json(['status'=>'ok', 'message'=>'Se ha eliminado correctamente la categoría.'], 200);
    }
}
