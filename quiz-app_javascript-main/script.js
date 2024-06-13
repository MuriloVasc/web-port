const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

function nextQuestion(e) {
  const isCorrect = e.target.getAttribute("data-correct") === "true";

  if (isCorrect) {
    questionsCorrect++;
    document.getElementById("correctSound").play();
  } else {
    document.getElementById("incorrectSound").play();
  }

  if (currentIndex < questions.length - 1) {
    // Adiciona a classe "shake" para animar
    document.querySelector(".content").classList.add("shake");

    setTimeout(() => {
      currentIndex++;
      loadQuestion();

      // Remove a classe "shake" após o atraso
      document.querySelector(".content").classList.remove("shake");
    }, 1080); // 2000 milissegundos = 2 segundos
  } else {
    finish();
  }
}



function finish() {
  textFinish.innerHTML = `você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
