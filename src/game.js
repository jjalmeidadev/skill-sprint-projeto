const config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false,
		}
	},
	scene: [initialScene, cutScene, tutorialScene, officeScene]
};

const game = new Phaser.Game(config);