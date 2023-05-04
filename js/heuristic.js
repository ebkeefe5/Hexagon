//heuristic to estimate how good board state is for each player 
//#moves needed for red to win - #moves needed for blue to win
//red wants to minimize this number, blue wants to maximize this number
//TO DO update heurstic to account for double bridges

var size;

const doubleBridges = new Map([
  ['-1,-1', { hex1: { x: 0, y: -1 }, hex2: { x: -1, y: 0 } }],
  ['1,-2', { hex1: { x: 1, y: -1 }, hex2: { x: 0, y: -1 } }],
  ['2,-1', { hex1: { x: 1, y: 0 }, hex2: { x: 1, y: -1 } }],
  ['1,1', { hex1: { x: 1, y: 0 }, hex2: { x: 0, y: 1 } }],
  ['-1,2', { hex1: { x: -1, y: 1 }, hex2: { x: 0, y: 1 } }],
  ['-2,1', { hex1: { x: -1, y: 0 }, hex2: { x: -1, y: 1 } }]
]);


function calculateRedMovesToWin(board)
{
	var redShortestPath = getRedShortestPath(board);
	return getHeuristicScore(redShortestPath, board);
}

function calculateBlueMovesToWin(board)
{
	var blueShortestPath = getBlueShortestPath(board);
	return getHeuristicScore(blueShortestPath, board);
}

function getHeuristicScore(path, board)
{
	if (path == null)
	{
		console.log(board);
		console.log("error trying to calculate red moves left to win game");
		return 10000;
	}
	var doubleBridges = 0;
	var moves = 0;
	var lastEntry = null; //last filled spot
	for (let i = 0; i < path.length; i++)
	{
		var entry = path[i];
		if (isDoubleBridge(entry, lastEntry, board))
			doubleBridges ++;
		
		if (board[entry.y][entry.x] == 0)
			moves++;
		else
			lastEntry = entry;
    }
    if (moves <= 1)
    	return moves;
    return moves - 0.01 * doubleBridges;
}

function isDoubleBridge(entry, lastEntry, board)
{
	if (lastEntry == null 
		|| board[lastEntry.y][lastEntry.x] == 0
			|| board[entry.y][entry.x] == 0)
		return false;

	var changeX = lastEntry.x - entry.x;
	var changeY = lastEntry.y - entry.y;
	const key = getKey(changeX, changeY);
	
	const doubleBridge = doubleBridges.get(key);
	if (doubleBridge === undefined)
		return false;

	var hex1 = doubleBridge.hex1;
	var hex2 = doubleBridge.hex2;

	return board[entry.y + hex1.y][entry.x + hex1.x] == 0 
		&& board[entry.y + hex2.y][entry.x + hex2.x] == 0;
}

function getKey(x, y) {
  return `${x},${y}`;
}