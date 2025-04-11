/**
 * Represents the credits scene in a Phaser game.
 * This scene displays a background image and an interactive arrow button
 * that allows the user to return to the initial scene.
 */
class CreditosScene extends Phaser.Scene {
    /**
     * Initializes the scene with a unique key.
     */
    constructor() {
        super({ key: 'creditosScene' });
    }

    /**
     * Receives data passed from the previous scene.
     * @param {Object} data - Data passed to the scene.
     * @param {string} data.selectedSpriteSheet - The selected sprite sheet to be used in the next scene.
     */
    init(data) {
        this.selectedSpriteSheet = data.selectedSpriteSheet;
    }

    /**
     * Preloads assets required for the credits scene.
     * Loads the background image and the arrow button image.
     */
    preload() {
        this.load.image('backgroundCreditos', '../assets/créditosScene.png'); // Loads the background image for the credits scene
        this.load.image('arrow', '../assets/seta.png'); // Loads the arrow button image
    }

    /**
     * Creates the credits scene by adding the background image
     * and calling the function to create the interactive arrow button.
     */
    create() {
        this.add.image(width / 2, height / 2, 'backgroundCreditos').setScale(0.7); // Adds the background image to the scene and scales it
        this.createArrow(); // Calls the function to create the interactive arrow button
    }

    /**
     * Creates an interactive arrow button that allows the user to return
     * to the initial scene when clicked.
     */
    createArrow() {
        const arrow = this.add.image(width - 1300, height - 700, 'arrow'); // Adds the arrow button at the specified position
        arrow.setInteractive(); // Makes the arrow button interactive (clickable)
        arrow.setScale(1); // Sets the scale of the arrow button
        arrow.on('pointerdown', () => { // Adds a click event listener to the arrow button
            this.scene.stop('creditosScene'); // Stops the credits scene
            this.scene.start('initialScene', { selectedSpriteSheet: this.selectedSpriteSheet }); // Starts the initial scene and passes the selected sprite sheet data
        });
    }
}