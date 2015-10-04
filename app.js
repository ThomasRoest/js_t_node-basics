var profile = require("./profile");
//exported in profile.js

// console.dir(process.argv);

var users = process.argv.slice(2);
//send in users from the command line

users.forEach(profile.get);

//foreach is normally not supported in js in older browsers
// but can be used since node uses chrome V8

// profile.get("thomasroest");
// profile.get("chalkers");
// profile.get("joykesten");