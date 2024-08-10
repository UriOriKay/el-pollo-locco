class Screens extends DrawableObject{
    height = 480;
    width = 720;
    y = 0
    gameOver = 'img/9_intro_outro_screens/game_over/game over!.png'

   /**
   * Creates an instance of Screens with the game over image.
   * @memberof Screens
   */
    constructor() {
        super().loadImage(this.gameOver);
    }
}