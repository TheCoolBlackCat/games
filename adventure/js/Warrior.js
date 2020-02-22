const GROUNDSPEED_DECAY_MULTIPLIER = 0.94;

function warriorClass(whichImage) {
  this.x = 75;
  this.y = 75;
  this.speed = 7.5;
  this.ang = 0;
  this.warriorPic = whichImage;
  this.name = "Warrior";
  this.keysHeld = 0;

  this.keyHeld_Up = false;
  this.keyHeld_Down = false;
  this.keyHeld_Left = false;
  this.keyHeld_Right = false;

  this.controlKeyUp;
  this.controlKeyRight;
  this.controlKeyDown;
  this.controlKeyLeft;

  this.setupInput = function(upKey, rightKey, downKey, leftKey) {
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;
  }

  this.log = function(txt) {
    var l = document.getElementById("textLog");
    l.innerText = txt;
    l.style.fontWeight = "bold";
  }

  this.printKeysHeld = function() {
    this.log("Keys: " + this.keysHeld);
  }

  this.reset = function() { // Resets warrior position at start
    for(var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if (worldGrid[arrayIndex] === WORLD_PLAYERSTART) {
          worldGrid[arrayIndex] = WORLD_GROUND; // Place world
          this.ang = -90 * Math.PI/180.0; // Start Angle in Radians

          this.x = eachCol * WORLD_W + WORLD_W/2 // Centre of square
          this.y = eachRow * WORLD_H + WORLD_H/2 // Centre of square
          return; // Bail out after first spawn point found
        } // end of player start if
      } // end of col for
    } // end of row for
    console.error("No Player Start Location Found!");
  }

  this.move = function() { // Warrior movement code
    // this.speed *= GROUNDSPEED_DECAY_MULTIPLIER; // Friction
    var newX = this.x, newY = this.y;

    if (this.keyHeld_Up) newY = this.y - this.speed;
    if (this.keyHeld_Down) newY = this.y + this.speed;
    if (this.keyHeld_Left) newX = this.x - this.speed;
    if (this.keyHeld_Right) newX = this.x + this.speed;

    // Check tile under possible future position
    var col = Math.floor(newX / WORLD_W);
    var row = Math.floor(newY / WORLD_H);
    var tileHere = tileTypeAtColRow(col, row);

    switch (tileHere) {
      case WORLD_GROUND:
        this.x = newX;
        this.y = newY;
        break;
      case WORLD_KEY:
        this.keysHeld++;
        worldGrid[rowColToArrayIndex(col, row)] = WORLD_GROUND;
        this.printKeysHeld();
        break;
      case WORLD_DOOR:
        if (this.keysHeld > 0) {
          this.keysHeld--;
          worldGrid[rowColToArrayIndex(col, row)] = WORLD_GROUND;
          this.printKeysHeld();
        }
        break;
      case WORLD_GOAL:
        this.log(this.name + ", You Won!");
        loadLevel(levelOne);
        break;
      case WORLD_WALL:
      default:
        break; // Don't move (wall, etc.)
    }
  } //end warriorMove()

  this.draw = function() {
    // console.log(this.x, this.y);
    drawBitmapCenteredWithRotation(this.warriorPic, this.x, this.y, this.ang);
  }
} // end of warriorClass
