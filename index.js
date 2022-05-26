//const testW = 1043;
//document.getElementById("esquerda").style.maxWidth=`${testW}px`;

let tileCanvas = document.getElementById("tileCanvas");
let mapCanvas = document.getElementById("mapCanvas");
let tileCTX = tileCanvas.getContext("2d");
let mapCTX = mapCanvas.getContext("2d");
let tileCanvasContent;
let mapCanvasContent;
let selectedTile;
let mouseDown = false;
let img1 = new Image();

img1.onload = function() {
    tileCTX.drawImage(img1, 0, 0);
    tileCanvasContent = tileCTX.getImageData(0, 0, tileCanvas.width, tileCanvas.height);
    selectedTile = tileCTX.getImageData(0, 0, 16, 16);
    drawRedBox(0,0);
    //let img2 = new Image();
    //img2.src = tileCanvas.toDataURL("image/jpeg");
};

img1.src = "./mt2.gif";

function loadFile(event) {
    let img2 = new Image();
    img2.src = URL.createObjectURL(event.target.files[0]);
    img2.onload = function() {
        mapCanvas.width = mapCanvas.width;
        mapCTX.drawImage(img2, 0, 0);
    }
    console.log("cool!");
}

function changeCanvasSize() {
    newWidth = document.getElementById("mapCanvasW").value;
    newHeight = document.getElementById("mapCanvasH").value;
    mapCanvasContent = mapCTX.getImageData(0, 0, mapCanvas.width, mapCanvas.height);
    if (document.getElementById("tileOrPixel").checked) {
        mapCanvas.width = Math.ceil(newWidth)*16;
        mapCanvas.height = Math.ceil(newHeight)*16;
    } else {
        mapCanvas.width = Math.max(Math.ceil(newWidth/16)*16,16);
        mapCanvas.height = Math.max(Math.ceil(newHeight/16)*16,16);
    }
    mapCTX.putImageData(mapCanvasContent,0,0);
}

function pick(event) {
    var x = Math.trunc(getMousePos(tileCanvas,event).x);
    var y = Math.trunc(getMousePos(tileCanvas,event).y);
    x=Math.floor(x/16)*16;
    y=Math.floor(y/16)*16;
    selectedTile = tileCTX.getImageData(x, y, 16, 16);
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