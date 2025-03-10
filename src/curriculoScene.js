// Dados do Quiz
const perguntas = [
    {
        pergunta: "O setor de Pessoas da Vivo valoriza currículos bem organizados e fáceis de ler. Qual das seguintes práticas melhora a estrutura do seu currículo? (Clique na alternativa correta)",
        alternativas: ["Usar parágrafos longos para descrever cada experiência.", "Utilizar marcadores para destacar conquistas e habilidades.", " Incluir informações detalhadas sobre sua vida pessoal.", "Adicionar todas as experiências desde o primeiro emprego, sem priorizar as mais recentes."],
        correta: 1 // Índice da alternativa correta
    },
    {
        pergunta: "Qual a importância de destacar soft skills no currículo? (Clique na alternativa correta)",
        alternativas: ["São irrelevantes, apenas habilidades técnicas importam.", "Demonstram como o candidato se adapta e interage no ambiente de trabalho.", "Devem ser listadas de forma genérica, sem exemplos práticos.", "Devem substituir as experiências profissionais."],
        correta: 1
    },
    {
        pergunta: "Como adaptar o currículo para ser aprovado por um sistema ATS (Applicant Tracking System)? (Clique na alternativa correta)",
        alternativas: ["Usando palavras-chave da descrição da vaga.", "Criando um design altamente visual e colorido.", "Usando apenas tópicos genéricos sobre experiências.", "Evitando títulos claros para as seções."],
        correta: 0
    },
    {
        pergunta: "O que é essencial para um currículo ser bem avaliado por um recrutador? (Clique na alternativa correta)",
        alternativas: ["Um layout sofisticado e cheio de imagens.", "Listar apenas experiências, sem detalhar conquistas.", "Destacar resultados e competências alinhadas à vaga.", "Usar um texto longo e detalhado para cada experiência."],
        correta: 2
    },
    {
        pergunta: "Qual erro pode prejudicar um candidato ao enviar um currículo? (Clique na alternativa correta)",
        alternativas: ["Usar um e-mail profissional no contato.", "Adaptar o currículo para cada vaga.", "Excluir informações de contato.", "Deixar informações desatualizadas ou incorretas."],
        correta: 2
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
        // Carrega a fonte do quiz
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf'); // Fonte do jogo
         // Carregando imagem de fundo 
         this.load.image('TelaQuiz', '../assets/TelaQuiz.png');
        }    

    create() {
        //Transição
        this.cameras.main.fadeIn(1000);

        // Adicionar a imagem de fundo
        this.add.image(0, 0, 'TelaQuiz').setOrigin(0, 0);

        // Definir a cor de fundo para cinza (em hexadecimal)
        this.cameras.main.setBackgroundColor('#D9D9D9');

        this.criarBarraProgresso();
        this.mostrarPergunta();
    }

    criarBarraProgresso() {
        // Barra de progresso
        this.barraProgresso = this.add.rectangle(100, 50, 0, 20, 0x800080).setOrigin(0, 0.5);
        this.textoProgresso = this.add.text(920, 50, `Progresso: ${progresso}%`, { fontSize: '24px', fill: '#000000', fontFamily: 'FontePadrao' }); // Texto preto

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
        const textoPergunta = this.add.text(150, 150, pergunta.pergunta, { fontSize: '24px', fill: '#B600B9', fontFamily: 'FontePadrao', wordWrap: { width: 1000 } }); // Texto preto
        this.textosPergunta.push(textoPergunta); // Armazena a referência

        // Exibindo alternativas
        pergunta.alternativas.forEach((alternativa, index) => {
            const textoAlternativa = this.add.text(150, 230 + (index * 50), `${index + 1}. ${alternativa}`, { fontSize: '24px', fill: '#000000', fontFamily: 'FontePadrao', wordWrap: { width: 1000 } }) // Texto preto
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
                this.scene.start('CongratulationsSceneCurriculoVpPessoas'); // Todas as perguntas foram respondidas corretamente
            }
        } else {
            this.scene.start('GameOverSceneCurriculo'); // Resposta incorreta
        }
    }

    update() {

    }
}

class GameOverSceneCurriculo extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverSceneCurriculo' });
    }

    preload() {
        // Carregando imagem de fundo 
        this.load.image('fundoGameOver', '../assets/gameover_curriculo.png');
    }

    create() {
        // Adicionar a imagem de fundo
        this.add.image(0, 0, 'fundoGameOver')
            .setOrigin(0, 0)
            .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        // Texto interativo para reiniciar o quiz
        const botaoReiniciar = this.add.text(300, 350, 'Clique aqui para reiniciar o quiz', {
            fontSize: '20px',
            fill: '#000',
            fontFamily: 'FontePadrao'
        })
            .setInteractive()
            .on('pointerdown', () => {
                perguntaAtual = 0;
                progresso = 0;
                this.scene.start('QuizVpPessoas');
            });
    }
}

// Cena de parabéns ao chegar ao final do quiz
class CongratulationsSceneCurriculoVpPessoas extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpPessoas' });
    }

    preload() {
        // Carregando imagem de fundo
        this.load.image('fundoCongratulationsVpPessoas', '../assets/parabens_cv_vpdepessoas.png');
    }

    create() {
        // Definindo uma imagem de fundo
        this.add.image(0, 0, 'fundoCongratulationsVpPessoas').setOrigin(0, 0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        const botaoVoltar = this.add.text(300, 350, 'Clique aqui para voltar para o Escritório', { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.switch('officeScene');
                this.cameras.main.fadeIn(1000);
                // Voltando para a cena principal
            });
    }
}