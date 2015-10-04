//problem we needa simple way to look at a users badge count and js points
var http = require("http");
var username = "thomasroest";

//print message
function printMessage(username, badgecount, points) {
  var msg = username + " has " + badgecount + " total badges(s) and " + points + " points in js";
  console.log(msg);
}

//print out error message
function printError(error){
  console.error("Error gek: " + error.message);

}

//connec to API url http://teamtreehouse.com/thomasroest.json
var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response){
  var body = ""
  response.on('data', function(chunk){
    body += chunk;
    //deliverd in streams (chunks)
  });
  response.on('end', function(){
    if(response.statusCode === 200) {
      try {
        var profile = JSON.parse(body);
        printMessage(username, profile.badges.length, profile.points.JavaScript);
      } catch(error) {
        //parse error here
        printError(error);
      }
      // the try and catch is necessary for catching errors even if the reponse code === 200
    } else {
      //status code error
      printError({message: "There was an error getting the profile for " + username + " " + http.STATUS_CODES[response.statusCode] });
    }
  });

//read the data
//parse data
//print the data
});

//connection error
request.on("error", printError);
