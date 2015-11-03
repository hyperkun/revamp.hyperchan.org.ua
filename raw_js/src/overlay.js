goog.provide("revamp.overlay");

goog.require("revamp.container");

/**
 * @constructor
 */
revamp.overlay = function(element) {

	revamp.container.call(this, element);

	/**
	 * Map with markers within element (keys are their ids).
	 * Initialized when first block is selected.
	 * @type {Object|null}
	 */
	this.markers = null;

	goog.events.listen(element, goog.events.EventType.CLICK, this.handleClick_, true, this);

}
goog.inherits(revamp.overlay, revamp.container);

revamp.overlay.prototype.handleClick_ = function(e) {
	return false;
}

revamp.overlay.prototype.updateSelectedBlockMarkers = function() {

	if (this.markers === null) {
		var overlay = this;

		this.markers = [
			"top-left", "top-right", "bottom-right", "bottom-left"
		].reduce(function(map, id) {
			var marker = new Image();
			marker.id = id + "-marker";
			marker.src = '/res/marker.svg';
			marker.width = marker.height = 10;
			marker.className = '-r-marker';
			marker.style.position = 'absolute';
			marker.style.top = '20px';
			marker.style.left = '20px';

			overlay.element.appendChild(marker);

			map[id] = marker;
			return map;
		}, {});
	}

	var bounds = goog.style.getBounds(get_field().getSelectedBlock());

	this.markers["top-left"].style.left = bounds.left + "px";
	this.markers["top-left"].style.top = bounds.top + "px";

	this.markers["top-right"].style.left = bounds.left + bounds.width + "px";
	this.markers["top-right"].style.top = bounds.top + "px";

	this.markers["bottom-left"].style.left = bounds.left + "px";
	this.markers["bottom-left"].style.top = bounds.top + bounds.height + "px";

	this.markers["bottom-right"].style.left = bounds.left + bounds.width + "px";
	this.markers["bottom-right"].style.top = bounds.top + bounds.height + "px";
}