function drawBitmapCenteredWithRotation (bitmap, atX, atY, withAng) {
 // Read Bottom to Top (Graphics changes effect every call after)
 canvasContext.save(); // Save/Restore undo calls to stop them applying to all images, just this one
 canvasContext.translate(atX, atY);  // 3. Moves across and down
 canvasContext.rotate(withAng); // 2. Rotates around origin (0, 0)
 canvasContext.drawImage(bitmap, -bitmap.width/2, -bitmap.height/2); // 1. Slides to centre position (centered relative to itself)
 canvasContext.restore();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect (topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY,radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX,textY);
}
