let tileCanvas = document.getElementById("tileCanvas");
let mapCanvas = document.getElementById("mapCanvas");
let topCanvas = document.getElementById("topCanvas");
let gridCanvas = document.getElementById("gridCanvas");
let tileCTX = tileCanvas.getContext("2d");
let mapCTX = mapCanvas.getContext("2d");
let topCTX = topCanvas.getContext("2d");
let gridCTX = gridCanvas.getContext("2d");
let tileCanvasContent;
let mapCanvasContent;
let topCanvasContent;
let gridCanvasContent;
let selectedTile;
let mouseDown = false;
let currentCTX = mapCTX;
let baseTileSet = new Image();
baseTileSet.src = "./mt3.gif";

baseTileSet.onload = function() {
    tileCTX.drawImage(baseTileSet, 0, 0);
    tileCanvasContent = tileCTX.getImageData(0, 0, tileCanvas.width, tileCanvas.height);
    selectedTile = tileCTX.getImageData(0, 0, 16, 16);
    drawRedBox(0,0,tileCTX);
};

function loadFile(event,canvas) {
    let imageFile = new Image();
    imageFile.src = URL.createObjectURL(event.target.files[0]);
    imageFile.onload = function() {
        canvas.width = canvas.width;
        canvas.getContext("2d").drawImage(imageFile, 0, 0);
        if (canvas === tileCanvas) {
            tileCanvasContent = tileCTX.getImageData(0, 0, tileCanvas.width, tileCanvas.height);
            selectedTile = tileCTX.getImageData(0, 0, 16, 16);
            drawRedBox(0,0,tileCTX);
        }
    }
}

function changeCanvasSize() {
    newWidth = document.getElementById("mapCanvasW").value;
    newHeight = document.getElementById("mapCanvasH").value;
    mapCanvasContent = mapCTX.getImageData(0, 0, mapCanvas.width, mapCanvas.height);
    topCanvasContent = topCTX.getImageData(0, 0, topCanvas.width, topCanvas.height);
    if (document.getElementById("tileOrPixel").checked) {
        mapCanvas.width = Math.ceil(newWidth)*16;
        mapCanvas.height = Math.ceil(newHeight)*16;
        topCanvas.width = Math.ceil(newWidth)*16;
        topCanvas.height = Math.ceil(newHeight)*16;
        gridCanvas.width = Math.ceil(newWidth)*16;
        gridCanvas.height = Math.ceil(newHeight)*16;
    } else {
        mapCanvas.width = Math.max(Math.ceil(newWidth/16)*16,16);
        mapCanvas.height = Math.max(Math.ceil(newHeight/16)*16,16);
        topCanvas.width = Math.max(Math.ceil(newWidth/16)*16,16);
        topCanvas.height = Math.max(Math.ceil(newHeight/16)*16,16);
        gridCanvas.width = Math.max(Math.ceil(newWidth/16)*16,16);
        gridCanvas.height = Math.max(Math.ceil(newHeight/16)*16,16);
    }
    mapCTX.putImageData(mapCanvasContent,0,0);
    topCTX.putImageData(topCanvasContent,0,0);
    drawGrid();
}

function pick(event) {
    let {x,y} = getMousePos(tileCanvas,event);
    selectedTile = tileCTX.getImageData(x, y, 16, 16);
    tileCanvas.width = tileCanvas.width;
    tileCTX.putImageData(tileCanvasContent,0,0);
    drawRedBox(x,y,tileCTX);
}

function place(event) {
    let {x,y} = getMousePos(mapCanvas,event);
    currentCTX.putImageData(selectedTile,x,y)
}

function setCurrentCanvas() {
    if (document.getElementById("bottomRadio").checked) currentCTX=mapCTX
    else if (document.getElementById("topRadio").checked) currentCTX=topCTX
    else if (document.getElementById("bothRadio").checked) currentCTX=mapCTX
    else console.log("something is fucked up!")
}

tileCanvas.addEventListener('click', function(event) {
    pick(event);
});

topCanvas.addEventListener('mousedown', function(event) {
    mouseDown=true;
    place(event);
});
topCanvas.addEventListener('mouseup', function() {
    mouseDown=false;
});
topCanvas.addEventListener('mousemove', function(event) {
    if (mouseDown) {
        place(event);
    }
    let {x,y} = getMousePos(topCanvas,event);
    gridCanvas.width = gridCanvas.width;
    gridCTX.putImageData(gridCanvasContent,0,0);
    drawRedBox(x,y,gridCTX);
});

function  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
  
    return {
      x: Math.floor(Math.trunc((evt.clientX - rect.left) * scaleX)/16)*16,   // scale mouse coordinates after they have
      y: Math.floor(Math.trunc((evt.clientY - rect.top) * scaleY)/16)*16     // been adjusted to be relative to element Math.floor(x/16)*16;
    }
}

function download(canvas) {
    canvas.toBlob(function(blob) {
        canvas === mapCanvas ? saveAs(blob, "bottom.png") : saveAs(blob, "top.png");
    });
}

function drawRedBox(x,y,context,color="#FF0000") {
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(x+0.5, y+0.5);
    context.lineTo(x+0.5, y+15.5);
    context.lineTo(x+15.5, y+15.5);
    context.lineTo(x+15.5, y+0.5);
    context.lineTo(x+0.5, y+0.5);
    context.stroke();
}

function drawGrid() {
    gridCTX.strokeStyle = "#00000020";
    for (x=16;x<gridCanvas.width;x+=16) {
        gridCTX.moveTo(x-0.5,0.5);
        gridCTX.lineTo(x-0.5,gridCanvas.height-0.5);
    }
    for (y=16;y<gridCanvas.height;y+=16) {
        gridCTX.moveTo(0.5,y-0.5);
        gridCTX.lineTo(gridCanvas.width-0.5,y-0.5);
    }
    gridCTX.stroke();
    gridCanvasContent = gridCTX.getImageData(0, 0, gridCanvas.width, gridCanvas.height);
}

drawGrid();