var visitedRedBoard = null; 
var pathRedBoard = null;
var size;

function checkWinBoardPlayer1(board)
{
	visitedRedBoard = JSON.parse(JSON.stringify(board)); 
	pathRedBoard = JSON.parse(JSON.stringify(board)); 
	size = visitedRedBoard.length;

	for (var col = 0; col < visitedRedBoard.length; col++)
	{
		var winningPath = new Array();
		if (visitedRedBoard[0][col] == 1 && checkWinPlayer1(0, col, winningPath))
		{
			markPath(winningPath);
			return pathRedBoard;
		}
	}

	return null;
}

function checkWinPlayer1(row, col, path)
{
	if (row < 0 || row >= size || col < 0 || col >= size || visitedRedBoard[row][col] != 1)
		return false;

	visitedRedBoard[row][col] = 3;
	path.push([row, col]);

	if (row == size - 1)
		return true;

	const directions = [[0, -1], [1, -1], 
						[-1, 0], [1, 0], 
						[-1, 1], [0, 1]];
    for (const [di, dj] of directions) {
    	if (checkWinPlayer1(row + di, col + dj, path))
    		return true;
    }

  	path.pop();
  	return false;	
}

function markPath(path)
{
	for (var i = 0; i < path.length; i++) {
    	pathRedBoard[path[i][0]][path[i][1]] = 3;
	}
}