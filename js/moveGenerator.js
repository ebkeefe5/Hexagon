//return a list of open spots in each player's most central shortest path next to an already claimed spot on the path
//also return double bridges if there is a viable double bridge on each side of the path
function getOpenCentralMoves(board)
{
  let topBridgeHex = null; //highest red hex row 1
  let bottomBridgeHex = null; //lowest red hex above row 9
  var redShortestPath = getRedShortestPath(board);
  var redOpenSpot = [];

  let lastClaimedY = -10;
  for (let entry of redShortestPath)
  {
    if (board[entry.y][entry.x] != 1
      && (entry.y == lastClaimedY + 1 || entry.y == lastClaimedY - 1))
      redOpenSpot.push(entry);
    else if (board[entry.y][entry.x] == 1)
    {
      if ((entry.y > 1 && topBridgeHex == null)
        || entry.y > 1 && entry.y < topBridgeHex.y)
      topBridgeHex = entry;
      if ((entry.y < 9 && bottomBridgeHex == null)
        || entry.y < 9 && entry.y > bottomBridgeHex.y)
      bottomBridgeHex = entry;
      lastClaimedY = entry.y;
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
  let lastClaimedX = -10;
  for (let entry of blueShortestPath)
  {
    if (board[entry.y][entry.x] != 2
      && (entry.x == lastClaimedX + 1 || entry.x == lastClaimedX - 1))
      blueOpenSpot.push(entry);
    else if (board[entry.y][entry.x] == 2)
    {
      lastClaimedX = entry.x;
    }
  }

  //
  //blue two hexagons right, one hexagon up
  //two hexagons left, one hexagon down

  let allOpenSpots = new Set([...redOpenSpot, ...blueOpenSpot]);
  return allOpenSpots;
}
