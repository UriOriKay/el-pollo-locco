class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

   /**
   * Creates an instance of Cloud.
   * @memberof Cloud
   */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() *500;
        this.animate();
    }

   /**
   * Animates the cloud's movement to the left.
   * @memberof Cloud
   */
    animate() {
        this.moveLeft();
    }
}