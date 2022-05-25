//const testW = 1043;
//document.getElementById("esquerda").style.maxWidth=`${testW}px`;

let tileCanvas = document.getElementById("tileCanvas");
let mapCanvas = document.getElementById("mapCanvas");
let tileCTX = tileCanvas.getContext("2d");
let mapCTX = mapCanvas.getContext("2d");
let tileCanvasContent;
let selectedTile;
let mouseDown = false;
let mousePos = [0,0];
let img1 = new Image();
var rect = tileCanvas.getBoundingClientRect();

img1.onload = function() {
    tileCTX.drawImage(img1, 0, 0);
    tileCanvasContent = tileCTX.getImageData(0, 0, tileCanvas.width, tileCanvas.height);
    drawRedBox(0,0);
    //let img2 = new Image();
    //img2.src = tileCanvas.toDataURL("image/jpeg");
};

img1.src = "./mt.gif";

function pick(event) {
    var x = Math.trunc(getMousePos(tileCanvas,event).x);
    var y = Math.trunc(getMousePos(tileCanvas,event).y);
    x=Math.floor(x/16)*16;
    y=Math.floor(y/16)*16;
    selectedTile = tileCTX.getImageData(x, y, 16, 16);
    //mapCTX.putImageData(tileCTX.getImageData(x, y, 16, 16),50,50);
    tileCanvas.width = tileCanvas.width;
    tileCTX.putImageData(tileCanvasContent,0,0);
    drawRedBox(x,y);
}

function place(event) {
    var x = Math.trunc(getMousePos(mapCanvas,event).x);
    var y = Math.trunc(getMousePos(mapCanvas,event).y);
    x=Math.floor(x/16)*16;
    y=Math.floor(y/16)*16;
    mapCTX.putImageData(selectedTile,x,y)
}

tileCanvas.addEventListener('click', function(event) {
    pick(event);
});

mapCanvas.addEventListener('mousedown', function(event) {
    mouseDown=true;
    place(event);
});
mapCanvas.addEventListener('mouseup', function() {
    mouseDown=false;;
});
mapCanvas.addEventListener('mousemove', function(event) {
    if (mouseDown) {
        place(event);
    }
});


function  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
  
    return {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}





function download() {
    mapCanvas.toBlob(function(blob) {
        saveAs(blob, "map.png");
    });
}

function drawRedBox(x,y,color="#FF0000") {
    tileCTX.strokeStyle = color;
    tileCTX.moveTo(x+0.5, y+0.5);
    tileCTX.lineTo(x+0.5, y+15.5);
    tileCTX.stroke();
    tileCTX.lineTo(x+15.5, y+15.5);
    tileCTX.stroke();
    tileCTX.lineTo(x+15.5, y+0.5);
    tileCTX.stroke();
    tileCTX.lineTo(x+0.5, y+0.5);
    tileCTX.stroke();
}