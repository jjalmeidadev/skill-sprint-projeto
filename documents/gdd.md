<img src="../assets/logointeli.png">


# GDD - Game Design Document - Módulo 1 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final_**

## SkillSprint Game 
## SkillMakers
#### Nomes dos integrantes do grupo
- <a href="https://www.linkedin.com/in/mike-buchsenspaner-445a2934b/">Mike Buchsenspaner
- <a href="https://www.linkedin.com/in/sophia-hochman-b821a4346/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">Sophia Hochman
- <a href="https://www.linkedin.com/in/jaime-andrade-de-almeida-0777ba2a5/">Jaime Andrade de Almeida
- <a href="https://www.linkedin.com/in/anneestherlf?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">Anne Esther Lins Figueirôa
- <a href="https://www.linkedin.com/in/marcela-costa-844b42338/)"> Marcela Amorim da Costa
- <a href="https://www.linkedin.com/in/arthur-marques-5b1080346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app)">Arthur Marques
- <a href="https://www.linkedin.com/in/victorbarq/">Lucas Carvalho dos Ramos

## Sumário

[1. Introdução](#c1)

[2. Visão Geral do Jogo](#c2)

[3. Game Design](#c3)

[4. Desenvolvimento do jogo](#c4)

[5. Casos de Teste](#c5)

[6. Conclusões e trabalhos futuros](#c6)

[7. Referências](#c7)

[Anexos](#c8)

<br>


# <a name="c1"></a>1. Introdução (sprints 1 a 4)

## 1.1. Plano Estratégico do Projeto

### 1.1.1. Contexto da indústria (sprint 2)

A Vivo é uma empresa de telecomunicações e tecnologia no Brasil que oferece telefonia móvel e fixa, internet, TV por assinatura e serviços digitais. Fazendo parte do grupo “Telefónica”, investe em fibra óptica e 5G. Seus principais concorrentes são Claro, TIM e operadoras regionais. O setor é altamente competitivo, com foco em inovação, IoT (internet das coisas), inteligência artificial e Open Finance. A Vivo se destaca pela liderança no pós-pago e maior base de fibra óptica, enfrentando o desafio de manter sua posição frente à concorrência e à evolução tecnológica.

#### 1.1.1.1. Modelo de 5 Forças de Porter (sprint 2)

#### 1. Ameaça de Novos Entrantes
Relativamente baixa. A indústria de telecomunicações enfrenta barreiras significativas para novos entrantes, como altos custos de infraestrutura, exigências regulatórias complexas e grandes investimentos em tecnologia, como 5G. As operadoras líderes, como Vivo, Claro e TIM, já possuem bases sólidas de clientes e um forte posicionamento no mercado. No entanto, pequenos provedores de internet (ISPs) regionais e operadoras focadas em nichos podem oferecer soluções mais acessíveis e personalizadas, impactando a participação das grandes operadoras em segmentos específicos, como dados e conectividade empresarial. Isso pode criar uma concorrência regionalizada e reduzir o domínio das grandes empresas.

#### 2. Ameaça de Produtos ou Serviços Substitutos:
Moderada/alta. Produtos e serviços substitutos, como internet via satélite, Wi-Fi comunitário, plataformas de streaming e soluções móveis inovadoras, estão se tornando alternativas à telefonia fixa e TV por assinatura. Além disso, serviços de VoIP (tecnologia que permite a realização de chamadas de voz por meio da internet), como WhatsApp e Skype, substituem chamadas telefônicas tradicionais. A ameaça de substitutos é moderada, pois, embora essas alternativas digitais cresçam, a infraestrutura das operadoras tradicionais e a demanda por serviços de alta velocidade, como fibra óptica, garantem que as grandes operadoras permaneçam competitivas. Assim, apesar da inovação, as operadoras ainda têm uma vantagem significativa em muitos segmentos de mercado.
 
#### 3. Poder de Barganha dos Fornecedores:
Moderado. Os principais fornecedores da indústria de telecomunicações incluem empresas de equipamentos de rede, como Huawei e Ericsson, fornecedores de infraestrutura como fibra óptica, e empresas de conteúdo digital, como Netflix e Amazon. O poder de barganha dos fornecedores é moderado, pois as operadoras têm alternativas para a construção de suas redes. No entanto, a necessidade de tecnologias avançadas, como 5G, e a concentração de alguns fornecedores no mercado global aumentam sua influência. Isso é especialmente relevante nas negociações para fornecimento de equipamentos e licenciamento de tecnologia, onde os fornecedores têm maior poder devido à especialização e escassez.

#### 4. Poder de Barganha dos Clientes: 
Alto. A base de clientes da indústria de telecomunicações é diversificada, incluindo consumidores residenciais (usuários de telefonia, internet e TV) e empresas (que demandam soluções de conectividade, cloud computing e segurança cibernética). O poder de barganha dos clientes é alto, devido à saturação do mercado e à ampla oferta de pacotes das operadoras concorrentes. A facilidade de troca de operadora, aliada à crescente competitividade em preços, serviços e atendimento ao cliente, coloca pressão sobre as operadoras para oferecer condições melhores e fidelizar seus consumidores, tornando o mercado mais dinâmico e com maior exigência de qualidade.

#### 5. Rivalidade entre Concorrentes Existentes:
Alta. As principais concorrentes da Vivo são Claro, TIM, e operadoras regionais, como Algar e Brisanet, que oferecem serviços de internet de alta qualidade. A rivalidade no setor é alta, com as operadoras competindo principalmente por preço, qualidade de serviço e inovação tecnológica. A crescente demanda por convergência de serviços (telefonia, internet e TV) e a implementação do 5G intensificam ainda mais a competição, levando as operadoras a investir constantemente em infraestrutura e em ofertas diferenciadas para se manterem competitivas no mercado altamente dinâmico e saturado.


![5 FORÇAS](https://github.com/user-attachments/assets/336a1a10-0e58-4e68-a42a-e48d542db44b)
Fonte: Gráfico 5 forças de porter (produzido pelo autor) 



### 1.1.2. Análise SWOT (sprint 2)
A Vivo, líder de mercado no Brasil, destaca-se pela forte presença em telefonia móvel, internet fixa (fibra óptica) e inovação com 5G. Sua dependência de grandes investimentos em infraestrutura e a intensa concorrência de operadoras como Claro e TIM representam fraquezas. Entretanto, as oportunidades incluem a expansão do 5G, IoT e a integração com fintechs, além de soluções digitais para empresas. As ameaças vêm da saturação do mercado móvel e de mudanças regulatórias. A Vivo precisa manter sua liderança diante de uma concorrência crescente e exigente.


![SWOT](https://github.com/user-attachments/assets/5d960390-b6ab-4ffc-a930-d2a29dda43d2)
Fonte: Gráfico análise SWOT (produzido pelo autor) 


### 1.1.3. Missão / Visão / Valores (sprint 2)

#### Missão:
A missão da Vivo é “digitalizar para aproximar". E isso porque eles visam que as oportunidades que o mundo digital oferece sejam universais, contribuindo como uma força positiva para a transformação das empresas e da sociedade.

#### Visão:
A Vivo acredita que a revolução tecnológica deve ser parte da vida de todas e todos, e não um privilégio de poucos. Promovendo que as oportunidades que o mundo digital oferece sejam universais, contribuindo como uma força positiva para a transformação individual, das empresas e da sociedade.

#### Valores:
Integridade: Agir com honestidade e ética em todas as ações.
Compromisso: Cumprir promessas e agir de forma responsável.
Inovação: Buscar constantemente novas soluções e tecnologias.
Responsabilidade Social: Contribuir para o desenvolvimento social e ambiental.
Excelência: Buscar a qualidade em produtos, serviços e atendimento.


### 1.1.4. Proposta de Valor (sprint 4)

*Posicione aqui o canvas de proposta de valor. Descreva os aspectos essenciais para a criação de valor da ideia do produto com o objetivo de ajudar a entender melhor a realidade do cliente e entregar uma solução que está alinhado com o que ele espera.*

### 1.1.5. Descrição da Solução Desenvolvida (sprint 4)

*Descreva brevemente a solução desenvolvida para o parceiro de negócios. Descreva os aspectos essenciais para a criação de valor da ideia do produto com o objetivo de ajudar a entender melhor a realidade do cliente e entregar uma solução que está alinhado com o que ele espera. Observe a seção 2 e verifique que ali é possível trazer mais detalhes, portanto seja objetivo aqui. Atualize esta descrição até a entrega final, conforme desenvolvimento.*

### 1.1.6. Matriz de Riscos (sprint 4)

*Registre na matriz os riscos identificados no projeto, visando avaliar situações que possam representar ameaças e oportunidades, bem como os impactos relevantes sobre o projeto. Apresente os riscos, ressaltando, para cada um, impactos e probabilidades com plano de ação e respostas.*

### 1.1.7. Objetivos, Metas e Indicadores (sprint 4)

*Definição de metas SMART (específicas, mensuráveis, alcançáveis, relevantes e temporais) para seu projeto, com indicadores claros para mensuração*

## 1.2. Requisitos do Projeto (sprints 1 e 2)

 No kick-off com o parceiro, realizado em 07/02/2024, a Vivo delineou os principais aspectos para o desenvolvimento do MVP. A Tabela 1 a seguir apresenta os requisitos fundamentais para a construção da solução proposta, garantindo alinhamento com as expectativas da empresa parceira.
 
Tabela 1
\# | Requisito  
--- | ---
R01 | O controle do personagem será realizado usando as teclas "W", "A", "S" e "D" do teclado e "E" para interações gerais.
R02 | O jogo terá uma tela de abertura, onde o jogador inicia clicando em "Jogar". 
R03 | O jogo iniciará com uma cutscene, onde serão ilustrados o contexto e a ambientação inicial do jogo.
R04 | O jogador deve seguir as instruções dos diálogos dos NPCs para passar de fase, apertando a tecla "Enter" para avançar nas falas.
R05 | A primeira tela de jogabilidade será um escritório onde o jogador realizará suas primeiras interações no jogo.
R06 | A primeira fase terá um ensino dinâmico sobre elaboração de currículo em um computador.
R07 | Todas as fases terão como objetivo motivar o usuário a realizar o Job Rotation na Vivo.
R08 | O jogo terá um Game Design Document completo e detalhado. 
R09 | As características dos personagens devem refletir o valor de diversidade da Vivo e trazer representatividade para o jogo.
R10| O jogador terá, como ferramenta de gameplay, um assistente que lhe fornecerá dicas.
R11| O código do jogo deverá ser segmentado de maneira à priorizar a organização e didática.


## 1.3. Público-alvo do Projeto (sprint 2)

O jogo é destinado a colaboradores da Vivo que desejam impulsionar sua carreira e buscar novas oportunidades dentro da própria empresa. Em termos demográficos, o público-alvo abrange profissionais geralmente entre 25 e 45 anos, com experiência acumulada e formação diversificada — desde cursos técnicos até graduações e pós-graduações

# <a name="c2"></a>2. Visão Geral do Jogo (sprint 2)

## 2.1. Objetivos do Jogo (sprint 2)

O principal objetivo do **Skill Sprint** é proporcionar aos colaboradores da Vivo uma experiência interativa e estruturada para o desenvolvimento de carreira, superando desafios relacionados à falta de engajamento e acessibilidade nos programas tradicionais.

No jogo, os participantes percorrem diferentes etapas do crescimento profissional, desde a candidatura a novas oportunidades até o planejamento contínuo de desenvolvimento, promovendo a cultura de mobilidade interna e aprendizado contínuo.

Por meio de desafios dinâmicos e da prática do **job rotation** [1], os jogadores exploram novas áreas dentro da empresa, ampliando suas habilidades e alinhando-se aos valores e oportunidades da Vivo. Com essa abordagem gamificada, o **Skill Sprint** transforma o desenvolvimento de carreira em uma jornada envolvente e acessível, aumentando a adesão aos programas de capacitação e otimizando os recursos investidos em treinamentos tradicionais.

Para avançar e concluir o jogo, o jogador deve:
- Aprender os comandos de movimentação (setas do teclado) e interação com objetos e personagens (tecla “E”);
- Interagir e seguir as instruções fornecidas pelos personagens (até o presente momento de desenvolvimento existem 3 NPCs [2]: Vivinho, Vivita e o líder);
- Finalizar as tarefas de cada fase do jogo, aprendendo sobre as oportunidades existentes em cada Vice-Presidência.

Os objetivos de cada fase do jogo são:

##### Fase 1: Criação do Currículo no Escritório da Vivo
- **Objetivo da fase:** Ensinar a criar um currículo atrativo e eficaz.
- **Aprendizado:** Construção e otimização de currículo.
- **Conteúdos:** Dicas de layout, palavras-chave, adaptação para ATS [3] (Applicant Tracking System), destaque de conquistas.
- **Desafio (objetivo do jogador):** Cumprir a introdução ao jogo com Vivinho, seguir instruções da recepcionista (Vivita), criar o currículo no computador através das perguntas do mini-game e entregá-lo ao líder.

##### Fase 2: Entrevista de Processo Seletivo na Vice-Presidência de Pessoas
- **Objetivo:** Preparar os jogadores para dinâmicas de entrevistas.
- **Aprendizado:** Desenvolvimento de habilidades para entrevistas.
- **Conteúdos:** Dicas de entrevistas, exemplos de perguntas e simulação de entrevista.
- **Desafios (objetivo do jogador):** Resolver case, simulação de entrevista com feedback.

##### Fase 3: Resolução de Case na Vice-Presidência de Negócios
- **Objetivo:** Preparar os jogadores para resolução de cases.
- **Aprendizado:** Desenvolvimento de habilidades para resolução de cases.
- **Conteúdos:** Estratégias para resolver cases.
- **Desafios (objetivo do jogador):** Resolver um case relacionado ao setor de Negócios na Vivo.

##### Fase 4: Planejamento e desenvolvimento de carreira na Vice-Presidência de Estratégia, Novos Negócios e Inteligência Artificial
- **Objetivo:** Ensinar a estruturar um plano de carreira.
- **Aprendizado:** Planejamento de carreira e metas de desenvolvimento.
- **Conteúdos:** Estratégias para resolver cases, dicas de entrevistas, exemplos de perguntas e boas práticas.
- **Desafios (objetivo do jogador):** Criar plano de desenvolvimento, feedback fictício.

##### Fase 5: Jantar com gestores na Vice-Presidência de Relações Institucionais
- **Objetivo:** Orientar sobre feedbacks e acompanhamento de desempenho.
- **Aprendizado:** Importância do feedback e conversas com gestores.
- **Conteúdos:** Práticas para feedback, ciclo de desempenho, comunicação com liderança.
- **Desafios (objetivo do jogador):** Simulação de conversa com o gestor, resolver dilemas de desempenho.

##### Fase 6: Upskilling e Reskilling [4] na Vice-Presidência de Tecnologia da Informação
- **Objetivo:** Incentivar o aprendizado contínuo.
- **Aprendizado:** Desenvolvimento de novas habilidades para adaptação ao mercado.
- **Conteúdos:** Diferença entre upskilling e reskilling, ferramentas de desenvolvimento.
- **Desafios:** Identificar skills relevantes, criar plano de aprendizado.

Diante do exposto, entende-se que o jogo é estruturado de forma a contemplar o requisito sete (R07), voltado para o estímulo da rotação de carreira no ambiente corporativo da Vivo. Todas as fases possuem o objetivo de instruir, em forma de serious game, as boas práticas de uma aplicação de qualidade em um processo seletivo interno empresarial. O objetivo geral é motivar o jogador a realizar o job rotation após entender claramente o passo-a-passo para esse processo jogando Skill Sprint.

## 2.2. Características do Jogo (sprint 2)

O jogo **Skill Sprint** se passa em um ambiente virtual que simula a jornada de desenvolvimento de carreira dentro da Vivo. Por ser um **serious game** [5], seu principal objetivo é utilizar a mecânica e a dinâmica dos jogos para promover aprendizado, treinamento ou conscientização em um contexto fora do entretenimento tradicional. Esses jogos são projetados para alcançar um objetivo educativo, como o desenvolvimento de habilidades, a simulação de situações reais, ou a transmissão de informações importantes de uma maneira envolvente e interativa. Enquanto os jogos tradicionais têm como foco a diversão e o entretenimento, os **serious games** buscam impactar positivamente a formação de uma pessoa ou de uma comunidade.

Dessa forma, o **Skill Sprint** desempenha o papel de um “jogo sério”, de cunho didático, de forma inspiradora e dinâmica. O personagem principal está no prédio empresarial da Vivo e é convidado a conhecer as Vice-Presidências da empresa após submeter seu currículo na sala do líder (1ª fase). O jogador explora diferentes setores e desafios do processo de candidatura para processos internos, como o momento de feedback com gestores, por exemplo, passando por processos de recrutamento, desenvolvimento profissional e aprendizado contínuo. Cada fase do jogo reflete um aspecto essencial desse processo, proporcionando uma experiência imersiva.

Os jogadores enfrentam desafios interativos que representam situações reais do mercado de trabalho, incluindo a criação de currículo, participação em entrevistas, resolução de cases e planejamento de carreira. O jogo utiliza elementos de **RPG** [6] para permitir a evolução do personagem, incentivando a progressão baseada no aprendizado e na tomada de decisões estratégicas.

A narrativa envolvente conduz os jogadores por um caminho estruturado de desenvolvimento profissional, utilizando **NPCs** carismáticos como guias e mentores. O enredo dinâmico reforça a importância da mobilidade interna e do aprendizado contínuo, destacando o papel da Vivo no crescimento de seus colaboradores.

O jogo promove o desenvolvimento de competências essenciais para o crescimento na carreira, como habilidades de comunicação, resolução de problemas e planejamento estratégico. Além disso, a progressão do jogador reflete sua evolução no domínio dessas competências, tornando o aprendizado prático e recompensador.

### 2.2.1. Gênero do Jogo (sprint 2)

O **Skill Sprint** combina elementos de **RPG** [6], simulação e estratégia para oferecer uma experiência interativa de aprendizado. O jogador assume o papel de um profissional em ascensão dentro da Vivo, navegando pelos desafios do mercado de trabalho de forma dinâmica.

**RPG** (Role-Playing Game, ou "Jogo de Interpretação de Papéis", em português) é um tipo de jogo onde os jogadores assumem o papel de personagens fictícios em um mundo imaginário. O objetivo principal é interpretar e viver uma narrativa ou história por meio das ações e decisões desses personagens, dentro de um conjunto de regras estabelecido. Por isso, um elemento essencial do nosso jogo são os **NPCs** [2], (Non-Player-Characters – personagens que não são controlados por nenhum jogador, mas sim pelo sistema do jogo) personagens interativos que informam e guiam sobre as missões no jogo.

### 2.2.2. Plataforma do Jogo (sprint 2)

O jogo será acessível através de navegadores compatíveis (testados: Chrome), permitindo que os colaboradores da Vivo possam jogá-lo em desktops. Essa escolha garante acessibilidade no ambiente corporativo. Futuramente, planejamos adaptá-lo para dispositivos móveis, permitindo, assim, que os jogadores participem da experiência em diferentes momentos do seu dia.

### 2.2.3. Número de jogadores (sprint 2)

O **Skill Sprint** é um jogo **single-player**, projetado para oferecer uma experiência individual de aprendizado e desenvolvimento. Esse formato garante que cada jogador possa avançar no seu próprio ritmo, maximizando a absorção do conteúdo e a aplicação prática dos conhecimentos adquiridos.

### 2.2.4. Títulos semelhantes e inspirações (sprint 2)

O desenvolvimento do **Skill Sprint** foi inspirado por títulos que combinam aprendizado e dinâmica de maneira eficaz. Algumas das principais referências incluem:

- **Pokémon** [7]: A mecânica de evolução dos personagens e a exploração de diferentes mundos em Pokémon inspirou a estrutura de progressão de carreira no **Skill Sprint**. Assim como em Pokémon, os jogadores avançam ao completar desafios e aprimorar suas habilidades;
  
- **Stardew Valley** [8]: A interação com **NPCs** e o desenvolvimento de atividades dentro de um ambiente dinâmico e imersivo, como visto em **Stardew Valley**, influenciaram a abordagem do **Skill Sprint** em termos de interação com personagens e tarefas dentro de cada fase do jogo;

- **Undertale** [9]: A forma como o jogo permite que o jogador afete profundamente o enredo e as relações com os personagens, dependendo de suas escolhas, influenciou a forma como os **NPCs** do **Skill Sprint** guiam e interagem com o jogador. Em **Undertale**, as interações com personagens não são apenas funcionais, mas emocionais, criando uma conexão mais profunda com o jogador — um aspecto que buscamos trazer para o **Skill Sprint** em suas interações e progressão dentro da jornada de desenvolvimento de carreira.

- **Meta Tower Game** [10]:  O Meta Tower Game foi uma grande inspiração para o Skill Sprint, especialmente em relação à estrutura de fases e à abordagem educacional. No Meta Tower Game, os colaboradores da Meta exploram uma torre com seis andares, cada um representando uma etapa da jornada de contratação de fornecedores. Essa estrutura de fases temáticas, onde cada andar corresponde a um desafio específico, inspirou a organização do Skill Sprint em fases que representam diferentes aspectos do desenvolvimento de carreira na Vivo.

Esses títulos ajudaram a moldar a estrutura do **Skill Sprint**, oferecendo um equilíbrio entre aprendizado, progressão de personagem e interatividade dentro de um cenário empresarial simulado.

### 2.2.5. Tempo estimado de jogo (sprint 5)

*Ex. O jogo pode ser concluído em 3 horas passando por todas as fases.*

*Ex. cada partida dura até 15 minutos*

# <a name="c3"></a>3. Game Design (sprints 2 e 3)

## 3.1. Enredo do Jogo (sprints 2 e 3)



 Você controla Skrill, um avatar que trabalha na Vivo há dois anos. Desde o início, você sempre teve interesse em crescer profissionalmente e explorar novas áreas dentro da empresa, mas nunca soube exatamente por onde começar. A empresa oferece diversos programas de desenvolvimento, mas muitos colaboradores, como você, encontram dificuldades para acessar todas as oportunidades disponíveis.

Com a crescente necessidade de inovação e adaptação no mercado, a Vivo decidiu lançar um novo programa interno: o Skill Sprint, um jogo interativo que simula os desafios do crescimento profissional dentro da empresa. Nosso objetivo? Ajudar os colaboradores a desenvolverem novas habilidades, explorarem diferentes áreas e se prepararem para oportunidades internas de forma prática e envolvente.

Apesar das oportunidades dentro da Vivo, muitos colaboradores ainda enfrentam barreiras para avançar em suas carreiras. Alguns não sabem por onde começar, outros sentem insegurança para se candidatar a novas vagas ou acreditam que não têm as habilidades necessárias para mudar de área.

Além disso, a rotina corrida do dia a dia dificulta a participação em treinamentos tradicionais, tornando o desenvolvimento profissional algo secundário para muitos. Sem uma abordagem mais dinâmica e acessível, a mobilidade interna vira um desafio e muitos talentos acabam estagnados.

Mas agora, com o Skill Sprint, você tem a chance de mudar essa realidade. O jogo apresenta um caminho estruturado para explorar diferentes áreas, aprimorar habilidades e se preparar para novas oportunidades de crescimento.

Ao concluir o Skill Sprint, você se torna um colaborador mais preparado para assumir novos desafios dentro da Vivo. Você ganha reconhecimento, recebe novas oportunidades e pode até mesmo conquistar uma posição em outra área que antes parecia inacessível.

O Skill Sprint transforma o desenvolvimento de carreira em uma experiência interativa e prática. Ao simular desafios reais e permitir que os colaboradores testem suas habilidades em um ambiente seguro e gamificado, o jogo torna o aprendizado mais acessível e motivador.


## 3.2. Personagens (sprints 2 e 3)

### 3.2.1. Controláveis

O **Skill Sprint** conta com um jogador principal chamado **Skrill** que será controlado pelo colaborador da Vivo pelas teclas WASD e utilizará a tecla E pra interagir com objetos/personagens durante a jornada do jogo. Existe também o Vivinho que é um personagem que tem como objetivo guiar o usuário durante as fases e ensiná-lo a realizar os cases e ajudá-lo no jogo. A Vivita é uma NPC que ai ficar na recepção e orientar o coladorador a realizar a primeira tarefa do jogo, criar um currículo, ela será responável por introduzir o usuário ao jogo e dizer para ele qual o primeiro passo a ser dado para começar a jornada de Job Rotation. Todos os NPCs vão ser desenhados com o intuito de trazer diversidade para o jogo, eles vão representar grupos étinicos, a comunidade LGBTQIA+ e também pessoas com necessidades especiasis.

<img src="https://github.com/user-attachments/assets/34d6588a-ba21-490a-a5b2-a8f3d7ba48a4" width="300"/>

### 3.2.2. Non-Playable Characters (NPC)

- Vivinho é um personagem que tem como objetivo guiar o usuário durante as fases e ensiná-lo a realizar os cases e ajudá-lo no jogo.
- Vivita é uma NPC que ai ficar na recepção e orientar o coladorador a realizar a primeira tarefa do jogo, criar um currículo, ela será responável por introduzir o usuário ao jogo e dizer para ele qual o primeiro passo a ser dado para começar a jornada de Job Rotation.
- Todos os NPCs vão ser desenhados com o intuito de trazer diversidade para o jogo, eles vão representar grupos étinicos, a comunidade LGBTQIA+ e também pessoas com necessidades especiasis.

  ![Image](https://github.com/user-attachments/assets/50594d55-2807-4a2d-8dd0-89d618be81c5)
  <img src="https://github.com/user-attachments/assets/d1ada40a-0ed9-4092-b54a-d63624349d15" width="300"/>

### 3.2.3. Diversidade e Representatividade dos Personagens

No momento inicial de desenvolvimento do jogo, planejamos implementar um só personagem a fim de testarmos suas funcionalidades em si, as quais julgamos ser essenciais para nosso progresso. Quando melhor encaminhados, possuímos o objetivo de abranger a todas as etnias e características que compõem os grupos da população brasileira e, por consequência, a VIVO como negócio. Esta meta inclui representar populações numerosas e minorizadas de origens afro-descendentes (55,5% dos brasileiros), amarelas (0,4%) e indígenas (0,8%), além de de diferentes faixas etárias, gêneros (mulheres compõem 51,5%) e condições de saúde (surdez, cegos, membros amputados e formas de paralisia, por exemplo) sendo na customização de players (com traços e cosméticos) ou na composição de NPCs que façam parte das interações ao longo da jornada do "colaborador" nas fases.
Este plano se alinha com o foco da VIVO em formar um coletivo de colaboradores diversos, de maneira à fornecer oportunidades aos mais variados grupos em aspectos como desenvolvimento corporativo e atuação na sociedade através de seus amplos setores. Portanto, configura um fator essencial a ser trabalhado a fim de retratar a composição da empresa em um jogo.
O impacto proveniente de tal atenção ao design seria o de possibilitar o sentimento de pertencimento que os profissionais da VIVO teriam com a gameplay com uma representatividade tão ampla e precisamente pensada.

Dados retirados do IBGE e UFRN em 17/02/2025.



Considerando as personagens do game, analise se estas estão alinhadas ao público-alvo do jogo (seção 1.3), e compare-as dentro da realidade da sociedade brasileira. Por fim, discorra sobre qual é o impacto esperado da escolha dessas personagens.

## 3.3. Mundo do jogo (sprints 2 e 3)

### 3.3.1. Locações Principais e/ou Mapas (sprints 2 e 3)

O jogo conta com 6 fases, cada fase tem um mapa diferente
 - 1° Recepção: Fase inicial que contém uma recepcionista (Vivita), uma sala de computadores em que o usuário irá realizar a criação do currículo e a sala do líder onde o coladorador vai entregar o currículo criado para o líder e assim ele será encaminhado para o elevador aonde ele terá acesso as outras fases.
   ![Image](https://github.com/user-attachments/assets/9313ccf8-1659-4512-9d6f-0786efb2f97f)
 - 2° VP de Pessoas: Um mapa temático da VP de Pessoas que tem como objetivo desenvolver as habilidades dos colaboradores para dinâmicas de entrevistas com conteúdos como perguntas e simulações.
 - 3° VP de Negócios: Um mapa temático da VP de Negócios que tem como objetivo desenvolver as habilidades dos colaboradores para a resolução dos cases desafiando o jogador a resolver um casa no setor de Negócios.
 - 4° VP de Estratégia: Um mapa temático da VP de Estratégia que tem como objetivo ensinar os colaboradores a estruturar um plano de carreira aplicando as habilidades desenvolvidas na VP de Negócios.
 - 5° VP de Relações Institucionais: Um mapa em que ocorre um jantar com os líderes das VPs em que será simulado uma conversa com o objetivo de resolver dilemas de desempenho.
 - 6° VP de Tecnologia: Um mapa com a temática da VP de Tecnologia e tem como objetivo ensinar a diferença entre upskilling e reskilling dentro da Vivo incentivando o colaborador ao aprendizado contínuo.

### 3.3.2. Navegação pelo mundo (sprints 2 e 3)

O Skrill é o personagem principal que é guiado pelo usuário se locomovendo pelas teclas WASD, cada fase depende da outra para ser desbloqueada, ou seja, o colaborador só poderá avançar para o próximo mapa depois de concluir as tasks do anteior.
 - 1° Recepção: mapa inicial em que o jogador vai aparecer, dentro desse mapa existe a Sala do Líder que só poderá ser acessada depois que o colaborador criar o currículo.
 - 2° VP de Pessoas: depois de falar com o Líder a sala da VP de Pessoas vai ser desbloqueada e o colaborador vai realizar a primeira case
 - 3° VP de Negócios: ao finalizar a case da fase anterior o jogador avança para a VP de Negócios e realiza mais uma case, dessa vez sobre negócios.
 - 4° VP de Estratégia: a fase é liberada após a resolução da case anterior e durante a fase o colaborador irá fazer o planejamento da carreira dentro da Vivo
 - 5° VP de Relações: depois de criar o planejamento o jogador irá ter um jantar com os VPs dentro da VP de Relações e terá uma conversa para comentar o feedback do colaborador durante a jornada dentro do jogo
 - 6° VP de Tecnologia: quando o feedback for finalizado, a última fase será uma aula de difereciação entre upskilling e reskilling, e depois disso o jogo se encerra

*Descreva como os personagens se movem no mundo criado e as relações entre as locações – como as áreas/fases são acessadas ou desbloqueadas, o que é necessário para serem acessadas etc. Utilize listas ou tabelas para organizar esta seção.*

### 3.3.3. Condições climáticas e temporais (sprints 2 e 3)

*\<opcional\> Descreva diferentes condições de clima que podem afetar o mundo e as fases, se aplicável*

*Caso seja relevante, descreva como o tempo passa, se ele é um fator limitante ao jogo (ex. contagem de tempo para terminar uma fase)*

### 3.3.4. Concept Art (sprint 2)
Concept art é uma ilustração usada para visualizar ideias, cenários, personagens e objetos. Ela serve para ajudar a a produção final do que está sendo desenvolvido. Na produção do nosso jogo nós utilizamos a concept art para esboçarmos as cenas do Sprint Skill como uma ideia inicial, podendo ser aprimorada ao longo do desenvolvimento.  
Na criação das concepts nós pensamos em customizar as fases de acordo com as Vice-Presidencias da Vivo pensando em fazer um ambiente que envolva o colaborador e ele possa se sentir imerso no jogo. Com isso, desenhamos os nossos mapas voltados para o desafio que o usuário vai ter que realizar em cada etapa para poder desenvolver as habilidades propostas no jogo que vão ajudá-lo e incentivá-lo a realizar e entender a Job Rotation dentro da Vivo.


![conceptRecepcao](https://github.com/user-attachments/assets/16844f63-7d26-41a3-8559-4d1e53c3bb60)  
Figura 1: mapa da recepção aonde o usuário nasce, conversa com a vivita, cria o currículo e fala com o líder.  

![conceptCurriculo](https://github.com/user-attachments/assets/8f9eea0b-78f7-47fa-b4e2-a06ef6b64347)
Figura 2: tela aonde o usuário vai criar o currículo após falar com a Vivita

![salaLider](https://github.com/user-attachments/assets/ccfba3a5-06d7-4712-88c4-4e5c17bbcf96)
Figura 3: mapa da sala do líder aonde o usuário vai poder entrar depois de fazer e o currículo e nessa sala vai entregar o currículo para o líder

![conceptElevador](https://github.com/user-attachments/assets/bbef2db1-d93e-46b4-b963-df6272c6f82a)
Figura 4: mapa do elevador aonde o usuário vai entrar depois de entregar o currículo e o elevador vai levá-lo para as VPs(cada andar uma VP) 

![conceptVPPessoas](https://github.com/user-attachments/assets/8ee23ad0-2aef-4434-afaf-9556e5ce62e1)
Figura 5: fase da VP de Pessoas aonde o colaborador vai simular uma entrevista

![conceptVPNegocios](https://github.com/user-attachments/assets/374019be-4ad6-47bf-8925-9645e638995e)
Figura 6: fase da VP de Negócios personalizada nos temas B2B e B2C com um case em cada área

![conceptVPEstrategia](https://github.com/user-attachments/assets/80a7b560-411e-4ce1-91ba-c7be7e025af0)
Figura 7: fase da VP de Estrategia com um minigame sobre planejamento de carreira

![conceptVPRelacoes](https://github.com/user-attachments/assets/d2312978-bfa4-4aec-9647-24f86fb7b6d3)
Figura 8: fase da VP de Relações aonde vai acontecer um jantar com todos os VPs da Vivo voltado para resolver dialetos de desempenho

![conceptVPTecnologia](https://github.com/user-attachments/assets/8b9b8a4f-b446-4103-98f2-fd6ff500a6e5)
Figura 9: fase da VP de Tenologia aonde o usuário vai aprender sobre upskilling e reskilling e depois a jornada se encerra  


### 3.3.5. Trilha sonora (sprint 3)

*Descreva a trilha sonora do jogo, indicando quais músicas serão utilizadas no mundo e nas fases. Utilize listas ou tabelas para organizar esta seção. Caso utilize material de terceiros em licença Creative Commons, não deixe de citar os autores/fontes.*

*Exemplo de tabela*
\# | titulo | ocorrência | autoria
--- | --- | --- | ---
1 | tema de abertura | tela de início | própria
2 | tema de combate | cena de combate com inimigos comuns | Hans Zimmer
3 | ... 

## 3.4. Inventário e Bestiário (sprint 3)

### 3.4.1. Inventário

*\<opcional\> Caso seu jogo utilize itens ou poderes para os personagens obterem, descreva-os aqui, indicando títulos, imagens, meios de obtenção e funções no jogo. Utilize listas ou tabelas para organizar esta seção. Caso utilize material de terceiros em licença Creative Commons, não deixe de citar os autores/fontes.* 

*Exemplo de tabela*
\# | item |  | como obter | função | efeito sonoro
--- | --- | --- | --- | --- | ---
1 | moeda | <img src="../assets/coin.png"> | há muitas espalhadas em todas as fases | acumula dinheiro para comprar outros itens | som de moeda
2 | madeira | <img src="../assets/wood.png"> | há muitas espalhadas em todas as fases | acumula madeira para construir casas | som de madeiras
3 | ... 

### 3.4.2. Bestiário

*\<opcional\> Caso seu jogo tenha inimigos, descreva-os aqui, indicando nomes, imagens, momentos de aparição, funções e impactos no jogo. Utilize listas ou tabelas para organizar esta seção. Caso utilize material de terceiros em licença Creative Commons, não deixe de citar os autores/fontes.* 

*Exemplo de tabela*
\# | inimigo |  | ocorrências | função | impacto | efeito sonoro
--- | --- | --- | --- | --- | --- | ---
1 | robô terrestre | <img src="../assets/inimigo2.PNG"> |  a partir da fase 1 | ataca o personagem vindo pelo chão em sua direção, com velocidade constante, atirando parafusos | se encostar no inimigo ou no parafuso arremessado, o personagem perde 1 ponto de vida | sons de tiros e engrenagens girando
2 | robô voador | <img src="../assets/inimigo1.PNG"> | a partir da fase 2 | ataca o personagem vindo pelo ar, fazendo movimento em 'V' quando se aproxima | se encostar, o personagem perde 3 pontos de vida | som de hélice
3 | ... 

## 3.5. Gameflow (Diagrama de cenas) (sprint 2)

*Posicione aqui seu "storyboard de programação" - o diagrama de cenas do jogo. Indique, por exemplo, como o jogo começa, quais opções o jogador tem, como ele avança nas fases, quais as condições de 'game over', como o jogo reinicia. Seu diagrama deve representar as classes, atributos e métodos usados no jogo.*

**Esquema inicial do Diagrama de Fases do jogo.**

<img src="../assets/mapamental.JPG">

## 3.6. Regras do jogo (sprint 3)

*Descreva aqui as regras do seu jogo: objetivos/desafios, meios para se conseguir alcançar*

*Ex. O jogador deve pilotar o carro e conseguir terminar a corrida dentro de um minuto sem bater em nenhum obstáculo.*

*Ex. O jogador deve concluir a fase dentro do tempo, para obter uma estrela. Se além disso ele coletar todas as moedas, ganha mais uma estrela. E se além disso ele coletar os três medalhões espalhados, ganha mais uma estrela, totalizando três. Ao final do jogo, obtendo três estrelas em todas as fases, desbloqueia o mundo secreto.*  

## 3.7. Mecânicas do jogo (sprint 3)

*Descreva aqui as formas de controle e interação que o jogador tem sobre o jogo: quais os comandos disponíveis, quais combinações de comandos, e quais as ações consequentes desses comandos. Utilize listas ou tabelas para organizar esta seção.*

*Ex. Em um jogo de plataforma 2D para desktop, o jogador pode usar as teclas WASD para mecânicas de andar, mirar para cima, agachar, e as teclas JKL para atacar, correr, arremesar etc.*

*Ex. Em um jogo de puzzle para celular, o jogador pode tocar e arrastar sobre uma peça para movê-la sobre o tabuleiro, ou fazer um toque simples para rotacioná-la*

## 3.8. Implementação Matemática de Animação/Movimento (sprint 3)

*Descreva aqui a função que implementa a movimentação/animação de personagens ou elementos gráficos no seu jogo. Sua função deve se basear em alguma formulação matemática (e.g. fórmula de aceleração). A explicação do funcionamento desta função deve conter notação matemática formal de fórmulas/equações. Se necessário, crie subseções para sua descrição.*

# <a name="c4"></a>4. Desenvolvimento do Jogo

Essa seção detalha o planejamento e a execução das sprints no desenvolvimento do Serious Game para a Vivo. O projeto segue uma abordagem iterativa e incremental (Scrum), garantindo entregas contínuas e alinhadas às necessidades do parceiro. Esse processo garante engajamento da equipe e um melhor controle da execução dos requisitos, além de garantir entrega de valor tanto para a Vivo quanto para os colaboradores que utilizarão a solução.

## 4.1. Desenvolvimento preliminar do jogo (sprint 1)

Para a primeira versão do jogo (MVP) elaboramos uma tela inicial com um botão interativo "Jogar" (R02), permitindo que o jogador inicie a experiência ao clicar no botão.

![Image](https://github.com/user-attachments/assets/0996cf85-6f8d-4d1c-b206-5c5c2080b520)
Além disso, desenvolvemos uma cutscene em Pixel Art para apresentar o contexto e a ambientação inicial do jogo (R03). Essa introdução visa situar o jogador antes do início da jogabilidade. 

![Image](https://github.com/user-attachments/assets/ad075642-151c-46b8-87cb-915dba6b7849)

A primeira fase foi estruturada com um cenário de escritório (R05), onde o jogador pode explorar o ambiente e, em planos futuros, poderá interagir com elementos disponíveis. As interações com NPCs e a execução de tarefas orientadas pelo jogo (R04) serão aprofundadas nas próximas etapas do desenvolvimento, conforme planejado. Para a movimentação do personagem, definimos a mecânica de controle utilizando as setas do teclado (R01), permitindo que o jogador navegue livremente pelo mapa. Para isso, utilizamos um spritesheet de domínio gratuito, com planos de personalização em futuras atualizações.

![Image](https://github.com/user-attachments/assets/9313ccf8-1659-4512-9d6f-0786efb2f97f)

As principais dificuldades encontradas foram: a personalização do spritesheet do personagem principal, o desenvolvimento técnico da primeira fase do jogo e a implementação de barreiras no mapa. Os motivos dessas dificuldades são: lacunas de conhecimento técnico e identificação de falta de familiaridade com ferramentas tecnológicas que proporcionem essas funcionalidades. Por isso, decidimos postergar essas melhorias para a próxima Sprint, garantindo uma melhor execução dessas funções.

Os próximos passos incluem a criação de novas fases e o desenvolvimento de dinâmicas para a primeira fase, focadas no processo de elaboração do currículo para uma entrevista de emprego (R06). Com isso, buscamos manter o alinhamento com o objetivo central do jogo, que é motivar os colaboradores a realizarem o Job Rotation na Vivo (R07), como foi solicitado no Kick-off com o parceiro.

Por fim, com a descrição fornecida e os elementos visuais indicados, é possível compreender a fase preliminar de desenvolvimento do jogo.

## 4.2. Desenvolvimento básico do jogo (sprint 2)

Foi entrege:

Uma cutscente;

Uma movimentação pelas setas, com uma animação do personagem quando ele anda;

Interação com tela do computador para transitar entre cenas 

Aqui está um video que ilustra isso:
https://github.com/user-attachments/assets/02da8c15-872d-4bfe-abff-99dad7f1b1b4

## 4.3. Desenvolvimento intermediário do jogo (sprint 3)

*Descreva e ilustre aqui o desenvolvimento da versão intermediária do jogo, explicando brevemente o que foi entregue em termos de código e jogo. Utilize prints de tela para ilustrar. Indique as eventuais dificuldades e próximos passos.*

## 4.4. Desenvolvimento final do MVP (sprint 4)

*Descreva e ilustre aqui o desenvolvimento da versão final do jogo, explicando brevemente o que foi entregue em termos de MVP. Utilize prints de tela para ilustrar. Indique as eventuais dificuldades e planos futuros.*

## 4.5. Revisão do MVP (sprint 5)

*Descreva e ilustre aqui o desenvolvimento dos refinamentos e revisões da versão final do jogo, explicando brevemente o que foi entregue em termos de MVP. Utilize prints de tela para ilustrar.*

# <a name="c5"></a>5. Testes

## 5.1. Casos de Teste (sprints 2 a 4)

*Descreva nesta seção os casos de teste comuns que podem ser executados a qualquer momento para testar o funcionamento e integração das partes do jogo. Utilize tabelas para facilitar a organização.*

*Exemplo de tabela*
\# | pré-condição | descrição do teste | pós-condição 
--- | --- | --- | --- 
1 | O personagem deve estar próximo a um computador interativo |Pressionar a tecla "E"	 | A tela do computador deve abrir no jogo
2 | O jogo está rodando e o personagem pode se mover | Pressionar a seta | O personagem deve se mover
3 | O jogo está na tela inicial|Clicar no botão "Começar o jogo" |O jogo deve iniciar e levar o jogador para a cutscene

## 5.2. Testes de jogabilidade (playtests) (sprint 4)

### 5.2.1 Registros de testes

*Descreva nesta seção as sessões de teste/entrevista com diferentes jogadores. Registre cada teste conforme o template a seguir.*

Nome | João Jonas (use nomes fictícios)
--- | ---
Já possuía experiência prévia com games? | sim, é um jogador casual
Conseguiu iniciar o jogo? | sim
Entendeu as regras e mecânicas do jogo? | entendeu as regras, mas sobre as mecânicas, apenas as essenciais, não explorou os comandos complexos
Conseguiu progredir no jogo? | sim, sem dificuldades  
Apresentou dificuldades? | Não, conseguiu jogar com facilidade e afirmou ser fácil
Que nota deu ao jogo? | 9.0
O que gostou no jogo? | Gostou  de como o jogo vai ficando mais difícil ao longo do tempo sem deixar de ser divertido
O que poderia melhorar no jogo? | A responsividade do personagem aos controles, disse que havia um pouco de atraso desde o momento do comando até a resposta do personagem

### 5.2.2 Melhorias

*Descreva nesta seção um plano de melhorias sobre o jogo, com base nos resultados dos testes de jogabilidade*

# <a name="c6"></a>6. Conclusões e trabalhos futuros (sprint 5)

*Escreva de que formas a solução do jogo atingiu os objetivos descritos na seção 1 deste documento. Indique pontos fortes e pontos a melhorar de maneira geral.*

*Relacione os pontos de melhorias evidenciados nos testes com plano de ações para serem implementadas no jogo. O grupo não precisa implementá-las, pode deixar registrado aqui o plano para futuros desenvolvimentos.*

*Relacione também quaisquer ideias que o grupo tenha para melhorias futuras*

# <a name="c7"></a>7. Referências (sprint 5)

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

[1]Job rotation: o que é, vantagens, desvantagens e como implementar. Disponível em: <https://gptw.com.br/conteudo/artigos/job-rotation/>. Acesso em: 21 fev. 2025.

[2] Personagem não jogável. <https://pt.wikipedia.org/wiki/Personagem_n%C3%A3o_jog%C3%A1vel.> Acesso em: 21 fev. 2025.

[3] Entenda o que é ATS e sua importância para o recrutamento moderno. <https://blog-forbusiness.vagas.com.br/o-que-e-ats/>. Acesso em: 21 fev. 2025.

[4] Upskilling E Reskilling: O Que É E Principais Diferenças. <https://blog-forbusiness.vagas.com.br/reskilling-upskilling/#:~:text=O%20upskilling%20tem%20o%20foco,coloc%C3%A1%2Dlo%20em%20outro%20posto>. Acesso em 21 fev. 2025.

[5] O que são Serious Games: como desenvolver um serious game para suas necessidades de negócios em 6 passos. <https://www.startupmundi.com/o-que-sao-serious-games-com-desenvolver-um-serious-game-em-6-passos>. Acesso em 21 fev. 2025.

[6] Role-playing game. <https://pt.wikipedia.org/wiki/Role-playing_game.> Acesso em 21 fev. 2025.

[7] Pokemon World Online. <https://pt.wikipedia.org/wiki/Role-playing_game.> Acesso em 21. fev 2025.

[8] Stardew Valley. <https://www.stardewvalley.net/>. Acesso em 21 fev. 2025.

[9] Undertale. <https://undertale.com/>. Acesso em 21 fev. 2025.

[10] Meta Tower Game. <https://github.com/InteliProjects/2024-T0014-IN01-G02/tree/main>. Acesso em 21 fev. 2025.

LUCK, Heloisa. Liderança em gestão escolar. 4. ed. Petrópolis: Vozes, 2010. <br>
SOBRENOME, Nome. Título do livro: subtítulo do livro. Edição. Cidade de publicação: Nome da editora, Ano de publicação. <br>

INTELI. Adalove. Disponível em: https://adalove.inteli.edu.br/feed. Acesso em: 1 out. 2023 <br>
SOBRENOME, Nome. Título do site. Disponível em: link do site. Acesso em: Dia Mês Ano

# <a name="c8"></a>Anexos

*Inclua aqui quaisquer complementos para seu projeto, como diagramas, imagens, tabelas etc. Organize em sub-tópicos utilizando headings menores (use ## ou ### para isso)*
