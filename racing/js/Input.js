const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
  canvas.addEventListener("mousemove", updateMousePos);

  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  blueCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
  greenCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function updateMousePos(evt) {  // Mouse Stuff
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  // Start Cheat/Hack to move car - For Testing
    /*
    carX = mouseX;
    carY = mouseY;
    carSpeedX = 4;
    carSpeedY = -4;
    */
  // End Cheat/Hack
}

function keySet(key, whichCar, setTo) {
  if (key === whichCar.controlKeyLeft)
    whichCar.keyHeld_TurnLeft = setTo;
  if (key === whichCar.controlKeyRight)
    whichCar.keyHeld_TurnRight = setTo;

  if (key === whichCar.controlKeyUp)
    whichCar.keyHeld_Gas = setTo;
  if (key === whichCar.controlKeyDown)
    whichCar.keyHeld_Reverse = setTo;
}

function keyPressed(evt) {
  // console.log("Key Pressed:", evt.keyCode);
  keySet(evt.keyCode, blueCar, true);
  keySet(evt.keyCode, greenCar, true);
}

function keyReleased(evt) {
  // console.log("Key Released:", evt.keyCode);
  keySet(evt.keyCode, blueCar, false);
  keySet(evt.keyCode, greenCar, false);
}
