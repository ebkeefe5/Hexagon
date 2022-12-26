const newSingleGameButton = document.getElementById('newSingleGameButton');

let board;

newSingleGameButton.addEventListener('click', newSingleGame);

function newSingleGame() {
  init();
  selectPlayer(1);
  restartGameBtn.style.display = "none";
  gameCodeTitle.style.display = "none";
  createBoard();
  drawBoardOnePlayer();
}

function drawBoardOnePlayer()
{
  var boardElement = document.getElementById("board");
  var boardHtml = '<svg width="' + BOARD_WIDTH + '" height="' + BOARD_HEIGHT + '">';

  //border
  boardHtml += topBorderHtml();

  //main board
  for (row = 0; row < board.length; row++)
  {
    for (col = 0; col < board[row].length; col ++)
    {
      boardHtml += getHexagonHtml(row, col, board[row][col]);
    }
  }
  boardHtml += '</svg>'
  boardElement.innerHTML = boardHtml;
}

function selectPlayer(number) {
  playerNumber = number;
  if (number == 1)
    player.innerText = "red";
  else
    player.innerText = "blue";
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