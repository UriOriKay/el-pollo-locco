let level1
firstBg = true;
BgArray = []
posX = -719;
levellength = 5;

/**
 * Generates background objects for the level.
 * @returns {Array<BackgroundObject>} - An array of background objects.
 */
function allBackground() {
    for (let i = 0; i < levellength; i++) {
        if(firstBg) {
            BgArray.push(new BackgroundObject('img/5_background/layers/air.png', posX))
            BgArray.push(new BackgroundObject('img/5_background/layers/3_third_layer/2.png', posX))
            BgArray.push(new BackgroundObject('img/5_background/layers/2_second_layer/2.png', posX))
            BgArray.push(new BackgroundObject('img/5_background/layers/1_first_layer/2.png', posX))
            firstBg = false;
        } else {
            BgArray.push(new BackgroundObject('img/5_background/layers/air.png', posX))
            BgArray.push(new BackgroundObject('img/5_background/layers/3_third_layer/1.png', posX))
            BgArray.push(new BackgroundObject('img/5_background/layers/2_second_layer/1.png', posX))
            BgArray.push(new BackgroundObject('img/5_background/layers/1_first_layer/1.png', posX))
            firstBg = true;
        }
        posX += 719;
    }
    return BgArray
}

/**
 * Initializes the game level.
 */
function initlevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
        ],
        [
            new Cloud(),
        ], 
        [
            allBackground()
        ],
        [
            new Coins(250, 100),
            new Coins(350, 100),
            new Coins(450, 100),
            new Coins(950, 100),
            new Coins(1050, 100),

        ],
        [
            new ThrowableObject (550, 100),
            new ThrowableObject (650, 100),
            new ThrowableObject (750, 100),
            new ThrowableObject (1750, 100),
            new ThrowableObject (1850, 100),
        ]
    );
}

