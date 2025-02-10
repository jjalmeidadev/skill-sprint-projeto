const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

startButton.addEventListener('click', () => {
  startScreen.style.display = 'none';
  canvas.style.display = 'block';
  gameLoop();
});

// Definindo o tamanho do canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Carregando a imagem de fundo
const backgroundImage = new Image();
backgroundImage.src = '../assets/Pallet_Town.png';

// Carregando a spritesheet do Player
const playerImage = new Image();
playerImage.src = '../assets/Player.png';

// Definindo o Player
const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 32,  // Largura do frame na spritesheet
  height: 32, // Altura do frame na spritesheet
  speed: 5,
  frameX: 0,
  frameY: 0,
  moving: false,
  direction: 'down',
  currentFrame: 0,
  maxFrames: 5
};

// Controle de movimentação
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

// Função para desenhar o plano de fundo
function drawBackground() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

// Função para desenhar o Player com a spritesheet
function drawPlayer() {
  const scale = 3; // escala de tamanho do Player

  ctx.save();

  if (player.direction === 'left') {
    ctx.scale(-1, 1);
    ctx.drawImage(
      playerImage,
      player.frameX * player.width,
      player.frameY * player.height,
      player.width,
      player.height,
      -(player.x + (player.width * scale) / 2),
      player.y - (player.height * scale) / 2,
      player.width * scale,
      player.height * scale
    );
  } else {
    ctx.drawImage(
      playerImage,
      player.frameX * player.width,
      player.frameY * player.height,
      player.width,
      player.height,
      player.x - (player.width * scale) / 2,
      player.y - (player.height * scale) / 2,
      player.width * scale,
      player.height * scale
    );
  }

  ctx.restore();
}

// Função para atualizar a posição do Player
function updatePlayerPosition() {
  if (moveUp && player.y - player.height / 2 > 10) {
    player.y -= player.speed;
    player.direction = 'up';
  }
  if (moveDown && player.y + player.height / 2 < canvas.height - 10) {
    player.y += player.speed;
    player.direction = 'down';
  }
  if (moveLeft && player.x - player.width / 2 > 10) {
    player.x -= player.speed;
    player.direction = 'left';
  }
  if (moveRight && player.x + player.width / 2 < canvas.width - 10) {
    player.x += player.speed;
    player.direction = 'right';
  }
}

// Função para atualizar a animação do Player
function updatePlayerAnimation() {
  if (player.moving) {
    if (player.direction === 'down') {
      player.frameY = 0;
    } else if (player.direction === 'right') {
      player.frameY = 1;
    } else if (player.direction === 'up') {
      player.frameY = 2;
    } else if (player.direction === 'left') {
      player.frameY = 1;
    }

    player.frameX = (player.frameX + 1) % 6; // 6 frames por direção
  }
}

// Função para lidar com eventos de teclado
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    moveUp = true;
    player.moving = true;
  }
  if (e.key === 'ArrowDown') {
    moveDown = true;
    player.moving = true;
  }
  if (e.key === 'ArrowLeft') {
    moveLeft = true;
    player.moving = true;
  }
  if (e.key === 'ArrowRight') {
    moveRight = true;
    player.moving = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowUp') moveUp = false;
  if (e.key === 'ArrowDown') moveDown = false;
  if (e.key === 'ArrowLeft') moveLeft = false;
  if (e.key === 'ArrowRight') moveRight = false;

  if (!moveUp && !moveDown && !moveLeft && !moveRight) {
    player.moving = false;
  }
});

// Função de loop do jogo
function gameLoop() {
  drawBackground();
  updatePlayerPosition();
  updatePlayerAnimation();
  drawPlayer();

  requestAnimationFrame(gameLoop);
}