// Criar um elemento HUD para exibir a posição do mouse
const hud = document.createElement("div");
hud.id = "hud"; // Define o ID do elemento HUD
hud.style.position = "fixed"; // Define a posição do HUD como fixa na tela
hud.style.top = "10px"; // Define a posição vertical do HUD (10px a partir do topo)
hud.style.left = "10px"; // Define a posição horizontal do HUD (10px a partir da esquerda)
hud.style.padding = "10px"; // Adiciona um preenchimento interno ao HUD
hud.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; // Define a cor de fundo do HUD com transparência
hud.style.color = "white"; // Define a cor do texto do HUD como branco
hud.style.fontFamily = "Arial, sans-serif"; // Define a fonte do texto do HUD
hud.style.fontSize = "16px"; // Define o tamanho da fonte do texto do HUD
hud.style.borderRadius = "5px"; // Adiciona bordas arredondadas ao HUD
document.body.appendChild(hud);  // Adiciona o elemento HUD ao corpo do documento


function updatePosition(event) { // Função para atualizar a posição do mouse no HUD 
    const posX = event.clientX; // Obtém a posição X do mouse em relação à janela
    const posY = event.clientY; // Obtém a posição Y do mouse em relação à janela

    hud.textContent = `Posição do Mouse: ${posX} X ${posY}`; // Atualiza o conteúdo do HUD com as coordenadas do mouse
}
document.addEventListener("mousemove", updatePosition); // Adiciona um ouvinte de evento para capturar o movimento do mouse
