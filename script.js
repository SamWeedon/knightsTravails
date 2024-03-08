const squareNode = function (row, column) {
  // a node representing a square on the chess board

  const populateAdjacencies = function () {
    // populates the knight's adjacencies for a given space on the chess board
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
  // represents an 8x8 chess board

  const buildBoard = function () {
    // returns an array representing a chess board with 2-dimensional coordinates
    let boardArray = [];
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        boardArray.push(squareNode(row, column));
      }
    }
    return boardArray;
  };

  const boardArray = buildBoard();

  const initializeAdjacencyLists = function () {
    // create adjacency lists for all board nodes (invoked immediately)
    for (let node of boardArray) {
      node.adjacencies = node.populateAdjacencies();
    }
  };
  initializeAdjacencyLists();

  const removeAllVisitedStatus = function () {
    // sets "visited" property to false for all nodes
    for (let node of boardArray) {
      node.visited = false;
    }
  };

  const getNode = function (coordinates) {
    // returns a node given its coordinates eg. [0, 3]
    for (let node of boardArray) {
      if (JSON.stringify(node.square) === JSON.stringify(coordinates)) {
        return node;
      }
    }
  };

  return { boardArray, getNode, removeAllVisitedStatus };
};

// driver script
const board1 = Board();

const getNode = function (coordinates) {
  // returns a node given its coordinates eg. [0, 3]
  for (let node of board1.boardArray) {
    if (JSON.stringify(node.square) === JSON.stringify(coordinates)) {
      return node;
    }
  }
};

const removeAllVisitedStatus = function () {
  // sets "visited" property to false for all nodes
  for (let node of board1.boardArray) {
    node.visited = false;
  }
};

function levelOrder(start) {
  // return a level-order array when given the start node of a graph represented by adjacency lists
  let startNode = getNode(start);
  let queue = [];
  let results = [];
  queue.push(startNode);
  startNode.visited = true;
  while (queue[0]) {
    let currentNode = queue[0];
    results.push(queue.shift());
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

const findLowerIndexAdjacency = function (levelOrderArray, endIndex) {
  // returns the index of a lower-index-adjacency (in the context of a level-order representation
  // of the graph)
  for (let adjacency of levelOrderArray[endIndex].adjacencies) {
    if (levelOrderArray.indexOf(getNode(adjacency)) < endIndex) {
      return levelOrderArray.indexOf(getNode(adjacency));
    }
  }
};

function knightMoves(start, end) {
  // I can take my level order array and iterate until I reach the end node, saving its index.
  // Then, I can take that node and find an adjacency to that node that has a lower index.
  // I can repeat the process until I reach the start node. This works because I know that any adjacency
  // with a lower index than the current node must be "closer" to the start node, due to the fact that
  // the array is in level-order
  let pathArray = [end];
  let endNode = getNode(end);
  let levelOrderArray = levelOrder(start);
  let endIndex;

  // Find the index of the end node in the level-order array
  for (let i = 0; i < levelOrderArray.length; i++) {
    if (levelOrderArray[i] === endNode) {
      endIndex = i;
      break;
    }
  }

  // find the index of a lower-index-adjacency and add that coordinate to the start of the path,
  // until the start coordinate is reached
  while (endIndex !== 0) {
    endIndex = findLowerIndexAdjacency(levelOrderArray, endIndex);
    pathArray.unshift(levelOrderArray[endIndex].square);
  }
  return pathArray;
}

for (let item of knightMoves([0, 0], [7, 7])) {
  console.log(item);
}

console.log(board1.getNode([0, 0]));
