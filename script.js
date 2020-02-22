// List of Games
var games = {
  brickbreaker: ["Brick Breaker", "brickbreaker"],
  pong: ["Pong!", "pong"],
  rgb: ["The Great RGB Colour Game", "rgbcolours"],
  racing: ["Racing", "racing"],
  adventure: ["A Warrior's Adventure", "adventure"],
};

/*
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        games = JSON.parse(this.responseText);
    }
};
xmlhttp.open("GET", "games.json", true);
xmlhttp.send();
*/

// Handle Query String
var queryString = location.search.substring(1).split('&');
var query = {};
for (var i = 0; i < queryString.length; i++) {
  var temp = queryString[i].split('=');
  query[temp[0]] = temp[1];
}

var game = query.play;
var box = document.getElementById("box");

if (!game) {
  document.title = "No Game Selected!";
  box.innerHTML += "<p>No Game Selected!</p>";
} else {
  document.title = games[game][0];
  box.innerHTML += "<embed src='"+games[game][1]+"' type='text/html' />";
}
