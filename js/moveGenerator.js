//return a list of open spots in each player's most central shortest path next to an already claimed spot on the path
function getOpenCentralMoves(board)
{
  var redShortestPath = getRedShortestPath(board);
  var redOpenSpot = [];

  for (let i = 0; i < redShortestPath.length; i++)
  {
    const entry = redShortestPath[i];

    if (board[entry.y][entry.x] == 0)
      redOpenSpot.push(entry);
  }

  pushCentralSpotIfNeeded(board, redOpenSpot, redShortestPath);

  var blueShortestPath = getBlueShortestPath(board);
  var blueOpenSpot = [];
  for (let i = 0; i < blueShortestPath.length; i++)
  {
    const entry = blueShortestPath[i];

    if (board[entry.y][entry.x] == 0)
      blueOpenSpot.push(entry);
  }

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