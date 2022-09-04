const player1Piece = '#9b1306';
const player1PieceWon = '#740e05';
const player2Piece = '#196751';
const player2PieceWon = '#0c3329'
const notAllowedPiece = '#4B2D0B'
const unclaimedPiece = '#654321';

//ioClient = io('https://35.238.40.176:8080',{secure: true});

// ioClient.on("init", (playerNumber) => handleInit(playerNumber));
// ioClient.on("update", (gameState) => updateGameState(gameState));
// ioClient.on('gameCode', (gameCode) => handleGameCode(gameCode));
// ioClient.on('unknownCode', handleUnknownCode);
// ioClient.on('disconnected', handleDisconnected);
// ioClient.on('tooManyPlayers', handleTooManyPlayers);

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');

newGameBtn.addEventListener('click', newGame);
// joinGameBtn.addEventListener('click', joinGame);

let canvas, ctx;
let playerNumber;

function newGame() {
  // ioClient.emit('newGame');
  init();
  createBoard();
  console.log("started new game");
}

function joinGame() {
  const code = gameCodeInput.value;
  ioClient.emit('joinGame', code);
  init();
}

function createBoard()
{
  var board = document.getElementById("board");
  var boardHtml = '<svg width="' + BOARD_WIDTH + '" height="' + BOARD_HEIGHT + '">';
  boardHtml += getHexagonHtml(0, 0);
  boardHtml += getHexagonHtml(0, 1);
  boardHtml += getHexagonHtml(0, 2);
  boardHtml += getHexagonHtml(1, 0);
  boardHtml += getHexagonHtml(1, 1);
  boardHtml += getHexagonHtml(1, 2);
  boardHtml += getHexagonHtml(2, 0);
  boardHtml += getHexagonHtml(2, 1);
  boardHtml += getHexagonHtml(2, 2);
  boardHtml += '</svg>'
  board.innerHTML = boardHtml;
}

function getHexagonHtml(row, col)
{
	var cx = TOP_LEFT_HEXAGON_CENTER_X + col * Math.sqrt(3) * HEXAGON_EDGE_LENGTH + Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2*row;
	var cy = TOP_LEFT_HEXAGON_CENTER_y + row * 3/2 * HEXAGON_EDGE_LENGTH;

	var x1 = cx - Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2;
	var x2 = cx;
	var x3 = cx + Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2;

	var y1 = cy - 1/2 * HEXAGON_EDGE_LENGTH;
	var y2 = cy - HEXAGON_EDGE_LENGTH;
	var y3 = cy + 1/2 * HEXAGON_EDGE_LENGTH;
	var y4 = cy + HEXAGON_EDGE_LENGTH;

  return '<a href="#">' +
      '<path d="M' + x1 + " " + y1 +
               'L' + x2 + " " + y2 +
               'L' + x3 + " " + y1 +
               'L' + x3 + " " + y3 +
               'L' + x2 + " " + y4 +
               'L' + x1 + " " + y3 +
               'L' + x1 + " " + y1 +
               'Z"' +
               'stroke="black"' +
               'fill="' +  unclaimedPiece + '"/>' +
    '</a>';
}

function init()
{
  	initialScreen.style.display = "none";
  	gameScreen.style.display = "block";

	canvas = document.querySelector('canvas');
	ctx = canvas.getContext('2d');

	BOARD_DIMENSION = 9; //note this must be an odd number
	HEXAGON_EDGE_LENGTH = Math.floor(canvas.width/(BOARD_DIMENSION*2.6));
	TOP_LEFT_HEXAGON_CENTER_X = HEXAGON_EDGE_LENGTH;
	TOP_LEFT_HEXAGON_CENTER_y = HEXAGON_EDGE_LENGTH;
  HEXAGON_WIDTH = Math.sqrt(3)*HEXAGON_EDGE_LENGTH;
	MAX_NUM_ROWS = 20; //the maximum num of rows of hexagons before definitely run off the canvas
	MAX_NUM_COLS = 20; //the maximum num of cols before we run off the canvas
	BOARD_WIDTH = HEXAGON_WIDTH * BOARD_DIMENSION;
  BOARD_HEIGHT = HEXAGON_EDGE_LENGTH * BOARD_DIMENSION * 2;
}

function handleInit(number) {
  playerNumber = number;
  if (number == 1)
  	player.innerText = "red";
  else
  	player.innerText = "green";
}

function updateGameState(gameState)
{
	updateTurnView(gameState.data.turn);
	drawBoard(gameState.data.gameBoard);
}

function handleGameCode(gameCode) {
  gameCodeDisplay.innerText = gameCode;
}

function handleUnknownCode() {
  reset();
  alert('Unknown Game Code')
}

function handleTooManyPlayers() {
  reset();
  alert('This game is already in progress');
}

function handleDisconnected()
{
	alert('Your oppenent disconnected!');
	reset();
}

function reset() {
  playerNumber = null;
  gameCodeInput.value = '';
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
}

function updateTurnView(turn)
{
	if (turn == 1)
		document.getElementById('playerTurn').innerHTML = "Red's Move!";
	else if(turn == 2)
		document.getElementById('playerTurn').innerHTML = "Green's Move!";
	else if (turn == 3)
		document.getElementById('playerTurn').innerHTML = "Game Over: Red Wins!";
	else
		document.getElementById('playerTurn').innerHTML = "Game Over: Green Wins!";
}
