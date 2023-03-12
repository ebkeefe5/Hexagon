const newSingleGameButton = document.getElementById('newSingleGameButton');
const selectBlueButton    = document.getElementById('selectBlueButton');
const selectRedButton     = document.getElementById('selectRedButton');
const restartGameButton   = document.getElementById('restartGame');

let board;
let turn = 1;
var AIPlayerNumber = 2;
let playerNumber = 1;
let gameInProgress = false;

newSingleGameButton.addEventListener('click', newSingleGame);
selectBlueButton.addEventListener('click', selectBlue);
selectRedButton.addEventListener('click', selectRed);
restartGameButton.addEventListener('click', newSingleGame);

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
  drawBoard();  
  gameInProgress = true;
  turn = 2;
}

function newSingleGame() {
  //the game hasn't been started until either the AI or player makes a move
  gameInProgress = false; 
  init();
  createBoard();
  drawBoard();
  selectRed();
}

function handleClickOnePlayer(row, col)
{
  if (board[row][col] != 0 || turn != playerNumber)
    return;

  gameInProgress = true; //at least one move has been made so the game is in progress

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