function knightMoves(start, end) {
  let squares = [];
  return squares;
}

const squareNode = function (row, column) {
  const populateAdjacencies = function (board) {
    let adjacencyList = [
      [row + 1, column + 2],
      [row + 2, column + 1],
      [row - 1, column + 2],
      [row - 2, column + 1],
      [row - 2, column - 1],
      [row - 1, column - 2],
      [row + 1, column - 2],
      [row + 2, column - 1],
    ];
    for (let adjacency of adjacencyList) {
      if (!board.includes(adjacency)) {
        adjacencyList.splice(adjacencyList.indexOf(adjacency), 1);
      }
    }
    return adjacencyList;
  };
  return { square: [row, column], adjacencies: [], populateAdjacencies };
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
  node.adjacencies = node.populateAdjacencies(board1.boardArray);
  for (let adjacency of node.adjacencies) {
    console.log(adjacency);
  }
}
