var visitedBlueBoard = null; 
var pathBlueBoard = null;
var size;

function checkWinBoardPlayer2(board)
{
	visitedBlueBoard = JSON.parse(JSON.stringify(board)); 
	pathBlueBoard = JSON.parse(JSON.stringify(board)); 
	size = visitedBlueBoard.length;

	for (var row = 0; row < visitedBlueBoard.length; row++)
	{
		var winningPath = new Array();
		if (visitedBlueBoard[row][0] == 2 && checkWinPlayer2(row, 0, winningPath))
		{
			markPath2(winningPath);
			return pathBlueBoard;
		}
	}

	return null;
}

function checkWinPlayer2(row, col, path)
{
	if (row < 0 || row >= size || col < 0 || col >= size || visitedBlueBoard[row][col] != 2)
		return false;

	visitedBlueBoard[row][col] = 3;
	path.push([row, col]);

	if (col == size - 1)
		return true;

	const directions = [[0, -1], [1, -1], 
						[-1, 0], [1, 0], 
						[-1, 1], [0, 1]];
    for (const [di, dj] of directions) {
    	if (checkWinPlayer2(row + di, col + dj, path))
    		return true;
    }

  	path.pop();
  	return false;	
}

function markPath2(path)
{
	for (var i = 0; i < path.length; i++) {
    	pathBlueBoard[path[i][0]][path[i][1]] = 4;
	}
}