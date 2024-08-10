class Chicken extends MovableObject{
    walking_chicken = new Audio('audio/chicken.mp3');
    width = 80;
    height= 70;
    is_dead = false;
    y = 360;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    offset= {x: 0, y: 0, width: 0, height: 0};

   /**
   * Creates an instance of Chicken.
   * @memberof Chicken
   */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGE_DEAD)
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() *500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.walking_chicken.volume = 0.05;
    }

   /**
   * Animates the chicken's walking movement.
   * @memberof Chicken
   */
    animate(){
        setInterval(() => {
            this.moveLeft();
            if(soundOn){this.walking_chicken.play()} 
        }, 1000 / 60)

        setInterval( () =>{
            if (this.is_dead) {
                this.playAnimation(this.IMAGE_DEAD)
            }else {
                this.playAnimation(this.IMAGES_WALKING);
            } 
            }, 150)
    }
    
}