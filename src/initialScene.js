class initialScene extends Phaser.Scene {
	constructor() {
		super({ key: 'initialScene '});
	}

	preload() {
		this.load.image('telaInicial', '../assets/tela_inicial.png');
		this.load.image('botaoJogar', '../assets/botao_jogar.png');
		this.load.image('botaoCreditos', '../assets/botao_creditos.png');
		this.load.image('botaoAjustes', '../assets/botao_ajustes.png');
	}

	create() {
		this.add.image(0, 0, 'telaInicial').setOrigin(0, 0).setDisplaySize(window.innerWidth, window.innerHeight);

		// Adiciona o botão "Jogar" na posição central da tela
		const botaoJogar = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 50, 'botaoJogar');
		botaoJogar.setInteractive(); // Torna o botão clicável
		botaoJogar.setScale(1.5); // Ajusta o tamanho, se necessário

		botaoJogar.on('pointerdown', () => {
			this.scene.stop('initialScene'),
			this.scene.start('cutScene')
		})

		//adiciona o botão "creditos" na tela inicial
		const botaoCreditos = this.add.image(this.cameras.main.width / 3.5, this.cameras.main.height / 1.3, 'botaoCreditos');
		botaoCreditos.setInteractive();
		botaoCreditos.setScale(1.7);

		botaoCreditos.on('pointerdown', () => {
			this.scene.stop('initialScene'),
			this.scene.start('cutScene')
		})

		//adiciona o botão "creditos" na tela inicial
		const botaoAjustes = this.add.image(this.cameras.main.width / 1.45, this.cameras.main.height / 1.34, 'botaoAjustes');
		botaoAjustes.setInteractive();
		botaoAjustes.setScale(1.9);

		botaoAjustes.on('pointerdown', () => {
			this.scene.stop('initialScene'),
			this.scene.start('cutScene')
		})
		
	}
	
}

