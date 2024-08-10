class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

   /**
   * Creates an instance of Keyboard.
   * Initializes touch control events for mobile devices.
   * @memberof Keyboard
   */
    constructor () {
        this.bindMobileBtsPressEvents()
    }

    /**
     * Binds touch control events for specified buttons.
     * @private
     * @param {string} id - The HTML element ID of the button.
     * @param {boolean} btn - The associated button state.
     * @memberof Keyboard
     */
    bindMobileBtsPressEvents() {
        this.btnHandle("btn-left", this.LEFT);
        this.btnHandle("btn-right", this.RIGHT);
        this.btnHandle("btn-d", this.D);
        document.getElementById("btn-up").addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.UP = true;
            this.SPACE = true;
            });
        document.getElementById("btn-up").addEventListener("touchend", (event) => {
            event.preventDefault();
            this.UP = false;
            this.SPACE = false;
            });
    }

    /**
     * Initializes touch control events for mobile devices.
     * @private
     * @memberof Keyboard
     */
    btnHandle(id, btn) {
        document.getElementById(id).addEventListener("touchstart", (event) => {
            event.preventDefault();
            btn = true;
            });
        document.getElementById(id).addEventListener("touchend", (event) => {
            event.preventDefault();
            btn = false;
            });
    }
}