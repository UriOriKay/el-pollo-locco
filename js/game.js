let canvas;
let world;
let keyboard;
let key
let soundOn = false;
let bgmusic = new Audio('audio/bg-Music.mp3');

/**
 * Returns the HTML element with the specified ID.
 * @param {string} id - The ID of the HTML element.
 * @returns {HTMLElement} - The HTML element with the specified ID.
 */
function docID(id) {
    return document.getElementById(id);
}

/**
 * Initializes the game.
 */
function init() {
    canvas = docID('canvas');
    initlevel();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
}

/**
 * Toggles the fullscreen mode.
 */
function toggleFullScreen() {
    let elem = docID('screen');

    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
}

/**
 * Handles keydown events.
 * @param {KeyboardEvent} e - The keyboard event.
 */

window.addEventListener("keydown", (e) => {
    if(e.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if(e.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if(e.key == 'ArrowUp') {
        keyboard.UP = true;
    }
    if(e.key == 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if(e.key == " ") {
        keyboard.SPACE = true;
    }if(e.key == "d") {
        keyboard.D = true;
    }
});

/**
 * Handles keyup events.
 * @param {KeyboardEvent} e - The keyboard event.
 */
window.addEventListener("keyup", (e) => {
    if(e.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if(e.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if(e.key == 'ArrowUp') {
        keyboard.UP = false;
    }
    if(e.key == 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if(e.key == " ") {
        keyboard.SPACE = false;
    }
    if(e.key == "d") {
        keyboard.D = false;
    }
});

/**
 * Toggles the sound on and off.
 */
function soundOntoggle() {
    soundOn = !soundOn;
    if(soundOn) {
        docID('music').src = "img/music.png";
        bgmusic.play();
        bgmusic.loop = true;
    }
    else {
        docID('music').src = "img/music_off.png";
        bgmusic.pause();
    }
}

/**
 * Starts the game.
 */
function gamestart() {
    docID('start-img').classList.add('d-none');
    gameRunScreen();
    init();
}

/**
 * Sets up the game run screen.
 */
function gameRunScreen() {
    docID('ende').classList.add('d-none');
    docID('intro').classList.add('d-none');

}

/**
 * Displays the game over screen.
 */
function gameEnd() {
    docID('ende').classList.remove('d-none');
    docID('ende').src = 'img/9_intro_outro_screens/game_over/game over!.png'
    clearAllIntervals();
    restartButton();
}

/**
 * Clears all intervals used in the game.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  /**
 * Adds a restart button to the game intro screen.
 */
function restartButton () {
    docID('intro').classList.remove('d-none');
    docID('intro').innerHTML = /*html*/`
        <button onclick="restartGame()">Restart?</button>
    `;
}

/**
 * Restarts the game.
 */
function restartGame() {
    docID('intro').classList.add('d-none');
    docID('ende').classList.add('d-none');
    gamestart();
}

/**
 * Displays the game introduction.
 */
function showIntro() {
    docID('instruction').classList.remove('d-none');
}

/**
 * Closes the game introduction.
 */
function closeIntro() {
    docID('instruction').classList.add('d-none');
}