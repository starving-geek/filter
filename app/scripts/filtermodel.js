/*
 * Tyler Deans
 * February 22, 2016
 * This is the model for the filter expression
 * The answer to the quesstion is calculated here
 * The question to be displayed in the view is created
 */

function FilterModel(_simModel) {
	// save a link to the model
  this.simModel = _simModel;
}

/*
 * There should be a helper method that generates a list with a random number of elements
 * For lists of numbers and strings
 * A method that creates a number list which calls the number of list elements generator method
 * Then appends a number (generated) randomly to the list (for loop until the end of the list)
 * 
 * The string list generator is similar to the number list generator
 * Except that the elements come from a large list of strings
 * The string from that list is picked randomly (index is randomly chosen)
 * Then the string is appended to the list
 *	
 * A method to determine the question type (number or string)
 * returns a string (number or string)
 *
*/

FilterModel.prototype.randomFilterExpression = function() {
	/*
	* Based on the question type create the filter expression string
	* The answer should be a list with zero or more elements (zero elements look like [])
	* The answer is saved in a local varible and is returned
	*/
	
}

FilterModel.prototype.getFilterExpression = function() {
	
}