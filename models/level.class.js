class Level {
    enemies;
    clouds;
    backgroundobjects;
    coins;
    bottle;
    level_end_x = 2200;

   /**
   * Creates an instance of Level.
   * @param {Array<MovableObject>} enemies - Array of enemy objects.
   * @param {Array<MovableObject>} clouds - Array of cloud objects.
   * @param {Array<Array<BackgroundObject>>} backgroundobjects - Array of background objects.
   * @param {Array<Coins>} coins - Array of coin objects.
   * @param {Array<ThrowableObject>} bottle - Array of throwable object (bottle).
   * @memberof Level
   */
    constructor(enemies, clouds, backgroundobjects, coins, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundobjects = backgroundobjects;
        this.coins = coins;
        this.bottle = bottle;
    }
}