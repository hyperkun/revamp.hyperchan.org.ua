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
		position:absolute;
		color:white;
		background-color:red;
		width:250px;
		height:30px;
		text-align:left;
	}
	#toolbar {
		position:fixed;
		width:100%;
		bottom:0;
		height:50pt;
	}
	#field, #overlay {
		position:fixed;
		width:100%;
		max-width:100%;
		height:100%;
		max-height:100%;
		overflow-x:auto;
		overflow-y:auto;
		background-color:transparent;
	}
	.-r-marker {
		z-index:2;
	}
	</style>
	<script>
		document.addEventListener("DOMContentLoaded", function(){ on_load(); });
	</script>
<?php if (DEBUG): ?>
	<script src="/raw_js/closure-library/closure/goog/base.js"></script>
	<script src="/raw_js/src/container.js"></script>
	<script src="/raw_js/src/workfield.js"></script>
	<script src="/raw_js/src/toolbar.js"></script>
	<script src="/raw_js/src/overlay.js"></script>
	<script src="/raw_js/src/a.js"></script>
<?php else: ?>
	<script src="/res/a.js?<?php echo resource_version("a.js"); ?>"></script>
<?php endif; ?>
</head>
<body>
<div id=overlay>
<div id=field>
	<?php for ($i = 0; $i < 100; $i++): ?>
	<div class=test style="top:<?php echo $i * 50; ?>px">test test test</div>
	<?php endfor; ?>
</div>
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
