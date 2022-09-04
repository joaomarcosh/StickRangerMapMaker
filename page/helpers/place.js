function place(event) {
    let {x,y} = getMousePos(gridCanvas,event);
    if ($("#drawRadio").checked) {
        if ($("#bottomRadio").checked) mapCanvas.paintTile(selectedTile,x,y);
        else if ($("#topRadio").checked) topCanvas.paintTile(selectedTile,x,y);
        else {
            mapCanvas.paintTile(selectedTile,x,y);
            topCanvas.paintTile(selectedTile,x,y);
        }
    } else {
        if ($("#bottomRadio").checked) mapCanvas.paintTile(emptyMapTile,x,y);
        else if ($("#topRadio").checked) topCanvas.paintTile(emptyTopTile,x,y);
        else {
            mapCanvas.paintTile(emptyMapTile,x,y);
            topCanvas.paintTile(emptyTopTile,x,y);
        }
    }
}