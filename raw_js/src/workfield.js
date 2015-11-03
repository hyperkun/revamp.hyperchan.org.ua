goog.provide("revamp.workfield");

goog.require("revamp.container");

/**
 * @constructor
 */
revamp.workfield = function(element) {

	revamp.container.call(this, element);

	/**
	 * Currently edited block.
	 */
	this.selectedBlock = null;

	goog.events.listen(element, goog.events.EventType.CLICK, this.handleClick_, true, this);

	// each scroll tick, we will move 4 markers - DOM elements (they are absolute-positioned, but anyway)
	// TODO: how inefficient is it?
	goog.events.listen(element, goog.events.EventType.SCROLL, revamp.overlay.prototype.updateSelectedBlockMarkers, true, get_overlay());
}
goog.inherits(revamp.workfield, revamp.container);

revamp.workfield.prototype.handleClick_ = function(e) {

	if (e.target === this.element)
		return;

	this.selectedBlock = e.target;
	get_overlay().updateSelectedBlockMarkers();
	get_toolbar().onCurrentBlockChanged();
}

/**
 * Gets currently selected element.
 * @return {Element} Currently selected element
 */
revamp.workfield.prototype.getSelectedBlock = function() {
	return this.selectedBlock;
}
