let stars = []; // Um array para armazenar as posições das estrelas
let numStars = 500; // Quantidade de estrelas que queremos

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    camera(0, 0, 700); // Mantém a câmera na mesma posição

    // Inicializa as estrelas
    for (let i = 0; i < numStars; i++) {
        // Gera posições aleatórias para as estrelas dentro de um "cubo" grande
        // Multiplicamos por 2 e subtraímos o raio para centralizar em 0,0,0
        let x = random(-width, width);
        let y = random(-height, height);
        let z = random(-width, width); // Usamos a largura para definir a profundidade da dispersão
        stars.push(createVector(x, y, z)); // Armazena a posição como um vetor
    }
}

function draw() {
    background(20); // Fundo escuro para o espaço

    // --- Desenhar as Estrelas ---
    push(); // Salva o estado atual para não afetar o sistema solar
    noStroke(); // Estrelas sem contorno
    fill(255); // Estrelas brancas
    
    // Para dar um efeito de profundidade, fazemos as estrelas se moverem sutilmente
    // com base na posição da câmera ou na rotação geral do "universo".
    // Uma forma simples é fazer elas girarem lentamente ao redor do centro.
    rotateY(frameCount * 0.0001); // Rotação MUITO lenta para o campo de estrelas
    rotateX(frameCount * 0.00005); // Rotação ainda mais lenta no outro eixo

    for (let i = 0; i < numStars; i++) {
        let star = stars[i];
        push(); // Salva a matriz para cada estrela individualmente
        translate(star.x, star.y, star.z); // Move para a posição da estrela
        sphere(1.5); // Desenha uma pequena esfera para cada estrela (tamanho 1.5 pixels de raio)
        pop(); // Restaura a matriz para a próxima estrela
    }
    pop(); // Restaura o estado salvo antes das estrelas, para o sistema solar

    // --- Luzes ---
    ambientLight(50);
    directionalLight(255, 255, 255, -1, 0, 0);
    pointLight(255, 255, 0, 0, 0, 0); // Luz do Sol

    // --- O Sol ---
    push();
    noStroke();
    fill(255, 200, 0);
    sphere(80); // Raio do Sol
    pop();

    // --- O Planeta (e sua órbita) ---
    rotateY(frameCount * 0.003); // Rotação da órbita
    translate(200, 0, 0); // Distância do Sol
    rotateY(frameCount * 0.01); // Rotação do próprio planeta

    noStroke();
    fill(0, 100, 200); // Cor do planeta
    sphere(30); // Raio do planeta

    // --- A Lua (e sua órbita) ---
    push();
    rotateY(frameCount * 0.02); // Rotação da órbita da lua
    translate(40, 0, 0); // Distância da lua do planeta
    fill(150, 150, 150); // Cor da lua
    sphere(8); // Raio da lua
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    camera(0, 0, 700);
}
