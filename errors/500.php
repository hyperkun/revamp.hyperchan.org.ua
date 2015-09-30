<?php
	header(HTTP500);
	header("Content-Type:text/html;charset=utf-8");
?><!doctype html>
<html>
<head>
<title>Нежданчик</title>
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
</style>
</head>
<body>
<div class=n>
<h2>500 &ndash; Внутрішня помилка сервера</h2>
Будь ласка, зачекайте, глибоко вдихніть та перезавантажте сторінку.<br>
Якщо ця помилка повториться, значить, у нас щось серйозно зламалося. Але не слід засмучуватися, ми вже про це знаємо і скоро все виправимо.
</div>
</body>
</html>
