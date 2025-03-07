// Dados do Quiz
const perguntas = [
    {
        pergunta: "Qual é a capital do Brasil?",
        alternativas: ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte"],
        correta: 2 // Índice da alternativa correta
    },
    {
        pergunta: "Quem escreveu 'Dom Quixote'?",
        alternativas: ["Miguel de Cervantes", "Machado de Assis", "William Shakespeare", "Gabriel García Márquez"],
        correta: 0
    },
    {
        pergunta: "Qual é o maior planeta do sistema solar?",
        alternativas: ["Terra", "Júpiter", "Saturno", "Marte"],
        correta: 1
    },
    {
        pergunta: "Quantos elementos tem a tabela periódica?",
        alternativas: ["118", "92", "150", "100"],
        correta: 0
    },
    {
        pergunta: "Qual é o símbolo químico do ouro?",
        alternativas: ["Au", "Ag", "Fe", "Cu"],
        correta: 0
    }
];

let perguntaAtual = 0;
let progresso = 0;

class CurriculoScene extends Phaser.Scene {
    constructor() {
        // Chama o construtor da classe Phaser.Scene com a chave 'curriculoScene'
        super({ key: 'curriculoScene' });
        this.currentBackground = 'background'; // Define o estado inicial do fundo
        this.canMove = true; // Controla se o jogador pode se mover
    }

    preload() {
        // Carrega a imagem necessária para a cena do currículo
        this.load.image('primeiraTela', '../assets/primeiraTela.png');
        //Carrega imagens dos botões
        this.load.image('botao01', '../assets/botao_vp_pessoas.png');
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf'); // Fonte do jogo
    }

    create() {
        // Adicionando a imagem de fundo 'primeiraTela' e define a origem no canto superior esquerdo
        const fundo = this.add.image(0, 0, 'primeiraTela').setOrigin(0, 0);

        // Redimensionando a imagem para cobrir toda a tela
        fundo.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        // Adicionando a imagem dos botões à cena
        const botaoVpPessoas = this.add.image(400, 300, 'botao01');

        // Tornando a imagem interativa
        botaoVpPessoas.setInteractive();

        // Adicione um evento de clique
        botaoVpPessoas.on('pointerdown', () => {
            this.scene.start('QuizVpPessoas')
        });
    }


    update() {

    }

}


// Cena do Quiz da Vice-Presidência de Pessoas
class QuizVpPessoas extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizVpPessoas' });
        this.textosPergunta = []; // Armazena os textos da pergunta e alternativas
    }

    preload() {
        // Carrega a imagem de fundo
        this.load.image('fundoQuiz', '../assets/TelaQuiz.png');
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf'); // Fonte do jogo
    }

    create() {
        // Definindo uma imagem de fundo
        this.add.image(0, 0, 'fundoQuiz').setOrigin(0, 0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.criarBarraProgresso();
        this.mostrarPergunta();
    }

    criarBarraProgresso() {
        // Barra de progresso
        this.barraProgresso = this.add.rectangle(100, 50, 0, 20, 0x00ff00).setOrigin(0, 0.5);
        this.textoProgresso = this.add.text(300, 50, `Progresso: ${progresso}%`, { fontSize: '24px', fill: '#000000', fontFamily: 'FontePadrao'}); // Texto preto
    }

    atualizarBarraProgresso() {
        // Atualizando a barra de progresso do quiz
        const larguraMaxima = 500;
        const novaLargura = (progresso / 100) * larguraMaxima;
        this.barraProgresso.width = novaLargura;
        this.textoProgresso.setText(`Progresso: ${progresso}%`);
    }

    limparTextos() {
        // Remove apenas os textos da pergunta e alternativas (para não ficarem sobrepostos na tela)
        this.textosPergunta.forEach(texto => texto.destroy());
        this.textosPergunta = []; // Limpa o array
    }

    mostrarPergunta() {
        // Limpa os textos antigos (pergunta e alternativas)
        this.limparTextos();

        const pergunta = perguntas[perguntaAtual];

        // Exibindo pergunta
        const textoPergunta = this.add.text(100, 150, pergunta.pergunta, { fontSize: '32px', fill: '#000000', fontFamily:'FontePadrao' }); // Texto preto
        this.textosPergunta.push(textoPergunta); // Armazena a referência

        // Exibindo alternativas
        pergunta.alternativas.forEach((alternativa, index) => {
            const textoAlternativa = this.add.text(100, 200 + (index * 50), `${index + 1}. ${alternativa}`, { fontSize: '24px', fill: '#000000', fontFamily: 'FontePadrao'}) // Texto preto
                .setInteractive()
                .on('pointerdown', () => this.verificarResposta(index));
            this.textosPergunta.push(textoAlternativa); // Armazena a referência
        });
    }

    // Estrutura de condição sobre a resposta das perguntas
    verificarResposta(resposta) {
        const pergunta = perguntas[perguntaAtual];

        if (resposta === pergunta.correta) {
            progresso += 20; // Atualiza o progresso
            perguntaAtual++; // Vai para a próxima pergunta

            if (perguntaAtual < perguntas.length) {
                this.atualizarBarraProgresso();
                this.mostrarPergunta(); // Exibe a próxima pergunta
            } else {
                this.scene.start('CongratulationsSceneCurriculo'); // Todas as perguntas foram respondidas corretamente
            }
        } else {
            this.scene.start('GameOverSceneCurriculo'); // Resposta incorreta
        }
    }

    update() {

    }
}

// Cena caso o jogador erre uma pergunta do quiz 
class GameOverSceneCurriculo extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverSceneCurriculo' });
    }

    create() {
        // Adicionando texto
        this.add.text(300, 250, 'Game Over!', { fontSize: '48px', fill: '#ff0000', fontFamily: 'FontePadrao'});
        // Texto interativo para reiniciar o quiz 
        const botaoReiniciar = this.add.text(300, 350, 'Reiniciar Quiz', { fontSize: '32px', fill: '#fff', fontFamily: 'FontePadrao'})
            .setInteractive()
            .on('pointerdown', () => {
                perguntaAtual = 0;
                progresso = 0;
                this.scene.start('QuizVpPessoas');
            });
    }
}

// Cena de parabéns ao chegar ao final do quiz
class CongratulationsSceneCurriculo extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculo' });
    }

    create() {
        this.add.text(250, 250, 'Parabéns! Você venceu!', { fontSize: '48px', fill: '#00ff00', fontFamily: 'FontePadrao'});
        const botaoVoltar = this.add.text(300, 350, 'Voltar para o Escritório', { fontSize: '32px', fill: '#fff', fontFamily: 'FontePadrao'})
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.switch('officeScene');
                // Voltando para a cena principal
            });
    }
}