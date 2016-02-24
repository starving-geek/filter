/*
 * Tyler Deans
 * February 24, 2016
 *
 * View for the filter model
 */

function FilterView(_simView) {
	// keep a link to the view
	this.simView = _simView;
}

/*
	draws expressions for the filter view
*/

FilterView.prototype.drawFilterExpression = function(_filter) {
	$('#filterDiv').append(_filter.filterString);
}