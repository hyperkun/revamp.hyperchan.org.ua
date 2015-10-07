<?php
	header("Content-Type:text/html;charset=utf-8");
?><!doctype html>
<html>
<head>
	<link rel="icon" type="image/x-icon" href="/res/favicon.ico" />
	<title>Test</title>
	<style>
	html, body, table {
		height:100%;
		width:100%;
		margin:0;
	}
	body {
		font-family:"Trebuchet MS",Trebuchet,sans-serif;
		text-align:center;
	}
	.s {
		width:20pt;
		display:inline-block;
	}
	.test {
		color:white;
		background-color:red;
		width:250px;
	}
	#toolbar {
		position:fixed;
		width:100%;
		bottom:0;
		height:50pt;
	}
	#field {
		position:fixed;
		width:100%;
		max-width:100%;
		height:100%;
		max-height:100%;
		overflow-x:auto;
		overflow-y:auto;
	}
	</style>
	<script>
		document.addEventListener("DOMContentLoaded", function(){ on_load(); });
	</script>
<?php if (DEBUG): ?>
	<script src="/raw_js/closure-library/closure/goog/base.js"></script>
	<script src="/raw_js/a.js"></script>
<?php else: ?>
	<script src="/res/a.js?<?php echo resource_version("a.js"); ?>"></script>
<?php endif; ?>
</head>
<body>
<div id=field>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	<div class=test>test test test</div>
	<br>
	
</div>
<form id=toolbar>
	text-align:
	<select id=ta_select>
		<option value=left>left</option>
		<option value=right>right</option>
	</select>
</form>
</body>
</html>
