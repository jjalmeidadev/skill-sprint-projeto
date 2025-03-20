// Dados do Quiz VP Pessoas
const perguntasPessoas = [
    {
        pergunta: "O setor de Pessoas da Vivo valoriza currículos bem organizados e fáceis de ler. Qual das seguintes práticas melhora a estrutura do seu currículo?",
        alternativas: [
            "Usar parágrafos longos para descrever cada experiência.",
            "Utilizar marcadores para destacar conquistas e habilidades.",
            "Incluir informações detalhadas sobre sua vida pessoal.",
            "Adicionar todas as experiências desde o primeiro emprego, sem priorizar as mais recentes."
        ],
        correta: 1,
        feedback: "Pense novamente! Um currículo bem estruturado facilita a leitura e destaca suas conquistas de forma clara. Qual alternativa faz isso melhor?"
    },
    {
        pergunta: "Qual a importância de destacar soft skills no currículo?",
        alternativas: [
            "São irrelevantes, apenas habilidades técnicas importam.",
            "Demonstram como o candidato se adapta e interage no ambiente de trabalho.",
            "Devem ser listadas de forma genérica, sem exemplos práticos.",
            "Devem substituir as experiências profissionais."
        ],
        correta: 1,
        feedback: "Reflita! Soft skills mostram como você se relaciona e se adapta no trabalho. Qual alternativa destaca isso de forma mais eficaz?"
    },
    {
        pergunta: "Como adaptar o currículo para ser aprovado por um sistema ATS (Applicant Tracking System)?",
        alternativas: [
            "Usando palavras-chave da descrição da vaga.",
            "Criando um design altamente visual e colorido.",
            "Usando apenas tópicos genéricos sobre experiências.",
            "Evitando títulos claros para as seções."
        ],
        correta: 0,
        feedback: "Pense melhor! Sistemas ATS buscam palavras-chave específicas. Qual alternativa reflete essa necessidade?"
    },
    {
        pergunta: "O que é essencial para um currículo ser bem avaliado por um recrutador?",
        alternativas: [
            "Um layout sofisticado e cheio de imagens.",
            "Listar apenas experiências, sem detalhar conquistas.",
            "Destacar resultados e competências alinhadas à vaga.",
            "Usar um texto longo e detalhado para cada experiência."
        ],
        correta: 2,
        feedback: "Reflita! Recrutadores valorizam resultados e competências alinhadas à vaga. Qual alternativa destaca isso?"
    },
    {
        pergunta: "Qual erro pode prejudicar um candidato ao enviar um currículo?",
        alternativas: [
            "Usar um e-mail profissional no contato.",
            "Adaptar o currículo para cada vaga.",
            "Excluir informações de contato.",
            "Deixar informações desatualizadas ou incorretas."
        ],
        correta: 3,
        feedback: "Pense novamente! Informações desatualizadas ou incorretas podem prejudicar sua candidatura. Qual alternativa reflete isso?"
    }
];

// Dados do Quiz VP Estratégia
const perguntasEstrategia = [
    {
        pergunta: "A inteligência artificial é usada por sistemas de recrutamento (ATS) para filtrar currículos. Qual das seguintes abordagens ajuda seu currículo a ser bem classificado nesses sistemas?",
        alternativas: [
            "Inserir palavras-chave relevantes da vaga na seção de habilidades e experiência.",
            "Utilizar fontes decorativas e imagens para destacar sua personalidade.",
            "Escrever um currículo genérico sem adaptação para cada vaga.",
            "Enviar o currículo no corpo do e-mail ao invés de um arquivo estruturado."
        ],
        correta: 0,
        feedback: "Reflita! Sistemas ATS priorizam palavras-chave relevantes. Qual alternativa melhor atende a essa necessidade?"
    },
    {
        pergunta: "O que pode tornar um candidato mais atrativo para uma vaga estratégica?",
        alternativas: [
            "Demonstrar capacidade analítica e experiência em inovação.",
            "Usar um currículo sem foco e cheio de informações irrelevantes.",
            "Esconder experiências passadas para parecer mais flexível.",
            "Ignorar a personalização do currículo para cada oportunidade."
        ],
        correta: 0,
        feedback: "Pense novamente! Capacidade analítica e inovação são essenciais para vagas estratégicas. Qual alternativa destaca isso?"
    },
    {
        pergunta: "Como destacar projetos de inovação no currículo?",
        alternativas: [
            "Explicando a abordagem e os resultados obtidos.",
            "Apenas listando o nome dos projetos sem detalhes.",
            "Omitindo informações sobre desafios e aprendizados.",
            "Exagerando nos resultados para parecer mais impactante."
        ],
        correta: 0,
        feedback: "Reflita! Projetos de inovação devem ser claros e objetivos. Qual alternativa melhor descreve isso?"
    },
    {
        pergunta: "Qual habilidade é essencial para atuar em novos negócios e IA?",
        alternativas: [
            "Capacidade de adaptação e pensamento estratégico.",
            "Apenas habilidades operacionais sem visão de longo prazo.",
            "Criatividade sem aplicação prática.",
            "Exclusivamente experiência acadêmica sem prática no mercado."
        ],
        correta: 0,
        feedback: "Pense melhor! Adaptação e pensamento estratégico são cruciais. Qual alternativa reflete isso?"
    },
    {
        pergunta: "Como um candidato pode demonstrar conhecimento em inteligência artificial no currículo?",
        alternativas: [
            "Mencionando cursos, projetos e experiência na área.",
            "Apenas citando que tem interesse no assunto.",
            "Ignorando certificações para não parecer muito técnico.",
            "Evitando mencionar IA caso não tenha experiência direta."
        ],
        correta: 0,
        feedback: "Reflita! Cursos, projetos e experiência são fundamentais para demonstrar conhecimento. Qual alternativa destaca isso?"
    }
];

// Dados do Quiz VP Negócios
const perguntasNegocios = [
    {
        pergunta: "Você deseja atuar na VP de Negócios da Vivo e percebe que a vaga enfatiza habilidades analíticas e gestão de projetos. Como você pode personalizar seu currículo para aumentar suas chances?",
        alternativas: [
            "Destacar experiências passadas que demonstram suas habilidades analíticas e projetos liderados.",
            "Manter um currículo genérico para que sirva para qualquer vaga.",
            "Adicionar certificações e cursos, mesmo que não tenham relação com a vaga.",
            "Escrever experiências apenas com as funções desempenhadas, sem resultados obtidos."
        ],
        correta: 0,
        feedback: "Reflita! Destacar habilidades analíticas e projetos liderados é essencial. Qual alternativa reflete isso?"
    },
    {
        pergunta: "O que é essencial para um currículo focado em vendas e negócios?",
        alternativas: [
            "Destacar metas atingidas e impacto nos resultados.",
            "Apenas listar as empresas onde trabalhou sem detalhes.",
            "Usar um layout criativo sem estrutura clara.",
            "Omitir informações sobre clientes e mercado."
        ],
        correta: 0,
        feedback: "Pense novamente! Metas atingidas e impacto nos resultados são fundamentais. Qual alternativa reflete isso?"
    },
    {
        pergunta: "Como descrever a experiência em negociação e vendas no currículo?",
        alternativas: [
            "Demonstrando crescimento de receita e estratégias aplicadas.",
            "Apenas mencionando que trabalhou com vendas.",
            "Excluindo informações sobre indicadores de performance.",
            "Utilizando frases genéricas sem exemplos concretos."
        ],
        correta: 0,
        feedback: "Reflita! Crescimento de receita e estratégias aplicadas são essenciais. Qual alternativa reflete isso?"
    },
    {
        pergunta: "Qual erro pode prejudicar um candidato na área comercial ao montar seu currículo?",
        alternativas: [
            "Excluir números e métricas de performance.",
            "Destacar networking e relacionamento com clientes.",
            "Demonstrar experiência com estratégias de mercado.",
            "Incluir cases de sucesso relevantes."
        ],
        correta: 0,
        feedback: "Pense novamente! Números e métricas são fundamentais para demonstrar resultados. Qual alternativa reflete isso?"
    },
    {
        pergunta: "Qual é um diferencial para um currículo na área de negócios?",
        alternativas: [
            "Experiência em estratégias de crescimento e desenvolvimento de mercado.",
            "Listar apenas habilidades técnicas.",
            "Ignorar a importância de soft skills.",
            "Criar um currículo genérico sem adaptações para a vaga."
        ],
        correta: 0,
        feedback: "Reflita! Estratégias de crescimento e desenvolvimento de mercado são diferenciais. Qual alternativa reflete isso?"
    }
];

// Dados do Quiz VP Relações Institucionais
const perguntasRelacoes = [
    {
        pergunta: "Um currículo eficaz precisa de uma comunicação clara e objetiva. Qual das opções abaixo é a melhor forma de descrever uma experiência profissional?",
        alternativas: [
            '"Trabalhei na empresa X e fiz muitas atividades na área de marketing."',
            '"Responsável por marketing na empresa X, onde aumentei o engajamento digital em 40% por meio de campanhas estratégicas."',
            '"Atuei no setor de marketing, onde fazia postagens nas redes sociais."',
            '"Tenho experiência com marketing e sou uma pessoa criativa e proativa."'
        ],
        correta: 1,
        feedback: "Reflita! Descrever conquistas e resultados é essencial. Qual alternativa reflete isso?"
    },
    {
        pergunta: "Qual fator é mais relevante em um currículo para uma vaga em sustentabilidade?",
        alternativas: [
            "Experiência com projetos ESG e impacto social.",
            "Uso de palavras-chave sem relevância para a área.",
            "Apenas a formação acadêmica sem experiências práticas.",
            "Omitir participação em iniciativas ambientais."
        ],
        correta: 0,
        feedback: "Pense novamente! Projetos ESG e impacto social são altamente valorizados. Qual alternativa reflete isso?"
    },
    {
        pergunta: "Como destacar experiência com relações institucionais no currículo?",
        alternativas: [
            "Mencionando atuação com stakeholders e projetos de impacto.",
            "Apenas listando cargos sem descrição das atividades.",
            "Evitando detalhar parcerias estratégicas.",
            "Omitindo participação em políticas públicas e regulamentações."
        ],
        correta: 0,
        feedback: "Reflita! Atuação com stakeholders e projetos de impacto são essenciais. Qual alternativa reflete isso?"
    },
    {
        pergunta: "Qual das seguintes ações melhora um currículo para a área de sustentabilidade?",
        alternativas: [
            "Incluir certificações e especializações relevantes.",
            "Usar um layout poluído e desorganizado.",
            "Ignorar experiências de voluntariado e impacto social.",
            "Excluir informações sobre engajamento com ONGs."
        ],
        correta: 0,
        feedback: "Pense novamente! Certificações e especializações relevantes são diferenciais. Qual alternativa reflete isso?"
    },
    {
        pergunta: "O que um recrutador dessa área (VP de Relações Institucionais e Sustentabilidade) espera ver no currículo?",
        alternativas: [
            "Experiência com responsabilidade social e desenvolvimento sustentável.",
            "Apenas conhecimentos básicos sobre meio ambiente.",
            "Um currículo genérico, sem foco na área.",
            "Um documento com muitas páginas e informações irrelevantes."
        ],
        correta: 0,
        feedback: "Reflita! Experiência com responsabilidade social e desenvolvimento sustentável é essencial. Qual alternativa reflete isso?"
    }
];

// Dados do Quiz VP Tecnologia
const perguntasTecnologia = [
    {
        pergunta: "O design do seu currículo pode influenciar na forma como ele é lido pelos sistemas automatizados (ATS). Qual das opções abaixo representa a melhor prática?",
        alternativas: [
            "Usar tabelas e colunas para organizar informações de forma estilizada.",
            "Criar um currículo em formato de imagem ou PDF com elementos gráficos.",
            "Manter um layout limpo, com formatação simples e sem uso excessivo de cores ou gráficos.",
            "Utilizar fontes incomuns para destacar seu diferencial."
        ],
        correta: 2,
        feedback: "Pense novamente! Um layout limpo e simples é mais eficaz para sistemas ATS. Qual alternativa reflete isso?"
    },
    {
        pergunta: "Qual é um elemento essencial para um currículo na área de TI?",
        alternativas: [
            "Projetos desenvolvidos e conhecimento em tecnologias específicas.",
            "Apenas a lista de empresas onde trabalhou.",
            "Um design extremamente visual e sem estrutura clara.",
            "Ignorar certificações para focar apenas em experiência prática."
        ],
        correta: 0,
        feedback: "Reflita! Projetos desenvolvidos e conhecimento em tecnologias específicas são essenciais. Qual alternativa reflete isso?"
    },
    {
        pergunta: "Como um profissional de TI pode demonstrar experiência prática no currículo?",
        alternativas: [
            "Destacando projetos, certificações e metodologias utilizadas.",
            "Apenas mencionando que tem habilidades técnicas.",
            "Omitindo informações sobre ferramentas e tecnologias.",
            "Evitando links para portfólios ou GitHub."
        ],
        correta: 0,
        feedback: "Pense novamente! Projetos, certificações e metodologias são fundamentais. Qual alternativa reflete isso?"
    },
    {
        pergunta: "Qual a melhor maneira de destacar conhecimento em cibersegurança no currículo?",
        alternativas: [
            "Citando certificações como CISSP e projetos na área.",
            "Apenas mencionando interesse no tema.",
            "Excluindo informações sobre vulnerabilidades tratadas.",
            "Usando frases vagas sem comprovação de conhecimento."
        ],
        correta: 0,
        feedback: "Reflita! Certificações e projetos são essenciais para destacar conhecimento. Qual alternativa reflete isso?"
    },
    {
        pergunta: "Qual erro deve ser evitado ao criar um currículo para a área de TI?",
        alternativas: [
            "Listar todas as tecnologias já utilizadas sem organização.",
            "Incluir certificações e cursos relevantes.",
            "Organizar a experiência de forma cronológica e clara.",
            "Excluir informações sobre impacto dos projetos."
        ],
        correta: 0,
        feedback: "Pense novamente! Listar tecnologias sem organização torna o currículo confuso. Qual alternativa reflete isso?"
    }
];

// Variáveis globais
let perguntaAtual = 0;
let progresso = 0;
let pontuacao = 0;
const TEMPO_POR_PERGUNTA = 30; // Segundos para responder
let tempoRestante = TEMPO_POR_PERGUNTA;
let temporizador;

// Classe para a cena inicial do currículo
class CurriculoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'curriculoScene' });
        this.currentBackground = 'background';
        this.canMove = true;
    }

    preload() {
        // Carrega as imagens
        this.load.image('primeiraTela', '../assets/primeiraTela.png');
        this.load.image('botao01', '../assets/botao_vp_pessoas.png');
        this.load.image('botao02', '../assets/botao_vp_estrategia.png');
        this.load.image('botao03', '../assets/botao_vp_negocios.png');
        this.load.image('botao04', '../assets/botao_vp_relacoes.png');
        this.load.image('botao05', '../assets/botao_vp_tecnologia.png');

        // Carrega a fonte
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
    }

    create() {
        var width = 1520;
        var height = 753;

        // Imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'primeiraTela');

        // Ajusta a escala para cobrir a tela mantendo a proporção
        this.scaleBackgroundImage(fundo);

        // Botão interativo com animação (fase Pessoas)
        const botaoVpPessoas = this.add.image(
            width - 1020, height - 370,
            'botao01'
        ).setInteractive();

        botaoVpPessoas.on('pointerout', () => {
            botaoVpPessoas.setScale(1);
        });

        // Efeito de piscar ao clicar
        botaoVpPessoas.on('pointerdown', () => {
            this.tweens.add({
                targets: botaoVpPessoas,
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Fade out na câmera
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpPessoas');
                    });
                }
            });
        });

        // Botão interativo com animação (fase Estratégia)
        const botaoVpEstrategia = this.add.image(
            width - 750, height - 370,
            'botao02'
        ).setInteractive();

        botaoVpEstrategia.on('pointerout', () => {
            botaoVpEstrategia.setScale(1);
        });

        // Efeito de piscar ao clicar
        botaoVpEstrategia.on('pointerdown', () => {
            this.tweens.add({
                targets: botaoVpEstrategia,
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Fade out na câmera
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpEstrategia');
                    });
                }
            });
        });

        // Botão interativo com animação (fase Negócios)
        const botaoVpNegocios = this.add.image(
            width - 480, height - 370,
            'botao03'
        ).setInteractive();

        botaoVpNegocios.on('pointerout', () => {
            botaoVpNegocios.setScale(1);
        });

        // Efeito de piscar ao clicar
        botaoVpNegocios.on('pointerdown', () => {
            this.tweens.add({
                targets: botaoVpNegocios,
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Fade out na câmera
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpNegocios');
                    });
                }
            });
        });

        // Botão interativo com animação (fase Relações)
        const botaoVpRelacoes = this.add.image(
            width - 1020, height - 270,
            'botao04'
        ).setInteractive();

        botaoVpRelacoes.on('pointerout', () => {
            botaoVpRelacoes.setScale(1);
        });

        // Efeito de piscar ao clicar
        botaoVpRelacoes.on('pointerdown', () => {
            this.tweens.add({
                targets: botaoVpRelacoes,
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Fade out na câmera
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpRelacoes');
                    });
                }
            });
        });

        // Botão interativo com animação (fase Tecnologia)
        const botaoVpTecnologia = this.add.image(
            width - 750, height - 270,
            'botao05'
        ).setInteractive();

        botaoVpTecnologia.on('pointerout', () => {
            botaoVpTecnologia.setScale(1);
        });

        // Efeito de piscar ao clicar
        botaoVpTecnologia.on('pointerdown', () => {
            this.tweens.add({
                targets: botaoVpTecnologia,
                alpha: 0.6,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Fade out na câmera
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.start('QuizVpTecnologia');
                    });
                }
            });
        });

    }

    // Método para ajustar a escala da imagem de fundo
    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }
}

// Classe para a cena do Quiz
class QuizVpPessoas extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizVpPessoas' });
        this.textosPergunta = []; // Armazena os textos da pergunta e alternativas
        this.botoesAlternativas = []; // Armazena os botões das alternativas
    }

    preload() {
        // Carrega os recursos para o quiz
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('TelaQuiz', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Adicionar a imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'TelaQuiz');
        this.scaleBackgroundImage(fundo);

        // Criar elementos de interface
        this.criarBarraProgresso();
        this.criarContadorPergunta();
        this.mostrarPergunta();
    }

    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

    criarContadorPergunta() {
        // Mostrar número da pergunta atual/total
        this.textoPerguntaNumero = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Pergunta ${perguntaAtual + 1}/${perguntasPessoas.length}`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao' }
        ).setOrigin(0.5);
    }

    criarBarraProgresso() {
        // Container para a barra de progresso
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progresso roxa    
        this.barraProgresso = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progresso    
        this.textoProgresso = this.add.text(
            420,
            50,
            `${progresso}%`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    atualizarBarraProgresso() {
        // Atualizando a barra de progresso do quiz
        const larguraMaxima = 296;
        const novaLargura = (progresso / 100) * larguraMaxima;

        // Animar a barra de progresso
        this.tweens.add({
            targets: this.barraProgresso,
            width: novaLargura,
            duration: 500,
            ease: 'Power2'
        });

        this.textoProgresso.setText(`${progresso}%`);
    }

    limparElementos() {
        // Remove os textos da pergunta e alternativas
        this.textosPergunta.forEach(texto => texto.destroy());
        this.textosPergunta = [];

        // Remove os botões das alternativas
        this.botoesAlternativas.forEach(botao => botao.destroy());
        this.botoesAlternativas = [];
    }

    mostrarPergunta() {
        // Limpa os elementos antigos
        this.limparElementos();

        // Atualiza o contador de perguntas
        this.textoPerguntaNumero.setText(`Pergunta ${perguntaAtual + 1}/${perguntasPessoas.length}`);

        const pergunta = perguntasPessoas[perguntaAtual];

        // Exibindo a pergunta
        const textoPergunta = this.add.text(
            this.sys.game.config.width / 2,
            100,
            pergunta.pergunta,
            {
                fontSize: '22px',
                fill: '#B600B9',
                fontFamily: 'FontePadrao',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.textosPergunta.push(textoPergunta);

        // Exibindo alternativas
        const startY = 200;
        const spacing = 50;

        pergunta.alternativas.forEach((alternativa, index) => {
            // Container da alternativa (retângulo)
            const botaoContainer = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                this.sys.game.config.width - 200,
                50,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            botaoContainer.on('pointerover', () => {
                botaoContainer.fillColor = 0xDDDDDD;
                botaoContainer.setScale(1.02);
            });

            botaoContainer.on('pointerout', () => {
                botaoContainer.fillColor = 0xEAE8E8;
                botaoContainer.setScale(1);
            });

            // Evento de clique
            botaoContainer.on('pointerdown', () => {
                this.verificarResposta(index, botaoContainer);
            });

            // Texto da alternativa
            const textoAlternativa = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                `${index + 1}. ${alternativa}`,
                {
                    fontSize: '18px',
                    fill: '#000',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 220 }
                }
            ).setOrigin(0.5);

            this.textosPergunta.push(textoAlternativa);
            this.botoesAlternativas.push(botaoContainer);
        });
    }

    verificarResposta(resposta, botaoClicado) {
        // Desativar interação com todos os botões
        this.botoesAlternativas.forEach(botao => {
            botao.disableInteractive();
        });

        const pergunta = perguntasPessoas[perguntaAtual]; // Substitua por perguntasEstrategia, perguntasNegocios, etc., conforme a cena

        if (resposta === pergunta.correta) {
            // Resposta correta
            botaoClicado.fillColor = 0x88FF88; // Verde claro

            // Atualizar pontuação e progresso
            pontuacao += 100; // Pontuação fixa por resposta correta
            progresso += 20;

            // Esperar um momento antes de seguir
            this.time.delayedCall(1500, () => {
                perguntaAtual++;
                this.atualizarBarraProgresso();

                if (perguntaAtual < perguntasPessoas.length) {
                    // Próxima pergunta com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.mostrarPergunta();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpPessoas', { pontuacao: pontuacao });
                }
            });
        } else {
            // Resposta incorreta
            botaoClicado.fillColor = 0xFF8888; // Vermelho claro

            // Exibir feedback explicativo
            const feedbackText = this.add.text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height / 2 + 50,
                pergunta.feedback, // Adicione a propriedade `feedback` ao objeto da pergunta
                {
                    fontSize: '20px',
                    fill: '#FF888',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 100 },
                    align: 'center'
                }
            ).setOrigin(0.5);

            // Esperar um momento antes de permitir nova tentativa
            this.time.delayedCall(3000, () => {
                feedbackText.destroy(); // Remove o feedback
                this.mostrarPergunta(); // Volta para a mesma pergunta
            });
        }
    }
}

// // Classe para a cena de Game Over
// class GameOverSceneCurriculo extends Phaser.Scene {
//     constructor() {
//         super({ key: 'GameOverSceneCurriculo' });
//     }

//     init(data) {
//         this.motivoGameOver = data.motivo || 'errou';
//     }

//     preload() {
//         // Carregando recursos
//         this.load.image('fundoGameOver', '../assets/gameover_curriculo.png');
//     }

//     create() {
//         // Transição de entrada
//         this.cameras.main.fadeIn(1000, 0, 0, 0);

//         // Imagem de fundo sem distorção
//         const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoGameOver');
//         this.scaleBackgroundImage(fundo);

//         // Botão de texto para reiniciar
//         const botaoReiniciar = this.add.rectangle(
//             this.sys.game.config.width / 2,
//             510,
//             250,
//             60,
//             0xB600B9
//         ).setStrokeStyle(2, 0x880088)
//             .setInteractive();

//         // Efeitos do botão
//         botaoReiniciar.on('pointerover', () => {
//             botaoReiniciar.fillColor = 0xC30DC7;
//             botaoReiniciar.setScale(1.05);
//         });

//         botaoReiniciar.on('pointerout', () => {
//             botaoReiniciar.fillColor = 0xB600B9;
//             botaoReiniciar.setScale(1);
//         });

//         // Evento de clique
//         botaoReiniciar.on('pointerdown', () => {
//             // Efeito de click
//             this.tweens.add({
//                 targets: botaoReiniciar,
//                 scale: 0.95,
//                 duration: 100,
//                 yoyo: true,
//                 onComplete: () => {
//                     // Reiniciar variáveis
//                     perguntaAtual = 0;
//                     progresso = 0;
//                     pontuacao = 0;

//                     // Fade out e iniciar o quiz
//                     this.cameras.main.fadeOut(500, 0, 0, 0, () => {
//                         this.scene.start('QuizVpPessoas');
//                     });
//                 }
//             });
//         });

//         // Texto do botão
//         this.add.text(
//             this.sys.game.config.width / 2,
//             510,
//             'TENTAR NOVAMENTE',
//             {
//                 fontSize: '22px',
//                 fill: '#FFF',
//                 fontFamily: 'FontePadrao'
//             }
//         ).setOrigin(0.5);
//     }

//     scaleBackgroundImage(image) {
//         // Centraliza a imagem
//         image.setOrigin(0.5);

//         // Mantém a proporção e cobre a tela
//         const scaleX = this.cameras.main.width / image.width;
//         const scaleY = this.cameras.main.height / image.height;
//         const scale = Math.max(scaleX, scaleY);
//         image.setScale(scale);
//     }
// }

// Classe para a cena de parabéns
class CongratulationsSceneCurriculoVpPessoas extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpPessoas' });
    }

    init(data) {
        this.pontuacaoFinal = data.pontuacao || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('fundoCongratulationsVpPessoas', '../assets/parabens_cv_vpdepessoas.png');
    }

    create() {
        // Transição de entrada com efeito
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoCongratulationsVpPessoas');
        this.scaleBackgroundImage(fundo);

        // Botão de texto para voltar
        const botaoVoltar = this.add.rectangle(
            this.sys.game.config.width / 2,
            510,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        botaoVoltar.on('pointerover', () => {
            botaoVoltar.fillColor = 0xC30DC7;
            botaoVoltar.setScale(1.05);
        });

        botaoVoltar.on('pointerout', () => {
            botaoVoltar.fillColor = 0xB600B9;
            botaoVoltar.setScale(1);
        });

        // Evento de clique
        botaoVoltar.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: botaoVoltar,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    perguntaAtual = 0;
                    progresso = 0;
                    pontuacao = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.switch('officeScene');
                    });
                }
            });
        });

        // Texto do botão
        this.add.text(
            this.sys.game.config.width / 2,
            510,
            'VOLTAR AO ESCRITÓRIO',
            {
                fontSize: '22px',
                fill: '#000',
                fontFamily: 'FontePadrao'
            }
        ).setOrigin(0.5);
    }



    // Complete the scaleBackgroundImage method
    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

}

// Classe para a cena do Quiz de Estratégia
class QuizVpEstrategia extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizVpEstrategia' });
        this.textosPergunta = []; // Armazena os textos da pergunta e alternativas
        this.botoesAlternativas = []; // Armazena os botões das alternativas
    }

    preload() {
        // Carrega os recursos para o quiz
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('TelaQuiz', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Adicionar a imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'TelaQuiz');
        this.scaleBackgroundImage(fundo);

        // Criar elementos de interface
        this.criarBarraProgresso();
        this.criarContadorPergunta();
        this.mostrarPergunta();
    }

    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

    criarContadorPergunta() {
        // Mostrar número da pergunta atual/total
        this.textoPerguntaNumero = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Pergunta ${perguntaAtual + 1}/${perguntasEstrategia.length}`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao' }
        ).setOrigin(0.5);
    }

    criarBarraProgresso() {
        // Container para a barra de progresso
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progresso roxa    
        this.barraProgresso = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progresso    
        this.textoProgresso = this.add.text(
            420,
            50,
            `${progresso}%`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    atualizarBarraProgresso() {
        // Atualizando a barra de progresso do quiz
        const larguraMaxima = 296;
        const novaLargura = (progresso / 100) * larguraMaxima;

        // Animar a barra de progresso
        this.tweens.add({
            targets: this.barraProgresso,
            width: novaLargura,
            duration: 500,
            ease: 'Power2'
        });

        this.textoProgresso.setText(`${progresso}%`);
    }

    limparElementos() {
        // Remove os textos da pergunta e alternativas
        this.textosPergunta.forEach(texto => texto.destroy());
        this.textosPergunta = [];

        // Remove os botões das alternativas
        this.botoesAlternativas.forEach(botao => botao.destroy());
        this.botoesAlternativas = [];
    }

    mostrarPergunta() {
        // Limpa os elementos antigos
        this.limparElementos();

        // Atualiza o contador de perguntas
        this.textoPerguntaNumero.setText(`Pergunta ${perguntaAtual + 1}/${perguntasEstrategia.length}`);

        const pergunta = perguntasEstrategia[perguntaAtual];

        // Exibindo a pergunta
        const textoPergunta = this.add.text(
            this.sys.game.config.width / 2,
            100,
            pergunta.pergunta,
            {
                fontSize: '22px',
                fill: '#B600B9',
                fontFamily: 'FontePadrao',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.textosPergunta.push(textoPergunta);

        // Exibindo alternativas
        const startY = 200;
        const spacing = 50;

        pergunta.alternativas.forEach((alternativa, index) => {
            // Container da alternativa (retângulo)
            const botaoContainer = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                this.sys.game.config.width - 200,
                50,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            botaoContainer.on('pointerover', () => {
                botaoContainer.fillColor = 0xDDDDDD;
                botaoContainer.setScale(1.02);
            });

            botaoContainer.on('pointerout', () => {
                botaoContainer.fillColor = 0xEAE8E8;
                botaoContainer.setScale(1);
            });

            // Evento de clique
            botaoContainer.on('pointerdown', () => {
                this.verificarResposta(index, botaoContainer);
            });

            // Texto da alternativa
            const textoAlternativa = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                `${index + 1}. ${alternativa}`,
                {
                    fontSize: '18px',
                    fill: '#000',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 220 }
                }
            ).setOrigin(0.5);

            this.textosPergunta.push(textoAlternativa);
            this.botoesAlternativas.push(botaoContainer);
        });
    }

    verificarResposta(resposta, botaoClicado) {
        // Desativar interação com todos os botões
        this.botoesAlternativas.forEach(botao => {
            botao.disableInteractive();
        });

        const pergunta = perguntasEstrategia[perguntaAtual];

        if (resposta === pergunta.correta) {
            // Resposta correta
            botaoClicado.fillColor = 0x88FF88; // Verde claro

            // Atualizar pontuação e progresso
            pontuacao += 100; // Pontuação fixa por resposta correta
            progresso += 20;

            // Esperar um momento antes de seguir
            this.time.delayedCall(1500, () => {
                perguntaAtual++;
                this.atualizarBarraProgresso();

                if (perguntaAtual < perguntasEstrategia.length) {
                    // Próxima pergunta com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.mostrarPergunta();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpEstrategia', { pontuacao: pontuacao });
                }
            });
        } else {
            // Resposta incorreta
            botaoClicado.fillColor = 0xFF8888; // Vermelho claro

            // Exibir feedback explicativo
            const feedbackText = this.add.text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height / 2 + 50,
                pergunta.feedback, // Adicione a propriedade `feedback` ao objeto da pergunta
                {
                    fontSize: '20px',
                    fill: '#FF888',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 100 },
                    align: 'center'
                }
            ).setOrigin(0.5);

            // Esperar um momento antes de permitir nova tentativa
            this.time.delayedCall(3000, () => {
                feedbackText.destroy(); // Remove o feedback
                this.mostrarPergunta(); // Volta para a mesma pergunta
            });
        }
    }
}

// // Classe para a cena de Game Over de Estratégia
// class GameOverSceneCurriculoEstrategia extends Phaser.Scene {
//     constructor() {
//         super({ key: 'GameOverSceneCurriculoEstrategia' });
//     }

//     init(data) {
//         this.motivoGameOver = data.motivo || 'errou';
//     }

//     preload() {
//         // Carregando recursos
//         this.load.image('fundoGameOver', '../assets/gameover_curriculo.png');
//     }

//     create() {
//         // Transição de entrada
//         this.cameras.main.fadeIn(1000, 0, 0, 0);

//         // Imagem de fundo sem distorção
//         const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoGameOver');
//         this.scaleBackgroundImage(fundo);

//         // Botão de texto para reiniciar
//         const botaoReiniciar = this.add.rectangle(
//             this.sys.game.config.width / 2,
//             510,
//             250,
//             60,
//             0xB600B9
//         ).setStrokeStyle(2, 0x880088)
//             .setInteractive();

//         // Efeitos do botão
//         botaoReiniciar.on('pointerover', () => {
//             botaoReiniciar.fillColor = 0xC30DC7;
//             botaoReiniciar.setScale(1.05);
//         });

//         botaoReiniciar.on('pointerout', () => {
//             botaoReiniciar.fillColor = 0xB600B9;
//             botaoReiniciar.setScale(1);
//         });

//         // Evento de clique
//         botaoReiniciar.on('pointerdown', () => {
//             // Efeito de click
//             this.tweens.add({
//                 targets: botaoReiniciar,
//                 scale: 0.95,
//                 duration: 100,
//                 yoyo: true,
//                 onComplete: () => {
//                     // Reiniciar variáveis
//                     perguntaAtual = 0;
//                     progresso = 0;
//                     pontuacao = 0;

//                     // Fade out e iniciar o quiz
//                     this.cameras.main.fadeOut(500, 0, 0, 0, () => {
//                         this.scene.start('QuizVpEstrategia');
//                     });
//                 }
//             });
//         });

//         // Texto do botão
//         this.add.text(
//             this.sys.game.config.width / 2,
//             510,
//             'TENTAR NOVAMENTE',
//             {
//                 fontSize: '22px',
//                 fill: '#FFF',
//                 fontFamily: 'FontePadrao'
//             }
//         ).setOrigin(0.5);
//     }

//     scaleBackgroundImage(image) {
//         // Centraliza a imagem
//         image.setOrigin(0.5);

//         // Mantém a proporção e cobre a tela
//         const scaleX = this.cameras.main.width / image.width;
//         const scaleY = this.cameras.main.height / image.height;
//         const scale = Math.max(scaleX, scaleY);
//         image.setScale(scale);
//     }
// }

// Classe para a cena de parabéns de Estratégia
class CongratulationsSceneCurriculoVpEstrategia extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpEstrategia' });
    }

    init(data) {
        this.pontuacaoFinal = data.pontuacao || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('fundoCongratulationsVpEstrategia', '../assets/parabens_cv_vpdeestrategia.png');
    }

    create() {
        // Transição de entrada com efeito
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoCongratulationsVpEstrategia');
        this.scaleBackgroundImage(fundo);

        // Botão de texto para voltar
        const botaoVoltar = this.add.rectangle(
            width / 2,
            height - 210,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        botaoVoltar.on('pointerover', () => {
            botaoVoltar.fillColor = 0xC30DC7;
            botaoVoltar.setScale(1.05);
        });

        botaoVoltar.on('pointerout', () => {
            botaoVoltar.fillColor = 0xB600B9;
            botaoVoltar.setScale(1);
        });

        // Evento de clique
        botaoVoltar.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: botaoVoltar,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    perguntaAtual = 0;
                    progresso = 0;
                    pontuacao = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.switch('officeScene');
                    });
                }
            });
        });

        // Texto do botão
        this.add.text(
            width / 2,
            height - 210,
            'VOLTAR AO ESCRITÓRIO',
            {
                fontSize: '22px',
                fill: '#000',
                fontFamily: 'FontePadrao'
            }
        ).setOrigin(0.5);
    }
    // Complete the scaleBackgroundImage method
    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

}

// Classe para a cena do Quiz de Negócios
class QuizVpNegocios extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizVpNegocios' });
        this.textosPergunta = []; // Armazena os textos da pergunta e alternativas
        this.botoesAlternativas = []; // Armazena os botões das alternativas
    }

    preload() {
        // Carrega os recursos para o quiz
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('TelaQuiz', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Adicionar a imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'TelaQuiz');
        this.scaleBackgroundImage(fundo);

        // Criar elementos de interface
        this.criarBarraProgresso();
        this.criarContadorPergunta();
        this.mostrarPergunta();
    }

    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

    criarContadorPergunta() {
        // Mostrar número da pergunta atual/total
        this.textoPerguntaNumero = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Pergunta ${perguntaAtual + 1}/${perguntasNegocios.length}`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao' }
        ).setOrigin(0.5);
    }

    criarBarraProgresso() {
        // Container para a barra de progresso
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progresso roxa    
        this.barraProgresso = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progresso    
        this.textoProgresso = this.add.text(
            420,
            50,
            `${progresso}%`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    atualizarBarraProgresso() {
        // Atualizando a barra de progresso do quiz
        const larguraMaxima = 296;
        const novaLargura = (progresso / 100) * larguraMaxima;

        // Animar a barra de progresso
        this.tweens.add({
            targets: this.barraProgresso,
            width: novaLargura,
            duration: 500,
            ease: 'Power2'
        });

        this.textoProgresso.setText(`${progresso}%`);
    }

    limparElementos() {
        // Remove os textos da pergunta e alternativas
        this.textosPergunta.forEach(texto => texto.destroy());
        this.textosPergunta = [];

        // Remove os botões das alternativas
        this.botoesAlternativas.forEach(botao => botao.destroy());
        this.botoesAlternativas = [];
    }

    mostrarPergunta() {
        // Limpa os elementos antigos
        this.limparElementos();

        // Atualiza o contador de perguntas
        this.textoPerguntaNumero.setText(`Pergunta ${perguntaAtual + 1}/${perguntasNegocios.length}`);

        const pergunta = perguntasNegocios[perguntaAtual];

        // Exibindo a pergunta
        const textoPergunta = this.add.text(
            this.sys.game.config.width / 2,
            100,
            pergunta.pergunta,
            {
                fontSize: '22px',
                fill: '#B600B9',
                fontFamily: 'FontePadrao',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.textosPergunta.push(textoPergunta);

        // Exibindo alternativas
        const startY = 200;
        const spacing = 50;

        pergunta.alternativas.forEach((alternativa, index) => {
            // Container da alternativa (retângulo)
            const botaoContainer = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                this.sys.game.config.width - 200,
                50,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            botaoContainer.on('pointerover', () => {
                botaoContainer.fillColor = 0xDDDDDD;
                botaoContainer.setScale(1.02);
            });

            botaoContainer.on('pointerout', () => {
                botaoContainer.fillColor = 0xEAE8E8;
                botaoContainer.setScale(1);
            });

            // Evento de clique
            botaoContainer.on('pointerdown', () => {
                this.verificarResposta(index, botaoContainer);
            });

            // Texto da alternativa
            const textoAlternativa = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                `${index + 1}. ${alternativa}`,
                {
                    fontSize: '18px',
                    fill: '#000',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 220 }
                }
            ).setOrigin(0.5);

            this.textosPergunta.push(textoAlternativa);
            this.botoesAlternativas.push(botaoContainer);
        });
    }

    verificarResposta(resposta, botaoClicado) {
        // Desativar interação com todos os botões
        this.botoesAlternativas.forEach(botao => {
            botao.disableInteractive();
        });

        const pergunta = perguntasNegocios[perguntaAtual];

        if (resposta === pergunta.correta) {
            // Resposta correta
            botaoClicado.fillColor = 0x88FF88; // Verde claro

            // Atualizar pontuação e progresso
            pontuacao += 100; // Pontuação fixa por resposta correta
            progresso += 20;

            // Esperar um momento antes de seguir
            this.time.delayedCall(1500, () => {
                perguntaAtual++;
                this.atualizarBarraProgresso();

                if (perguntaAtual < perguntasNegocios.length) {
                    // Próxima pergunta com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.mostrarPergunta();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpNegocios', { pontuacao: pontuacao });
                }
            });
        } else {
            // Resposta incorreta
            botaoClicado.fillColor = 0xFF8888; // Vermelho claro

            // Exibir feedback explicativo
            const feedbackText = this.add.text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height / 2 + 50,
                pergunta.feedback, // Adicione a propriedade `feedback` ao objeto da pergunta
                {
                    fontSize: '20px',
                    fill: '#FF888',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 100 },
                    align: 'center'
                }
            ).setOrigin(0.5);

            // Esperar um momento antes de permitir nova tentativa
            this.time.delayedCall(3000, () => {
                feedbackText.destroy(); // Remove o feedback
                this.mostrarPergunta(); // Volta para a mesma pergunta
            });
        }
    }
}

// // Classe para a cena de Game Over de Negócios
// class GameOverSceneCurriculoNegocios extends Phaser.Scene {
//     constructor() {
//         super({ key: 'GameOverSceneCurriculoNegocios' });
//     }

//     init(data) {
//         this.motivoGameOver = data.motivo || 'errou';
//     }

//     preload() {
//         // Carregando recursos
//         this.load.image('fundoGameOver', '../assets/gameover_curriculo.png');
//     }

//     create() {
//         // Transição de entrada
//         this.cameras.main.fadeIn(1000, 0, 0, 0);

//         // Imagem de fundo sem distorção
//         const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoGameOver');
//         this.scaleBackgroundImage(fundo);

//         // Botão de texto para reiniciar
//         const botaoReiniciar = this.add.rectangle(
//             this.sys.game.config.width / 2,
//             510,
//             250,
//             60,
//             0xB600B9
//         ).setStrokeStyle(2, 0x880088)
//             .setInteractive();

//         // Efeitos do botão
//         botaoReiniciar.on('pointerover', () => {
//             botaoReiniciar.fillColor = 0xC30DC7;
//             botaoReiniciar.setScale(1.05);
//         });

//         botaoReiniciar.on('pointerout', () => {
//             botaoReiniciar.fillColor = 0xB600B9;
//             botaoReiniciar.setScale(1);
//         });

//         // Evento de clique
//         botaoReiniciar.on('pointerdown', () => {
//             // Efeito de click
//             this.tweens.add({
//                 targets: botaoReiniciar,
//                 scale: 0.95,
//                 duration: 100,
//                 yoyo: true,
//                 onComplete: () => {
//                     // Reiniciar variáveis
//                     perguntaAtual = 0;
//                     progresso = 0;
//                     pontuacao = 0;

//                     // Fade out e iniciar o quiz
//                     this.cameras.main.fadeOut(500, 0, 0, 0, () => {
//                         this.scene.start('QuizVpNegocios');
//                     });
//                 }
//             });
//         });

//         // Texto do botão
//         this.add.text(
//             this.sys.game.config.width / 2,
//             510,
//             'TENTAR NOVAMENTE',
//             {
//                 fontSize: '22px',
//                 fill: '#FFF',
//                 fontFamily: 'FontePadrao'
//             }
//         ).setOrigin(0.5);
//     }

//     scaleBackgroundImage(image) {
//         // Centraliza a imagem
//         image.setOrigin(0.5);

//         // Mantém a proporção e cobre a tela
//         const scaleX = this.cameras.main.width / image.width;
//         const scaleY = this.cameras.main.height / image.height;
//         const scale = Math.max(scaleX, scaleY);
//         image.setScale(scale);
//     }
// }

// Classe para a cena de parabéns de Negócios
class CongratulationsSceneCurriculoVpNegocios extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpNegocios' });
    }

    init(data) {
        this.pontuacaoFinal = data.pontuacao || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('fundoCongratulationsVpNegocios', '../assets/parabens_cv_vpdenegocios.png');
    }

    create() {
        // Transição de entrada com efeito
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoCongratulationsVpNegocios');
        this.scaleBackgroundImage(fundo);

        // Botão de texto para voltar
        const botaoVoltar = this.add.rectangle(
            this.sys.game.config.width / 2,
            510,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        botaoVoltar.on('pointerover', () => {
            botaoVoltar.fillColor = 0xC30DC7;
            botaoVoltar.setScale(1.05);
        });

        botaoVoltar.on('pointerout', () => {
            botaoVoltar.fillColor = 0xB600B9;
            botaoVoltar.setScale(1);
        });

        // Evento de clique
        botaoVoltar.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: botaoVoltar,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    perguntaAtual = 0;
                    progresso = 0;
                    pontuacao = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.switch('officeScene');
                    });
                }
            });
        });

        // Texto do botão
        this.add.text(
            this.sys.game.config.width / 2,
            510,
            'VOLTAR AO ESCRITÓRIO',
            {
                fontSize: '22px',
                fill: '#000',
                fontFamily: 'FontePadrao'
            }
        ).setOrigin(0.5);
    }
    // Complete the scaleBackgroundImage method
    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

}

// Classe para a cena do Quiz de Relações
class QuizVpRelacoes extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizVpRelacoes' });
        this.textosPergunta = []; // Armazena os textos da pergunta e alternativas
        this.botoesAlternativas = []; // Armazena os botões das alternativas
    }

    preload() {
        // Carrega os recursos para o quiz
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('TelaQuiz', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Adicionar a imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'TelaQuiz');
        this.scaleBackgroundImage(fundo);

        // Criar elementos de interface
        this.criarBarraProgresso();
        this.criarContadorPergunta();
        this.mostrarPergunta();
    }

    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

    criarContadorPergunta() {
        // Mostrar número da pergunta atual/total
        this.textoPerguntaNumero = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Pergunta ${perguntaAtual + 1}/${perguntasRelacoes.length}`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao' }
        ).setOrigin(0.5);
    }

    criarBarraProgresso() {
        // Container para a barra de progresso
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progresso roxa    
        this.barraProgresso = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progresso    
        this.textoProgresso = this.add.text(
            420,
            50,
            `${progresso}%`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    atualizarBarraProgresso() {
        // Atualizando a barra de progresso do quiz
        const larguraMaxima = 296;
        const novaLargura = (progresso / 100) * larguraMaxima;

        // Animar a barra de progresso
        this.tweens.add({
            targets: this.barraProgresso,
            width: novaLargura,
            duration: 500,
            ease: 'Power2'
        });

        this.textoProgresso.setText(`${progresso}%`);
    }

    limparElementos() {
        // Remove os textos da pergunta e alternativas
        this.textosPergunta.forEach(texto => texto.destroy());
        this.textosPergunta = [];

        // Remove os botões das alternativas
        this.botoesAlternativas.forEach(botao => botao.destroy());
        this.botoesAlternativas = [];
    }

    mostrarPergunta() {
        // Limpa os elementos antigos
        this.limparElementos();

        // Atualiza o contador de perguntas
        this.textoPerguntaNumero.setText(`Pergunta ${perguntaAtual + 1}/${perguntasRelacoes.length}`);

        const pergunta = perguntasRelacoes[perguntaAtual];

        // Exibindo a pergunta
        const textoPergunta = this.add.text(
            this.sys.game.config.width / 2,
            100,
            pergunta.pergunta,
            {
                fontSize: '22px',
                fill: '#B600B9',
                fontFamily: 'FontePadrao',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.textosPergunta.push(textoPergunta);

        // Exibindo alternativas
        const startY = 200;
        const spacing = 50;

        pergunta.alternativas.forEach((alternativa, index) => {
            // Container da alternativa (retângulo)
            const botaoContainer = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                this.sys.game.config.width - 200,
                50,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            botaoContainer.on('pointerover', () => {
                botaoContainer.fillColor = 0xDDDDDD;
                botaoContainer.setScale(1.02);
            });

            botaoContainer.on('pointerout', () => {
                botaoContainer.fillColor = 0xEAE8E8;
                botaoContainer.setScale(1);
            });

            // Evento de clique
            botaoContainer.on('pointerdown', () => {
                this.verificarResposta(index, botaoContainer);
            });

            // Texto da alternativa
            const textoAlternativa = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                `${index + 1}. ${alternativa}`,
                {
                    fontSize: '18px',
                    fill: '#000',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 220 }
                }
            ).setOrigin(0.5);

            this.textosPergunta.push(textoAlternativa);
            this.botoesAlternativas.push(botaoContainer);
        });
    }

    verificarResposta(resposta, botaoClicado) {
        // Desativar interação com todos os botões
        this.botoesAlternativas.forEach(botao => {
            botao.disableInteractive();
        });

        const pergunta = perguntasRelacoes[perguntaAtual];

        if (resposta === pergunta.correta) {
            // Resposta correta
            botaoClicado.fillColor = 0x88FF88; // Verde claro

            // Atualizar pontuação e progresso
            pontuacao += 100; // Pontuação fixa por resposta correta
            progresso += 20;

            // Esperar um momento antes de seguir
            this.time.delayedCall(1500, () => {
                perguntaAtual++;
                this.atualizarBarraProgresso();

                if (perguntaAtual < perguntasRelacoes.length) {
                    // Próxima pergunta com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.mostrarPergunta();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpRelacoes', { pontuacao: pontuacao });
                }
            });
        } else {
            // Resposta incorreta
            botaoClicado.fillColor = 0xFF8888; // Vermelho claro

            // Exibir feedback explicativo
            const feedbackText = this.add.text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height / 2 + 50,
                pergunta.feedback, // Adicione a propriedade `feedback` ao objeto da pergunta
                {
                    fontSize: '20px',
                    fill: '#FF888',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 100 },
                    align: 'center'
                }
            ).setOrigin(0.5);

            // Esperar um momento antes de permitir nova tentativa
            this.time.delayedCall(3000, () => {
                feedbackText.destroy(); // Remove o feedback
                this.mostrarPergunta(); // Volta para a mesma pergunta
            });
        }
    }
}

// // Classe para a cena de Game Over de Relações
// class GameOverSceneCurriculoRelacoes extends Phaser.Scene {
//     constructor() {
//         super({ key: 'GameOverSceneCurriculoRelacoes' });
//     }

//     init(data) {
//         this.motivoGameOver = data.motivo || 'errou';
//     }

//     preload() {
//         // Carregando recursos
//         this.load.image('fundoGameOver', '../assets/gameover_curriculo.png');
//     }

//     create() {
//         // Transição de entrada
//         this.cameras.main.fadeIn(1000, 0, 0, 0);

//         // Imagem de fundo sem distorção
//         const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoGameOver');
//         this.scaleBackgroundImage(fundo);

//         // Botão de texto para reiniciar
//         const botaoReiniciar = this.add.rectangle(
//             this.sys.game.config.width / 2,
//             510,
//             250,
//             60,
//             0xB600B9
//         ).setStrokeStyle(2, 0x880088)
//             .setInteractive();

//         // Efeitos do botão
//         botaoReiniciar.on('pointerover', () => {
//             botaoReiniciar.fillColor = 0xC30DC7;
//             botaoReiniciar.setScale(1.05);
//         });

//         botaoReiniciar.on('pointerout', () => {
//             botaoReiniciar.fillColor = 0xB600B9;
//             botaoReiniciar.setScale(1);
//         });

//         // Evento de clique
//         botaoReiniciar.on('pointerdown', () => {
//             // Efeito de click
//             this.tweens.add({
//                 targets: botaoReiniciar,
//                 scale: 0.95,
//                 duration: 100,
//                 yoyo: true,
//                 onComplete: () => {
//                     // Reiniciar variáveis
//                     perguntaAtual = 0;
//                     progresso = 0;
//                     pontuacao = 0;

//                     // Fade out e iniciar o quiz
//                     this.cameras.main.fadeOut(500, 0, 0, 0, () => {
//                         this.scene.start('QuizVpRelacoes');
//                     });
//                 }
//             });
//         });

//         // Texto do botão
//         this.add.text(
//             this.sys.game.config.width / 2,
//             510,
//             'TENTAR NOVAMENTE',
//             {
//                 fontSize: '22px',
//                 fill: '#FFF',
//                 fontFamily: 'FontePadrao'
//             }
//         ).setOrigin(0.5);
//     }

//     scaleBackgroundImage(image) {
//         // Centraliza a imagem
//         image.setOrigin(0.5);

//         // Mantém a proporção e cobre a tela
//         const scaleX = this.cameras.main.width / image.width;
//         const scaleY = this.cameras.main.height / image.height;
//         const scale = Math.max(scaleX, scaleY);
//         image.setScale(scale);
//     }
// }

// Classe para a cena de parabéns de Relações
class CongratulationsSceneCurriculoVpRelacoes extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpRelacoes' });
    }

    init(data) {
        this.pontuacaoFinal = data.pontuacao || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('fundoCongratulationsVpRelacoes', '../assets/parabens_cv_vpderelacoes.png');
    }

    create() {
        // Transição de entrada com efeito
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoCongratulationsVpRelacoes');
        this.scaleBackgroundImage(fundo);

        // Botão de texto para voltar
        const botaoVoltar = this.add.rectangle(
            width / 2,
            height - 210,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        botaoVoltar.on('pointerover', () => {
            botaoVoltar.fillColor = 0xC30DC7;
            botaoVoltar.setScale(1.05);
        });

        botaoVoltar.on('pointerout', () => {
            botaoVoltar.fillColor = 0xB600B9;
            botaoVoltar.setScale(1);
        });

        // Evento de clique
        botaoVoltar.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: botaoVoltar,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    perguntaAtual = 0;
                    progresso = 0;
                    pontuacao = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.switch('officeScene');
                    });
                }
            });
        });

        // Texto do botão
        this.add.text(
            width / 2,
            height - 210,
            'VOLTAR AO ESCRITÓRIO',
            {
                fontSize: '22px',
                fill: '#000',
                fontFamily: 'FontePadrao'
            }
        ).setOrigin(0.5);
    }
    // Complete the scaleBackgroundImage method
    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

}

// Classe para a cena do Quiz de Tecnologia
class QuizVpTecnologia extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizVpTecnologia' });
        this.textosPergunta = []; // Armazena os textos da pergunta e alternativas
        this.botoesAlternativas = []; // Armazena os botões das alternativas
    }

    preload() {
        // Carrega os recursos para o quiz
        this.load.font('FontePadrao', 'fonts/PixelifySans-VariableFont_wght.ttf');
        this.load.image('TelaQuiz', '../assets/TelaQuiz.png');
    }

    create() {
        // Transição suave
        this.cameras.main.fadeIn(1000);

        // Adicionar a imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'TelaQuiz');
        this.scaleBackgroundImage(fundo);

        // Criar elementos de interface
        this.criarBarraProgresso();
        this.criarContadorPergunta();
        this.mostrarPergunta();
    }

    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

    criarContadorPergunta() {
        // Mostrar número da pergunta atual/total
        this.textoPerguntaNumero = this.add.text(
            this.sys.game.config.width - 150,
            50,
            `Pergunta ${perguntaAtual + 1}/${perguntasTecnologia.length}`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao' }
        ).setOrigin(0.5);
    }

    criarBarraProgresso() {
        // Container para a barra de progresso
        const progressBarContainer = this.add.rectangle(100, 50, 300, 24, 0xDDDDDD)
            .setOrigin(0, 0.5)
            .setStrokeStyle(2, 0x000000);

        // Barra de progresso roxa    
        this.barraProgresso = this.add.rectangle(102, 50, 0, 20, 0xB600B9)
            .setOrigin(0, 0.5);

        // Texto de progresso    
        this.textoProgresso = this.add.text(
            420,
            50,
            `${progresso}%`,
            { fontSize: '20px', fill: '#000', fontFamily: 'FontePadrao', fontWeight: 'bold' }
        ).setOrigin(0, 0.5);
    }

    atualizarBarraProgresso() {
        // Atualizando a barra de progresso do quiz
        const larguraMaxima = 296;
        const novaLargura = (progresso / 100) * larguraMaxima;

        // Animar a barra de progresso
        this.tweens.add({
            targets: this.barraProgresso,
            width: novaLargura,
            duration: 500,
            ease: 'Power2'
        });

        this.textoProgresso.setText(`${progresso}%`);
    }

    limparElementos() {
        // Remove os textos da pergunta e alternativas
        this.textosPergunta.forEach(texto => texto.destroy());
        this.textosPergunta = [];

        // Remove os botões das alternativas
        this.botoesAlternativas.forEach(botao => botao.destroy());
        this.botoesAlternativas = [];
    }

    mostrarPergunta() {
        // Limpa os elementos antigos
        this.limparElementos();

        // Atualiza o contador de perguntas
        this.textoPerguntaNumero.setText(`Pergunta ${perguntaAtual + 1}/${perguntasTecnologia.length}`);

        const pergunta = perguntasTecnologia[perguntaAtual];

        // Exibindo a pergunta
        const textoPergunta = this.add.text(
            this.sys.game.config.width / 2,
            100,
            pergunta.pergunta,
            {
                fontSize: '22px',
                fill: '#B600B9',
                fontFamily: 'FontePadrao',
                fontWeight: 'bold',
                wordWrap: { width: this.sys.game.config.width - 150 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.textosPergunta.push(textoPergunta);

        // Exibindo alternativas
        const startY = 200;
        const spacing = 50;

        pergunta.alternativas.forEach((alternativa, index) => {
            // Container da alternativa (retângulo)
            const botaoContainer = this.add.rectangle(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                this.sys.game.config.width - 200,
                50,
                0xEAE8E8
            ).setStrokeStyle(2, 0x444444)
                .setInteractive();

            // Efeitos de hover
            botaoContainer.on('pointerover', () => {
                botaoContainer.fillColor = 0xDDDDDD;
                botaoContainer.setScale(1.02);
            });

            botaoContainer.on('pointerout', () => {
                botaoContainer.fillColor = 0xEAE8E8;
                botaoContainer.setScale(1);
            });

            // Evento de clique
            botaoContainer.on('pointerdown', () => {
                this.verificarResposta(index, botaoContainer);
            });

            // Texto da alternativa
            const textoAlternativa = this.add.text(
                this.sys.game.config.width / 2,
                startY + (index * spacing),
                `${index + 1}. ${alternativa}`,
                {
                    fontSize: '18px',
                    fill: '#000',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 220 }
                }
            ).setOrigin(0.5);

            this.textosPergunta.push(textoAlternativa);
            this.botoesAlternativas.push(botaoContainer);
        });
    }

    verificarResposta(resposta, botaoClicado) {
        // Desativar interação com todos os botões
        this.botoesAlternativas.forEach(botao => {
            botao.disableInteractive();
        });

        const pergunta = perguntasTecnologia[perguntaAtual];

        if (resposta === pergunta.correta) {
            // Resposta correta
            botaoClicado.fillColor = 0x88FF88; // Verde claro

            // Atualizar pontuação e progresso
            pontuacao += 100; // Pontuação fixa por resposta correta
            progresso += 20;

            // Esperar um momento antes de seguir
            this.time.delayedCall(1500, () => {
                perguntaAtual++;
                this.atualizarBarraProgresso();

                if (perguntaAtual < perguntasTecnologia.length) {
                    // Próxima pergunta com transição
                    this.cameras.main.fadeOut(300, 0, 0, 0, () => {
                        this.cameras.main.fadeIn(300);
                        this.mostrarPergunta();
                    });
                } else {
                    // Quiz completo
                    this.scene.start('CongratulationsSceneCurriculoVpTecnologia', { pontuacao: pontuacao });
                }
            });
        } else {
            // Resposta incorreta
            botaoClicado.fillColor = 0xFF8888; // Vermelho claro

            // Exibir feedback explicativo
            const feedbackText = this.add.text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height / 2 + 50,
                pergunta.feedback, // Adicione a propriedade `feedback` ao objeto da pergunta
                {
                    fontSize: '20px',
                    fill: '#FF888',
                    fontFamily: 'FontePadrao',
                    wordWrap: { width: this.sys.game.config.width - 100 },
                    align: 'center'
                }
            ).setOrigin(0.5);

            // Esperar um momento antes de permitir nova tentativa
            this.time.delayedCall(3000, () => {
                feedbackText.destroy(); // Remove o feedback
                this.mostrarPergunta(); // Volta para a mesma pergunta
            });
        }
    }
}

// // Classe para a cena de Game Over de Tecnologia
// class GameOverSceneCurriculoTecnologia extends Phaser.Scene {
//     constructor() {
//         super({ key: 'GameOverSceneCurriculoTecnologia' });
//     }

//     init(data) {
//         this.motivoGameOver = data.motivo || 'errou';
//     }

//     preload() {
//         // Carregando recursos
//         this.load.image('fundoGameOver', '../assets/gameover_curriculo.png');
//     }

//     create() {
//         // Transição de entrada
//         this.cameras.main.fadeIn(1000, 0, 0, 0);

//         // Imagem de fundo sem distorção
//         const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoGameOver');
//         this.scaleBackgroundImage(fundo);

//         // Botão de texto para reiniciar
//         const botaoReiniciar = this.add.rectangle(
//             this.sys.game.config.width / 2,
//             510,
//             250,
//             60,
//             0xB600B9
//         ).setStrokeStyle(2, 0x880088)
//             .setInteractive();

//         // Efeitos do botão
//         botaoReiniciar.on('pointerover', () => {
//             botaoReiniciar.fillColor = 0xC30DC7;
//             botaoReiniciar.setScale(1.05);
//         });

//         botaoReiniciar.on('pointerout', () => {
//             botaoReiniciar.fillColor = 0xB600B9;
//             botaoReiniciar.setScale(1);
//         });

//         // Evento de clique
//         botaoReiniciar.on('pointerdown', () => {
//             // Efeito de click
//             this.tweens.add({
//                 targets: botaoReiniciar,
//                 scale: 0.95,
//                 duration: 100,
//                 yoyo: true,
//                 onComplete: () => {
//                     // Reiniciar variáveis
//                     perguntaAtual = 0;
//                     progresso = 0;
//                     pontuacao = 0;

//                     // Fade out e iniciar o quiz
//                     this.cameras.main.fadeOut(500, 0, 0, 0, () => {
//                         this.scene.start('QuizVpTecnologia');
//                     });
//                 }
//             });
//         });

//         // Texto do botão
//         this.add.text(
//             this.sys.game.config.width / 2,
//             510,
//             'TENTAR NOVAMENTE',
//             {
//                 fontSize: '22px',
//                 fill: '#FFF',
//                 fontFamily: 'FontePadrao'
//             }
//         ).setOrigin(0.5);
//     }

//     scaleBackgroundImage(image) {
//         // Centraliza a imagem
//         image.setOrigin(0.5);

//         // Mantém a proporção e cobre a tela
//         const scaleX = this.cameras.main.width / image.width;
//         const scaleY = this.cameras.main.height / image.height;
//         const scale = Math.max(scaleX, scaleY);
//         image.setScale(scale);
//     }
// }

// Classe para a cena de parabéns de Tecnologia
class CongratulationsSceneCurriculoVpTecnologia extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsSceneCurriculoVpTecnologia' });
    }

    init(data) {
        this.pontuacaoFinal = data.pontuacao || 0;
    }

    preload() {
        // Carregando recursos
        this.load.image('fundoCongratulationsVpTecnologia', '../assets/parabens_cv_vpdetecnologia.png');
    }

    create() {
        // Transição de entrada com efeito
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Imagem de fundo sem distorção
        const fundo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoCongratulationsVpTecnologia');
        this.scaleBackgroundImage(fundo);

        // Botão de texto para voltar
        const botaoVoltar = this.add.rectangle(
            width / 2,
            height - 210,
            250,
            60,
            0xB600B9
        ).setStrokeStyle(2, 0x880088)
            .setInteractive();

        // Efeitos do botão
        botaoVoltar.on('pointerover', () => {
            botaoVoltar.fillColor = 0xC30DC7;
            botaoVoltar.setScale(1.05);
        });

        botaoVoltar.on('pointerout', () => {
            botaoVoltar.fillColor = 0xB600B9;
            botaoVoltar.setScale(1);
        });

        // Evento de clique
        botaoVoltar.on('pointerdown', () => {
            // Efeito de click
            this.tweens.add({
                targets: botaoVoltar,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Reiniciar variáveis
                    perguntaAtual = 0;
                    progresso = 0;
                    pontuacao = 0;

                    // Fade out e iniciar o quiz
                    this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                        this.scene.switch('officeScene');
                    });
                }
            });
        });

        // Texto do botão
        this.add.text(
            width / 2,
            height - 210,
            'VOLTAR AO ESCRITÓRIO',
            {
                fontSize: '22px',
                fill: '#000',
                fontFamily: 'FontePadrao'
            }
        ).setOrigin(0.5);
    }
    // Complete the scaleBackgroundImage method
    scaleBackgroundImage(image) {
        // Centraliza a imagem
        image.setOrigin(0.5);

        // Mantém a proporção e cobre a tela
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);

        image.setScale(scale);
    }

}