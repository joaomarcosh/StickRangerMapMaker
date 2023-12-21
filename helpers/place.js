function place(event) {
    let {x,y} = getMousePos(gridCanvas,event);
    if ($("#drawRadio").checked) {
        if ($("#bottomRadio").checked) {
            colorCanvas.paintTile(selectedTile,x,y);
            mapCanvas.paintTile(selectedTile,x,y);
            mapArray[x/16][y/16] = selectedAutotile;
        }
        else if ($("#topRadio").checked) {
            topCanvas.paintTile(selectedTile,x,y);
        }
        else {
            mapCanvas.paintTile(selectedTile,x,y);
            topCanvas.paintTile(selectedTile,x,y);
        }
    } else {   // erase radio
        if ($("#bottomRadio").checked) {
            mapCanvas.paintTile(emptyMapTile,x,y);
            colorCanvas.paintTile(emptyTopTile,x,y);
        }
        else if ($("#topRadio").checked) {
            topCanvas.paintTile(emptyTopTile,x,y);
        }
        else {
            mapCanvas.paintTile(emptyMapTile,x,y);
            topCanvas.paintTile(emptyTopTile,x,y);
            colorCanvas.paintTile(emptyTopTile,x,y);
        }
    }
}