let game = (function() {

  const board = document.querySelector(".board");
  const boxes = document.querySelectorAll(".box");
  
  const winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [7, 5, 3]
  ];

  board.classList.add("x");

  boxes.forEach(box => {
    box.addEventListener("click", setSymbol, {once: true});
  });

  function setSymbol() {
    let symbol = "x";
    if(board.classList.contains("o")) {
      symbol = "o";
    }
    this.classList.add(symbol);

    switchTurn();
    if(evaluateWin(symbol)) {
      console.log(symbol.toUpperCase() + " won the game!");
    }
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
})();