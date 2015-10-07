goog.provide("revamp.toolbar");

/**
 * @constructor
 */
revamp.toolbar = function(elem) {
	
	/**
	 * Element that represents toolbar in DOM.
	 * @type {Element}
	 */
	this.elem = elem;

	/**
	 * In case we need to change field values for ourselves
	 * (e.g. when selected element changes), we will raise this
	 * flag to indicate that no field change events need to be processed.
	 * @type {boolean}
	 */
	this.pauseHandling = false;

	goog.events.listen(elem, goog.events.EventType.CHANGE, this.handleChange_, false, this);
}

/**
 * Gets toolbar's height.
 * @return {number} Height in pixels.
 */
revamp.toolbar.prototype.getHeight = function() {
	return goog.style.getBounds(this.elem).height;
}

revamp.toolbar.prototype.onCurrentBlockChanged = function() {
	this.pauseHandling = true;

	g("ta_select").value = get_field().getSelectedBlock().style["text-align"];

	this.pauseHandling = false;
}

revamp.toolbar.prototype.handleChange_ = function(e) {
	if (this.pauseHandling)
		return;

	var selected = get_field().getSelectedBlock();
	if (selected === null)
		return;

	switch (e.target.id) {
		case "ta_select":
			selected.style["text-align"] = e.target.value;
	}
}