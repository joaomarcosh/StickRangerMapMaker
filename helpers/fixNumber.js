function fixNumber() {
    if ($("#tileOrPixel").checked) {
        $("#mapCanvasW").value = mapCanvas.width;
        $("#mapCanvasH").value = mapCanvas.height;
        $$("p")[2].innerHTML = " pixels";
        $$("p")[3].innerHTML = " pixels";
    } else {
        $("#mapCanvasW").value = mapCanvas.width/16;
        $("#mapCanvasH").value = mapCanvas.height/16;
        $$("p")[2].innerHTML = " tiles";
        $$("p")[3].innerHTML = " tiles";
    }
}