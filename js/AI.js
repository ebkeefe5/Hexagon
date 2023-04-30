function moveAI(board)
{
  moveAIAtDepth(1);
}

function moveAILevel2(board) {
  moveAIAtDepth(2); 
}

function moveAILevel3(board)
{
  moveAIAtDepth(3);
}

function minMax(boardCopy, depth, maximizingPlayer, alpha, beta) {
  if (depth === 0){
    return calculateHeuristic(boardCopy);
  }

  if (maximizingPlayer) {
    let bestValue = -Infinity;
    //TODO only check if game over if at least 11 moves
    if ((AIPlayerNumber == 1 && checkWinBoardPlayer2(boardCopy)) 
      || (AIPlayerNumber == 2 && checkWinBoardPlayer1(boardCopy)))
      return -Infinity;
    let openMoves = getOpenCentralMoves(boardCopy);
    for (let openMove of openMoves){
      let row = openMove.y;
      let col = openMove.x;
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
        let value = minMax(copy, depth - 1, true);
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

//return a list of open spots in each player's most central shortest path
//TODO the list of potential moves can be a lot smarter
function getOpenCentralMoves(board)
{
  let topBridgeHex = null; //highest red hex row 1  
  let bottomBridgeHex = null; //lowest red hex above row 9
  var redShortestPath = getRedShortestPath(board);
  var redOpenSpot = [];
  for (let entry of redShortestPath)
  {
    if (board[entry.y][entry.x] != 1)
      redOpenSpot.push(entry);
    else
    {
      if ((entry.y > 1 && topBridgeHex == null) 
        || entry.y > 1 && entry.y < topBridgeHex.y)
      topBridgeHex = entry;
      if ((entry.y < 9 && bottomBridgeHex == null) 
        || entry.y < 9 && entry.y > bottomBridgeHex.y)
      bottomBridgeHex = entry;
    }
  }
  if (topBridgeHex != null)
    console.log("topBridgeHex: " + topBridgeHex.x + " " + topBridgeHex.y);
  if (bottomBridgeHex != null)
    console.log("bottomBridgeHex: " + bottomBridgeHex.x + " " + bottomBridgeHex.y);

  let rightBridgeHex = null; //right most blue hex before col 9
  let leftBridgeHex = null; //left most blue hex after col 1
  var blueShortestPath = getBlueShortestPath(board);
  var blueOpenSpot = [];  
  for (let entry of blueShortestPath)
  {
    if (board[entry.y][entry.x] != 2)
      blueOpenSpot.push(entry);
  }

  //
  //blue two hexagons right, one hexagon up
  //two hexagons left, one hexagon down

  let allOpenSpots = new Set([...redOpenSpot, ...blueOpenSpot]);
  return allOpenSpots;
}