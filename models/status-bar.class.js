class StatusBar extends DrawableObject {

    IMAGES = [
        [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ],
    [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ],

    [   
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ],
    [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ],
    ]
    
    percentage = 100;
    endbossId = 3;
    heartId = 0;

   /**
   * Creates an instance of StatusBar.
   * @param {number} y - The vertical position of the status bar.
   * @param {number} id - The ID representing the type of status bar.
   * @memberof StatusBar
   */
    constructor(y, id) {
        super();
        this.loadImages(this.IMAGES[id]);
        this.x = 40;
        this.y = y;
        this.width = 200;
        this.height = 60;
        if (id == this.heartId) {
            this.setPercentage(100, id);
        } else if (id == this.endbossId){
            this.setPercentage(100, id);3
            this.x = 480;
        }
        else {
            this.setPercentage(0, id);    
        }
        
    }

   /**
   * Resolves the index of the current image based on the percentage value.
   * @private
   * @returns {number} - The index of the current image.
   * @memberof StatusBar
   */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 79) {
            return 4;
        } else if (this.percentage > 59) {
            return 3;
        } else if (this.percentage > 39) {
            return 2;
        } else if (this.percentage > 19) {
            return 1;
        } else {
            return 0;
        }
    }


   /**
   * Sets the percentage value and updates the status bar image accordingly.
   * @param {number} percentage - The new percentage value.
   * @param {number} id - The ID representing the type of status bar.
   * @memberof StatusBar
   */
    setPercentage(percentage, id) {
        this.percentage = percentage;
        let path = this.IMAGES[id][this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}