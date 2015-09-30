<?php

	if (PHP_INT_MAX == 2147483647) {
		header("Content-Type:text/plain;charset=utf-8");
		die("Необхідна підтримка 64-бітних цілих чисел.");
	}

	if (PHP_MAJOR_VERSION < 5 || (PHP_MAJOR_VERSION == 5 && PHP_MINOR_VERSION < 4)) {
		header("Content-Type:text/plain;charset=utf-8");
		die("Необхідна версія PHP не нижча за 5.4.");
	}

	include "svars.php";
	include "defs.php";
	if (!defined("DEBUG")) {
		include "errors/configure.php";
		die;
	}

	if (DOCUMENT === "/robots.txt") {
		die("User-Agent: *\r\nDisallow: /");
	}

	if (DEBUG && strpos(DOCUMENT, "/raw_js/") === 0)
	{
		if (substr(DOCUMENT, -3) === ".js")
			header("Content-Type: application/javascript");

		echo(file_get_contents(substr(DOCUMENT, 1)));
		die();
	}

	/*
	if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
		$ip = explode(",", $_SERVER["HTTP_X_FORWARDED_FOR"]);
		$ip = $ip[0];
	} else {
		$ip = $_SERVER["REMOTE_ADDR"];
	}
	*/
	$ip = $_SERVER["REMOTE_ADDR"];

	include "params.php";
	include "version.php";

	function getInclude($t)
	{
		global $p, $PARAMS;
		$t = substr($t, 1);
		if ($t == '') {
			return 'main.php';
		}
		
		return null;
	}

	if (!pg_connect('host='.DB_HOST.' user='.DB_USER.' password='.DB_PASSWORD.' dbname='.DB_NAME))
	{
		// сталася помилка при підключенні до БД
		// якщо запит не починається з "/api?", значить, від нас не просять JSON,
		// значить, можна безболісно вивергнути HTML з повідомленням про помилку
		if (strncmp(REQUEST, "/api?", 5)) {
			include "errors/500.php";
		} else {
			header(HTTP500);
		}
		die;
	}

	header("Content-Type: text/html;charset=utf-8");
	$incl = getInclude(DOCUMENT);
	if ($incl !== null)
	{
		header(HTTP200);
		include $incl;
	}
	else
	{
		include "errors/404.php";
	}
