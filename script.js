function knightMoves(start, end) {
  let squares = [];
  return squares;
}

const squareNode = function (row, column) {
  return { square: [row, column], adjacencies: [] };
};

const Board = function () {
  const buildBoard = function () {
    let boardArray = [];
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        boardArray.push(squareNode(row, column));
      }
    }
    return boardArray;
  };
  return { boardArray: buildBoard() };
};

// driver script
const board1 = Board();
for (let node of board1.boardArray) {
  console.log(node.square);
}
