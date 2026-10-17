// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  shuffle,
  isCorrect,
  createQuiz,
  answerQuestion,
  advanceQuiz,
  isQuizFinished,
  calculatePercentage,
  isNewBestScore,
  getGrade,
  getFeedbackMessage,
  formatTimeLeft,
} = require("../src/quiz.js");

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("createQuiz creates a fresh initial state from questions", () => {
  const questions = [{ answer: 1 }];
  const state = createQuiz(questions);

  assert.deepEqual(state, { questions, current: 0, score: 0 });
  assert.notEqual(state.questions, questions);
});

test("answerQuestion increments score for a correct answer without mutating state", () => {
  const state = createQuiz([{ answer: 1 }]);
  const result = answerQuestion(state, 1);

  assert.equal(result.correct, true);
  assert.deepEqual(result.state, { ...state, score: 1 });
  assert.deepEqual(state, { questions: [{ answer: 1 }], current: 0, score: 0 });
});

test("answerQuestion keeps score for an incorrect answer", () => {
  const state = { questions: [{ answer: 1 }], current: 0, score: 2 };
  const result = answerQuestion(state, 0);

  assert.equal(result.correct, false);
  assert.deepEqual(result.state, state);
  assert.notEqual(result.state, state);
});

test("answerQuestion reports incorrect for an empty quiz", () => {
  const state = createQuiz([]);
  const result = answerQuestion(state, 0);

  assert.equal(result.correct, false);
  assert.deepEqual(result.state, state);
});

test("advanceQuiz moves to the next question without mutating state", () => {
  const state = createQuiz([{ answer: 0 }, { answer: 1 }]);
  const nextState = advanceQuiz(state);

  assert.equal(nextState.current, 1);
  assert.equal(state.current, 0);
});

test("advanceQuiz stays at the end for an empty quiz", () => {
  const state = createQuiz([]);

  assert.equal(advanceQuiz(state).current, 0);
});

test("isQuizFinished returns false before the final question", () => {
  assert.equal(isQuizFinished(createQuiz([{ answer: 0 }])), false);
});

test("isQuizFinished returns true at the end of a quiz", () => {
  const state = advanceQuiz(createQuiz([{ answer: 0 }]));

  assert.equal(isQuizFinished(state), true);
});

test("isQuizFinished returns true for an empty quiz", () => {
  assert.equal(isQuizFinished(createQuiz([])), true);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("isNewBestScore returns true when no best score exists", () => {
  assert.equal(isNewBestScore(0, null), true);
});

test("isNewBestScore returns true when the current score is higher", () => {
  assert.equal(isNewBestScore(100, 99), true);
});

test("isNewBestScore returns false when the current score ties the best", () => {
  assert.equal(isNewBestScore(67, 67), false);
});

test("isNewBestScore returns false when the current score is lower", () => {
  assert.equal(isNewBestScore(0, 100), false);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getGrade gives an A at the 90% boundary", () => {
  assert.equal(getGrade(90), "A");
  assert.equal(getGrade(89), "B");
});

test("getGrade gives a B at the 75% boundary", () => {
  assert.equal(getGrade(75), "B");
  assert.equal(getGrade(74), "C");
});

test("getGrade gives a C at the 50% boundary", () => {
  assert.equal(getGrade(50), "C");
  assert.equal(getGrade(49), "Keep practicing");
});

test("getFeedbackMessage returns the correct message for a correct answer", () => {
  assert.equal(getFeedbackMessage(true), "Correct!");
});

test("getFeedbackMessage returns the incorrect message for a wrong answer", () => {
  assert.equal(getFeedbackMessage(false), "Not quite. The correct answer is highlighted.");
});

test("getFeedbackMessage treats null as an incorrect answer", () => {
  assert.equal(getFeedbackMessage(null), "Not quite. The correct answer is highlighted.");
});

test("formatTimeLeft formats positive seconds", () => {
  assert.equal(formatTimeLeft(12), "⏱ 12s");
});

test("formatTimeLeft rounds fractional seconds up", () => {
  assert.equal(formatTimeLeft(1.2), "⏱ 2s");
});

test("formatTimeLeft clamps expired and negative values to zero", () => {
  assert.equal(formatTimeLeft(0), "⏱ 0s");
  assert.equal(formatTimeLeft(-1), "⏱ 0s");
});

test("formatTimeLeft treats null as zero", () => {
  assert.equal(formatTimeLeft(null), "⏱ 0s");
});
