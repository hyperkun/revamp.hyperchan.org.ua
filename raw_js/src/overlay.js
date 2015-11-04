goog.provide("revamp.overlay");

goog.require("revamp.container");

/**
 * We could just add markers onto the workfield, but then we'll
 * have a problem - since markers cover a bit larger area
 * than element they point to, adding them to workfield will
 * cause it to uncontrollably overflow.
 * For example, if we place marker that points at the most
 * top-left point on the workfield, workfield will grow a bit to
 * the top and to the left, which is not what we want.
 * The solution is this: we wrap our workfield with an "overlay" -
 * stationary, unresizeable DOM element that occupies the whole
 * screen expect toolbar, has overflow hidden and has such children:
 * the workfield and markers.
 * When the workfield scrolls, markers are scrolled with him.
 * This way, markers can be rendered over workfield's scrollbars
 * and beyond the page without risking to break it.
 */

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

revamp.overlay.prototype.MARKER_WIDTH_PX  = 10;
revamp.overlay.prototype.MARKER_HEIGHT_PX = 10;

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
			marker.width = overlay.MARKER_WIDTH_PX;
			marker.height = overlay.MARKER_HEIGHT_PX;
			marker.className = '-r-marker';
			marker.style.position = 'absolute';
			marker.style.top = '20px';
			marker.style.left = '20px';

			overlay.element.appendChild(marker);

			map[id] = marker;
			return map;
		}, {});
	}

	var block = get_field().getSelectedBlock();
	if (block == null)
		return;

	var bounds = goog.style.getBounds(block);

	this.moveMarkerTo_(this.markers["top-left"    ], bounds.left,                bounds.top);
	this.moveMarkerTo_(this.markers["top-right"   ], bounds.left + bounds.width, bounds.top);
	this.moveMarkerTo_(this.markers["bottom-left" ], bounds.left,                bounds.top + bounds.height);
	this.moveMarkerTo_(this.markers["bottom-right"], bounds.left + bounds.width, bounds.top + bounds.height);
}

/**
 * Moves marker so its center will be in (x, y) in the overlay space.
 * @param {Element} marker Marker to place.
 * @param {Number} x X coordinate for this place in the overlay space.
 * @param {Number} y Y coordinate for this place in the overlay space.
 */
revamp.overlay.prototype.moveMarkerTo_ = function(marker, x, y) {
	marker.style.left = (x - this.MARKER_WIDTH_PX  / 2) + "px";
	marker.style.top  = (y - this.MARKER_HEIGHT_PX / 2) + "px";
}