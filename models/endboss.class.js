class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    offset= {x: 10, y: 10, width: -20, height: -30};
    world;
    allowedmove = false;
    energy = 100;
    hitEnergyEndboss = 20;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    IMAGES_ALERT =  [ 
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

   /**
   * Creates an instance of Endboss.
   * @memberof Endboss
   */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2700;
        this.animate();
        this.speed = this.speed *5
    }
   /**
   * Animates the end boss's movement and actions.
   * @memberof Endboss
   */
    animate() {
        setInterval(() => {
            if (this.allowedmove) {
                this.moveLeft();
            }
            
            if (this.world != undefined && this.world.character != undefined && this.world.character.x > 2190 && !this.allowedmove) {
                this.allowedmove = true;
                this.world.statusBar.push(new StatusBar(50,3))
            }
        }, 1000 / 60)
        
        setInterval( () =>{
            if (this.allowedmove && this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout( () => {this.iskilled()}, 1500);
            }else if (this.allowedmove && this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }else if (this.allowedmove) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150)
    }
}