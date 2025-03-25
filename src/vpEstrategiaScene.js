class VpEstrategiaScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VpEstrategiaScene' });
    }

    preload() {
        // Carrega o mapa do Tiled e os tilesets
        this.load.tilemapTiledJSON('map_estrategia', '../assets/mapaVpEstrategia/map_estrategia.json');
        this.load.image('decoracao', '../assets/mapaVpEstrategia/decoracao.png');
        this.load.image('paredes', '../assets/mapaVpEstrategia/paredes.png');
        this.load.image('personalizado_vivo', '../assets/mapaVpEstrategia/personalizado_vivo.png');

        this.load.image("balaoTexto", "../assets/balaoTexto.png"); // Carrega o balão de fala da NPC

        // Carrega imagens, spritesheets e demais ativos
        this.load.spritesheet('player', '../assets/Player.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('npc', '../assets/viviane_lider.png');

        // Carrega os efeitos sonoros
        this.load.audio('walkSound', '../assets/sounds/753292__vrymaa__footsteps-high-heels-hardwood-walk-run (mp3cut.net).wav');
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Cria o mapa e as camadas
        const map = this.make.tilemap({ key: "map_estrategia", tileWidth: 25, tileHeight: 20 });
        const tileset1 = map.addTilesetImage("decoracao");
        const tileset2 = map.addTilesetImage("paredes");
        const tileset3 = map.addTilesetImage("personalizado_vivo");

        const offsetX = width - 1270;
        const layer1 = map.createLayer("chao", tileset2, offsetX, 0).setScale(2.5);
        const layer2 = map.createLayer("parede", tileset2, offsetX, 0).setScale(2.5);
        const layer3 = map.createLayer("porta_elevador", tileset1, offsetX, 0).setScale(2.5);
        const layer4 = map.createLayer("decoracao_com_barreiras", tileset1, offsetX, 0).setScale(2.5);
        const layer5 = map.createLayer("decoracao_sem_barreiras", tileset1, offsetX, 0).setScale(2.5);
        const layer6 = map.createLayer("personalizado_vivo_Sem_barreiras", tileset3, offsetX, 0).setScale(2.5);

        [layer1, layer2, layer3, layer4, layer5, layer6].forEach(layer => {
            layer.setCollisionByProperty({ collider: true });
        });

        this.createPlayer(width, height);
        this.createPlayerAnimations();

        // Configura colisões do jogador com camadas selecionadas
        this.physics.add.collider(this.player, layer2);
        this.physics.add.collider(this.player, layer4);
        this.physics.add.collider(this.player, layer5);

        // Adiciona NPC
        this.npc = this.physics.add.sprite(width - 800, height - 500, 'npc');
        this.npc.setScale(1.7);
        this.npc.body.immovable = true; // Faz a NPC ficar parada

        // Configura colisão do jogador com a NPC
        this.physics.add.collider(this.player, this.npc);

        // Configuração do teclado
        this.teclas = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            interagir: Phaser.Input.Keyboard.KeyCodes.E,
            ENTER: Phaser.Input.Keyboard.KeyCodes.ENTER
        });

        // Adiciona os efeitos sonoros
        this.walkSound = this.sound.add('walkSound', { loop: false, volume: 10 });

        // Variável para controlar o estado do diálogo
        this.dialogoAtivo = false;
    }

    update() {
        this.movePlayer();

        // Verifica se o jogador está próximo da NPC
        const distancia = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y);

        if (distancia < 100 && this.teclas.interagir.isDown && !this.dialogoAtivo) {
            const falasNpc = [
                "Olá! Que bom que você chegou!",
                "Bem-vindo à sala da VP de Estratégia!",
                "Meu nome é Viviane e sou líder de carreiras aqui na Vivo.",
                "Estamos em um momento único na empresa!",
                "Acabamos de lançar um programa exclusivo",
                "Queremos acelerar talentos como você!",
                "Mas tem um porém...",
                "As inscrições fecham em 24h, e só quem montar um plano estratégico para funcionários HOJE garante a vaga!",
                "Você tem 2 minutos para ajudar três talentos a escolher seus próximos passos de carreira.",
                "Planeje com cuidado! Cada decisão impacta o crescimento deles na empresa! Siga as exclamações."
            ];
            this.iniciarDialogo(falasNpc); // Inicia o diálogo com as falas da NPC
        }
    }

    iniciarDialogo(falasNpc) {
        this.dialogoAtivo = true; // Impede que o diálogo seja iniciado novamente enquanto está ativo

        let indiceFalaAtual = 0;

        // Cria o balão de fala
        const balaoTexto = this.add.image(this.npc.x, this.npc.y - 100, "balaoTexto").setOrigin(0.5).setScale(1);
        const texto = this.add.text(this.npc.x, this.npc.y - 120, falasNpc[indiceFalaAtual], {
            fontSize: "16px",
            fill: "#000000",
            wordWrap: { width: balaoTexto.width - 20 },
            align: "center",
            fontFamily: "FontePadrao"
        }).setOrigin(0.5);

        // Avança as falas ao pressionar Enter
        const avancarFala = () => {
            indiceFalaAtual++;
            if (indiceFalaAtual < falasNpc.length) {
                texto.setText(falasNpc[indiceFalaAtual]); // Atualiza o texto com a próxima fala
            } else {
                // Finaliza o diálogo
                balaoTexto.destroy();
                texto.destroy();
                this.input.keyboard.off("keydown-ENTER", avancarFala); // Remove o evento de tecla
                this.dialogoAtivo = false; // Permite iniciar outro diálogo no futuro
            }
        };

        this.input.keyboard.on("keydown-ENTER", avancarFala);
    }

    movePlayer() {
        const velocidade = 150;
        let movendo = false;

        if (this.teclas.left.isDown) {
            this.player.setVelocityX(-velocidade);
            this.player.anims.play("walk_left", true);
            this.player.setFlipX(true);
            movendo = true;
        } else if (this.teclas.right.isDown) {
            this.player.setVelocityX(velocidade);
            this.player.anims.play("walk_right", true);
            this.player.setFlipX(false);
            movendo = true;
        } else {
            this.player.setVelocityX(0);
        }

        if (this.teclas.up.isDown) {
            this.player.setVelocityY(-velocidade);
            this.player.anims.play("walk_up", true);
            movendo = true;
        } else if (this.teclas.down.isDown) {
            this.player.setVelocityY(velocidade);
            this.player.anims.play("walk_down", true);
            movendo = true;
        } else {
            this.player.setVelocityY(0);
        }

        if (!movendo) {
            this.player.anims.stop();
            this.walkSound.stop();
        } else {
            if (!this.walkSound.isPlaying) {
                this.walkSound.play();
            }
        }
    }

    createPlayer(width, height) {
        this.player = this.physics.add.sprite(width - 670, height - 660, 'player');
        this.player.setScale(2.5);
    }

    createPlayerAnimations() {
        this.anims.create({
            key: "walk_down",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "walk_right",
            frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "walk_up",
            frames: this.anims.generateFrameNumbers("player", { start: 12, end: 17 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "walk_left",
            frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1,
        });
    }
}