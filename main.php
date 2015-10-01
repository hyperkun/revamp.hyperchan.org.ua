<?php
	header("Content-Type:text/html;charset=utf-8");
?><!doctype html>
<html>
<head>
	<link rel="icon" type="image/x-icon" href="/res/favicon.ico" />
	<title>Гіперчан — корисний та поживний</title>
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
	#test {
		color:white;
		background-color:red;
		width:250px;
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
<div id=test>test test test</div>
text-align:
<form>
<select id=al>
	<option value=left>left</option>
	<option value=right>right</option>
</select>
</form>
</body>
</html>
