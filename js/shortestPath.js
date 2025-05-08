//heuristic to estimate how good board state is for each player 
//#moves needed for red to win - #moves needed for blue to win
//red wants to minimize this number, blue wants to maximize this number

var size;

function getRedShortestPath(board)
{
  var trackBoard = JSON.parse(JSON.stringify(board)); //indexed as [row][col] or [yPos][xPos]
    var toVisit = new PriorityQueue(); //min heap of hexagons to explore
    size = trackBoard.length;
  for (var col = 0; col < trackBoard.length; col++)
  {
    insertHexagonRedWithParent(col, 0, trackBoard[0][col], 0, toVisit, trackBoard, null);
  }
  
  const directions = [[0, -1], [1, -1], 
            [-1, 0], [1, 0], 
            [-1, 1], [0, 1]];

  while(!toVisit.isEmpty())
  {
    var hex = toVisit.pop();
    if (hex.yPos == size - 1)
      return backTrack(hex);
    else
    {
      for (const [di, dj] of directions) 
      {
        var col = hex.xPos + di; var row = hex.yPos + dj;
          if (row >= 0 && row < size && col >= 0 && col < size)
          {
            insertHexagonRedWithParent(col, row, trackBoard[row][col], hex.stepsFromStart, toVisit, trackBoard, hex);
          }
        }
    }
  }
  return null;
}

function getBlueShortestPath(board)
{
  var trackBoard = JSON.parse(JSON.stringify(board)); //indexed as [row][col] or [yPos][xPos]
    var toVisit = new PriorityQueue(); //min heap of hexagons to explore
    size = trackBoard.length;
  for (var row = 0; row < trackBoard.length; row++)
  {
    insertHexagonBlueWithParent(0, row, trackBoard[row][0], 0, toVisit, trackBoard, null);
  }
  
  const directions = [[0, -1], [1, -1], 
            [-1, 0], [1, 0], 
            [-1, 1], [0, 1]];

  while(!toVisit.isEmpty())
  {
    var hex = toVisit.pop();
    if (hex.xPos == size - 1)
      return backTrack(hex);
    else
    {
      for (const [di, dj] of directions) 
      {
        var col = hex.xPos + di; var row = hex.yPos + dj;
          if (row >= 0 && row < size && col >= 0 && col < size)
          {
            insertHexagonBlueWithParent(col, row, trackBoard[row][col], hex.stepsFromStart, toVisit, trackBoard, hex);
          }
        }
    }
  }
  return null;
}

function insertHexagonRedWithParent(xPos, yPos, value, steps, toVisit, trackBoard, parent)
{
  if (value == -1 || value == 2) //red cannot move where blue has moved or on an illegal move
    return;
  else if (value == 0)
  {
    trackBoard[yPos][xPos] = -1
    toVisit.push({xPos: xPos, yPos: yPos, stepsFromStart: steps + 1, parent:parent});
  }
  else if (value == 1)
  {
    trackBoard[yPos][xPos] = -1
    toVisit.push({xPos: xPos, yPos: yPos, stepsFromStart: steps, parent:parent});
  }
} 

function insertHexagonBlueWithParent(xPos, yPos, value, steps, toVisit, trackBoard, parent)
{
  if (value == -1 || value == 1) //red cannot move where blue has moved or on an illegal move
    return;
  else if (value == 0)
  {
    trackBoard[yPos][xPos] = -1
    toVisit.push({xPos: xPos, yPos: yPos, stepsFromStart: steps + 1, parent:parent});
  }
  else if (value == 2)
  {
    trackBoard[yPos][xPos] = -1
    toVisit.push({xPos: xPos, yPos: yPos, stepsFromStart: steps, parent:parent});
  }
} 

function backTrack(hex)
{
  var path = [{x:hex.xPos, y:hex.yPos}];
  var current = hex;
  while (current.parent) {
    path.push({x:current.parent.xPos, y:current.parent.yPos});
    current = current.parent;
  }
  return path;   
}