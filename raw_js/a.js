goog.require("goog.events");
goog.require("goog.style");

goog.provide("hyperchan.revamp");

function g(id) {
	return document.getElementById(id);
}

function on_load() {
	goog.events.listen(
		g("ta_select"),
		goog.events.EventType.CHANGE,
		function() { return element_change(this); }
	);

	goog.events.listen(
		window,
		goog.events.EventType.RESIZE,
		resize_field_and_toolbar
	);
	resize_field_and_toolbar();
}

function element_change(elem) {
	switch (elem.id) {
		case "ta_select":
			g("test").style["text-align"] = elem.value;
	}
}

function resize_field_and_toolbar() {

	g("field").style.height = (goog.style.getBounds(document.querySelector("body")).height -
		goog.style.getBounds(g("toolbar")).height) + 'px';

}

goog.exportSymbol('g', g);
goog.exportSymbol('on_load', on_load);
