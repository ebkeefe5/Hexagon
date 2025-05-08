//return a list of open spots in each player's most central shortest path next to an already claimed spot on the path
//also return double bridges if there is a viable double bridge on each side of the path

function getOpenCentralMoves(board)
{
  let topBridgeHex = null; //highest red hex row 1
  let bottomBridgeHex = null; //lowest red hex above row 9
  var redShortestPath = getRedShortestPath(board);
  var redOpenSpot = [];

  for (let i = 0; i < redShortestPath.length; i++)
  {
    const entry = redShortestPath[i];
    var adj = false;
    if (i > 0 && board[redShortestPath[i-1].y][redShortestPath[i-1].x] == 1)
      adj = true;
    if (i < redShortestPath.length - 1 && board[redShortestPath[i+1].y][redShortestPath[i+1].x] == 1)
      adj = true;

    if (board[entry.y][entry.x] != 1 && adj)
      redOpenSpot.push(entry);
    else if (board[entry.y][entry.x] == 1)
    {
      if ((entry.y > 1 && topBridgeHex == null)
        || entry.y > 1 && entry.y < topBridgeHex.y)
      topBridgeHex = entry;
      if ((entry.y < 9 && bottomBridgeHex == null)
        || entry.y < 9 && entry.y > bottomBridgeHex.y)
      bottomBridgeHex = entry;
    }
  }
  if (topBridgeHex != null
    && topBridgeHex.x + 1 < 11
      && board[topBridgeHex.y - 2][topBridgeHex.x + 1] == 0)
    redOpenSpot.push({x:topBridgeHex.x + 1, y:topBridgeHex.y - 2})
  if (bottomBridgeHex != null
    && bottomBridgeHex.x - 1 >= 0
      && board[bottomBridgeHex.y + 2][bottomBridgeHex.x  - 1] == 0)
    redOpenSpot.push({x:bottomBridgeHex.x  - 1, y:bottomBridgeHex.y + 2})

  pushCentralSpotIfNeeded(board, redOpenSpot, redShortestPath);

  let rightBridgeHex = null; //right most blue hex before col 9
  let leftBridgeHex = null; //left most blue hex after col 1
  var blueShortestPath = getBlueShortestPath(board);
  var blueOpenSpot = [];
  for (let i = 0; i < blueShortestPath.length; i++)
  {
    const entry = blueShortestPath[i];
    var adj = false;
    if (i > 0 && board[blueShortestPath[i-1].y][blueShortestPath[i-1].x] == 2)
      adj = true;
    if (i < blueShortestPath.length - 1 && board[blueShortestPath[i+1].y][blueShortestPath[i+1].x] == 2)
      adj = true;

    if (board[entry.y][entry.x] != 2
      && adj)
      blueOpenSpot.push(entry);
    else if (board[entry.y][entry.x] == 2)
    {
      if ((entry.x > 1 && leftBridgeHex == null)
        || entry.x > 1 && entry.x < leftBridgeHex.x)
      leftBridgeHex = entry;
      if ((entry.x < 9 && rightBridgeHex == null)
        || entry.x < 9 && entry.x > rightBridgeHex.x)
      rightBridgeHex = entry;
    }
  }

  //leftBridgeHex.x - 2
  //leftBridgeHex.y + 1

  if (leftBridgeHex != null
    && leftBridgeHex.y + 1 < 11
      && board[leftBridgeHex.y + 1][leftBridgeHex.x - 2] == 0)
    blueOpenSpot.push({x:leftBridgeHex.x - 2, y:leftBridgeHex.y + 1})
  if (rightBridgeHex != null
    && rightBridgeHex.y - 1 >= 0
      && board[rightBridgeHex.y - 1][rightBridgeHex.x + 2] == 0)
    blueOpenSpot.push({x:rightBridgeHex.x + 2, y:rightBridgeHex.y - 1})

  pushCentralSpotIfNeeded(board, blueOpenSpot, blueShortestPath);

  let allOpenSpots = new Set([...redOpenSpot, ...blueOpenSpot]);
  return allOpenSpots;
}

//if viable spots were found push the most central open spot
function pushCentralSpotIfNeeded(board, openSpots, shortestPath)
{
  if (openSpots.length == 0)
  {
    var lowIndex = Math.floor(shortestPath.length/2);
    var highIndex = Math.floor(shortestPath.length/2 + 1);
    while (true)
    {   
      if (lowIndex >= 0 && board[shortestPath[lowIndex].y][shortestPath[lowIndex].x] == 0)
      {
        openSpots.push(shortestPath[lowIndex]);
        break;
      }
      
      if (highIndex < shortestPath.length && board[shortestPath[lowIndex].y][shortestPath[lowIndex].x] == 0)
      {
        openSpots.push(shortestPath[highIndex]);
        break;
      }
      lowIndex--;
      highIndex ++;
      if (lowIndex < 0 || highIndex >= shortestPath.length)
        break;   
    }
  }
}