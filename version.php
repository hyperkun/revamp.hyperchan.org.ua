<?php

	// Повертає версію ресурсу числом.
	// Параметр - назва ресурсу, напр., "b.css".
	// Якщо у defs.php поставлено DEBUG, то просто поверне випадкове число.
	function resource_version($q) {
		$versions = ["a.js" => 0];

		if (DEBUG)
			return time();

		return isset($versions[$q]) ? $versions[$q] : 0;
	}