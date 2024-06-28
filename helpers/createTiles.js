function createTiles() {
    // 0 - has to be empty, 1 - has to be filled, 2 - doesnt matter
    const topLeft       = [2,0,2,0,2,2,2,2, tileCanvas.context.getImageData( 0,  0, 16, 16)];
    const topCenter     = [2,0,2,1,1,2,1,2, tileCanvas.context.getImageData(16,  0, 16, 16)];
    const topRight      = [2,0,2,1,0,2,2,2, tileCanvas.context.getImageData(32,  0, 16, 16)];
    const midLeft       = [2,1,2,0,1,2,1,2, tileCanvas.context.getImageData( 0, 16, 16, 16)];
    const midCenter     = [1,1,1,1,1,1,1,1, tileCanvas.context.getImageData(16, 16, 16, 16)];
    const midRight      = [2,1,2,1,0,2,1,2, tileCanvas.context.getImageData(32, 16, 16, 16)];
    const botLeft       = [2,2,2,0,2,2,0,2, tileCanvas.context.getImageData( 0, 32, 16, 16)];
    const botCenter     = [2,1,2,1,1,2,0,2, tileCanvas.context.getImageData(16, 32, 16, 16)];
    const botRight      = [2,2,2,1,0,2,0,2, tileCanvas.context.getImageData(32, 32, 16, 16)];
    const innerTopLeft  = [1,1,1,1,1,1,1,0, tileCanvas.context.getImageData(48,  0, 16, 16)];
    const innerTopRight = [1,1,1,1,1,0,1,1, tileCanvas.context.getImageData(64,  0, 16, 16)];
    const innerBotLeft  = [1,1,0,1,1,1,1,1, tileCanvas.context.getImageData(48, 16, 16, 16)];
    const innerBotRight = [0,1,1,1,1,1,1,1, tileCanvas.context.getImageData(64, 16, 16, 16)];

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
    
            // if the tile exist, get its tile value
            let tileTopLeft   =    mapArray[x-1] ? (mapArray[x-1][y-1] ? mapArray[x-1][y-1] : 0) : 0;
            let tileTopCenter = mapArray[x][y-1] ?                              mapArray[x][y-1] : 0;
            let tileTopRight  =    mapArray[x+1] ? (mapArray[x+1][y-1] ? mapArray[x+1][y-1] : 0) : 0;
            let tileMidLeft   =    mapArray[x-1] ?     (mapArray[x-1][y] ? mapArray[x-1][y] : 0) : 0;
            let tileMidRight  =    mapArray[x+1] ?     (mapArray[x+1][y] ? mapArray[x+1][y] : 0) : 0;
            let tileBotLeft   =    mapArray[x-1] ? (mapArray[x-1][y+1] ? mapArray[x-1][y+1] : 0) : 0;
            let tileBotCenter = mapArray[x][y+1] ?                              mapArray[x][y+1] : 0;
            let tileBotRight  =    mapArray[x+1] ? (mapArray[x+1][y+1] ? mapArray[x+1][y+1] : 0) : 0;
    
            tileArray = [tileTopLeft,tileTopCenter,tileTopRight,tileMidLeft,tileMidRight,tileBotLeft,tileBotCenter,tileBotRight];

            // checks the tile layer, if higher layer on top it creates a mountain, otherwise it creates a hole
            for (let t=0;t<8;t++) {
                if (tileArray[t] === 0)
                    continue
                if (tileArray[t].layer >= mapArray[x][y].layer) {
                    tileArray[t] = 1;
                } else {
                    tileArray[t] = 0;
                }
            }

            // will check if the given tile from tileArray matches any of the tile patterns defined in the tileset
            let empty;
            for (let t=0;t<tileset.length;t++) {
                let tile = tileset[t];
                empty = false;

                for (let i=0;i<8;i++) {
                    if (tile[i] === 2) {
                        continue;
                    }  else if (tile[i] === 1 && tileArray[i] === 1) {
                        continue;
                    } else if (tile[i] !== tileArray[i]) {
                        empty = true;
                        break;
                    }
                }

                if (!empty) {  // if it matches, paint it
                    mapCanvas.context.putImageData(tile[8],x*16,y*16)
                    break;
                } 
            }

            if(empty) // if no matches found, paint it a solid color to denote an error
                mapCanvas.fillTile(x*16,y*16,selectedAutotile.color);
        }
    }
}
