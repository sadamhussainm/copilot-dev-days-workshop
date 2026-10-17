// UI code: connects the quiz logic (quiz.js) to the page (index.html).

let state = createQuiz([]);
let timerId = null;
let timerToken = 0;
let timerDeadline = 0;
let questionResolved = false;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const progressText = document.getElementById("progress");
const timerText = document.getElementById("timer");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options");
const feedbackText = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const gradeText = document.getElementById("grade-text");

function showScreen(screenToShow) {
  [startScreen, quizScreen, resultScreen].forEach((screen) => {
    screen.hidden = screen !== screenToShow;
  });
}

function stopQuestionTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function updateQuestionTimer(token) {
  if (token !== timerToken || questionResolved) return;

  const secondsLeft = Math.max(0, Math.ceil((timerDeadline - Date.now()) / 1000));
  timerText.textContent = formatTimeLeft(secondsLeft);
  timerText.classList.toggle("low-time", secondsLeft <= 5);

  if (secondsLeft === 0) {
    questionResolved = true;
    stopQuestionTimer();

    const question = state.questions[state.current];
    const buttons = optionsList.querySelectorAll("button");
    buttons.forEach((button) => (button.disabled = true));
    buttons[question.answer].classList.add("correct");
    feedbackText.textContent = "Time's up!";
    nextButton.hidden = false;
    nextButton.focus();
  }
}

function startQuestionTimer() {
  timerToken++;
  questionResolved = false;
  timerDeadline = Date.now() + 15000;
  const token = timerToken;
  updateQuestionTimer(token);
  timerId = setInterval(() => updateQuestionTimer(token), 250);
}

function startQuiz() {
  stopQuestionTimer();
  timerToken++;
  state = createQuiz(shuffle(QUESTIONS));
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  stopQuestionTimer();
  const question = state.questions[state.current];
  progressText.textContent = `Question ${state.current + 1} of ${state.questions.length}`;
  questionText.textContent = question.question;
  feedbackText.textContent = "";
  nextButton.hidden = true;
  optionsList.innerHTML = "";
  timerText.classList.remove("low-time");

  question.options.forEach((option, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(index, button));
    item.appendChild(button);
    optionsList.appendChild(item);
  });

  startQuestionTimer();
}

function selectAnswer(selectedIndex, selectedButton) {
  if (questionResolved) return;
  if (Date.now() >= timerDeadline) {
    updateQuestionTimer(timerToken);
    return;
  }
  questionResolved = true;
  stopQuestionTimer();

  const question = state.questions[state.current];
  const buttons = optionsList.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));
  const result = answerQuestion(state, selectedIndex);
  state = result.state;
  const correct = result.correct;

  if (correct) {
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
    buttons[question.answer].classList.add("correct");
  }
  feedbackText.textContent = getFeedbackMessage(correct);

  nextButton.hidden = false;
  nextButton.focus();
}

function nextQuestion() {
  stopQuestionTimer();
  state = advanceQuiz(state);
  if (!isQuizFinished(state)) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  stopQuestionTimer();
  timerToken++;
  const total = state.questions.length;
  const percentage = calculatePercentage(state.score, total);
  scoreText.textContent = `You scored ${state.score} out of ${total} (${percentage}%)`;
  gradeText.textContent = `Grade: ${getGrade(percentage)}`;
  showScreen(resultScreen);
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
