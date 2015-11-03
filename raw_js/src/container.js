goog.provide("revamp.container");

/**
 * @constructor
 * @abstract
 */
revamp.container = function(element) {

	/**
	 * Element that represents overlay in DOM.
	 * @type {Element}
	 */
	this.element = element;
}

/**
 * Sets height.
 * @param {number} px Height in pixels.
 */
revamp.container.prototype.setHeight = function(px) {
	this.element.style.height = px + 'px';
}

/**
 * Gets height.
 * @return {number} Height in pixels.
 */
revamp.container.prototype.getHeight = function() {
	return goog.style.getBounds(this.element).height;
}