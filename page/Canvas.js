class Canvas {

    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.context = this.canvas.getContext("2d");
        this.content = this.context.getImageData(0, 0, this.width, this.height);
    }

    get width() {
        return this.canvas.width;
    }

    set width(value) {
        this.canvas.width = value;
    }

    get height() {
        return this.canvas.height;
    }

    set height(value) {
        this.canvas.height = value;
    }

    paintCanvasBackground(color) {
        this.context.beginPath();
        this.context.rect(0, 0, this.width, this.height);
        this.context.fillStyle = color;
        this.context.fill();
    }

    drawRedBox(x=0,y=0,color="#FF0000") {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.moveTo(x+0.5, y+0.5);
        this.context.lineTo(x+0.5, y+15.5);
        this.context.lineTo(x+15.5, y+15.5);
        this.context.lineTo(x+15.5, y+0.5);
        this.context.lineTo(x+0.5, y+0.5);
        this.context.stroke();
    }

    pickTile(x,y) {
        let selectedTile = this.context.getImageData(x, y, 16, 16);
        this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        this.context.putImageData(this.content,0,0);
        return selectedTile;
    }

    paintTile(tile,x,y) {
        this.context.putImageData(tile,x,y);
    }

    setContent() {
        this.content = this.context.getImageData(0, 0, this.width, this.height);
    }

    download(name) {
        this.canvas.toBlob(blob => saveAs(blob, `${name}.png`));
    }
}
