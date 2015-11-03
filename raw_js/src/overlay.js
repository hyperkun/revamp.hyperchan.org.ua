goog.provide("revamp.overlay");

goog.require("revamp.container");

/**
 * @constructor
 */
revamp.overlay = function(element) {

	revamp.container.call(this, element);

}
goog.inherits(revamp.overlay, revamp.container);