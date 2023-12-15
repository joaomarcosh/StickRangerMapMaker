function createTiles() {

    const topLeft   = [0,0,2,0,1,2,1,1,tileCanvas.context.getImageData( 0,  0, 16, 16)];
    const topCenter = [2,0,2,1,1,1,1,1,tileCanvas.context.getImageData(16,  0, 16, 16)];
    const topRight  = [2,0,0,1,0,1,1,2,tileCanvas.context.getImageData(32,  0, 16, 16)];
    const midLeft   = [2,1,1,0,1,2,1,1,tileCanvas.context.getImageData( 0, 16, 16, 16)];
    const midCenter = [1,1,1,1,1,1,1,1,tileCanvas.context.getImageData(16, 16, 16, 16)];
    const midRight  = [1,1,2,1,0,1,1,2,tileCanvas.context.getImageData(32, 16, 16, 16)];
    const botLeft   = [2,1,1,0,1,0,0,2,tileCanvas.context.getImageData( 0, 32, 16, 16)];
    const botCenter = [1,1,1,1,1,2,0,2,tileCanvas.context.getImageData(16, 32, 16, 16)];
    const botRight  = [1,1,2,1,0,2,0,0,tileCanvas.context.getImageData(32, 32, 16, 16)];
    const innerTopLeft  = [1,1,1,1,1,1,1,0,tileCanvas.context.getImageData(48,  0, 16, 16)];
    const innerTopRight = [1,1,1,1,1,0,1,1,tileCanvas.context.getImageData(64,  0, 16, 16)];
    const innerBotLeft  = [1,1,0,1,1,1,1,1,tileCanvas.context.getImageData(48, 16, 16, 16)];
    const innerBotRight = [0,1,1,1,1,1,1,1,tileCanvas.context.getImageData(64, 16, 16, 16)];

    const tileset = [
        topLeft,
        topCenter,
        topRight,
        midLeft,
        midCenter,
        midRight,
        botLeft,
        botCenter,
        botRight,
        innerTopLeft,
        innerTopRight,
        innerBotLeft,
        innerBotRight,0
    ];

    const greenTile = tileCanvas.context.getImageData(160, 0, 16, 16);

    const mapArray = [];

    const allPixels = colorCanvas.context.getImageData(0,0,mapCanvas.width,mapCanvas.height);

    for (x=0;x<mapCanvas.width;x+=16) {
        mapArray[x/16] = [];
        for (y=0;y<mapCanvas.height;y+=16) {
            const green = (y * (mapCanvas.width*4) + x*4 + 1);
            mapArray[x/16][y/16] = allPixels.data[green] === 255 ? 1 : 0;
        }
    }

    for (y=0; y<mapArray[0].length; y++) {

        for (x=0; x<mapArray.length; x++) {
    
            if (mapArray[x][y] === 0) {
                //colorCanvas.context.putImageData(emptyMapTile,x*16,y*16);
                continue;
            }
    
            tileTopLeft = mapArray[x-1] ? (mapArray[x-1][y-1] ? 1 : 0) : 0;
            tileTopCenter = mapArray[x][y-1] ? 1 : 0;
            tileTopRight = mapArray[x+1] ? (mapArray[x+1][y-1] ? 1 : 0) : 0;
            tileMidLeft = mapArray[x-1] ? (mapArray[x-1][y] ? 1 : 0) : 0;
            tileMidRight = mapArray[x+1] ? (mapArray[x+1][y] ? 1 : 0) : 0;
            tileBotLeft = mapArray[x-1] ? (mapArray[x-1][y+1] ? 1 : 0) : 0;
            tileBotCenter = mapArray[x][y+1] ? 1 : 0;
            tileBotRight = mapArray[x+1] ? (mapArray[x+1][y+1] ? 1 : 0) : 0;
    
            tileArray = [tileTopLeft,tileTopCenter,tileTopRight,tileMidLeft,tileMidRight,tileBotLeft,tileBotCenter,tileBotRight];

            let empty;

            for (t=0;t<tileset.length;t++) {

                tile = tileset[t];
                empty = false;

                for (index=0;index<8;index++) {
                    
                    if (tile[index] === 2) {
                        continue;
                    } else if (tile[index] !== tileArray[index]) {
                        empty = true;
                        break;
                    }
                }

                if (!empty) {
                    mapCanvas.context.putImageData(tile[8],x*16,y*16)
                    break;
                } 
            }

            if(empty) mapCanvas.context.putImageData(greenTile,x*16,y*16);
        }
    }
}
