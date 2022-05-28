let tileCanvas = document.getElementById("tileCanvas");
let mapCanvas = document.getElementById("mapCanvas");
let topCanvas = document.getElementById("topCanvas");
let gridCanvas = document.getElementById("gridCanvas");
let finalCanvas = document.getElementById("finalCanvas");
let tileCTX = tileCanvas.getContext("2d");
let mapCTX = mapCanvas.getContext("2d");
let topCTX = topCanvas.getContext("2d");
let gridCTX = gridCanvas.getContext("2d");
let finalCTX = finalCanvas.getContext("2d");
let tileCanvasContent;
let mapCanvasContent;
let topCanvasContent;
let gridCanvasContent;
let selectedTile;
let mouseDown = false;
let alternateGrid = false;
let currentCTX = mapCTX;
let currentButton = "draw";
let emptyTopTile = tileCTX.getImageData(0, 0, 16, 16);
let baseTileSet = new Image();
baseTileSet.src = "./mt3.gif";

paintCanvasBackground();
let emptyMapTile = mapCTX.getImageData(0, 0, 16, 16);
drawGrid();

baseTileSet.onload = function() {
    tileCTX.drawImage(baseTileSet, 0, 0);
    tileCanvasContent = tileCTX.getImageData(0, 0, tileCanvas.width, tileCanvas.height);
    selectedTile = tileCTX.getImageData(0, 0, 16, 16);
    drawRedBox(0,0,tileCTX);
};

tileCanvas.addEventListener('click', function(event) {
    pick(event);
});

gridCanvas.addEventListener('mousedown', function(event) {
    mouseDown=true;
    place(event);
});
gridCanvas.addEventListener('mouseup', function() {
    mouseDown=false;
});
gridCanvas.addEventListener('mousemove', function(event) {
    if (mouseDown) {
        place(event);
    }
    let {x,y} = getMousePos(gridCanvas,event);
    //gridCanvas.width = gridCanvas.width;
    gridCTX.clearRect(0, 0, gridCanvas.clientWidth, gridCanvas.clientHeight);
    gridCTX.putImageData(gridCanvasContent,0,0);
    drawRedBox(x,y,gridCTX);
});

function loadFile(event,canvas) {
    let imageFile = new Image();
    imageFile.src = URL.createObjectURL(event.target.files[0]);
    imageFile.onload = function() {
        //canvas.width = canvas.width;
        currentCTX.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        canvas.getContext("2d").drawImage(imageFile, 0, 0);
        if (canvas === tileCanvas) {
            tileCanvasContent = tileCTX.getImageData(0, 0, tileCanvas.width, tileCanvas.height);
            selectedTile = tileCTX.getImageData(0, 0, 16, 16);
            drawRedBox(0,0,tileCTX);
        }
        document.getElementById("bottomFile").value ="";
        document.getElementById("topFile").value ="";
    }
}

function setButton() {
    if (document.getElementById("drawRadio").checked) currentButton="draw"
    else if (document.getElementById("deleteRadio").checked) currentButton="delete"
}

function changeCanvasSize() {
    const newWidth = document.getElementById("mapCanvasW").value;
    const newHeight = document.getElementById("mapCanvasH").value;
    mapCanvasContent = mapCTX.getImageData(0, 0, mapCanvas.width, mapCanvas.height);
    topCanvasContent = topCTX.getImageData(0, 0, topCanvas.width, topCanvas.height);
    if (document.getElementById("tileOrPixel").checked) {
        mapCanvas.width = Math.ceil(newWidth)*16;
        mapCanvas.height = Math.ceil(newHeight)*16;
        topCanvas.width = Math.ceil(newWidth)*16;
        topCanvas.height = Math.ceil(newHeight)*16;
        gridCanvas.width = Math.ceil(newWidth)*16;
        gridCanvas.height = Math.ceil(newHeight)*16;
        finalCanvas.width = Math.ceil(newWidth)*16;
        finalCanvas.height = Math.ceil(newHeight)*16;
    } else {
        mapCanvas.width = Math.max(Math.ceil(newWidth/16)*16,16);
        mapCanvas.height = Math.max(Math.ceil(newHeight/16)*16,16);
        topCanvas.width = Math.max(Math.ceil(newWidth/16)*16,16);
        topCanvas.height = Math.max(Math.ceil(newHeight/16)*16,16);
        gridCanvas.width = Math.max(Math.ceil(newWidth/16)*16,16);
        gridCanvas.height = Math.max(Math.ceil(newHeight/16)*16,16);
        finalCanvas.width = Math.max(Math.ceil(newWidth/16)*16,16);
        finalCanvas.height = Math.max(Math.ceil(newHeight/16)*16,16);
    }
    paintCanvasBackground();
    mapCTX.putImageData(mapCanvasContent,0,0);
    topCTX.putImageData(topCanvasContent,0,0);
    drawGrid();
    
}

function fixNumber() {
    if (document.getElementById("tileOrPixel").checked) {
        document.getElementById("mapCanvasW").value = mapCanvas.width/16;
        document.getElementById("mapCanvasH").value = mapCanvas.height/16;
        document.querySelectorAll("p")[0].innerHTML = " tiles";
        document.querySelectorAll("p")[1].innerHTML = " tiles";
    } else {
        document.getElementById("mapCanvasW").value = mapCanvas.width;
        document.getElementById("mapCanvasH").value = mapCanvas.height;
        document.querySelectorAll("p")[0].innerHTML = " pixels";
        document.querySelectorAll("p")[1].innerHTML = " pixels";
    }
    
}

function pick(event) {
    let {x,y} = getMousePos(tileCanvas,event);
    selectedTile = tileCTX.getImageData(x, y, 16, 16);
    //tileCanvas.width = tileCanvas.width;
    tileCTX.clearRect(0, 0, tileCanvas.clientWidth, tileCanvas.clientHeight);
    tileCTX.putImageData(tileCanvasContent,0,0);
    drawRedBox(x,y,tileCTX);
}

function place(event) {
    let {x,y} = getMousePos(gridCanvas,event);
    if (currentCTX!=="both" && currentButton!=="delete") {
        currentCTX.putImageData(selectedTile,x,y);
    } else if (currentCTX===mapCTX && currentButton==="delete") {
        currentCTX.putImageData(emptyMapTile,x,y);
    } else if (currentCTX===topCTX && currentButton==="delete") {
        currentCTX.putImageData(emptyTopTile,x,y);
    } else if (currentCTX==="both" && currentButton==="delete") {
        mapCTX.putImageData(emptyMapTile,x,y);
        topCTX.putImageData(emptyTopTile,x,y);
    }
}

function setCurrentCanvas() {
    if (document.getElementById("bottomRadio").checked) currentCTX=mapCTX
    else if (document.getElementById("topRadio").checked) currentCTX=topCTX
    else if (document.getElementById("bothRadio").checked) currentCTX="both"
}

function changeGrid() {
    alternateGrid = !alternateGrid;
    drawGrid();
}

function  getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect(); // abs. size of element
    let scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for x
    let scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
    
    if (alternateGrid && canvas===gridCanvas) {
        return {
            x: Math.floor((Math.floor((evt.clientX - rect.left) * scaleX)+8)/16)*16-8,   // scale mouse coordinates after they 
            y: Math.floor((Math.floor((evt.clientY - rect.top) * scaleY)+8)/16)*16-8     // been adjusted to be relative
        }
    } else {
        return {
            x: Math.floor(Math.trunc((evt.clientX - rect.left) * scaleX)/16)*16,   // scale mouse coordinates after they have
            y: Math.floor(Math.trunc((evt.clientY - rect.top) * scaleY)/16)*16     // been adjusted to be relative to element
        }
    }
}

function exportFullMap() {
    mapCanvasContent = mapCTX.getImageData(0, 0, mapCanvas.width, mapCanvas.height);
    topCanvasContent = topCTX.getImageData(0, 0, topCanvas.width, topCanvas.height);
    finalCTX.putImageData(mapCanvasContent,0,0);
    const finalCanvasContent = finalCTX.getImageData(0, 0, finalCanvas.width, finalCanvas.height);
    drawGrid();
    const arraySize = finalCanvas.width * finalCanvas.height * 4;
    for (let i=0;i<arraySize;i+=4) {
        if (topCanvasContent.data[i+3]!==0) {
            finalCanvasContent.data[i] = topCanvasContent.data[i];
            finalCanvasContent.data[i+1] = topCanvasContent.data[i+1];
            finalCanvasContent.data[i+2] = topCanvasContent.data[i+2];
            finalCanvasContent.data[i+3] = topCanvasContent.data[i+3];
        }
    }
    finalCTX.putImageData(finalCanvasContent,0,0);
    download(finalCanvas);
}

function download(canvas) {
    canvas.toBlob(function(blob) {
        if (canvas===mapCanvas) saveAs(blob, "bottom.png")
        else if (canvas===topCanvas) saveAs(blob, "top.png")
        else if (canvas===finalCanvas) saveAs(blob, "full.png")
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

function paintCanvasBackground() {
    mapCTX.beginPath();
    mapCTX.rect(0, 0, mapCanvas.width, mapCanvas.height);
    mapCTX.fillStyle = "black";
    mapCTX.fill();
}

function drawGrid() {
    //gridCanvas.width = gridCanvas.width;
    gridCTX.clearRect(0, 0, gridCanvas.clientWidth, gridCanvas.clientHeight);
    gridCTX.strokeStyle = "#FFFFFF20";
    if (!alternateGrid) {
        for (let x=16;x<gridCanvas.width;x+=16) {
            gridCTX.moveTo(x-0.5,0.5);
            gridCTX.lineTo(x-0.5,gridCanvas.height-0.5);
        }
        for (let y=16;y<gridCanvas.height;y+=16) {
            gridCTX.moveTo(0.5,y-0.5);
            gridCTX.lineTo(gridCanvas.width-0.5,y-0.5);
        }
        gridCTX.stroke();
        gridCanvasContent = gridCTX.getImageData(0, 0, gridCanvas.width, gridCanvas.height);
    } else {
        for (let x=-8;x<gridCanvas.width+8;x+=16) {
            gridCTX.moveTo(x-0.5,0.5);
            gridCTX.lineTo(x-0.5,gridCanvas.height-0.5);
        }
        for (let y=-8;y<gridCanvas.height+8;y+=16) {
            gridCTX.moveTo(0.5,y-0.5);
            gridCTX.lineTo(gridCanvas.width-0.5,y-0.5);
        }
        gridCTX.stroke();
        gridCanvasContent = gridCTX.getImageData(0, 0, gridCanvas.width, gridCanvas.height);
    }
}
