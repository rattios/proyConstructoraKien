<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
	/**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'productos';

    // Eloquent asume que cada tabla tiene una clave primaria con una columna llamada id.
    // Si éste no fuera el caso entonces hay que indicar cuál es nuestra clave primaria en la tabla:
    //protected $primaryKey = 'id';

    //public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['nombre', 'estado', 'imagen', 'costo', 'cantidad',
     'unidad', 'categoria_id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    //protected $hidden = [];

    // Relación de producto con categorias:
    public function categoria()
    {
        // 1 producto pertenece a una categoria
        return $this->belongsTo('App\Categoria', 'categoria_id');
    }

    // Relación de productos con pedidos:
    public function pedidos(){
        // 1 producto puede estar en muchos pedidos
        return $this->belongsToMany('\App\Pedido','pedido_productos','producto_id','pedido_id')
            ->withPivot('cantidad','precio')->withTimestamps(); 
    }
}
