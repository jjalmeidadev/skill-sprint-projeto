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
	scene: [InitialScene, CutScene, TutorialScene, OfficeScene, CurriculoScene]
};

const game = new Phaser.Game(config);