var visitedRedBoard = null; 
var size;
//TODO keep track of the parent of each node and use a back traking algorithm to isolate the path 

function checkWinBoardPlayer1(board)
{
	visitedRedBoard = JSON.parse(JSON.stringify(board)); 
	size = visitedRedBoard.length;

	for (var col = 0; col < visitedRedBoard.length; col++)
	{
		if (visitedRedBoard[0][col] == 1 && checkWinPlayer1(0, col))
			return visitedRedBoard;
	}

	return null;
}

function checkWinPlayer1(row, col)
{
	if (row < 0 || row >= size || col < 0 || col >= size || visitedRedBoard[row][col] != 1)
		return false;

	visitedRedBoard[row][col] = 3;

	if (row == size - 1)
		return true;

	const directions = [[-1, -1], [-1, -0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (const [di, dj] of directions) {
    	if (checkWinPlayer1(row + di, col + dj))
      		return true;
  	}
}