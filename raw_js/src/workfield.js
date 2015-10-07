goog.provide("revamp.workfield");

/**
 * @constructor
 */
revamp.workfield = function(container) {
	
	/**
	 * Element that represents workfield in DOM.
	 * @type {Element}
	 */
	this.container = container;

	/**
	 * Currently edited block.
	 */
	this.selectedBlock = null;

	goog.events.listen(container, goog.events.EventType.CLICK, this.handleClick_, true, this);
}

/**
 * Modify workfield's height.
 * @param {number} px Height in pixels.
 */
revamp.workfield.prototype.setHeight = function(px) {
	this.container.style.height = px + 'px';
}

revamp.workfield.prototype.handleClick_ = function(e) {
	var clicked = e.target;

	if (clicked === this.container)
		return;

	this.selectedBlock = clicked;
	get_toolbar().onCurrentBlockChanged();
}

/**
 * Gets currently selected element.
 * @return {Element} Currently selected element
 */
revamp.workfield.prototype.getSelectedBlock = function() {
	return this.selectedBlock;
}