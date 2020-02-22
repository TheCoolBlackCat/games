const GROUNDSPEED_DECAY_MULTIPLIER = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

function carClass(name, whichImage) {
  this.x = 75;
  this.y = 75;
  this.ang = 0;
  this.speed = 0;
  this.carPic = whichImage;
  this.name = name;

  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

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

  this.reset = function() { // Resets car position at start
    this.speed = 0;

    for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if (trackGrid[arrayIndex] === TRACK_PLAYERSTART) {
          trackGrid[arrayIndex] = TRACK_ROAD; // Place track
          this.ang = -90 * Math.PI/180.0; // Start Angle in Radians

          // Insert Car at Top Left Corner of Grid Square
          this.x = eachCol * TRACK_W + TRACK_W/2 // Centre of square
          this.y = eachRow * TRACK_H + TRACK_H/2 // Centre of square
          return; // Bail out after first spawn point found
        } // end of player start if
      } // end of col for
    } // end of row for
    console.error("No Player Start Location Found!");
  }

  this.move = function() { // Car movement code
    this.speed *= GROUNDSPEED_DECAY_MULTIPLIER; // Friction

    if (this.keyHeld_Gas) this.speed += DRIVE_POWER;
    if (this.keyHeld_Reverse) this.speed -= REVERSE_POWER;

    if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) { // Check absolute value to handle negatives
      if (this.keyHeld_TurnLeft) this.ang -= TURN_RATE;
      if (this.keyHeld_TurnRight) this.ang += TURN_RATE;
    }

    // Cosine/Sine offset to account for hypotenuse being longer than sides
    this.x += Math.cos(this.ang) * this.speed;
    this.y += Math.sin(this.ang) * this.speed;

    carTrackHandling(this);
  } //end carMove()

  this.draw = function() {
    drawBitmapCenteredWithRotation(this.carPic, this.x, this.y, this.ang);
  }
} // end of carClass
