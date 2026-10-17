// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { shuffle, isCorrect, calculatePercentage, getGrade, formatTimeLeft } = require("../src/quiz.js");

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getGrade gives an A for exactly 90%", () => {
  assert.equal(getGrade(90), "A");
});

test("getGrade includes the B and C thresholds", () => {
  assert.equal(getGrade(75), "B");
  assert.equal(getGrade(50), "C");
});

test("formatTimeLeft formats positive seconds", () => {
  assert.equal(formatTimeLeft(12), "⏱ 12s");
});

test("formatTimeLeft clamps expired and negative values to zero", () => {
  assert.equal(formatTimeLeft(0), "⏱ 0s");
  assert.equal(formatTimeLeft(-1), "⏱ 0s");
});

test("formatTimeLeft treats null as zero", () => {
  assert.equal(formatTimeLeft(null), "⏱ 0s");
});
