var winningPlayer1Board = null; 
var size;

//check for a winning path for player 1 and mark the path with 3s if so
function checkWinBoardPlayer1(board)
{
	winningPlayer1Board = JSON.parse(JSON.stringify(board)); 
	size = winningPlayer1Board.length;

	for (var col = 0; col < winningPlayer1Board.length; col++)
	{
		if (winningPlayer1Board[0][col] == 1 && checkWinPlayer1(0, col))
			return winningPlayer1Board;
	}

	return null;
}


function checkWinPlayer1(row, col)
{
	if (row < 0 || row >= size || col < 0 || col >= size || winningPlayer1Board[row][col] != 1)
		return false;

	winningPlayer1Board[row][col] = 3;

	if (row == size - 1)
		return true;

	return checkWinPlayer1(row - 1, col - 1) || checkWinPlayer1(row - 1, col) || checkWinPlayer1(row - 1, col + 1)
	|| checkWinPlayer1(row, col - 1) || checkWinPlayer1(row, col + 1)
	|| checkWinPlayer1(row + 1, col - 1) || checkWinPlayer1(row  + 1, col) || checkWinPlayer1(row + 1, col + 1);

	winningPlayer1Board[row][col] = 1;
}