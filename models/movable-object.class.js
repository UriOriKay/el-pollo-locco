class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;
    

      /**
   * Applies gravity to the object, making it fall or jump.
   * @memberof MovableObject
   */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            if (this.y >= 155 && this instanceof Character) {
                this.y = 155;
            }
        }, 1000 / 25)
    }

   /**
   * Initiates a jump by setting the vertical speed.
   * @memberof MovableObject
   */
    jump() {
        this.speedY = 25;
    }

   /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if above the ground, false otherwise.
   * @memberof MovableObject
   */
    isAboveGround() {
        if(this instanceof ThrowableObject){
            return true;
        }else {
            return this.y < 155;
        }
        
    }
    
   /**
   * Plays an animation by updating the object's image.
   * @param {Array<string>} images - Array of image URLs for the animation.
   * @memberof MovableObject
   */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (this.currentImage == images.length) {
            this.currentImage = 0;
        }
    }

   /**
   * Moves the object to the right.
   * @memberof MovableObject
   */
    moveRight() {
        this.x += this.speed;
    }

   /**
   * Moves the object to the left.
   * @memberof MovableObject
   */
    moveLeft() {
        this.x -= this.speed;
    }

   /**
   * Checks if the object is colliding with another object.
   * @param {MovableObject} obj - The other object for collision detection.
   * @returns {boolean} True if colliding, false otherwise.
   * @memberof MovableObject
   */
    isColliding(obj) {
        return  this.x + this.offset.x + this.width + this.offset.width > obj.x + obj.offset.x &&  //R->L
                this.y + this.offset.y + this.height + this.offset.height > obj.y+ obj.offset.y && // T->B
                this.x + this.offset.x < obj.x + obj.offset.x + obj.width + obj.offset.width && // L->R
                this.y + this.offset.y < obj.y+ obj.offset.y + obj.height + obj.offset.height;
                          
    }

   /**
   * Inflicts damage on the object.
   * @param {number} damage - The amount of damage to inflict.
   * @memberof MovableObject
   */
    hit(damage) {
        this.energy -= damage;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

   /**
   * Checks if the object is currently in a hurt state.
   * @returns {boolean} True if hurt, false otherwise.
   * @memberof MovableObject
   */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differnece in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 1;
    }

   /**
   * Checks if the object is dead.
   * @returns {boolean} True if dead, false otherwise.
   * @memberof MovableObject
   */
    isDead() {
        return this.energy == 0;
    }

   /**
   * Stops the game when the object is killed.
   * @memberof MovableObject
   */
    iskilled() {
        this.world.isGameStoppt = true;
    }

}