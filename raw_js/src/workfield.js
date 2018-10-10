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

	/**
	 * Dragger for currently selected block.
	 */
	this.selectedBlockDragger = null;

	goog.events.listen(element, goog.events.EventType.CLICK, this.handleClick_, true, this);

	// each scroll tick, we will move 4 markers - DOM elements (they are absolute-positioned, but anyway)
	// TODO: how inefficient is it?
	goog.events.listen(element, goog.events.EventType.SCROLL, revamp.overlay.prototype.updateSelectedBlockMarkers, true, get_overlay());
}
goog.inherits(revamp.workfield, revamp.container);

revamp.workfield.prototype.handleClick_ = function(e) {

	if (e.target === this.element || this.selectedBlock === e.target)
		return;
	this.selectedBlock = e.target;

	this.selectedBlockDragger = new goog.fx.Dragger(this.selectedBlock);
	goog.events.listen(this.selectedBlockDragger, goog.fx.Dragger.EventType.START,
		this.handleSelectedBlockDragStart_, false, this);
	goog.events.listen(this.selectedBlockDragger, goog.fx.Dragger.EventType.DRAG,
		this.handleSelectedBlockDrag_, false, this);
	goog.events.listen(this.selectedBlockDragger, goog.fx.Dragger.EventType.END,
		this.handleSelectedBlockDragEnd_, false, this);
	
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

revamp.workfield.prototype.handleSelectedBlockDragStart_ = function() {

}

revamp.workfield.prototype.handleSelectedBlockDrag_ = function() {
	get_overlay().updateSelectedBlockMarkers();
}

revamp.workfield.prototype.handleSelectedBlockDragEnd_ = function() {

}