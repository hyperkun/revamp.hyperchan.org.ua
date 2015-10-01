goog.require("goog.events");

function g(id) {
	return document.getElementById(id);
}

function on_load() {
	goog.events.listen(g("al"), goog.events.EventType.CHANGE, function() { return element_change(this); });
}

function element_change(elem) {
	switch (elem.id) {
		case "al":
			g("test").style["text-align"] = elem.value;
	}
}

goog.exportSymbol('g', g);
goog.exportSymbol('element_change', element_change);
