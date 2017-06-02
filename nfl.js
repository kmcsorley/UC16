

/**
 * Uses AJAX to query an internet data source for NFL arrest info
 * @param {string} none (for now)
 */
function getInfo() {

    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    //var crime_type = document.getElementById("crime_list").value;

    //Now get the type of trivia from the radio buttons
    var crimes = document.getElementsByName('crime');
    var crime_type;
    for(var i = 0; i < crimes.length; i++){
      if(crimes[i].selected){
        crime_type = crimes[i].value;
      }
    }
    console.log(crime_type);
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if (this.status === 200) {
                // The request was successful!
                console.log("successful request!");
                displayInfo(this.responseText, crime_type);
            } else if (this.status === 404) {
                // No crimes found found
                console.log("request failed");
                displayInfo('{ "teams[0].Team" : "none" }', crime_type);
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };

    var url = "http://nflarrest.com/api/v1/crime/topTeams/" + crime_type;

    httpRequest.open("GET", url, true);
    httpRequest.send();
}

/**
 * Displays the trivia question given the JSON data
 * @param {string} data JSON data representing crime totals sorted by team
 */
function displayInfo(data, crimeId) {
    var crime_type = crimeId; //document.getElementById("crime").value;
    var msg = "";
    var teams = JSON.parse(data);
    if (teams[0].Team === "none") {
        document.getElementById("output").className = "alert alert-warning";
        document.getElementById("output").innerHTML = "No info available."
    } else {
        document.getElementById("output").className = "alert";
        for(i = 0; i < teams.length; i++){
            msg = msg + getLogo(teams[i].Team) + "                 " + teams[i].Team + " - " + teams[i].arrest_count + " " + crime_type + " arrests. <hr>";
        }
        document.getElementById("output").innerHTML = msg;
    }
}

/**
 * Gets the image source for a team
 * @param {string} team - the team abbreviation
 */
function getLogo(team) {
    var source = "";
    var logo = "";
    if(team == "MIN"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/min.png";
    }else if(team == "SEA"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/sea.png";
    }else if(team == "DEN"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/den.png";
    }else if(team == "TB"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/tb.png";
    }else if(team == "KC"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/kc.png";
    }else if(team == "LAC"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/lac.png";
    }else if(team == "SF"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/sf.png";
    }else if(team == "CHI"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/chi.png";
    }else if(team == "IND"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/ind.png";
    }else if(team == "CIN"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/cin.png";
    }else if(team == "JAC"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/jac.png";
    }else if(team == "BAL"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/bal.png";
    }else if(team == "TEN"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/ten.png";
    }else if(team == "MIA"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/mia.png";
    }else if(team == "OAK"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/oak.png";
    }else if(team == "ARI"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/ari.png";
    }else if(team == "WAS"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/was.png";
    }else if(team == "CAR"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/car.png";
    }else if(team == "LA"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/la.png";
    }else if(team == "BUF"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/buf.png";
    }else if(team == "NO"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/no.png";
    }else if(team == "DET"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/det.png";
    }else if(team == "NE"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/ne.png";
    }else if(team == "DAL"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/dal.png";
    }else if(team == "CLE"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/cle.png";
    }else if(team == "NYJ"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/nyj.png";
    }else if(team == "ATL"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/atl.png";
    }else if(team == "PIT"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/pit.png";
    }else if(team == "NYG"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/nyg.png";
    }else if(team == "HOU"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/hou.png";
    }else if(team == "GB"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/gb.png";
    }else if(team == "PHI"){
        source = "http://i.nflcdn.com/static/site/7.5/img/logos/teams-gloss-81x54/phi.png";
    }else{
        source = "";
    }
    logo = "<img src=" + source + ">";
    return logo;
}
