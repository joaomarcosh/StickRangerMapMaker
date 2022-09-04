function changeCanvasSize() {
    const newWidth = $("#mapCanvasW").value;
    const newHeight = $("#mapCanvasH").value;
    mapCanvas.setContent();
    topCanvas.setContent();
    if ($("#tileOrPixel").checked) {
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
    mapCanvas.paintCanvasBackground('black');
    mapCanvas.context.putImageData(mapCanvas.content,0,0);
    topCanvas.context.putImageData(topCanvas.content,0,0);
    gridCanvas.drawGrid();
    fixNumber();
}