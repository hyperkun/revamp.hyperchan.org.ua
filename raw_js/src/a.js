goog.require("goog.events");
goog.require("goog.style");
goog.require("revamp.workfield");
goog.require("revamp.toolbar");
goog.require("revamp.overlay");

goog.provide("revamp");

var field = null;
var toolbar = null;
var overlay = null;

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

/**
 * @return {revamp.overlay}
 */
function get_overlay() {
	return overlay;
}

function g(id) {
	return document.getElementById(id);
}

function on_load() {
	overlay = new revamp.overlay(g("overlay"));
	field = new revamp.workfield(g("field"));
	toolbar = new revamp.toolbar(g("toolbar"));

	goog.events.listen(
		window,
		goog.events.EventType.RESIZE,
		on_resize
	);
	on_resize();
}

function on_resize() {

	var field_height = goog.style.getBounds(document.querySelector("body")).height - toolbar.getHeight();

	field.setHeight(field_height);
	overlay.setHeight(field_height);

}

goog.exportSymbol('on_load', on_load);
