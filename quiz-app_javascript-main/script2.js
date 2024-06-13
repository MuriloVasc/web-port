// Lista de imagens e seus nomes correspondentes
var images = [
    { src: "Carlos Drummond.jpg", name: "carlos drummond", hint: "Foi um poeta, farmacêutico, contista e cronista brasileiro" },
    { src: "Castro Alves.jpg", name: "castro alves", hint: "Escreveu clássicos como Espumas Flutuantes e Hinos do Equador" },
    { src: "Cecília Meireles.jpg", name: "cecília meireles", hint: "Foi uma jornalista, pintora, poeta, escritora e professora brasileira." },
    { src: "Clarice Lispector.jpg", name: "clarice lispector", hint: "Foi uma escritora e jornalista brasileira nascida na Ucrânia." },
    { src: "Gonçalves Dias.png", name: "gonçalves dias", hint: 'Um grande expoente do romantismo brasileiro e da tradição literária conhecida como "indianismo"' },
    { src: "Guimarães Rosa.jpg", name: "guimarães rosa", hint: " Considerado por muitos o maior escritor brasileiro do século XX e um dos maiores de todos os tempos." },
    { src: "Machado de Assis.jpg", name: "machado de assis", hint: 'Dito por ele essa frase "Esquecer é uma necessidade"' },
    { src: "Manuel Bandeira.jpg", name: "manuel bandeira", hint: 'É considerado como parte da geração de 1922 do modernismo no Brasil. Seu poema "Os Sapos" foi o abre-alas da Semana de Arte Moderna.' },
    { src: "Mário de Andrade.jpg", name: "mário de andrade", hint: "Corpo celeste natural que orbita a Terra." },
    { src: "Monteiro Lobato.jpg", name: "monteiro lobato", hint: "Foi um importante editor de livros inéditos e autor de importantes traduções." }
];

// Variáveis globais
var currentImageIndex = 0;
var resultElement = document.getElementById("result");
var hintElement = document.getElementById("hint");

// Função para exibir uma nova imagem e limpar o campo de entrada
function displayNewImage() {
    var image = images[currentImageIndex];
    document.getElementById("image").src = image.src;
    document.getElementById("guess").value = "";
    hintElement.textContent = "";
}

// Função para verificar o palpite do usuário
function checkGuess() {
    var image = images[currentImageIndex];
    var userGuess = document.getElementById("guess").value.trim().toLowerCase();

    if (userGuess === image.name) {
        resultElement.textContent = "Correto!";
        setTimeout(nextImage, 1000); // Avançar para a próxima imagem após 1 segundo
    } else {
        resultElement.textContent = "Incorreto. Tente novamente.";
        hintElement.textContent = "Dica: " + image.hint;
    }
}

// Função para avançar para a próxima imagem ou reiniciar se todas as imagens forem mostradas
function nextImage() {
    currentImageIndex++;
    if (currentImageIndex < images.length) {
        displayNewImage();
    } else {
        currentImageIndex = 0; // Reiniciar o jogo
        displayNewImage();
    }
}

// Exibir a primeira imagem ao carregar a página
displayNewImage();
