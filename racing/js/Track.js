const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var levelOne = [
  4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
	4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
	1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
	1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
	1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
	1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
	1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
	1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
	1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
	1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
	1, 0, 3, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
	1, 0, 3, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4
];
var trackGrid = [];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function tileTypeAtColRow(col, row) { // Is position in outer bounds, if so, return false?
  if (col >= 0 && col < TRACK_COLS && // Checks for illegal columns
    row >= 0 && row < TRACK_ROWS) { // Checks for illegal rows
      var trackIndexUnderCoord = rowColToArrayIndex(col, row);
      return trackGrid[trackIndexUnderCoord];
    } else {
      return TRACK_WALL; // Off screen is treated as wall boundary
    }
}

function carTrackHandling(whichCar) {
  // Where is the car?
  var carTrackCol = Math.floor(whichCar.x / TRACK_W);
  var carTrackRow = Math.floor(whichCar.y / TRACK_H);
  var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

  if (carTrackCol >= 0 && carTrackCol < TRACK_COLS && //Fixes Edge-Wrap Collision Bug
    carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
      var tileHere = tileTypeAtColRow(carTrackCol, carTrackRow);
      if (tileHere === TRACK_GOAL) {
        document.getElementById("textLog").innerText = whichCar.name + " Won!";
        loadLevel(levelOne);
      } else if(tileHere !== TRACK_ROAD) {
        // Fix bug to prevent "burrowing" into track walls, undoing the movement that got it there
        whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
        whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;

        whichCar.speed *= -0.5;
    } //end LILif
  } //end BIGif
} //end carTrackHandling()

function rowColToArrayIndex(col, row) {
  return col + TRACK_COLS * row;
}

function drawTracks() {
  var arrayIndex = 0;
  var drawTileX = 0;
  var drawTileY = 0;
  for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
      var tileKindHere = trackGrid[arrayIndex];
      var useImg = trackPics[tileKindHere];
      canvasContext.drawImage(useImg, drawTileX, drawTileY);
      drawTileX += TRACK_W;
      arrayIndex++;
    } //end of for each col
    drawTileY += TRACK_H;
    drawTileX = 0;
  } //end of for each row
} //end of drawTracks()
