const cardLabels = ['Redação', 'Disertativo', 'Substantivo', 'Oração', 'Frase', 'Crase', 'Adverbio', 'Verbo'];
let cards = [...cardLabels, ...cardLabels];
let firstCard, secondCard;
let lockBoard = false;
let matchCount = 0;
let moves = 0;
let timerInterval;
let startTime;

// Função para embaralhar as cartas
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// Função para formatar o tempo
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Função para iniciar o temporizador
function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(() => {
        const currentTime = new Date();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        document.getElementById('time').textContent = formatTime(elapsedSeconds);
    }, 1000);
}

// Função para parar o temporizador
function stopTimer() {
    clearInterval(timerInterval);
}

// Função para inicializar o jogo
function initializeGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    shuffle(cards);
    cards.forEach(label => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="Logo.jpg" alt="Front Image">
                </div>
                <div class="card-back">
                    <span>${label}</span>
                </div>
            </div>`;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
    matchCount = 0;
    moves = 0;
    document.getElementById('moves').textContent = moves;
    document.getElementById('time').textContent = '00:00';
    stopTimer();
    startTimer();
}

// Função para virar a carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

// Função para checar se houve um par
function checkForMatch() {
    let isMatch = firstCard.querySelector('.card-back span').textContent === secondCard.querySelector('.card-back span').textContent;
    isMatch ? disableCards() : unflipCards();
    moves++;
    document.getElementById('moves').textContent = moves;
}

// Função para desabilitar as cartas em caso de par
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    matchCount++;
    if (matchCount === cardLabels.length) {
        stopTimer();
        setTimeout(() => alert('Parabéns! Você ganhou!'), 500);
    }
}

// Função para desvirar as cartas se não forem um par
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Função para resetar as variáveis de controle do tabuleiro
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Adicionar evento ao botão de reiniciar jogo
document.getElementById('restart').addEventListener('click', initializeGame);

// Inicializar o jogo na primeira carga da página
initializeGame();
