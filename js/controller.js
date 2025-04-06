const newSingleGameButton = document.getElementById('newSingleGameButton');
const restartGameButton   = document.getElementById('restartGame');
const playerMoveLabel = document.getElementById('playerTurn');

let board;
let turn = 1;
let difficulty = 1;
let gameInProgress = false;
let gameOver = false;

newSingleGameButton.addEventListener('click', newSingleGame);
restartGameButton.addEventListener('click', restartGame);

function markGameInProgress()
{
  gameInProgress = true;
  if (board[(BOARD_DIMENSION-1)/2][(BOARD_DIMENSION-1)/2] == -1) 
    board[(BOARD_DIMENSION-1)/2][(BOARD_DIMENSION-1)/2] = 0; //center piece is allowable after first turn
}

function newSingleGame() {
  //the game hasn't been started until either the AI or player makes a move
  restartGame(); 
}

function restartGame()
{
  gameInProgress = false; 
  gameOver = false;
  turn = 1;
  playerTurn.innerHTML = 'Red\'s move!';
  init();
  createBoard();
  drawBoard();  
}

function handleClickOnePlayer(row, col)
{
  if (gameOver)
  {
    alert("Please restart the game");
    return;
  }

  if (board[row][col] != 0)
    return;

  gameInProgress = true;

  board[row][col] = turn;
  updateTurn();

  if (turn == 2 && checkRedWin(board))
    return;
  if (turn == 1 && checkBlueWin(board))
    return;

  drawBoard();

}

function checkRedWin(board)
{
  if (checkWinBoardPlayer1(board))
  {
    gameOver = true;
    playerTurn.innerHTML = "Red Wins!"
    drawBoard();
    return true;
  }
  return false;
}

function checkBlueWin(board)
{
  if (checkWinBoardPlayer2(board))
  {
    gameOver = true;
    playerTurn.innerHTML = "Blue Wins!"
    drawBoard();
    return true;
  }
  return false;
}

function updateTurn()
{
  if (turn == 1)
  {
    playerTurn.innerHTML = 'Blue\'s move!';
    turn = 2;
  }
  else
  {
    playerTurn.innerHTML = 'Red\'s move!';
    turn = 1;
  }
}