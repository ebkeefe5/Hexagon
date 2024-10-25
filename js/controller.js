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
restartGameButton.addEventListener('click', restartGame);
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
  selectBlueButton.style.background = '#2d2d2d'
  turn = 1;
  playerNumber = 1;
  AIPlayerNumber = 2;
  selectRedButton.style.background = '#161616';
  playerTurn.innerHTML = 'Black\'s move!';
}

function selectBlue()
{
  if (gameInProgress)
  {
    if (playerNumber != 2)
      alert("Please restart game to change color");
    return;
  }
  selectRedButton.style.background = '#2d2d2d'
  turn = 1;
  playerNumber = 2;
  AIPlayerNumber = 1;
  selectBlueButton.style.background = '#161616';
  if (difficulty == 1)
    moveAI(board);
  else if (difficulty == 2)
    moveAILevel2(board);
  else
    moveAILevel3(board);
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
  select1Btn.style.background = '#161616';
  select2Btn.style.background = '#2d2d2d';
  select3Btn.style.background = '#2d2d2d';
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
  select2Btn.style.background = '#161616';
  select1Btn.style.background = '#2d2d2d';
  select3Btn.style.background = '#2d2d2d';
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
  select3Btn.style.background = '#161616';
  select1Btn.style.background = '#2d2d2d';
  select2Btn.style.background = '#2d2d2d';
}

function markGameInProgress()
{
  gameInProgress = true;
  if (board[(BOARD_DIMENSION-1)/2][(BOARD_DIMENSION-1)/2] == -1) 
    board[(BOARD_DIMENSION-1)/2][(BOARD_DIMENSION-1)/2] = 0; //center piece is allowable after first turn
}

function newSingleGame() {
  //the game hasn't been started until either the AI or player makes a move
  restartGame(); 
  select1();
}

function restartGame()
{
  gameInProgress = false; 
  gameOver = false;
  init();
  createBoard();
  drawBoard();  
  selectRed();
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

  if (turn == 2 && checkRedWin(board))
    return;
  if (turn == 1 && checkBlueWin(board))
    return;

  if (difficulty == 1)
    moveAI(board);
  else if (difficulty == 2)
    moveAILevel2(board);
  else
     moveAILevel3(board);
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
    playerTurn.innerHTML = "Black Wins!"
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
    playerTurn.innerHTML = "Yellow Wins!"
    drawBoard();
    return true;
  }
  return false;
}

function updateTurn()
{
  if (turn == 1)
  {
    playerTurn.innerHTML = 'Yellow\'s move!';
    turn = 2;
  }
  else
  {
    playerTurn.innerHTML = 'Black\'s move!';
    turn = 1;
  }
}