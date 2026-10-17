// Quiz questions.
// "answer" is the index (starting at 0) of the correct option.
const QUESTIONS = [
  {
    question: "Which command creates a new Git branch and switches to it?",
    options: ["git branch -d", "git switch -c", "git merge", "git push -u"],
    answer: 1,
  },
  {
    question: "Which file does GitHub show as a repository's front page?",
    options: ["index.txt", "README.md", "HOME.md", "about.html"],
    answer: 1,
  },
  {
    question: "What does PR stand for on GitHub?",
    options: ["Pull request", "Push release", "Project review", "Public repository"],
    answer: 0,
  },
  {
    question: "In GitHub Copilot, which key accepts an inline suggestion?",
    options: ["Enter", "Esc", "Tab", "Shift"],
    answer: 2,
  },
  {
    question: "Which file gives Copilot custom instructions for a repository?",
    options: [".github/copilot-instructions.md", "copilot.json", ".vscode/ai.txt", "package.json"],
    answer: 0,
  },
  {
    question: "What does `git clone` do?",
    options: [
      "Deletes a repository",
      "Copies a remote repository to your computer",
      "Creates a new branch",
      "Merges two branches",
    ],
    answer: 1,
  },
  {
    question: "Which file defines a GitHub Actions workflow?",
    options: [
      ".github/workflows/ci.yml",
      ".github/actions.yml",
      ".git/workflows.yml",
      "workflow.json",
    ],
    answer: 0,
  },
  {
    question: "Which trigger runs a workflow when code is pushed?",
    options: ["release", "watch", "push", "delete"],
    answer: 2,
  },
  {
    question: "What is a reusable task inside a workflow called?",
    options: ["Runner", "Branch", "Issue", "Action"],
    answer: 3,
  },
  {
    question: "Which command shows your current branch and modified files?",
    options: ["git status", "git log", "git merge", "git clone"],
    answer: 0,
  },
  {
    question: "Which GitHub feature lets you review code before merging?",
    options: ["Issue", "Wiki", "Pull request", "Release"],
    answer: 2,
  },
  {
    question: "What does a GitHub Action typically execute?",
    options: ["A shell script or command", "A CSS animation", "A database backup", "A file rename"],
    answer: 0,
  },
];

// Lets Node.js tests load this file. Browsers ignore this block.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTIONS };
}
