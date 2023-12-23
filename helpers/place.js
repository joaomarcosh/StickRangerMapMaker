function place(event) {
    let {x,y} = getMousePos(gridCanvas,event);
    if ($("#drawRadio").checked) {
        if ($("#bottomRadio").checked) {
            colorCanvas.paintTile(selectedTile,x,y);
            mapCanvas.paintTile(selectedTile,x,y);
            mapArray[Math.ceil(x/16)][Math.ceil(y/16)] = selectedAutotile;
        }
        else if ($("#topRadio").checked) {
            topCanvas.paintTile(selectedTile,x,y);
        }
        else if ($("#bothRadio").checked) {
            mapCanvas.paintTile(selectedTile,x,y);
            topCanvas.paintTile(selectedTile,x,y);
        }
    } else if ($("#eraseRadio").checked) {   // erase radio
        if ($("#bottomRadio").checked) {
            mapCanvas.paintTile(emptyMapTile,x,y);
            colorCanvas.paintTile(emptyTopTile,x,y);
            mapArray[Math.ceil(x/16)][Math.ceil(y/16)] = 0;
        }
        else if ($("#topRadio").checked) {
            topCanvas.paintTile(emptyTopTile,x,y);
        }
        else if ($("#bothRadio").checked) {
            mapCanvas.paintTile(emptyMapTile,x,y);
            topCanvas.paintTile(emptyTopTile,x,y);
            colorCanvas.paintTile(emptyTopTile,x,y);
            mapArray[Math.ceil(x/16)][Math.ceil(y/16)] = 0;
        }
    }
}