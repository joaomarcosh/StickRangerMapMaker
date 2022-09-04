function loadFile(event,canvas) {
    let imageFile = new Image();
    imageFile.src = URL.createObjectURL(event.target.files[0]);
    imageFile.onload = function() {
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        if (canvas===mapCanvas) paintCanvasBackground();
        canvas.getContext("2d").drawImage(imageFile, 0, 0);
        if (canvas === tileCanvas) {
            tileCanvas.setContent();
            selectedTile = tileCanvas.context.getImageData(0, 0, 16, 16);
            tileGridCanvas.drawRedBox();
        }
        $("#bottomFile").value ="";
        $("#topFile").value ="";
    }
}