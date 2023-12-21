function changeCanvasSize() {
    const oldWidth = mapCanvas.width/16;
    const oldHeight = mapCanvas.height/16;
    const newWidth = $("#mapCanvasW").value;
    const newHeight = $("#mapCanvasH").value;
    mapCanvas.setContent();
    topCanvas.setContent();
    colorCanvas.setContent();

    mapCanvas.width = Math.ceil(newWidth)*16;
    mapCanvas.height = Math.ceil(newHeight)*16;
    topCanvas.width = Math.ceil(newWidth)*16;
    topCanvas.height = Math.ceil(newHeight)*16;
    gridCanvas.width = Math.ceil(newWidth)*16;
    gridCanvas.height = Math.ceil(newHeight)*16;
    colorCanvas.width = Math.ceil(newWidth)*16;
    colorCanvas.height = Math.ceil(newHeight)*16;

    mapCanvas.paintCanvasBackground('black');
    colorCanvas.paintCanvasBackground('black');
    mapCanvas.context.putImageData(mapCanvas.content,0,0);
    topCanvas.context.putImageData(topCanvas.content,0,0);
    colorCanvas.context.putImageData(colorCanvas.content,0,0);
    gridCanvas.drawGrid();

    mapArray.length = mapCanvas.width/16;

    if (newWidth > oldWidth) {
        for (let i=newWidth-oldWidth;i<newWidth;i++) {
            mapArray[i] = Array(newHeight)
        }
    }

    for (let i=0;i<mapArray.length;i++) {
        mapArray[i].length = mapCanvas.height/16;
    }
}