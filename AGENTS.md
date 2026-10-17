# Project Instructions

- Keep the app in plain JavaScript; do not add frameworks, build tools, or npm dependencies.
- Keep quiz/domain logic pure and DOM-free in `src/quiz.js`; retain its CommonJS exports for Node tests and browser compatibility.
- Put browser state, event handling, and DOM updates in `src/app.js`.
- Preserve the classic-script loading order in `src/index.html`; the app has no bundler or module loader.
- Add or update logic tests with Node's built-in `node:test` in `tests/`; run them with `npm test`.
- In Windows PowerShell, use `npm.cmd test` if execution policy blocks the `npm.ps1` shim.
- Define UI colors as CSS custom properties in `:root` in `src/style.css`; reference those variables instead of hardcoding colors elsewhere.
- Keep the UI accessible: use semantic elements and buttons for actions, provide visible keyboard focus, and use `aria-live` for changing messages.
- See [README.md](README.md) for project setup and [workshops/vscode.md](workshops/vscode.md) for the guided workflow.
