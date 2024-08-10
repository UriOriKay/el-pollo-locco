class BackgroundObject extends MovableObject {

width = 720;
height = 480;

/**
 * Creates an instance of BackgroundObject.
 * @param {string} imagePath - The path to the image of the background object.
 * @param {number} x - The initial X-coordinate position of the background object.
 * @memberof BackgroundObject
 */
constructor(imagePath, x,) {
    super().loadImage(imagePath, x)
    this.x = x;
    this.y = 480- this.height;
}

}