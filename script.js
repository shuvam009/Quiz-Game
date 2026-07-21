const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Who is the GOAT of Football?",
    answers: [
      { text: "Garith Bale", correct: false },
      { text: "Harry Kane", correct: false },
      { text: "Cristiano Ronaldo", correct: true },
      { text: "L.A.Messi", correct: false },
    ],
  },
  {
    question: "Who is the GOAT of Cricket?",
    answers: [
      { text: "Kane Williamson", correct: false },
      { text: "Virat Kohli", correct: true },
      { text: "Steve Smith", correct: false },
      { text: "Joe Root", correct: false },
    ],
  },
  {
    question: "Name a GOAT club in football?",
    answers: [
      { text: "Arsenel", correct: false },
      { text: "Manchester City", correct: false },
      { text: "Barcelona", correct: false },
      { text: "Real Madrid", correct: true },
    ],
  },
  {
    question: "Who is know as Alein in Cricket?",
    answers: [
      { text: "ABD", correct: true },
      { text: "Dhoni", correct: false },
      { text: "Virat", correct: false },
      { text: "Suriya", correct: false },
    ],
  },
  {
    question: "Best team in IPL?",
    answers: [
      { text: "MI", correct: false },
      { text: "CSK", correct: false },
      { text: "RCB", correct: true },
      { text: "GT", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = ((currentQuestionIndex +1) / quizQuestions.length) * 100;

  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answers-btn");

    button.dataset.correct = answer.correct; // dataset is used to store some custom data

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;

  const selectbutton = event.target;
  const iscorrect = selectbutton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button == selectbutton) {
      button.classList.add("incorrect");
    }
  });

  if (iscorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = " Congrats! You have very high ball knowledge";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! your ball knowledge is decent";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! but your ball knowledge is bad";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Okay! I think you are Barca & CSK fan :)";
  } else {
    resultMessage.textContent = "just quit sports broo!!!";
  }
}
function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
  startScreen();
}
