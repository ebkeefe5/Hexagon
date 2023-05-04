//heuristic to estimate how good board state is for each player 
//#moves needed for red to win - #moves needed for blue to win
//red wants to minimize this number, blue wants to maximize this number
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
		console.log("tried to calculate heuristic on end state board");
		return 10000;
	}
	var doubleBridges = 0;
	var moves = 0;
	for (let i = 0; i < path.length; i++)
	{
		var entry = path[i];
		if (board[entry.y][entry.x] == 0)
			moves++;
    }
    return moves;
}