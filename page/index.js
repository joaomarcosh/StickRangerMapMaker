const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tileCanvas = new Canvas($("#tileCanvas"));
const tileGridCanvas = new GridCanvas($("#tileGridCanvas"));
const mapCanvas = new Canvas($("#mapCanvas"));
const topCanvas = new Canvas($("#topCanvas"));
const gridCanvas = new GridCanvas($("#gridCanvas"));

let selectedTile;
let mouseDown = false;

mapCanvas.paintCanvasBackground('black');
const emptyMapTile = mapCanvas.context.getImageData(0, 0, 16, 16);
const emptyTopTile = tileCanvas.context.getImageData(0, 0, 16, 16);

const baseTileSet = new Image();
baseTileSet.src = "./images/mt3.gif";

gridCanvas.drawGrid();
gridCanvas.setContent();
