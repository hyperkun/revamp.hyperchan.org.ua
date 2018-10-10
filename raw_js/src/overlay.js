goog.provide("revamp.overlay");

goog.require("revamp.container");
goog.require("goog.style");
goog.require("goog.fx.Dragger");

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
	 * @type {Object}
	 */
	this.markers = [
		"top-left", "top-right", "bottom-right", "bottom-left"
	].reduce(function(map, id) {
		var marker = new Image();
		marker.id = id + "-marker";
		marker.src = '/res/marker.svg';
		marker.width = this.MARKER_WIDTH_PX;
		marker.height = this.MARKER_HEIGHT_PX;
		marker.className = '-r-marker';
		marker.style.position = 'absolute';
		marker.style.top = '-9999px';
		marker.style.left = '-9999px';

		marker.dragger = new goog.fx.Dragger(marker);

		goog.events.listen(marker.dragger, goog.fx.Dragger.EventType.START,
			this.handleMarkerDragStart_, false, this);
		goog.events.listen(marker.dragger, goog.fx.Dragger.EventType.DRAG,
			this.handleMarkerDrag_, false, this);
		goog.events.listen(marker.dragger, goog.fx.Dragger.EventType.END,
			this.handleMarkerDragEnd_, false, this);

		this.element.appendChild(marker);

		map[id] = marker;
		return map;
	}.bind(this), {});

	this.dragMousePos = [null, null];

	goog.events.listen(element, goog.events.EventType.CLICK, this.handleClick_, true, this);

}
goog.inherits(revamp.overlay, revamp.container);

revamp.overlay.prototype.MARKER_WIDTH_PX  = 10;
revamp.overlay.prototype.MARKER_HEIGHT_PX = 10;

revamp.overlay.prototype.handleClick_ = function(e) {
	return false;
}

revamp.overlay.prototype.updateSelectedBlockMarkers = function() {
	var block = get_field().getSelectedBlock();
	if (block == null)
		return;

	var bounds = goog.style.getBounds(block);

	this.moveMarkerTo_(this.markers["top-left"    ], bounds.left,                bounds.top);
	this.moveMarkerTo_(this.markers["top-right"   ], bounds.left + bounds.width, bounds.top);
	this.moveMarkerTo_(this.markers["bottom-left" ], bounds.left,                bounds.top + bounds.height);
	this.moveMarkerTo_(this.markers["bottom-right"], bounds.left + bounds.width, bounds.top + bounds.height);

	this.updateMarkerLimits_();
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

/**
 * Moves marker by dx pixels right and by dy pixels down.
 * @param {Element} marker Marker to place.
 * @param {Number} dx X movement value.
 * @param {Number} dy Y movement value.
 */
revamp.overlay.prototype.moveMarkerAt_ = function(marker, dx, dy) {
	var currentPos = goog.style.getPosition(marker);
	marker.style.left = currentPos.x + dx + "px";
	marker.style.top  = currentPos.y + dy + "px";
}

/**
 * Sets limits for marker dragging.
 * @param {Element} marker Marker to set.
 * @param {Number} top Top limit, in overlay coordinates.
 * @param {Number} left Left limit, in overlay coordinates.
 * @param {Number} bottom Bottom limit, in overlay coordinates.
 * @param {Number} right Right limit, in overlay coordinates.
 */
revamp.overlay.prototype.setMarkerLimits_ = function(marker, left, top, right, bottom) {
	marker.dragger.setLimits(new goog.math.Rect(left, top, right - left, bottom - top)
		.translate(-this.MARKER_WIDTH_PX / 2, -this.MARKER_HEIGHT_PX / 2));
}

revamp.overlay.prototype.handleMarkerDragStart_ = function(e) {
	this.previous_frame_position = goog.style.getPosition(e.dragger.target);
}

revamp.overlay.prototype.handleMarkerDrag_ = function(e) {
	var block = get_field().getSelectedBlock();
	var marker = e.dragger.target;
	var new_position = goog.style.getPosition(marker);

	var delta = goog.math.Coordinate.difference(new_position, this.previous_frame_position);
	var bounds = goog.style.getBounds(block);
	if (marker == this.markers["top-left"] || marker == this.markers["bottom-left"]) {
		bounds.left += delta.x;
		bounds.width -= delta.x;
	}
	if (marker == this.markers["top-right"] || marker == this.markers["bottom-right"]) {
		bounds.width += delta.x;
	}
	if (marker == this.markers["top-left"] || marker == this.markers["top-right"]) {
		bounds.top += delta.y;
		bounds.height -= delta.y;
	}
	if (marker == this.markers["bottom-left"] || marker == this.markers["bottom-right"]) {
		bounds.height += delta.y;
	}
	
	block.style.left = bounds.left + 'px';
	block.style.top = bounds.top + 'px';
	block.style.width = bounds.width + 'px';
	block.style.height = bounds.height + 'px';

	this.previous_frame_position = new_position;

	if (marker == this.markers["top-left"]) {
		this.markers["bottom-left"].style.left = new_position.x + 'px';
		this.markers["top-right"].style.top = new_position.y + 'px';
	}
	if (marker == this.markers["top-right"]) {
		this.markers["bottom-right"].style.left = new_position.x + 'px';
		this.markers["top-left"].style.top = new_position.y + 'px';
	}
	if (marker == this.markers["bottom-left"]) {
		this.markers["top-left"].style.left = new_position.x + 'px';
		this.markers["bottom-right"].style.top = new_position.y + 'px';
	}
	if (marker == this.markers["bottom-right"]) {
		this.markers["top-right"].style.left = new_position.x + 'px';
		this.markers["bottom-left"].style.top = new_position.y + 'px';
	}
}

revamp.overlay.prototype.handleMarkerDragEnd_ = function(e) {
	this.updateMarkerLimits_();
}

revamp.overlay.prototype.updateMarkerLimits_ = function() {
	var bounds = goog.style.getBounds(get_field().getSelectedBlock());

	this.setMarkerLimits_(this.markers["top-left"    ], 0, 0, bounds.left + bounds.width, bounds.top + bounds.height);
	this.setMarkerLimits_(this.markers["top-right"   ], bounds.left, 0, Infinity, bounds.top + bounds.height);
	this.setMarkerLimits_(this.markers["bottom-left" ], 0, bounds.top, bounds.left + bounds.width, Infinity);
	this.setMarkerLimits_(this.markers["bottom-right"], bounds.left, bounds.top, Infinity, Infinity);
}