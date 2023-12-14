function  getMousePos(canvas, evt) {
    let rect = canvas.canvas.getBoundingClientRect(); // abs. size of element
    let scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for x
    let scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
    
    if (gridCanvas.offsetX != 0 && canvas===gridCanvas) {
        return {
            x: Math.floor((Math.floor((evt.clientX - rect.left) * scaleX)+8)/16)*16-8,   // scale mouse coordinates after they 
            y: Math.floor((Math.floor((evt.clientY - rect.top) * scaleY)+8)/16)*16-8     // been adjusted to be relative
        }
    } else {
        return {
            x: Math.floor(Math.trunc((evt.clientX - rect.left) * scaleX)/16)*16,   // scale mouse coordinates after they have
            y: Math.floor(Math.trunc((evt.clientY - rect.top) * scaleY)/16)*16     // been adjusted to be relative to element
        }
    }
}