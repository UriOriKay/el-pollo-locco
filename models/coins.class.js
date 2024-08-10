class Coins extends MovableObject{
    offset = {x: 40 , y: 40, width: -80, height: -80};

     /**
   * Creates an instance of Coins.
   * @param {number} x - The X-coordinate position of the coin.
   * @param {number} y - The Y-coordinate position of the coin.
   * @memberof Coins
   */
    constructor(x,y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.height = 150;
        this.width = 150;
    }
}