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
  return {
    square: [row, column],
    adjacencies: [],
    visited: false,
    populateAdjacencies,
  };
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
  const getNode = function (coordinates) {
    for (let node of this.boardArray) {
      if (node.square === coordinates) {
        return node;
      }
    }
  };
  return { boardArray: buildBoard(), getNode };
};

// driver script
const board1 = Board();
for (let node of board1.boardArray) {
  //console.log(node.square);
  node.adjacencies = node.populateAdjacencies();
  for (let adjacency of node.adjacencies) {
    //console.log(adjacency);
  }
}

const getNode = function (coordinates) {
  for (let node of board1.boardArray) {
    if (JSON.stringify(node.square) === JSON.stringify(coordinates)) {
      return node;
    }
  }
};

const removeAllVisitedStatus = function () {
  for (let node of board1.boardArray) {
    node.visited = false;
  }
};

function levelOrder(start) {
  let startNode = getNode(start);
  let queue = [];
  let results = [];
  queue.push(startNode);
  startNode.visited = true;
  while (queue[0]) {
    let currentNode = queue[0];
    results.push(queue.shift().square);
    if (currentNode.adjacencies) {
      for (let adjacency of currentNode.adjacencies) {
        if (getNode(adjacency).visited === false) {
          queue.push(getNode(adjacency));
          getNode(adjacency).visited = true;
        }
      }
    }
  }
  removeAllVisitedStatus();
  return results;
}

// I know that I am only one move away from finishing when the current node and end node
// share an adjacency.
// I can take my level order array and iterate until a node shares an adjacency with my end node.
// Then, I can take that adjacency and find an adjacency to that adjacency that has a lower index. Then
// I can repeat the process until I reach the start node. This works because I know that any adjacency
// with a lower index than the current node must be "closer" to the start node, due to the fact that
// the array is in level-order
function knightMoves(start, end) {
  let startNode = getNode(start);
  let endNode = getNode(end);
  let levelOrderArray = levelOrder(start);
}

//console.log(knightMoves([0, 0], [7, 7]));
//console.log(getNode([0, 0]));

for (let item of levelOrder([0, 0])) {
  console.log(item);
}

console.log(board1.boardArray.length);
console.log(levelOrder([0, 0]).length);
