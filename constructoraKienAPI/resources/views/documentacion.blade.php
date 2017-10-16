<!DOCTYPE html>
<html>
    <head>
        <title>Documentacion 24managerAPI</title>

    </head>
    <body>	
		<h1 style="text-align: center;">Documentacion 24managerAPI</h1>

		<h3>-----Login-----</h3>

		<h4>Login Web</h4>
		<p>Metodo para hacer login desde el panel administrativo.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/login/web</p>
		<p>Metodo: POST</p>
		<p>Headers:</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>user (Requerido): Usuario</li>
			<li>password (Requerido)</li>
		</ul>

		<h4>Login App</h4>
		<p>Metodo para hacer login desde la app.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/login/app</p>
		<p>Metodo: POST</p>
		<p>Headers:</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>user (Requerido): Usuario</li>
			<li>password (Requerido)</li>
		</ul>

		<h3>-----Gestion de usuarios-----</h3>

		<h4>Obtener usuarios</h4>
		<p>Retorna todos los usuarios administradores (tipo 0) y clientes (tipo 1).</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/usuarios</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		
		<h4>Obtener usuarios con pedidos</h4>
		<p>Retorna todos los usuarios con sus pedidos.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/usuarios/pedidos</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Crear usuario</h4>
		<p>Crea un usuario.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/usuarios</p>
		<p>Metodo: POST</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>user (Requerido): Usuario</li>
			<li>nombre (Requerido)</li>
			<li>correo (Requerido)</li>
			<li>telefono (Requerido)</li>
			<li>sexo (Requerido)</li>
			<li>tipo (Requerido): 0 (administrador) 1 (cliente)</li>
		</ul>

		<h4>Obtener usuario</h4>
		<p>Retorna el usuario usuario_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/usuarios/{usuario_id}</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Obtener usuario y sus pedidos</h4>
		<p>Retorna el usuario usuario_id y sus pedidos.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/usuarios/{usuario_id}/pedidos</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Editar usuario</h4>
		<p>Modifica los datos del usuario usuario_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/usuarios/{usuario_id}</p>
		<p>Metodo: PUT</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>user (No requerido): Usuario</li>
			<li>nombre (No requerido)</li>
			<li>correo (No requerido)</li>
			<li>telefono (No requerido)</li>
			<li>sexo (No requerido)</li>
			<li>tipo (No requerido): 0 (administrador) 1 (cliente)</li>
		</ul>

		<h4>Eliminar usuario</h4>
		<p>Elimina el usuario usuario_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/usuarios/{usuario_id}</p>
		<p>Metodo: DELETE</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h3>-----Gestion de categorias-----</h3>

		<h4>Obtener categorias</h4>
		<p>Retorna todas las categorias.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/categorias</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Obtener categorias con subcategorias</h4>
		<p>Retorna todas las categorias con sus subcategorias.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/categorias/subcategorias</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Crear categoria</h4>
		<p>Crea una categorias.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/categorias</p>
		<p>Metodo: POST</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>nombre (Requerido)</li>
			<li>imagen (Requerido)</li>
		</ul>

		<h4>Obtener categoria</h4>
		<p>Retorna la categoria categoria_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/categorias/{categoria_id}</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Obtener categoria y sus subcategorias</h4>
		<p>Retorna la categoria categoria_id y sus subcategorias.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/categorias/{categoria_id}/subcategorias</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Editar categoria</h4>
		<p>Modifica los datos de la categoria categoria_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/categorias/{categoria_id}</p>
		<p>Metodo: PUT</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>nombre (No requerido)</li>
			<li>imagen (No requerido)</li>
		</ul>

		<h4>Eliminar categoria</h4>
		<p>Elimina la categoria categoria_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/categorias/{categoria_id}</p>
		<p>Metodo: DELETE</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h3>-----Gestion de subcategorias-----</h3>

		<h4>Obtener subcategorias</h4>
		<p>Retorna todas las subcategorias.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/subcategorias</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Crear subcategoria</h4>
		<p>Crea una subcategorias.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/subcategorias</p>
		<p>Metodo: POST</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>nombre (Requerido)</li>
			<li>imagen (Requerido)</li>
			<li>costo (Requerido)</li>
			<li>categoria_id (Requerido)</li>
		</ul>

		<h4>Obtener subcategoria</h4>
		<p>Retorna la subcategoria subcategoria_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/subcategorias/{subcategoria_id}</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Editar subcategoria</h4>
		<p>Modifica los datos de la subcategoria subcategoria_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/subcategorias/{subcategoria_id}</p>
		<p>Metodo: PUT</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>nombre (No requerido)</li>
			<li>imagen (No requerido)</li>
			<li>costo (No requerido)</li>
			<li>categoria_id (No requerido)</li>
		</ul>

		<h4>Eliminar subcategoria</h4>
		<p>Elimina la subcategoria subcategoria_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/subcategorias/{subcategoria_id}</p>
		<p>Metodo: DELETE</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h3>-----Gestion de socios-----</h3>

		<h4>Obtener socios</h4>
		<p>Retorna todos los socios.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/socios</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		
		<h4>Obtener socios con pedidos</h4>
		<p>Retorna todos los socios con los pedidos que han tenido.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/socios/pedidos</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Obtener socios con servicios</h4>
		<p>Retorna todos los socios con sus servicios.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/socios/servicios</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Crear socio</h4>
		<p>Crea un socio.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/socios</p>
		<p>Metodo: POST</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>correo (Requerido)</li>
			<li>nombre (Requerido)</li>
			<li>telefono (Requerido)</li>
			<li>ubicacion (Requerido)</li>
			<li>servicio (Requerido)</li>
			<li>horario (Requerido)</li>
			<li>dias (Requerido)</li>
			<li>costo (Requerido)</li>
			<li>subcategoria_id (Requerido)</li>
		</ul>

		<h4>Obtener socio</h4>
		<p>Retorna el socio socio_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/socios/{socio_id}</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Obtener socio y sus pedidos</h4>
		<p>Retorna el socio socio_id y los pedidos que ha tenido.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/socios/{socio_id}/pedidos</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Obtener socio y sus servicios</h4>
		<p>Retorna el socio socio_id y sus servicios.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/socios/{socio_id}/servicios</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Editar socio</h4>
		<p>Modifica los datos del socio socio_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/socios/{socio_id}</p>
		<p>Metodo: PUT</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>correo (No requerido)</li>
			<li>nombre (No requerido)</li>
			<li>telefono (No requerido)</li>
			<li>ubicacion (No requerido)</li>
		</ul>

		<h4>Eliminar socio</h4>
		<p>Elimina el socio socio_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/socios/{socio_id}</p>
		<p>Metodo: DELETE</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h3>-----Gestion de servicios-----</h3>

		<h4>Obtener servicios</h4>
		<p>Retorna todos los servicios.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/servicios</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		
		<h4>Obtener servicios con socio</h4>
		<p>Retorna todos los servicios con el socio que los ofrece.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/servicios/socio</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Obtener servicios con socio que pertenescan a la misma subcategoria</h4>
		<p>Retorna todos los servicios con el socio que los ofrece y que pertenescan a la subcategoria subcategoria_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/servicios/socio/subcategoria/{subcategoria_id}</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Crear servicio</h4>
		<p>Crea un servicio al socio socio_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/servicios/{socio_id}</p>
		<p>Metodo: POST</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>servicio (Requerido)</li>
			<li>horario (Requerido)</li>
			<li>dias (Requerido)</li>
			<li>costo (Requerido)</li>
			<li>subcategoria_id (Requerido)</li>
		</ul>

		<h4>Obtener servicio</h4>
		<p>Retorna el servicio servicio_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/servicios/{servicio_id}</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Obtener servicio y el socio que lo ofrece</h4>
		<p>Retorna el servicio servicio_id y el socio que lo ofrece.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/servicios/{servicio_id}/socio</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Editar servicio</h4>
		<p>Modifica los datos del servicio servicio_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/servicios/{servicio_id}</p>
		<p>Metodo: PUT</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>servicio (No requerido)</li>
			<li>horario (No requerido)</li>
			<li>dias (No requerido)</li>
			<li>costo (No requerido)</li>
		</ul>

		<h4>Eliminar servicio</h4>
		<p>Elimina el servicio servicio_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/servicios/{servicio_id}</p>
		<p>Metodo: DELETE</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		
		<h3>-----Gestion de pedidos-----</h3>

		<h4>Obtener pedidos</h4>
		<p>Retorna todos los pedidos.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/pedidos</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		
		<h4>Obtener informacion de los pedidos</h4>
		<p>Retorna todos los pedidos con su informacion asociada.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/pedidos/informacion</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Crear pedido</h4>
		<p>Crea un pedido.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/pedidos</p>
		<p>Metodo: POST</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>direccion (Requerido)</li>
			<li>descripcion (Requerido)</li>
			<li>referencia (Requerido)</li>
			<li>lat (No requerido)</li>
			<li>lng (No requerido)</li>
			<li>categoria_id (Requerido)</li>
			<li>subcategoria_id (Requerido)</li>
			<li>usuario_id (Requerido)</li>
			<!-- <li>socio_id (Requerido)</li>
			<li>servicio_id (Requerido)</li> -->
			<li>estado (Requerido)</li>
		</ul>

		<h4>Obtener pedido</h4>
		<p>Retorna el pedido pedido_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/pedidos/{pedido_id}</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Obtener pedido con su informacion</h4>
		<p>Retorna el pedido pedido_id con toda su informacion asociada.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/pedidos/{pedido_id}/informacion</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Editar pedido</h4>
		<p>Modifica los datos del pedido pedido_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/pedidos/{pedido_id}</p>
		<p>Metodo: PUT</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>direccion (No requerido)</li>
			<li>descripcion (No requerido)</li>
			<li>referencia (No requerido)</li>
			<li>lat (No requerido)</li>
			<li>lng (No requerido)</li>
			<li>estado (No requerido)</li>
			<!-- <li>socio_id (No Requerido)</li> -->
			<li>servicio_id (No Requerido)</li>
		</ul>

		<h4>Eliminar pedido</h4>
		<p>Elimina el pedido pedido_id con su calificacion, si la tiene.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/pedidos/{pedido_id}</p>
		<p>Metodo: DELETE</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h3>-----Gestion de calificaciones-----</h3>

		<h4>Obtener calificaciones</h4>
		<p>Retorna todas las calificaciones.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/calificaciones</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		
		<h4>Obtener calificacion del pedido</h4>
		<p>Retorna la calificacion del pedido pedido_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/calificaciones/{pedido_id}</p>
		<p>Metodo: GET</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

		<h4>Crear calificacion</h4>
		<p>Crea una calificacion al pedido pedido_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/calificaciones/{pedido_id}</p>
		<p>Metodo: POST</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>comentario (Requerido)</li>
			<li>puntaje (Requerido)</li>
		</ul>

		<h4>Editar calificacion</h4>
		<p>Modifica los datos de la calificacion del pedido pedido_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/calificaciones/{pedido_id}</p>
		<p>Metodo: PUT</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>
		<ul>
			<li>comentario (No requerido)</li>
			<li>puntaje (No requerido)</li>
		</ul>

		<h4>Eliminar calificacion</h4>
		<p>Elimina la calificacion del pedido pedido_id.</p>
		<p>URL: http://localhost/gitHub/proyecto24Manager/24managerAPI/public/calificaciones/{pedido_id}</p>
		<p>Metodo: DELETE</p>
		<p>Headers: Authorization : Bearer + token</p>
		<p>Cuerpo de consulta (body):</p>

    </body>
</html>
