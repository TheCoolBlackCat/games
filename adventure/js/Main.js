var canvas, canvasContext;

var warrior = new warriorClass(warriorPic);

window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  // Pre-load
  colorRect(0,0, canvas.width,canvas.height, "black");
  colorText("Loading...", canvas.width/2, canvas.height/2, "white");

  loadImages();
}

function imageLoadingDoneSoStartGame() {
  var framesPerSecond = 30;
  setInterval (updateAll, 1000/framesPerSecond);

  setupInput();
  loadLevel(levelOne);
}

function loadLevel(whichLevel) {
  worldGrid = whichLevel.slice(); // Copy array
  warrior.reset();
}

function setName() {
  var newName = document.getElementById("nameField").value;
  warrior.name = newName.length > 0 ? newName : warrior.name;
  warrior.printKeysHeld();
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  warrior.move();
}

function drawAll() {
  drawWorlds();
  warrior.draw();
}
