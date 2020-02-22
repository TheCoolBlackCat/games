const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_GAP = 2;
const WORLD_COLS = 800/WORLD_W;
const WORLD_ROWS = 600/WORLD_H;
var levelOne = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1,
  1, 0, 4, 0, 4, 0, 1, 0, 2, 0, 1, 0, 1, 4, 4, 1,
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1,
  1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
  1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 1, 1, 1, 1, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];
var levelTwo = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
  1, 3, 3, 3, 3, 3, 1, 0, 0, 0, 5, 4, 1, 1, 1, 1, 
  1, 3, 3, 3, 4, 3, 1, 0, 0, 0, 1, 4, 1, 4, 3, 1, 
  1, 3, 3, 3, 3, 3, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1, 
  1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 0, 0, 0, 0, 1, 1, 
  1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 4, 0, 1, 1, 
  1, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4, 0, 1, 1, 
  1, 4, 1, 3, 1, 0, 1, 3, 3, 3, 1, 0, 0, 0, 1, 1, 
  1, 0, 5, 3, 5, 4, 5, 3, 3, 3, 1, 1, 1, 1, 1, 1, 
  1, 0, 1, 3, 1, 0, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 3, 3, 3, 5 
];


var worldGrid = [];
const WORLD_GROUND = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2;
const WORLD_GOAL = 3;
const WORLD_KEY = 4;
const WORLD_DOOR = 5;

function tileTypeAtColRow(col, row) { // Is position in outer bounds, if so, return false?
  if (col >= 0 && col < WORLD_COLS && // Checks for illegal columns
    row >= 0 && row < WORLD_ROWS) { // Checks for illegal rows
      var worldIndexUnderCoord = rowColToArrayIndex(col, row);
      return worldGrid[worldIndexUnderCoord];
    } else {
      return WORLD_WALL; // Off screen is treated as wall boundary
    }
}

function rowColToArrayIndex(col, row) {
  return col + WORLD_COLS * row;
}

function drawWorlds() {
  var arrayIndex = 0;
  var drawTileX = 0;
  var drawTileY = 0;
  for(var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
      var tileKindHere = worldGrid[arrayIndex];
      var useImg = worldPics[tileKindHere];

      // Check for transparent tiles
      if (tileKindHere === WORLD_GOAL ||
          tileKindHere === WORLD_KEY ||
          tileKindHere === WORLD_DOOR)
        canvasContext.drawImage(worldPics[WORLD_GROUND], drawTileX, drawTileY);;

      canvasContext.drawImage(useImg, drawTileX, drawTileY);
      drawTileX += WORLD_W;
      arrayIndex++;
    } //end of for each col
    drawTileY += WORLD_H;
    drawTileX = 0;
  } //end of for each row
} //end of drawWorlds()
