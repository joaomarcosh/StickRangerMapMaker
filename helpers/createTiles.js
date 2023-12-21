function createTiles() {

    const topLeft   = [2,0,2,0,2,2,2,2,tileCanvas.context.getImageData( 0,  0, 16, 16)];
    const topCenter = [2,0,2,1,1,2,3,2,tileCanvas.context.getImageData(16,  0, 16, 16)];
    const topRight  = [2,0,2,1,0,2,2,2,tileCanvas.context.getImageData(32,  0, 16, 16)];
    const midLeft   = [2,1,2,0,3,2,1,2,tileCanvas.context.getImageData( 0, 16, 16, 16)];
    const midCenter = [1,1,1,1,1,1,1,1,tileCanvas.context.getImageData(16, 16, 16, 16)];
    const midRight  = [2,1,2,3,0,2,1,2,tileCanvas.context.getImageData(32, 16, 16, 16)];
    const botLeft   = [2,2,2,0,2,2,0,2,tileCanvas.context.getImageData( 0, 32, 16, 16)];
    const botCenter = [2,3,2,1,1,2,0,2,tileCanvas.context.getImageData(16, 32, 16, 16)];
    const botRight  = [2,2,2,1,0,2,0,2,tileCanvas.context.getImageData(32, 32, 16, 16)];
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
        innerBotRight,
    ];

    for (let y=0; y<mapArray[0].length; y++) {

        for (let x=0; x<mapArray.length; x++) {
    
            if (!mapArray[x][y]) {  // if not an autotile check next
                continue;
            }
    
            let tileTopLeft   =    mapArray[x-1] ? (mapArray[x-1][y-1] ? mapArray[x-1][y-1] : 0) : 0;
            let tileTopCenter = mapArray[x][y-1] ?                              mapArray[x][y-1] : 0;
            let tileTopRight  =    mapArray[x+1] ? (mapArray[x+1][y-1] ? mapArray[x+1][y-1] : 0) : 0;
            let tileMidLeft   =    mapArray[x-1] ?     (mapArray[x-1][y] ? mapArray[x-1][y] : 0) : 0;
            let tileMidRight  =    mapArray[x+1] ?     (mapArray[x+1][y] ? mapArray[x+1][y] : 0) : 0;
            let tileBotLeft   =    mapArray[x-1] ? (mapArray[x-1][y+1] ? mapArray[x-1][y+1] : 0) : 0;
            let tileBotCenter = mapArray[x][y+1] ?                              mapArray[x][y+1] : 0;
            let tileBotRight  =    mapArray[x+1] ? (mapArray[x+1][y+1] ? mapArray[x+1][y+1] : 0) : 0;
    
            tileArray = [tileTopLeft,tileTopCenter,tileTopRight,tileMidLeft,tileMidRight,tileBotLeft,tileBotCenter,tileBotRight];
            tileNumberArray = Array(8);

            for (let t=0;t<8;t++) {
                if (tileArray[t] === 0 || (tileArray[t] && tileArray[t].id != mapArray[x][y].id) ) {
                    tileNumberArray[t] = 0;
                } else { // same id
                    if (tileArray[t].layer > mapArray[x][y].layer) {
                        tileNumberArray[t] = 3;
                    } else if (tileArray[t].layer === mapArray[x][y].layer) {
                        tileNumberArray[t] = 1;
                    } else {
                        tileNumberArray[t] = 0;
                    }
                }
            }

            let empty;

            for (let t=0;t<tileset.length;t++) {

                tile = tileset[t];
                empty = false;

                for (let index=0;index<8;index++) {
                    
                    if (tile[index] === 2) {
                        continue;
                    } else if (tile[index] === 3 && tileNumberArray[index] > 0) {   // replace after
                        continue;
                    } else if (tile[index] === 1 && tileNumberArray[index] === 1) {
                        continue;
                    } else if (tile[index] !== tileNumberArray[index]) {
                        empty = true;
                        break;
                    }
                }

                if (!empty) {
                    mapCanvas.context.putImageData(tile[8],x*16,y*16)
                    break;
                } 
            }

            if(empty) mapCanvas.fillTile(x*16,y*16,selectedAutotile.color);
        }
    }
}
