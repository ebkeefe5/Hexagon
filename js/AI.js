function moveAI(board)
{
  if (turn != AIPlayerNumber)
    return;

  let openMoves = Array.from(getOpenCentralMoves(board));
  const randomIndex = Math.floor(Math.random() * openMoves.length);
  let bestMove = openMoves[randomIndex];
  board[bestMove.y][bestMove.x] = AIPlayerNumber;
}

function moveAILevel2(board) {
  moveAIAtDepth(1);
}

function moveAILevel3(board)
{
  moveAIAtDepth(4);
}

function minMax(boardCopy, depth, maximizingPlayer, alpha, beta) {
  
  if (maximizingPlayer) {
    if ((AIPlayerNumber == 1 && checkWinBoardPlayer2(boardCopy))
      || (AIPlayerNumber == 2 && checkWinBoardPlayer1(boardCopy)))
      return -Infinity;
  }
  else
  {
    if ((playerNumber == 1 && checkWinBoardPlayer2(boardCopy))
      || (playerNumber == 2 && checkWinBoardPlayer1(boardCopy)))
      return Infinity;
  }
     
  if (depth === 0){
    return calculateHeuristic(boardCopy);
  }

  if (maximizingPlayer) {
    let bestValue = -Infinity;
    //TODO only check if game over if at least 11 moves
    let openMoves = getOpenCentralMoves(boardCopy);
    for (let openMove of openMoves){
      let row = openMove.y;
      let col = openMove.x;
      if (boardCopy[row][col] != 0)
        continue;
      copy = JSON.parse(JSON.stringify(boardCopy));
      copy[row][col] = AIPlayerNumber;
      let value = minMax(copy, depth - 1, false, alpha, beta);
      bestValue = Math.max(bestValue, value);
      alpha = Math.max(alpha, value);
      if (beta <= alpha) {
        break;
      }
    }
    return bestValue;
  } else {
    //TODO only check if game over if at least 11 moves
    if ((playerNumber == 1 && checkWinBoardPlayer2(boardCopy))
      || (playerNumber == 2 && checkWinBoardPlayer1(boardCopy)))
      return Infinity;
    let bestValue = Infinity;
    let openMoves = getOpenCentralMoves(boardCopy);
    for (let openMove of openMoves){
      let row = openMove.y;
      let col = openMove.x;
        if (boardCopy[row][col] != 0)
          continue;
        copy = JSON.parse(JSON.stringify(boardCopy));
        copy[row][col] = playerNumber;
        let value = minMax(copy, depth - 1, true, alpha, beta);
        bestValue = Math.min(bestValue, value);
        beta = Math.min(beta, value);
        if (beta <= alpha) {
          break;
        }
    }
    return bestValue;
  }
}

function moveAIAtDepth(depthLevel)
{
  if (turn != AIPlayerNumber)
    return;

  var bestMove = {y: 0, x: 0}
  let bestValue = -Infinity;
  let alpha = -Infinity;
  let beta = Infinity;
  let depth = depthLevel; //in order to further increase this depth,
  let openMoves = getOpenCentralMoves(board);
  for (let openMove of openMoves){
    let row = openMove.y;
    let col = openMove.x;
    if (board[row][col] != 0)
      continue;
    copy = JSON.parse(JSON.stringify(board));
    copy[row][col] = AIPlayerNumber;
    let value = minMax(copy, depth - 1, false, alpha, beta);
    if (value > bestValue)
     {
      bestValue = value;
      bestMove = {y: row, x:col}};

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
