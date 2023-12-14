class GridCanvas extends Canvas {

    constructor(canvasElement) {
        super(canvasElement);
        this.offsetX = 0;
        this.offsetY = 0;
    }
    
    drawGrid(color = "#FFFFFF20") {
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.beginPath();
        this.context.strokeStyle = color;

        for (let x=this.offsetX;x<this.width;x+=16) {
            this.context.moveTo(x-0.5,0.5);
            this.context.lineTo(x-0.5,this.height-0.5);
        }
        for (let y=this.offsetY;y<this.height;y+=16) {
            this.context.moveTo(0.5,y-0.5);
            this.context.lineTo(this.width-0.5,y-0.5);
        }
        this.context.stroke();
    }

    changeGrid() {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.drawGrid();
        this.content = this.context.getImageData(0, 0, this.width, this.height);
    }
}
