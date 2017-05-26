var correct_answer;

/**
 * Uses AJAX to query an internet data source for trivia questions
 * @param {string} none (for now)
 */
function getQuestion() {

    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if (this.status === 200) {
                // The request was successful!
                console.log("successful request!");
                displayQuestion(this.responseText);
            } else if (this.status === 404) {
                // No strike number found
                console.log("request failed");
                displayQuestion('{ "response[0].question" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };

    var url = "https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean";

    httpRequest.open("GET", url, true);
    httpRequest.send();
}

/**
 * Displays the trivia question given the JSON data
 * @param {string} data JSON data representing location for given strike number
 */
function displayQuestion(data) {
    //clear result box
    document.getElementById("result").innerHTML = "";
    document.getElementById("result").className = "";
    var questions = JSON.parse(data);
    if (questions.results[0].question === "none") {
        document.getElementById("output").className = "alert alert-warning";
        document.getElementById("output").innerHTML = "No questions available."
    } else {
        document.getElementById("output").className = "alert alert-success";
        document.getElementById("output").innerHTML = questions.results[0].question;
        correct_answer = questions.results[0].correct_answer;
    }
}

function checkAnswer() {

    //Get players answer from radio buttons
    var answers = document.getElementsByName('ans');
    var player_answer;
    for (var i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            player_answer = answers[i].value;
        }
    }
    console.log(player_answer);
    console.log(correct_answer);
    if (player_answer === correct_answer) {
        document.getElementById("result").innerHTML = "CORRECT!";
        document.getElementById("result").className = "alert alert-success";
        document.getElementById("result").style.fontWeight = "900";
    } else {
        document.getElementById("result").innerHTML = "WRONG";
        document.getElementById("result").className = "alert alert-danger";
        document.getElementById("result").style.fontWeight = "900";
    }
}
