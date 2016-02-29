/*
 * Tyler Deans
 * February 29, 2016
 * This is the model for the filter expression
 * The answer to the quesstion is calculated here
 * The question to be displayed in the view is created
 */

function FilterModel(_simModel) {
	// save a link to the model
	this.simModel = _simModel;
}

function getQuestionType() {
	var randNum = getRandomInt(1, 3);
	if (randNum === 1) {
		var type = "number";
	} else {
		var type = "string";
	}

	return type;
}

function getNumOfElements() {
	// generate a number between 3 and 9
	return getRandomInt(3, 10);
}

function getRandomString(strList) {
	var index = getRandomInt(0, strList.length);
	return strList[index];
}

/*
 * The string list generator is similar to the number list generator
 * Except that the elements come from a large list of strings
 * The string from that list is picked randomly (index is randomly chosen)
 * Then the string is appended to the list
 *
 * A method to determine the question type (number or string)
 * returns a string (number or string)
 *
 */
function stringListGenerator() {
	var numOfElements = getNumOfElements();
	var stringList = ["soup", "dog", "orange", "park", "cat", "helps", "talks", "castle", "genius", "flaming"];
	var list = [];
	for (var i = 0; i < numOfElements; i++) {
		list[i] = getRandomString(stringList);
	}
	return list;
}
/*
 * There should be a helper method that generates a list with a random number of elements
 * For lists of numbers and strings
 * A method that creates a number list which calls the number of list elements generator method
 * Then appends a number (generated) randomly to the list (for loop until the end of the list)
 *
 */
function numberListGenerator() {
	var numOfElements = getNumOfElements();
	var list = [];
	for (var i = 0; i < numOfElements; i++) {
		list[i] = getRandomInt(0, 10);
	}
	return list;
}

// Finds which logical operator should be used
function getLogicalOperator() {
	// generate a number between 1 and 5
	var randNum = getRandomInt(1, 6);
	var logicalSym = "";
	if (randNum == 1) {
		logicalSym = "<";
	} else if (randNum == 2) {
		logicalSym = "<=";
	} else if (randNum == 3) {
		logicalSym = ">";
	} else if (randNum == 4) {
		logicalSym = ">=";
	} else {
		logicalSym = "=";
	}
	return logicalSym;
}

//use debugger; command to pause code when running in Chrome developer tool
// calculates answer for the number list
function getNumberAnswer(list, operator, xVal) {
    // this method returns a list of the elements that are filtered
    var answerList = [];
    if (operator == "<") {
        for (var i = 0; i < list.length; i++) {
            if (list[i] < xVal) {
                answerList.push(list[i]);
            }
        }
    } else if (operator == "<=") {
        for (var i = 0; i < list.length; i++) {
            if (list[i] <= xVal) {
                answerList.push(list[i]);
            }
        }
    } else if (operator == ">") {
        for (var i = 0; i < list.length; i++) {
            if (list[i] > xVal) {
                answerList.push(list[i]);
            }
        }
    } else if (operator == ">=") {
        for (var i = 0; i < list.length; i++) {
            if (list[i] >= xVal) {
                answerList.push(list[i]);
            }
        }
    } else {
        for (var i = 0; i < list.length; i++) {
            if (list[i] == xVal) {
                answerList.push(list[i]);
            }
        }
    }

    return answerList;
}

// calculates answer for string question
function getStringAnswer(list, operator, xVal) {
    // this method returns a list of the elements that are filtered
    var answerList = [];
    if (operator == "<") {
        for (var i = 0; i < list.length; i++) {
            if (list[i] < xVal) {
                answerList.push(list[i]);
            }
        }
    } else if (operator == "<=") {
        for (var i = 0; i < list.length; i++) {
            if (list[i] <= xVal) {
                answerList.push(list[i]);
            }
        }
    } else if (operator == ">") {
        for (var i = 0; i < list.length; i++) {
            if (list[i] > xVal) {
                answerList.push(list[i]);
            }
        }
    } else if (operator == ">=") {
        for (var i = 0; i < list.length; i++) {
            if (list[i] >= xVal) {
                answerList.push(list[i]);
            }
        }
    } else {
        for (var i = 0; i < list.length; i++) {
            if (list[i] == xVal) {
                answerList.push(list[i]);
            }
        }
    }

    return answerList;
} 

FilterModel.prototype.randomFilterExpression = function() {
	/*
	 * Based on the question type create the filter expression string
	 * The answer should be a list with zero or more elements (zero elements look like [])
	 * The answer is saved in a local varible and is returned
	 */
	var filterString = "fun filter (f,xs) =\n";
	filterString += "\tcase xs of\n";
	filterString += "\t\t[] => []\n";
	filterString += "\t\t| x::xs' => if f x\n";
	filterString += "\t\t\tthen x::(filter(f,xs'))\n";
	filterString += "\t\t\telse filter(f,xs')\n";
	filterString += "fun myFilter (xs,n) = filter (fn x => x > n, xs)\n";

	var questionType = getQuestionType();
	if (questionType === "number") {
		var numList = numberListGenerator();
		var xNum = getRandomInt(0, 9);
		var operator = getLogicalOperator();
		this.filterExpression += "<pre>" + filterString + "\n";
		this.filterExpression += "fun myFilter (xs,n) = filter (fn x => x " + operator + " n, xs)\n";
		this.filterExpression += "val x " + "[" + numList.toString() + "]\n";
		this.filterExpression += "val x = myFilter (myList, " + xNum + ")</pre>";
		//var answer = getNumberAnswer(numList, operator, xNum);
	} else {
		var strList = stringListGenerator();
		var xNum = getRandomInt(0, 9);
		var operator = getLogicalOperator();
		this.filterExpression += "<pre>" + filterString + "\n";
		this.filterExpression += "fun myFilter (xs, l) = filter (fn x => String.size x " + operator + " l, xs)\n";
		this.filterExpression += "val x " + "[" + strList + "]\n";
		this.filterExpression += "val x = myFilter (myList, " + xNum + ")</pre>";
		//var answer = getStringAnswer(numList, questionType, operator, xNum);
	}

	return answer;
}

FilterModel.prototype.getFilterExpression = function() {
	return this.filterExpression;
}