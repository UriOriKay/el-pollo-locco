class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    endboss;
    clouds = level1.clouds;
    coins = level1.coins;
    bottles = level1.bottle;
    backgroundobjects = level1.backgroundobjects[0];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = [new StatusBar(0,0), new StatusBar(50,1), new StatusBar(100,2)];
    throwableObjects = [];
    coinAmount = 0;
    bottleAmount = 0;
    flyingBottle = [];
    isGameStoppt = false;
    screen = new Screens();
    coinSound = new Audio('audio/coin.mp3');
    bottleSound = new Audio('audio/bottle.mp3');
    deadSound = new Audio('audio/chicken_death_short.mp3');


    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
     * @param {Keyboard} keyboard - The keyboard controller for user input.
     * @memberof World
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.endboss = new Endboss();
        this.setWorld(this.character);
        this.setWorld(this.endboss);
        this.draw();
        this.run();
    }

    /**
     * Sets the world property of a model.
     * @param {MovableObject} model - The model to set the world property for.
     * @memberof World
     */
    setWorld(model) {
        model.world = this;
    }

    /**
     * Initiates the game loop.
     * @memberof World
     */
    run() {
        setInterval( () => {
            this.checkCollisions();
            this.checkCollisionsCoins();
            this.checkCollisionsBottle();
            this.checkThrowObjects();
        }, 50) 
    }

    /**
     * Checks if throwable objects should be thrown.
     * @memberof World
     */
    checkThrowObjects()  {
        if(this.keyboard.D && this.throwableObjects.length > 0 && this.flyingBottle.length < 1) {
            let resetX = this.throwableObjects[0].x;
            let resetY = this.throwableObjects[0].y;
            this.flyingBottle.push(this.throwableObjects.splice(0,1));
            this.flyingBottle[0][0].throw();
            this.ThrowEmptyPocket();
            this.bottles.push(new ThrowableObject(resetX, resetY));
        }
    }

    /**
     * Decreases the bottle count and updates the status bar.
     * @memberof World
     */
    ThrowEmptyPocket() {
        this.bottleAmount -= 1;
        this.statusBar[2].setPercentage(this.bottleAmount * 20, 2);
    }

    /**
     * Checks for collisions between the character and enemies or the end boss.
     * @memberof World
     */
    checkCollisions() {
        setInterval(() => {
            for (let i = this.enemies.length - 1; i >= 0; i--) {
                const enemy = this.enemies[i];
                if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0 && !enemy.is_dead) {
                    this.deathOfChicken(enemy, i);
                }
                else if (this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.is_dead) {
                    this.hurtingOfPepe(this.character.hitEnergyPepe);
                }
            }
            if (this.character.isColliding(this.endboss) && !this.character.isHurt()) {
                this.hurtingOfPepe(this.character.hitEnergyEndboss);
            }
        }, 200)
    }

    /**
    * Handles the death of a chicken enemy.
    * @param {Chicken} enemy - The chicken enemy to be removed from the world.
    * @param {number} index - The index of the chicken in the enemies array.
    * @memberof World
    */
    deathOfChicken(enemy, i) {
        if(enemy instanceof Chicken) {
            enemy.is_dead = true;
            if (soundOn) {this.deadSound.play()}
            setTimeout( () => {this.enemies.splice(i,1)}, 1500);
        }
        
    }

    /**
     * Handles the character getting hurt and updates the status bar.
     * @param {number} hitAmount - The amount of damage taken by the character.
     * @memberof World
     */
    hurtingOfPepe(hitAmount){
        this.character.hit(hitAmount);
        this.statusBar[0].setPercentage(this.character.energy,0);
    }


    /**
     * Checks for collisions between the character and coins.
     * @memberof World
     */
    checkCollisionsCoins() {
        setInterval(() =>{
            this.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin)) {
                    if (soundOn) {this.coinSound.play()}
                    this.coinAmount += 20;
                    this.statusBar[1].setPercentage(this.coinAmount,1);
                    this.coins.splice(index, 1)
                }
            })
        }, 200)
    }

    /**
     * Checks for collisions between the character and bottles.
     * @memberof World
     */
    checkCollisionsBottle() {
        setInterval(() =>{
            this.bottles.forEach((bottle, index) => {
                if (this.character.isColliding(bottle)) {
                    if (soundOn) {this.bottleSound.play()}
                    this.bottleAmount += 1;
                    this.statusBar[2].setPercentage(this.bottleAmount * 20,2);
                    this.throwableObjects.push(bottle);
                    this.bottles.splice(index, 1)
                }
            })
        }, 200)
    }

    /**
     * Renders all game objects on the canvas.
     * @memberof World
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.backgroundobjects);
        if (!this.isGameStoppt) {
            this.runningDraw();
        }else {
            gameEnd();
        }
        if (this.flyingBottle.length > 0) {
            this.addtoMap(this.flyingBottle[0][0]);
        }
        this.addStatusbar();
        this.ctx.translate(-this.camera_x, 0);
        this.loopdraw();
    }


    /**
    * Draws game objects when the game is running.
    * @memberof World
    */
    runningDraw() {
        this.addtoMap(this.character);
        this.addObjectToMap(this.clouds);
        this.addObjectToMap(this.enemies);
        this.addtoMap(this.endboss);
        this.addObjectToMap(this.coins);
        this.addObjectToMap(this.bottles);
    }

    /**
     * Initiates the loop for continuous rendering of the game.
     * @memberof World
     */
    loopdraw() {
        let self = this;
        if (!this.isGameStoppt) {
            requestAnimationFrame(function () {
            self.draw();
            })
        }
    }

    /**
     * Renders the status bar on the canvas.
     * @memberof World
     */
    addStatusbar() {
        this.ctx.translate(-this.camera_x, 0);
        if(!this.isGameStoppt) {
            this.addObjectToMap(this.statusBar);
        }
        this.ctx.translate(this.camera_x, 0);
    }

   /**
   * Renders an array of objects on the canvas.
   * @param {DrawableObject[]} objects - The array of objects to render.
   * @memberof World
   */
    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addtoMap(o);
        });
    }

   /**
   * Renders an object on the canvas, handling flipping if necessary.
   * @param {MovableObject} mo - The object to render.
   * @memberof World
   */
    addtoMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

   /**
   * Flips the image horizontally.
   * @param {MovableObject} mo - The object whose image needs to be flipped.
   * @memberof World
   */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

   /**
   * Restores the image to its original state after flipping.
   * @param {MovableObject} mo - The object whose image was flipped.
   * @memberof World
   */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}