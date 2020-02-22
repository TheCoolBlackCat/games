var numSquares = 6;
var colours = [];
var pickedColour;
var squares = document.querySelectorAll(".square");
var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init () {
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons () {
   for (var i = 0; i < modeButtons.length; i++) {
      modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");    
      // Turnary Operator If
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
}

function setUpSquares () {
  for (var i = 0; i < squares.length; i++) {
    // Add "click" listeners
    squares[i].addEventListener("click", function() {
      // Grab colour of clicked square
      var clickedColour = this.style.background;
      // Compare colour to pickedColour
      if (clickedColour === pickedColour) {
        messageDisplay.textContent = "Correct!";
        changeColours(clickedColour);
        h1.style.background = clickedColour;
        resetButton.textContent = "Play Again?";
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset () {
  // Generate all new colours
  colours = generateRandomColours(numSquares);
  // Pick a new random colour from array
  pickedColour = pickColour();
  // Change colourDisplay to match pickColour
  colourDisplay.textContent = pickedColour;
  // Reset Play Again? to New Colours
  resetButton.textContent = "New Colours";
  // Reset Message
  messageDisplay.textContent = "";
  // Change colours of squares
  for (var i = 0; i < squares.length; i++) {
    if (colours[i]) { // If there is a colour for that square
      squares[i].style.display = "block"; // Show square
      squares[i].style.background = colours[i]; // Colour square in
    } else {
      squares[i].style.display = "none"; // If not, hide square
    }
  }
  // Change h1 background colour back
  h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function() {
  reset();
});

function changeColours(colour) {
  // Loop through all squares
  for (var i = 0; i < squares.length; i++) {
    // Change each colour to match given colour
    squares[i].style.background = colour;
  }
}

function pickColour () {
  var random = Math.floor(Math.random() * colours.length);
  return colours[random];
  /*
    Math.floor - Removes everything after the decimal point
    Math.random - Generates a random number between 0 and 1 (not including 1)
    * 6 - For the six faces on a di
    + 1 - Allows numbers above 5.9999...
  */
}

function generateRandomColours (num) {
  // Make an array
  var arr = [];
  // Repeat num times
  for (var i = 0; i < num; i++) {
    // Get Radom Colour and Push into arr
    arr.push(randomColour());
  }
  // Return the array
  return arr;
}

function randomColour () {
  // Pick a Red from 0 - 255
  var r = Math.floor(Math.random() * 256);
  // Pick a Green from 0 - 255
  var g = Math.floor(Math.random() * 256);
  // Pick a Blue from 0 - 255
  var b = Math.floor(Math.random() * 256);
  
  return "rgb(" + r + ", " + g + ", " + b + ")";
  // Spaces after , account for CSS auto adding them to a background colour
}