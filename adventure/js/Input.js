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

  warrior.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
}

function updateMousePos(evt) {  // Mouse Stuff
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  // Start Cheat/Hack to move warrior - For Testing
    /*
    warriorX = mouseX;
    warriorY = mouseY;
    warriorSpeedX = 4;
    warriorSpeedY = -4;
    */
  // End Cheat/Hack
}

function keySet(key, whichWarrior, setTo) {
  if (key === whichWarrior.controlKeyLeft)
    whichWarrior.keyHeld_Left = setTo;
  if (key === whichWarrior.controlKeyRight)
    whichWarrior.keyHeld_Right = setTo;

  if (key === whichWarrior.controlKeyUp)
    whichWarrior.keyHeld_Up = setTo;
  if (key === whichWarrior.controlKeyDown)
    whichWarrior.keyHeld_Down = setTo;
}

function keyPressed(evt) {
  // console.log("Key Pressed:", evt.keyCode);
  keySet(evt.keyCode, warrior, true);
}

function keyReleased(evt) {
  // console.log("Key Released:", evt.keyCode);
  keySet(evt.keyCode, warrior, false);
}
