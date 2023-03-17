const newSingleGameButton = document.getElementById('newSingleGameButton');

const selectBlueButton    = document.getElementById('selectBlueButton');
const selectRedButton     = document.getElementById('selectRedButton');

const restartGameButton   = document.getElementById('restartGame');

const select1Btn    = document.getElementById('select1');
const select2Btn    = document.getElementById('select2');
const select3Btn  = document.getElementById('select3');

const playerMoveLabel = document.getElementById('playerTurn');

let board;
let turn = 1;
var AIPlayerNumber = 2;
let playerNumber = 1;
let difficulty = 1;
let gameInProgress = false;
let gameOver = false;

newSingleGameButton.addEventListener('click', newSingleGame);
selectBlueButton.addEventListener('click', selectBlue);
selectRedButton.addEventListener('click', selectRed);
restartGameButton.addEventListener('click', newSingleGame);
select1Btn.addEventListener('click', select1);
select2Btn.addEventListener('click', select2);
select3Btn.addEventListener('click', select3);

function selectRed()
{
  if (gameInProgress)
  {
    if (playerNumber != 1)
      alert("Please restart game to change color");    
    return;
  }
  selectBlueButton.style.background = '#A9A9A9';
  turn = 1;
  playerNumber = 1;
  AIPlayerNumber = 2;
  selectRedButton.style.background = colors[1];
}

function selectBlue()
{
  if (gameInProgress)
  {
    if (playerNumber != 2)
      alert("Please restart game to change color");
    return;
  }
  selectRedButton.style.background = '#A9A9A9';
  turn = 1;
  playerNumber = 2;
  AIPlayerNumber = 1;
  selectBlueButton.style.background = colors[2];
  moveAI();
  markGameInProgress();
  updateTurn();
  drawBoard();  
}

function select1()
{
  if (gameInProgress)
  {
    if (difficulty != 1)
      alert ("Please restart game to change difficulty");
    return;
  }
  difficulty = 1;
  select1Btn.style.background = '#61666A';
  select2Btn.style.background = '#A9A9A9';
  select3Btn.style.background = '#A9A9A9';
}

function select2()
{
  if (gameInProgress)
  {
    if (difficulty != 2)
      alert ("Please restart game to change difficulty");
    return;
  }
  difficulty = 2;
  select2Btn.style.background = '#61666A';
  select1Btn.style.background = '#A9A9A9';
  select3Btn.style.background = '#A9A9A9';
}

function select3()
{
  if (gameInProgress)
  {
    if (difficulty != 3)
      alert ("Please restart game to change difficulty");
    return;
  }
  difficulty = 3;
  select3Btn.style.background = '#61666A';
  select1Btn.style.background = '#A9A9A9';
  select2Btn.style.background = '#A9A9A9';
}

function markGameInProgress()
{
  gameInProgress = true;
  if (board[(BOARD_DIMENSION-1)/2][(BOARD_DIMENSION-1)/2] == -1) 
    board[(BOARD_DIMENSION-1)/2][(BOARD_DIMENSION-1)/2] = 0; //center piece is allowable after first turn
}

function newSingleGame() {
  //the game hasn't been started until either the AI or player makes a move
  gameInProgress = false; 
  gameOver = false;
  init();
  createBoard();
  drawBoard();
  selectRed();
  select1();
}

function handleClickOnePlayer(row, col)
{
  if (gameOver)
  {
    alert("Please restart the game");
    return;
  }

  if (board[row][col] != 0 || turn != playerNumber)
    return;

  markGameInProgress();

  board[row][col] = playerNumber;
  updateTurn();

  if (turn == 2 && checkRedWin())
    return;
  if (turn == 1 && checkBlueWin())
    return;

  moveAI();
  updateTurn();

  if (turn == 2 && checkRedWin())
    return;
  if (turn == 1 && checkBlueWin())
    return;

  drawBoard();

}

function checkRedWin()
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

function checkBlueWin()
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