tileGridCanvas.canvas.addEventListener('click', function(event) {
    let {x,y} = getMousePos(tileCanvas,event);
    selectedTile = tileCanvas.pickTile(x,y);
    tileGridCanvas.context.clearRect(0,0,tileGridCanvas.width,tileGridCanvas.height);
    tileGridCanvas.drawRedBox(x,y);
});

gridCanvas.canvas.addEventListener('mousedown', function(event) {
    mouseDown=true;
    place(event);
    createTiles();
});

gridCanvas.canvas.addEventListener('mouseup', function() {
    mouseDown=false;
});

gridCanvas.canvas.addEventListener('mousemove', function(event) {
    if (mouseDown) {
        place(event);
        createTiles();
    }
    let {x,y} = getMousePos(gridCanvas,event);
    gridCanvas.drawGrid();
    gridCanvas.drawRedBox(x,y);
});

gridCanvas.canvas.addEventListener('mouseout', function() {
    gridCanvas.drawGrid();
});

$("#bottomFile").addEventListener("change", function(event) {
    loadFile(event,mapCanvas);
});

$("#topFile").addEventListener("change", function(event) {
    loadFile(event,topCanvas);
});

$("#tileFile").addEventListener("change", function(event) {
    loadFile(event,tileCanvas);
});

$("#mapCanvasW").addEventListener("keydown", function(event) {
    if (event.key === "Enter") changeCanvasSize();
});

$("#mapCanvasH").addEventListener("keydown", function(event) {
    if (event.key === "Enter") changeCanvasSize();
});

$("#mapCanvasW").addEventListener("blur", function(event) {
    changeCanvasSize();
});

$("#mapCanvasH").addEventListener("blur", function(event) {
    changeCanvasSize();
});

baseTileSet.addEventListener("load", function() {
    tileCanvas.context.drawImage(baseTileSet, 0, 0);
    tileCanvas.setContent();
    selectedTile = tileCanvas.context.getImageData(0, 0, 16, 16);
    tileGridCanvas.drawRedBox();
});

$("#tileOrPixel").addEventListener("click", function(event) {
    fixNumber();
});

$("#alternateGrid").addEventListener("click", function(event) {
    gridCanvas.changeGrid();
});

$("#mapDownload").addEventListener("click", function(event) {
    mapCanvas.download('bottom');
});

$("#topDownload").addEventListener("click", function(event) {
    topCanvas.download('bottom');
});

$("#fullDownload").addEventListener("click", function(event) {
    exportFullMap();
});