// Criar um elemento HUD para exibir a posição do mouse
const hud = document.createElement("div");
hud.id = "hud";
hud.style.position = "fixed";
hud.style.top = "10px";
hud.style.left = "10px";
hud.style.padding = "10px";
hud.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
hud.style.color = "white";
hud.style.fontFamily = "Arial, sans-serif";
hud.style.fontSize = "16px";
hud.style.borderRadius = "5px";
document.body.appendChild(hud);

// Função para atualizar a posição do mouse
function atualizarPosicao(event) {
    const posX = event.clientX;
    const posY = event.clientY;
    hud.textContent = `Posição do Mouse: ${posX} X ${posY}`;
}

// Adicionar o ouvinte de evento para capturar o movimento do mouse
document.addEventListener("mousemove", atualizarPosicao);
