goog.require("goog.events");
goog.require("goog.style");
goog.require("revamp.workfield");
goog.require("revamp.toolbar");

goog.provide("revamp");

var field = null;
var toolbar = null;

/**
 * @return {revamp.workfield}
 */
function get_field() {
	return field;
}

/**
 * @return {revamp.toolbar}
 */
function get_toolbar() {
	return toolbar;
}

function g(id) {
	return document.getElementById(id);
}

function on_load() {
	field = new revamp.workfield(g("field"));
	toolbar = new revamp.toolbar(g("toolbar"));

	goog.events.listen(
		window,
		goog.events.EventType.RESIZE,
		resize_field_and_toolbar
	);
	resize_field_and_toolbar();
}

function resize_field_and_toolbar() {

	field.setHeight(
		goog.style.getBounds(document.querySelector("body")).height - toolbar.getHeight()
	);

}

goog.exportSymbol('on_load', on_load);
