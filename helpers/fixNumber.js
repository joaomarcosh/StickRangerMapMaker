function fixNumber() {
    if ($("#tileOrPixel").checked) {
        $("#mapCanvasW").value = mapCanvas.width/16;
        $("#mapCanvasH").value = mapCanvas.height/16;
        $$("p")[0].innerHTML = " tiles";
        $$("p")[1].innerHTML = " tiles";
    } else {
        $("#mapCanvasW").value = mapCanvas.width;
        $("#mapCanvasH").value = mapCanvas.height;
        $$("p")[0].innerHTML = " pixels";
        $$("p")[1].innerHTML = " pixels";
    }
}