//return a list of open spots in each player's most central shortest path 
//basically we are narrowing down viable moves to improve runtime
function getOpenCentralMoves(board)
{
  let allOpenSpots = []
  var redShortestPath = getRedShortestPath(board);

  for (let i = 0; i < redShortestPath.length; i++)
  {
    const entry = redShortestPath[i];
    if (board[entry.y][entry.x] != 1)
      allOpenSpots.push(entry);
  }
  
  var blueShortestPath = getBlueShortestPath(board);
  for (let i = 0; i < blueShortestPath.length; i++)
  {
    const entry = blueShortestPath[i];
    if (board[entry.y][entry.x] != 2)
      allOpenSpots.push(entry);
  }

  pushCentralSpotIfNeeded(board, allOpenSpots, blueShortestPath);
  
  return allOpenSpots;
}

//if no viable spots were found push the most central open spot
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