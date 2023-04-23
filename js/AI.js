function moveAI(board)
{
  moveAIAtDepth(1);
}

function minMax(boardCopy, depth, maximizingPlayer, alpha, beta) {
  if (depth === 0){ //|| isGameOver(board)) {
    return calculateHeuristic(boardCopy);
  }

  if (maximizingPlayer) {
    let bestValue = -Infinity;
    for (var row = 0; row < boardCopy.length; row++)
    {
      for (var col = 0; col < boardCopy[row].length; col++)
      {
        if (boardCopy[row][col] != 0)
          continue;
        copy = JSON.parse(JSON.stringify(boardCopy)); 
        copy[row][col] = AIPlayerNumber;
        let value = minMax(copy, depth - 1, false);
        bestValue = Math.max(bestValue, value);
        alpha = Math.max(alpha, value);
        if (beta <= alpha) {
          break; 
        }
      }
    }
    return bestValue;
  } else {
    let bestValue = Infinity;
    for (var row = 0; row < boardCopy.length; row++)
    {
      for (var col = 0; col < boardCopy[row].length; col++)
      {
        if (boardCopy[row][col] != 0)
          continue;
        copy = JSON.parse(JSON.stringify(boardCopy)); 
        copy[row][col] = playerNumber;
        let value = minMax(copy, depth - 1, true);
        bestValue = Math.min(bestValue, value);
        beta = Math.min(beta, value);
        if (beta <= alpha) {
          break; 
        }
      }
    }
    return bestValue;
  }
}

function moveAILevel2() {
  moveAIAtDepth(2); 
}

//not supported yet
function moveAILevel3()
{
  //moveAIAtDepth(3);
}

//due to exploring moves in random order alpha beta pruning is not effective
//consider
  //find moves in shortest path
  //explore those moves first
  //explore more central moves next
function moveAIAtDepth(depthLevel)
{
  if (turn != AIPlayerNumber)
    return;

  var bestMove = {y: 0, x: 0}
  let bestValue = -Infinity;
  let alpha = -Infinity;
  let beta = Infinity;
  let depth = depthLevel; //in order to further increase this depth, 
  for (var row = 0; row < board.length; row++)
  {
    for (var col = 0; col < board[row].length; col++)
    {
      if (board[row][col] != 0)
        continue;
      copy = JSON.parse(JSON.stringify(board)); 
      copy[row][col] = AIPlayerNumber;
      let value = minMax(copy, depth - 1, false, alpha, beta);
      if (value > bestValue
          || (value == bestValue && moreCentral(bestMove.x, bestMove.y, col, row)))
       {
        bestValue = value;
        bestMove = {y: row, x:col}};
      }
  }
  board[bestMove.y][bestMove.x] = AIPlayerNumber;
}

function moreCentral(oldX, oldY, newX, newY)
{
  var newDistanceFromCenter = Math.abs(5 - newX)  + Math.abs(5 - newY);
  var oldDistanceFromCenter = Math.abs(5 - oldX)  + Math.abs(5 - oldY);
  return newDistanceFromCenter < oldDistanceFromCenter;
}

function calculateHeuristic(board)
{
  if (AIPlayerNumber == 2)
    return calculateRedMovesToWin(board) - calculateBlueMovesToWin(board);
  else if (AIPlayerNumber == 1)
    return calculateBlueMovesToWin(board) - calculateRedMovesToWin(board);
}