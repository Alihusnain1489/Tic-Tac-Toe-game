const TicTac = {
  gamePlayer: "X", 
  state: Array(9).fill(null),
  gameOver: false,

  start() {
      this.gameBoard();
          document.getElementById("reset")
          .addEventListener("click", () => this.reset());
  },

  gameBoard() {
      const board = document.getElementById("board");
      board.innerHTML = ""; 
      this.state.forEach((_, i) => {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          cell.dataset.index = i;
          board.appendChild(cell);
      });
      board.addEventListener("click", (e) => this.handleClick(e));
      this.uMessage(`Player ${this.gamePlayer}'s turn`);
  },

  handleClick(e) {
      const cell = e.target;
      const i = cell.dataset.index;

      if (this.gameOver || !cell.classList.contains("cell") || this.state[i])
          return;

      this.state[i] = this.gamePlayer;
      cell.textContent = this.gamePlayer;
      cell.classList.add("taken");

      const winCombo = this.checkWin();
      if (winCombo) {
          this.highlight(winCombo);
          this.uMessage(`Player ${this.gamePlayer} wins!`);
          this.gameOver = true;
      } else if (this.state.every((cell) => cell)) {
          this.uMessage("It's a tie!");
          this.gameOver = true;
      } else {
          this.gamePlayer = this.gamePlayer === "X" ? "O" : "X";
          this.uMessage(`Player ${this.gamePlayer}'s turn`);
      }
  },
  checkWin() {
      const wins = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8], 
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8], 
          [0, 4, 8],
          [2, 4, 6], 
      ];
      return wins.find((combo) =>
          combo.every((i) => this.state[i] === this.gamePlayer)
      );
  },

  highlight(combo) {
      combo.forEach((i) => {
          document.getElementById("board").children[i].style.color = "#3b91e7";
      });
  },

  reset() {
      this.state = Array(9).fill(null);
      this.gamePlayer = "X";
      this.gameOver = false;
      this.gameBoard();
  },

  uMessage(msg) {
      document.getElementById("message").textContent = msg;
  },
};

TicTac.start();