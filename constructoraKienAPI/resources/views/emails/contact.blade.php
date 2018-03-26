<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Email</title>
	<style type="text/css" media="screen">
		img{
			margin: auto;
			display: block;
		}
		.content{
			border: 25px solid #c71717;
			padding: 50px 30px;
			width: 60%;
			background: linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.9)),url(http://constructorakien.internow.com.mx/assets/img/fondoLogin.png) #fff;
			background-size: cover;
		}
		.title{
			text-align: center;
			color: #424242;
		}
	</style>
</head>
<body>
	<div class="content">
		<div class="content-img">
			<img src="http://constructorakien.internow.com.mx/terms/logotext.png" height="120px" alt="constructorakien">
		</div>
		<br>
		<h3 class="title">RECUPERAR CONSTRASEÑA</h3>
		<hr><br><br>
		Su Código de verificación es el siguiente: <strong>{!!$codigo_verificacion!!}</strong>
		<br><br>
		<p>Saludos cordiales, equipo de Constructora Kien.</p>
	</div>
</body>
</html>