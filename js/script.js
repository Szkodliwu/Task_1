// Определение массива вопросов и ответов
const questions = [
  {
    question: "How many planets are in the solar system?",
    answers: [
      { text: "8", correct: true },
      { text: "9", correct: false },
      { text: "10", correct: false },
      { text: "11", correct: false },
    ],
  },
  {
    question: "What is the freezing point of water?",
    answers: [
      { text: "0", correct: true },
      { text: "-5", correct: false },
      { text: "-6", correct: false },
      { text: "1", correct: false },
    ],
  },
  {
    question: "What is the longest river in the world?",
    answers: [
      { text: "Nile", correct: true },
      { text: "Amazon", correct: false },
      { text: "Yangtze", correct: false },
      { text: "Mississippi", correct: false },
    ],
  },
  {
    question: "How many chromosomes are in the human genome?",
    answers: [
      { text: "42", correct: false },
      { text: "44", correct: false },
      { text: "46", correct: true },
      { text: "48", correct: false },
    ],
  },
  {
    question: "Which of these characters are friends with Harry Potter? (Two answers)",
    answers: [
      { text: "Ron Weasley", correct: true },
      { text: "Draco Malfoy", correct: false },
      { text: "Hermione Granger", correct: true },
      { text: "Neville Longbottom", correct: false },
    ],
  },
  {
    question: "What is the capital of Canada?",
    answers: [
      { text: "Toronto", correct: false },
      { text: "Ottawa", correct: true },
      { text: "Vancouver", correct: false },
      { text: "Montreal", correct: false },
    ],
  },
  {
    question: "What is the Jewish New Year called?",
    answers: [
      { text: "Hanukkah", correct: false },
      { text: "Yom Kippur", correct: false },
      { text: "Kwanzaa", correct: false },
      { text: "Rosh Hashanah", correct: true },
    ],
  },
];

// Получение ссылок на HTML-элементы
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const quizSubmit = document.getElementById("quiz-submit");
const timerElement = document.getElementById("timer");

// Инициализация переменных состояния
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

document.querySelector(".toggle-btn").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const icon = document.querySelector(".icon");

  if (document.body.classList.contains("dark-mode")) {
    icon.src = "./assets/icon/moon.png";
  } else {
    icon.src = "./assets/icon/sun.png";
  }
});

// Функция обновления таймера
function updateTimer() {
  timerElement.textContent = `Time left: ${timeLeft} seconds`;

  if (timeLeft <= 0) {
    // Если время истекло, переходим к следующему вопросу
    clearInterval(timerInterval);
    handleQuizSubmit();
  } else {
    timeLeft--;
  }
}

// Функция начала викторины
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizSubmit.innerHTML = "Submit";
  showQuestion();
  startTimer();
}

// Функция запуска таймера
function startTimer() {
  clearInterval(timerInterval); // Очистка предыдущего интервала, если он существует
  timeLeft = 30; // Задайте здесь нужное время на каждый вопрос в секундах
  timerInterval = setInterval(updateTimer, 1000);
}

// Функция отображения вопроса и вариантов ответов
function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// Функция сброса состояния
function resetState() {
  quizSubmit.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Функция выбора ответа
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswers = currentQuestion.answers.filter((answer) => answer.correct);
  const correctAnswersCount = correctAnswers.length;

  if (correctAnswersCount === 2) {
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }

    const selectedAnswers =
      answerButtons.getElementsByClassName("correct").length +
      answerButtons.getElementsByClassName("incorrect").length;

    if (selectedAnswers === 2) {
      Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true;
      });
      showCorrectAnswers(correctAnswers);
      clearInterval(timerInterval);
      quizSubmit.style.display = "block";
    }
  } else {
    Array.from(answerButtons.children).forEach((button) => {
      const isButtonCorrect = button.dataset.correct === "true";
      if (isButtonCorrect) {
        button.classList.add("correct");
        if (isCorrect) {
          button.classList.add("show-correct");
        }
      } else if (button === selectedBtn) {
        button.classList.add("incorrect");
      }
      button.disabled = true;
    });
    clearInterval(timerInterval);
    quizSubmit.style.display = "block";

    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      showCorrectAnswers(correctAnswers);
    }
  }
}

// Функция отображения правильных ответов
function showCorrectAnswers(correctAnswers) {
  correctAnswers.forEach((answer) => {
    const correctAnswerButton = Array.from(answerButtons.children).find(
      (btn) => btn.innerHTML === answer.text
    );
    correctAnswerButton.classList.add("show-correct");
  });
}

// Функция отображения результатов
function showResults() {
  questionElement.innerHTML = `You scored ${score} out of ${questions.length} questions correctly.`;
  resetState();
  quizSubmit.innerHTML = "Play Again";
  quizSubmit.style.display = "block";
  clearInterval(timerInterval);
}

// Функция обработки отправки ответов
function handleQuizSubmit() {
  if (quizSubmit.innerHTML === "Submit") {
    if (currentQuestionIndex === questions.length - 1) {
      showResults();
    } else {
      currentQuestionIndex++;
      showQuestion();
      startTimer();
    }
  } else {
    startQuiz();
  }
}

// Обработчик события отправки ответов
quizSubmit.addEventListener("click", handleQuizSubmit);

// Запуск викторины
startQuiz();