//idea use a min-max algorithm to be able to play at an intermediate level
//idea from http://web.stanford.edu/class/archive/cs/cs221/cs221.1192/2018/restricted/posters/eliew/poster.pdf 
function moveAI(board)
{
  if (turn != AIPlayerNumber)
    return;

  var bestHeuristicValue = 100000;
  var bestMove = {y: 0, x: 0}
  for (var row = 0; row < board.length; row++)
  {
    for (var col = 0; col < board[row].length; col++)
    {
       if (board[row][col] == 0)
       {
         copy = JSON.parse(JSON.stringify(board)); 
         copy[row][col] = AIPlayerNumber;
         heuristic = calculateHeuristic(copy);
         if (heuristic < bestHeuristicValue
          || (heuristic == bestHeuristicValue && moreCentral(bestMove.x, bestMove.y, col, row)))
         {
            bestHeuristicValue = heuristic;
            bestMove = {y: row, x: col};
         }
       }
    }
  }
  board[bestMove.y][bestMove.x] = AIPlayerNumber;
}

function moveAILevel2()
{

}

function moveAILevel3()
{

}

function moreCentral(oldX, oldY, newX, newY)
{
  var newDistanceFromCenter = Math.abs(5 - newX)  + Math.abs(5 - newY);
  var oldDistanceFromCenter = Math.abs(5 - oldX)  + Math.abs(5 - oldY);
  return newDistanceFromCenter < oldDistanceFromCenter;
}

function calculateHeuristic(board)
{
  if (AIPlayerNumber == 1)
    return calculateRedMovesToWin(board) - calculateBlueMovesToWin(board);
  else if (AIPlayerNumber == 2)
    return calculateBlueMovesToWin(board) - calculateRedMovesToWin(board);
}

