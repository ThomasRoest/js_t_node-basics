var http = require("http");
//requiring http module

//print message
function printMessage(username, badgecount, points) {
  var msg = username + " has " + badgecount + " total badges(s) and " + points + " points in js";
  console.log(msg);
}

//print out error message
function printError(error){
  console.error("Error gek: " + error.message);
}

function get(username) {
  //connec to API url http://teamtreehouse.com/thomasroest.json
  var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response){
    var body = ""
    response.on('data', function(chunk){
      body += chunk;
      //read data
      //deliverd in streams (chunks)
    });
    response.on('end', function(){
      //parse data when response finished
      if(response.statusCode === 200) {
        try {
          //parse data
          var profile = JSON.parse(body);
          //print data
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
  });
  //connection error
  request.on("error", printError);
}

module.exports.get = get;
//for this module --> export the function get for use in other files.