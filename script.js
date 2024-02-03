const game = (function() {
  const board = document.querySelector(".board");
  board.classList.add("x");

  const boxes = document.querySelectorAll(".box");
  boxes.forEach(box => {
    box.addEventListener("click", setSymbol, {once: true});
  });

  const resetButton = document.querySelector(".overlay button");
  resetButton.addEventListener("click", resetGame);

  function setSymbol() {
    const symbol = board.classList.contains("x") ? "x" : "o";
    this.classList.add(symbol);

    if(evaluateWin(symbol)) {
      const message = symbol.toUpperCase() + " won the game!"
      showOverlay(message);
      return;
    }

    if(evaluateDraw()) {
      const message = "Draw!"
      showOverlay(message);
      return;
    }

    switchTurn();
  }

  function switchTurn() {
    board.classList.toggle("x");
    board.classList.toggle("o");
  }

  function evaluateWin(symbol) {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ];

    return winCombinations.some(combination => {
      return combination.every(index => {
        return boxes[index].classList.contains(symbol);
      });
    });
  }

  function evaluateDraw() {
    return [...boxes].every(box => {
      return box.classList.contains("x") || box.classList.contains("o");
    });
  }

  function showOverlay(message) {
    const overlay = document.querySelector(".overlay");
    const overlayMessage = overlay.querySelector("p");
    overlayMessage.innerText = message;
    overlay.classList.toggle("display");
  }

  function resetGame() {
    location.reload();
  }
})();