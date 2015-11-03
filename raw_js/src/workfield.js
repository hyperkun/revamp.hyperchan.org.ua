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
}
goog.inherits(revamp.workfield, revamp.container);

revamp.workfield.prototype.handleClick_ = function(e) {
	var clicked = e.target;

	if (clicked === this.element)
		return;

	this.selectedBlock = clicked;
	this.updateSelectedBlockMarkers();
	get_toolbar().onCurrentBlockChanged();
}

/**
 * Gets currently selected element.
 * @return {Element} Currently selected element
 */
revamp.workfield.prototype.getSelectedBlock = function() {
	return this.selectedBlock;
}

revamp.workfield.prototype.updateSelectedBlockMarkers = function() {
	var markers = this.element.getElementsByClassName('-r-marker');
	for (var i = markers.length - 1; i >= 0; i--)
		markers[i].parentNode.removeChild(markers[i]);

	for (var i = 0; i < 4; i++)
	{
		var marker = new Image();
		marker.src = '/res/marker.svg';
		marker.width = marker.height = 10;
		marker.className = '-r-marker';
		marker.style.position = 'absolute';
		marker.style.top = '-3px';
		marker.style.left = '-3px';
		this.getSelectedBlock().appendChild(marker);
	}
}