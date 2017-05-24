
/**
 * Uses AJAX to query an internet data source for zip codes
 * @param {string} zipId The element id that has the zip code
 */
function findStrike(numId) {
    // First get the strike number from the HTML textbox
    var num = document.getElementById(numId).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful!
                console.log("successful request!");
                displayStrike(this.responseText);
            } else if (this.status === 404){
                // No strike number found
                 console.log("request failed");
                displayStrike('{ "number" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };

    var url = "api.dronestre.am/data";
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

/**
 * Displays the strike location given the JSON data
 * @param {string} data JSON data representing location for given strike number
 */
function displayStrike(data){
    var place = JSON.parse(data);
    if(place.number === "none") {
        document.getElementById("output").className = "alert alert-warning";
        document.getElementById("output").innerHTML = "No place matches that strike number."
    } else {
        document.getElementById("output").className = "alert alert-success";
        document.getElementById("output").innerHTML = place.country;

    }
}
