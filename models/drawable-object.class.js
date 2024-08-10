class DrawableObject {
    x = 120;
    y = 220;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

   /**
   * Loads a single image for the drawable object.
   * @param {string} path - The path to the image.
   * @memberof DrawableObject
   */
    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    }
   
    /**
   * Loads multiple images into the image cache.
   * @param {Array<string>} arr - An array of image paths.
   * @memberof DrawableObject
   */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

          /**
   * Loads multiple images into the image cache.
   * @param {Array<string>} arr - An array of image paths.
   * @memberof DrawableObject
   */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }
}