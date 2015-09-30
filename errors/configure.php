<?php
	header("HTTP/1.1 508 Сервер не сконфігуровано");
	header("Content-Type:text/html;charset=utf-8");
?><!doctype html>
<html>
<head>
<title>Ви зарано сюди завітали</title>
<link rel="icon" type="image/x-icon" href="/res/favicon.ico" />
<style>
html, body {
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
	font: 12pt "Liberation Sans", Helvetica, Arial;
	display:table;
}
.n {
	width:100%;
	height:100%;
	background-color:#fff;
	vertical-align:middle;
	position:relative;
	box-sizing:border-box;
	-moz-box-sizing:border-box;
	padding:0 0 10% 100pt;
	display:table-cell;
	color:#333;
}
.c {
	font:12pt monospace;
	display:inline-block;
	background-color:#ddd;
	border:1px solid #aaa;
	border-radius:3pt;
}
</style>
</head>
<body>
<div class=n>
<h2>508 &ndash; Сервер не сконфігуровано</h2>
<p>Цей сайт ще не придатний для роботи. Якщо ви простий відвідувач, будь ласка, почекайте ще декілька хвилин,
поки адміністратор сайту тут все поладнає.</p>
<p>Якщо ви і є адміністратор, знайте, що в файлах коду сайту не знайдено файл
<span class=c>defs.php</span>, який повинен містити конфігурацію сайту.
Найкращим виходом з цієї ситуації буде копіювання файлу <span class=c>defs.php.default</span>,
який повинен вже бути у репозиторії, та заповнення його своїми значеннями.
Зауважте, що <span class=c>defs.php</span> знаходиться у <span class=c>.gitignore</span>, тож якщо
ви зробите коміт у репозиторій, дані з <span class=c>defs.php</span> (паролі і солі)
у репозиторій не потраплять.</p>
</div>
</body>
</html>