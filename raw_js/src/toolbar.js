goog.provide("revamp.toolbar");

goog.require("goog.style");
goog.require("revamp.container");

/**
 * @constructor
 */
revamp.toolbar = function(element) {

	revamp.container.call(this, element);

	/**
	 * In case we need to change field values for ourselves
	 * (e.g. when selected element changes), we will raise this
	 * flag to indicate that no field change events need to be processed.
	 * @type {boolean}
	 */
	this.pauseHandling = false;

	goog.events.listen(element, goog.events.EventType.CHANGE, this.handleChange_, false, this);
}
goog.inherits(revamp.toolbar, revamp.container);

revamp.toolbar.prototype.onCurrentBlockChanged = function() {
	this.pauseHandling = true;

	g("ta_select").value = goog.style.getComputedStyle(get_field().getSelectedBlock(), "text-align");

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