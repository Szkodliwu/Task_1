const questions = [
    {
        question: "How many planets are in the solar system?",
        answers: [
            {text:"8", correct:true},
            {text:"9", correct:false},
            {text:"10", correct:false},
            {text:"11", correct:false},
        ]
    },
    {
        question: "What is the freezing point of water?",
        answers: [
            {text:"0", correct:true},
            {text:"-5", correct:false},
            {text:"-6", correct:false},
            {text:"1", correct:false},
        ]
    },
    {
        question: "What is the longest river in the world?",
        answers: [
            {text:"Nile", correct:true},
            {text:"Amazon", correct:false},
            {text:"Yangtze", correct:false},
            {text:"Mississippi", correct:false},
        ]
    },
    {
        question: "How many chromosomes are in the human genome?",
        answers: [
            {text:"42", correct:false},
            {text:"44", correct:false},
            {text:"46", correct:true},
            {text:"48", correct:false},
        ]
    },
    {
        question: "Which of these characters are friends with Harry Potter?(Two answers)",
        answers: [
            {text:"Ron Weasley", correct:true},
            {text:"Draco Malfoy", correct:false},
            {text:"Hermione Granger", correct:true},
            {text:"Neville Longbottom", correct:false},
        ]
    },
    {
        question: "What is the capital of Canada?",
        answers: [
            {text:"Toronto", correct:false},
            {text:"Ottawa", correct:true},
            {text:"Vancouver", correct:false},
            {text:"Montreal", correct:false},
        ]
    },
    {
        question: "What is the Jewish New Year called?",
        answers: [
            {text:"Hanukkah", correct:false},
            {text:"Yom Kippur", correct:false},
            {text:"Kwanzaa", correct:false},
            {text:"Rosh Hashanah", correct:true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const quizSubmit = document.getElementById("quiz-submit");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizSubmit.innerHTML = "Submit";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    quizSubmit.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswers = currentQuestion.answers.filter(answer => answer.correct);
    const correctAnswersCount = correctAnswers.length;

    if (correctAnswersCount === 2) {
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    const selectedAnswers = answerButtons.getElementsByClassName("correct").length + answerButtons.getElementsByClassName("incorrect").length;
    if (selectedAnswers === 2) {
        Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true;
        });
        showCorrectAnswers(correctAnswers);
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
    quizSubmit.style.display = "block";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        showCorrectAnswers(correctAnswers);
    }
    }
}

function showCorrectAnswers(correctAnswers) {
    correctAnswers.forEach((answer) => {
    const correctAnswerButton = Array.from(answerButtons.children).find((btn) => btn.innerHTML === answer.text);
    correctAnswerButton.classList.add("show-correct");
    });
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.
    length} questions!`;
    quizSubmit.innerHTML = "Play Again";
    quizSubmit.style.display = "block"; 
}

function handleQuizSubmit() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

quizSubmit.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleQuizSubmit();
    } else {
        startQuiz();
    }
});

startQuiz();