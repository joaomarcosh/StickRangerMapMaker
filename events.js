tileGridCanvas.canvas.addEventListener('click', function(event) {
    let {x,y} = getMousePos(tileCanvas,event);
    selectedTile = tileCanvas.pickTile(x,y);

    if (x===160 && y===0) {
        selectedAutotile = green1;
    } else if (x===160 && y===16) {
        selectedAutotile = green2;
    } else if (x===160 && y===32) {
        selectedAutotile = green3;
    } else {
        selectedAutotile = 0;
    }

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

$("#mapCanvasW").addEventListener("blur", function() {
    changeCanvasSize();
});

$("#mapCanvasH").addEventListener("blur", function() {
    changeCanvasSize();
});

baseTileSet.addEventListener("load", function() {
    tileCanvas.context.drawImage(baseTileSet, 0, 0);
    tileCanvas.setContent();
    selectedTile = tileCanvas.context.getImageData(0, 0, 16, 16);
    tileGridCanvas.drawRedBox();
});

$("#alternateGrid").addEventListener("click", function() {
    gridCanvas.changeGrid();
});

$("#previewMode").addEventListener("click", function() {
    $("#mapCanvas").classList.toggle("hidden");
});

$("#mapDownload").addEventListener("click", function() {
    mapCanvas.download('bottom');
});

$("#topDownload").addEventListener("click", function() {
    topCanvas.download('top');
});

$("#fullDownload").addEventListener("click", function() {
    exportFullMap();
});

$("#drawRadio").addEventListener("click", function() {
    if ($("#bothRadio").checked) {
        $("#bothRadio").checked = false;
        $("#bottomRadio").checked = true;
    }
    $("#bothRadio").disabled = true;
});

$("#eraseRadio").addEventListener("click", function() {
    $("#bothRadio").disabled = false;
});
