class ThrowableObject extends MovableObject {
    offset = {x: 10 , y: 10, width: -20, height: -20};
    throwTime;
    bottleDeadCounter = 0;
    flyBottleImg;
    bottleDying;
    alreadyHit = false;
    brokenbottle_sound = new Audio('audio/brokenbottle_short.mp3');


    IMAGES_FLYING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_DESTROY = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

  /**
   * Creates an instance of ThrowableObject.
   * @param {number} x - The initial horizontal position of the throwable object.
   * @param {number} y - The initial vertical position of the throwable object.
   * @memberof ThrowableObject
   */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_FLYING);
        this.loadImages(this.IMAGES_DESTROY);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
    }

  /**
   * Throws the throwable object, initiating its animation.
   * @memberof ThrowableObject
   */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.x = world.character.x;
        this.y = 300;
        this.flyBottleImg = this.IMAGES_FLYING;
        this.throwTime = setInterval( () => {
            this.playAnimation(this.flyBottleImg);
            this.x += 10;
            this.checkBottleCollision();
        }, 50)
    }

      /**
   * Checks for collisions between the throwable object and enemies or the end boss.
   * @memberof ThrowableObject
   */
    checkBottleCollision() {
        world.enemies.forEach((enemy,index) => {
            if(this.isColliding(enemy)){
                if(enemy instanceof Chicken && !this.alreadyHit) {
                    world.enemies.splice(index,1);
                    this.speedY = 0;
                    this.BottleEnd();
                }
            }
            
        });
        if (this.isColliding(world.endboss) && !this.alreadyHit) {
            world.endboss.hit(world.endboss.hitEnergyEndboss);
            this.BottleEnd();
            world.statusBar[3].setPercentage(world.endboss.energy,3);
        }
        if (this.y > 350 && !this.alreadyHit) {
            this.speedY = 1;
            this.BottleEnd();
        }
    }

    /**
   * Ends the throwable object animation and plays the broken bottle sound.
   * @memberof ThrowableObject
   */
    BottleEnd() {
        this.alreadyHit = true;
        this.flyBottleImg = this.IMAGES_DESTROY;
        world.keyboard.D = false;
        if (soundOn) {this.brokenbottle_sound.play()};
        this.bottleDying = setInterval( () =>{
            this.bottleDeadCounter++;
            if (this.bottleDeadCounter > this.IMAGES_DESTROY.length-1) {
                this.bottleDeadCounter = 0;
                world.flyingBottle = [];
                clearInterval(this.throwTime);
                clearInterval(this.bottleDying);
                this.alreadyHit = false;
            }
        }, 50)
    }
}
   