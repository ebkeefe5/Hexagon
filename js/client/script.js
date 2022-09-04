switch(state)
	{
	  case -1:
	  	ctx.fillStyle = notAllowedPiece
	  	break;
	  case 1:
	    ctx.fillStyle = player1Piece;
	    break;
	  case 2:
	  	ctx.fillStyle = player2Piece;
	    break;
	  case 3:
	  	ctx.fillStyle = player1PieceWon;
	  	break;
	  case 4:
	  	ctx.fillStyle = player2PieceWon;
	  	break;
	  default:
	    ctx.fillStyle = unclaimedPiece;
	}

const notAllowedPiece = '#4B2D0B';
//unclaimedPiece, player1Piece, player2Piece, player1PieceWon, player2PieceWon
const colors = ['#654321', '#9b1306', '#196751', '#740e05', '#0c3329'];


ioClient = io('https://35.238.40.176:8080',{secure: true});

ioClient.on("init", (playerNumber) => handleInit(playerNumber));
ioClient.on("update", (gameState) => updateGameState(gameState));
ioClient.on('gameCode', (gameCode) => handleGameCode(gameCode));
ioClient.on('unknownCode', handleUnknownCode);
ioClient.on('disconnected', handleDisconnected);
ioClient.on('tooManyPlayers', handleTooManyPlayers);

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');

newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);

let playerNumber;
let canvas;

function newGame() {
  ioClient.emit('newGame');
  init();
  console.log("started new game");
}

function joinGame() {
  const code = gameCodeInput.value;
  ioClient.emit('joinGame', code);
  init();
}

function drawBoard(boardModel)
{
  var boardElement = document.getElementById("board");
  var boardHtml = '<svg width="' + BOARD_WIDTH + '" height="' + BOARD_HEIGHT + '">';
  for (row = 0; row < boardModel.length; row++)
	{
    for (col = 0; col < boardModel[row].length; col ++)
    {
      boardHtml += getHexagonHtml(row, col, boardModel[row][col]);
    }
	}
  boardHtml += '</svg>'
  boardElement.innerHTML = boardHtml;
}

function getHexagonHtml(row, col, state)
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

  var fillLine = "fill=";
  if (state == -1)
    fillLine += notAllowedPiece + '"/>';
  else
    fillLine += colors[state] + '"/>';
  var firstLine = '<a onclick=handleClick(' + row + ',' + col + ')>';
  return firstLine +
      '<path d="M' + x1 + " " + y1 +
               'L' + x2 + " " + y2 +
               'L' + x3 + " " + y1 +
               'L' + x3 + " " + y3 +
               'L' + x2 + " " + y4 +
               'L' + x1 + " " + y3 +
               'L' + x1 + " " + y1 +
               'Z"' +
               'stroke="black"' +
               fillLine +
    '</a>';
}

function handleClick(row, col)
{
  console.log("clicked: " + row + " " + col);
  ioClient.emit('hexagonClicked', {row, col})
}

function init()
{
	initialScreen.style.display = "none";
	gameScreen.style.display = "block";
  canvas = document.querySelector('canvas');

	BOARD_DIMENSION = 9; //note this must be an odd number
	HEXAGON_EDGE_LENGTH = Math.floor(canvas.width/(BOARD_DIMENSION*2.6));
	TOP_LEFT_HEXAGON_CENTER_X = HEXAGON_EDGE_LENGTH;
	TOP_LEFT_HEXAGON_CENTER_y = HEXAGON_EDGE_LENGTH;
  HEXAGON_WIDTH = Math.sqrt(3)*HEXAGON_EDGE_LENGTH;
	BOARD_WIDTH = HEXAGON_WIDTH * BOARD_DIMENSION * 1.5;
  BOARD_HEIGHT = HEXAGON_EDGE_LENGTH * BOARD_DIMENSION * Math.sqrt(3);
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
