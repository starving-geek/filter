/*
 * main.js
 * Rich Simpson
 * Tyler Deans
 * March 3, 2016
 * This code implements a mastery-based exercise on graph
 * theory for integration with Smart Sparrow.
 *
 * This is our view - The V in MVC
 */


/*
 * This object handles drawing the interface on the screen. Mostly
 * this involves drawing the actual graph and clearing out the
 * text field for the user's answer
 */
function SimView(_controller) {
    // keep a link to the controller
    this.controller = _controller;
    // Only set up the controls once
    this.setupControls();
    // create the question bank view - where questions and answer history are
    // displayed
    this.questionBankView = new QuestionBankView(this);
    // create the let expression view - a let expression
    this.filterView = new FilterView(this);
}


SimView.prototype.setupControls = function() {
    $("#btnStart").click(function() {
        // finish initializing the app
        simController.initializeController();
        /* The text area, submit and next question buttons
         * remain hidden until the start app button is clicked.
         */
        $("#txtAnswer").show();
        $("#historyText").show();
        $("#btnNextQuestion").show();
        $("#btnSubmit").show();
        $("#questionType").show();
        // hide start button after being clicked
        $("#btnStart").hide();
        // enable submit button
        $("#btnSubmit").prop('disabled', false);
    });
    // add event handler for submit button
    $("#btnSubmit").click(function() {
        // check the answer
        var studentAnswer = $("#txtAnswer").val();
        // record whether it was right or wrong
        var rightAnswer = simController.simModel.questionBank.checkAnswer(studentAnswer);
        // store the results
        simController.simModel.questionBank.updateAnswerHistory(rightAnswer);
        // draw the results for the last five questions
        simController.simView.questionBankView.drawAnswerHistory(simController.simModel.questionBank.answerHistory);
        // if they got the right answer
        if (rightAnswer) {
            // give them feedback
            $("#txtFeedback").html("Right. The answer is " + studentAnswer);
        } else {
            // prints the array
            // if the array contains strings it prints the double quotes
            var answerArrayString = "";
            var answer = simController.simModel.questionBank.answers;
            /*
             * Puts the elements in a string
            */
            for (var i = 0; i < answer.length; i++) {
                // if the correct answer is an array of strings
                if (typeof answer[i] === 'string') {
                    // if it is the last element print the string without the comma
                    if (i == (answer.length - 1)) {
                        answerArrayString += '"' + answer[i] + '"';
                    } else { // otherwise print the string with the comma
                        answerArrayString += '"' + answer[i] + '", ';
                    }
                } else { // if the correct answer is an array of numbers
                    // if it is the last element print the string without the comma
                    if (i == (answer.length - 1)) {
                        answerArrayString += answer[i];
                    } else { // otherwise print the string with the comma
                        answerArrayString += answer[i] + ', ';
                    }
                }

            }
            // give them feedback
            $("#txtFeedback").html("That is incorrect. The correct answer is [" + answerArrayString + "]");
        }
        // has mastery been demonstrated?
        if (simController.simModel.questionBank.masteryAchieved()) {
            // set the mastery achieved flag
            simController.setModelValue('mastery', 'true');
            // send the student a message
            console.log('victoia!!!');
            // tell Smart Sparrow to check the done condition
            simController.triggerCheck();
        } else {
            // enable next question button
            $("#btnNextQuestion").prop('disabled', false);
        }
        // disable submit button
        $("#btnSubmit").prop('disabled', true);
        // disable text field where the user enters an answer
        $("#txtAnswer").prop('disabled', true);
    });
    // call the submit button click-handler if the user hits the enter key
    $('#txtAnswer').keypress(function(e) {
        if (e.which == 13) { //Enter key pressed
            $('#btnSubmit').click(); //Trigger search button click event
        }
    });
    // add event handler for next question button
    $("#btnNextQuestion").click(function() {
        // disable next question button
        $("#btnNextQuestion").prop('disabled', true);
        // enable submit button
        $("#btnSubmit").prop('disabled', false);
        // erase the old question
        $("#lblQuestion").text('');
        // enable text field where the user enters an answer
        $("#txtAnswer").prop('disabled', false);
        // empty the text field where the user enters an answer
        $("#txtAnswer").val('');
        // clear the feedback from the last question
        $("#txtFeedback").html('');
        // clear the fringe
        $("#filterDiv").html('');
        // pass off to the controller to create and display a
        // new let expression and new question
        simController.setupDisplay();
    });
}