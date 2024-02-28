function knightMoves(start, end) {
  let squares = [];
  return squares;
}

const squareNode = function (row, column) {
  const populateAdjacencies = function () {
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

    adjacencyList = adjacencyList.filter((adjacency) => {
      if (
        adjacency[0] > -1 &&
        adjacency[0] < 8 &&
        adjacency[1] > -1 &&
        adjacency[1] < 8
      ) {
        return adjacency;
      }
    });
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
  node.adjacencies = node.populateAdjacencies();
  for (let adjacency of node.adjacencies) {
    console.log(adjacency);
  }
}
