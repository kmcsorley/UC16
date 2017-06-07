/**
 * Uses AJAX to query an internet data source for the id number given a show title
 * @param {string} showId The element id that has the show title
 */
function getId(showId) {

    var show_name = document.getElementById(showId).value;
    console.log(show_name);

    // First get the name of the show from the HTML dropdown selector code

    /* ---------Difficult way to get show title---------------
    var shows = document.getElementsByName(showId);
    var show_name = "";
    for (i = 0; i < shows.length; i++) {
        if (shows[i].selected) {
            show_name = shows[i].value;
        }
    }
    ----------------------------------------------------------*/

    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if (this.status === 200) {
                // The request was successful!
                getCast(this.responseText);
            } else if (this.status === 404) {
                // No postal code found
                getCast('{ "id" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the show name
    var url = "http://api.tvmaze.com/search/shows?q=" + show_name; //"http://api.tvmaze.com/shows/:id/cast"+show;
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function getCast(showData) {
    var showInfo = JSON.parse(showData);
    var id = showInfo[0].show.id;
    console.log(id);
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if (this.status === 200) {
                // The request was successful!
                displayCast(this.responseText);
            } else if (this.status === 404) {
                // No postal code found
                displayCast('{ "country" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the show name
    var url = "http://api.tvmaze.com/shows/" + id + "/cast";
    httpRequest.open("GET", url, true);
    httpRequest.send();
}


/**
 * Displays the zip code place given the JSON data
 * @param {string} data JSON data representing place for given zip code
 */
function displayCast(data) {
    var cast = JSON.parse(data);
    console.log(cast[0].person.name);
    console.log(cast[0].person.image.medium);
    if (cast[0].person.name === "none") {
        document.getElementById("cast").className = "alert alert-warning";
        document.getElementById("cast").innerHTML = "No cast matches the show."
    } else {

        var display = "<table> <tr> <th>PHOTO</th><th>ACTOR</th><th>CHARACTER</th></tr>";

        for (i = 0; i < cast.length; i++) {
            display += "<tr><td>" + getImage(cast[i].person.image.medium) + "</td><td>" + cast[i].person.name + "</td><td>" + cast[i].character.name + "</td></tr>";
        }

        display = display + "</table>";
        document.getElementById("cast").innerHTML = display;
        styleDisplay();
    }

}



function styleDisplay() {
    //style images
    var images = document.getElementsByTagName("img");
    for (i = 0; i < images.length; i++) {
        images[i].style.width = "60px";
        images[i].style.margin = "5px 20px 5px 5px";
    }

    //style table rows
    var rows = document.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        if (i % 2 == 0) {
            rows[i].style.backgroundColor = "rgba(50, 50, 50, 0.1)";
        } else {
            rows[i].style.backgroundColor = "rgba(240, 240, 240, 0.1)";
        }
        rows[i].style.border = "1px solid grey";
    }

    //style table cells after they are created
    var cells = document.getElementsByTagName("td")
    for (i = 0; i < cells.length; i++) {
        cells[i].style.padding = "0 5px 0 5px";
        cells[i].style.fontSize = "16px";
    }

    //style header
    var header = document.getElementsByTagName("th");
    for (i = 0; i < header.length; i++) {
        header[i].style.color = "white";
        header[i].style.backgroundColor = "darkgrey";
        header[i].style.fontSize = "20px";
        header[i].style.fontWeight = "bold";
        header[i].style.padding = "0 5px 0 5px";
    }

}

function getImage(source) {
    //source = "source";
    var msg = "<img src=" + source + ">";
    return msg;
}
