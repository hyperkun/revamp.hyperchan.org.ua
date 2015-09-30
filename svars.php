<?php
	// REQUEST_URI - весь запит
	// QUERY_STRING - все після ?
	// В апачі:
	// REDIRECT_URL - весь запит до ?
	// В nginx:
	// DOCUMENT_URI - весь запит до ?
	
	define("REQUEST", $_SERVER["REQUEST_URI"]);
	define("DOCUMENT", $_SERVER["DOCUMENT_URI"]);
	define("QUERY", $_SERVER["QUERY_STRING"]);