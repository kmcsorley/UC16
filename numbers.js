
/**
 * Uses AJAX to query an internet data source for zip codes
 * @param {string} zipId The element id that has the zip code
 */
function getNumber(numId, typeId) {
    // First get the type of number from the HTML text box
    var num = document.getElementById(numId).value;

    //Now get the type of trivia from the radio buttons
    var types = document.getElementsByName('type');
    var type_val;
    for(var i = 0; i < types.length; i++){
      if(types[i].checked){
        type_val = types[i].value;
      }
    }
    console.log(type_val);
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful!
                console.log("successful request!");
                displayFact(this.responseText);
            } else if (this.status === 404){
                // No strike number found
                 console.log("request failed");
                displayFact('{ "number" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };

    var url = "http://numbersapi.com/" + num + "/" + type_val + "?json";

    httpRequest.open("GET", url, true);
    httpRequest.send();
}

/**
 * Displays the strike location given the JSON data
 * @param {string} data JSON data representing location for given strike number
 */
function displayFact(data){
    var fact = JSON.parse(data);
    if(fact.number === "none") {
        document.getElementById("output").className = "alert alert-warning";
        document.getElementById("output").innerHTML = "No facts about this number."
    } else {
        document.getElementById("output").className = "alert alert-success";
        document.getElementById("output").innerHTML = fact.text;

    }
}
