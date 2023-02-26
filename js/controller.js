const newSingleGameButton = document.getElementById('newSingleGameButton');

let board;
let turn = 1;
var AIPlayerNumber = 2;

newSingleGameButton.addEventListener('click', newSingleGame);

function newSingleGame() {
  init();
  selectPlayer(1);
  createBoard();
  drawBoard();
}

function handleClickOnePlayer(row, col)
{
  if (board[row][col] != 0 || turn != playerNumber)
    return;

  board[row][col] = playerNumber;
  updateTurn();

  moveAI();
  updateTurn();

  var winRed = checkWinBoardPlayer1(board);
  if (winRed != null)
    board = JSON.parse(JSON.stringify(winRed)); 
  drawBoard();

}

function updateTurn()
{
  if (turn == 1)
    turn = 2;
  else
    turn = 1;
}

function moveAI()
{
  if (turn != AIPlayerNumber)
    return;

  //choose an unclaimed piece very dumb strat
  for (var row = 0; row < board.length; row++)
  {
    for (var col = 0; col < board[row].length; col++)
    {
      if (board[row][col] == 0)
      {
        board[row][col] = AIPlayerNumber;
        return;
      }
    }
  }
}

function updateTurnViewOnePlayer(turn)
{
	if (turn == 1)
		document.getElementById('playerTurn').innerHTML = "Red's Move!";
	else if(turn == 2)
		document.getElementById('playerTurn').innerHTML = "Blue's Move!";
	else if (turn == 3)
  {
  	document.getElementById('playerTurn').innerHTML = "Game Over: Red Wins!";
  }
	else
  {
   document.getElementById('playerTurn').innerHTML = "Game Over: Blue Wins!";
  }
}




