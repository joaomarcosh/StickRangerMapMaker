function exportFullMap() {
    mapCanvas.setContent();
    colorCanvas.setContent();
    topCanvas.setContent();
    gridCanvas.context.putImageData(mapCanvas.content,0,0);
    gridCanvas.setContent();
    const arraySize = gridCanvas.width * gridCanvas.height * 4;
    for (let i=0;i<arraySize;i+=4) {
        if (topCanvas.content.data[i+3]!==0) {
            gridCanvas.content.data[i] = topCanvas.content.data[i];
            gridCanvas.content.data[i+1] = topCanvas.content.data[i+1];
            gridCanvas.content.data[i+2] = topCanvas.content.data[i+2];
            gridCanvas.content.data[i+3] = topCanvas.content.data[i+3];
        }
    }
    gridCanvas.context.putImageData(gridCanvas.content,0,0);
    gridCanvas.download('full');
    gridCanvas.drawGrid();
}