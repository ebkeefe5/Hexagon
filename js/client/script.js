//this is coming along nicely
//the ip addresses of the server and client are hard coded and should be env vars 
//but I'll figure that out later, if I do at all
//this is the client code and can be hosted through my github
const player1Piece = '#9b1306'; 
const player1PieceWon = '#740e05';
const player2Piece = '#196751';
const player2PieceWon = '#0c3329'
const notAllowedPiece = '#4B2D0B' 
const unclaimedPiece = '#654321';

//ioClient = io('http://localhost:3000');
ioClient = io('https://35.238.40.176:8080');	

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

let canvas, ctx;
let playerNumber;

function newGame() {
  ioClient.emit('newGame');
  init();
}

function joinGame() {
  const code = gameCodeInput.value;
  ioClient.emit('joinGame', code);
  init();
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
	MAX_NUM_ROWS = 20; //the maximum num of rows of hexagons before definitely run off the canvas
	MAX_NUM_COLS = 20; //the maximum num of cols before we run off the canvas
	BORDER_WIDTH = 3;

	initializeController();
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


// function startGame(gameState)
// {
// 	updateTurnView(gameState.data.turn);
	
// 	drawBoard(gameState.data.gameBoard);
// }

function initializeController()
{
	
	var hexagonDown = null;
	var hexagonUp = null;

	canvas.addEventListener('mousedown', e => {
		hexagonDown = getHexagon(e.offsetX, e.offsetY);
	});

	canvas.addEventListener('mouseup', e => {
		hexagonUp = getHexagon(e.offsetX, e.offsetY);
		if (hexagonDown != null && hexagonUp != null && hexagonDown.row == hexagonUp.row && hexagonDown.col == hexagonUp.col) //we clicked and released somewhere valid in the same hexagon
		{
			ioClient.emit('hexagonClicked', {row:hexagonUp.row,col:hexagonUp.col})
		}
		else{
			hexagonUp = null;
			hexagonDown = null;
		}
	});
}

/*
 *@return a hexagon object represented by a row and col of where you have clicked on the board
 *invalid location will return null ie, selecting a cliamed piece, the center if it's the first turn or outside the board
*/
function getHexagon(x, y)
{
	var yBounds = getYBounds(y); //bounding rows
	if (yBounds == null)
		return null;
	var xBoundsTopRow = getXBounds(x, yBounds, true); //bounding cols for top row
	if (xBoundsTopRow == null)
		return null;
	var xBoundsBotRow = getXBounds(x, yBounds, false); //bounding cols for bot row
	if(xBoundsBotRow == null)
		return null;

	
	//we now have four hexagons the point we clicked is bounded by. whichever center is closest is the hexagon the user clicked in
	//here is a visual respreentation
	
	//xBoundsTopRow.leftColXPos, yBounds.topRowYPos				xBoundsTopRow.rightColXPos, yBounds.topRowYPos

	//xBoundsBotRow.leftColXPos, yBounds.botRowYPos 			xBoundsBotRow.rightColXPos, yBounds.BotRowYPos

	
	var d1  = getDistance(xBoundsTopRow.leftColXPos, yBounds.topRowYPos, x, y);
	var d2  = getDistance(xBoundsTopRow.rightColXPos, yBounds.topRowYPos, x, y);
	var d3  = getDistance(xBoundsBotRow.leftColXPos, yBounds.botRowYPos, x, y);
	var d4  = getDistance(xBoundsBotRow.rightColXPos, yBounds.botRowYPos, x, y);

	var boundingHexagon = "topLeft";
	var minDistance = d1;

	if (d2 < minDistance)
	{
		boundingHexagon = "topRight";
		minDistance = d2;
	}
	if (d3 < minDistance)
	{
		boundingHexagon = "botLeft";
		minDistance = d3;
	}
	if (d4 < minDistance)
	{
		boundingHexagon = "botRight";
		minDistance = d4;
	}

	var hexagon = {row:-1, col:-1};
	switch(boundingHexagon)
	{
		case "topLeft":
			hexagon.col = xBoundsTopRow.leftCol;
			hexagon.row = yBounds.topRow;
			break;
		case "topRight":
			hexagon.col = xBoundsTopRow.rightCol;
			hexagon.row = yBounds.topRow;
			break;
		case "botLeft":
			hexagon.col = xBoundsBotRow.leftCol;
			hexagon.row = yBounds.botRow;
			break;
		case "botRight":
			hexagon.col = xBoundsBotRow.rightCol;
			hexagon.row = yBounds.botRow;
			break;
		default:
			//invalid state do nothing
	}
	if (hexagon.col < 0 || hexagon.col >= BOARD_DIMENSION || hexagon.row < 0 || hexagon.row >= BOARD_DIMENSION)
		return null;


	// if (board[hexagon.row][hexagon.col] == 0)
	return hexagon;

	// return null;
}

function getDistance(x1, y1, x2, y2)
{
	var a = x1 - x2;
	var b = y1 - y2;

	var c = Math.sqrt( a*a + b*b );
	return c;
}

function getYBounds(y)
{
	var row = -1;
	var rowYPos = row * 1.5 * HEXAGON_EDGE_LENGTH + TOP_LEFT_HEXAGON_CENTER_y;
	while(row < BOARD_DIMENSION*3) //the canvas shouldn't extend mroe than 3 times the board dimension 
	{
		var lastRowYPos = rowYPos;
		rowYPos = row * 1.5 * HEXAGON_EDGE_LENGTH + TOP_LEFT_HEXAGON_CENTER_y;
		if (rowYPos > y)
			return {topRow:row-1, topRowYPos: lastRowYPos, botRow:row, botRowYPos:rowYPos};
		row++;
	}
	return null;
}

//get the x bounds for the top row
function getXBounds(x, yBounds, topRow)
{
	var col = -1;
	if (topRow)
		var offSetFromRow = Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2 * yBounds.topRow;
	else
		var offSetFromRow = Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2 * yBounds.botRow;
	var colXPos = TOP_LEFT_HEXAGON_CENTER_X + col * Math.sqrt(3) * HEXAGON_EDGE_LENGTH + offSetFromRow;
	while (col < BOARD_DIMENSION * 3) //the canvas shouldn't extend more than 3 times the board dimension
	{
		var lastColXPos = colXPos;
		colXPos = TOP_LEFT_HEXAGON_CENTER_X + col * Math.sqrt(3) * HEXAGON_EDGE_LENGTH + offSetFromRow;
		if (colXPos > x)
			return {leftCol:col-1, leftColXPos: lastColXPos, rightCol:col, rightColXPos:colXPos};
		col++;
	}
	return null;
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

function drawBoard(board)                                                       
{
	for (row = 0; row < board.length; row++)
	{
		drawRow(board[row], row);
	}
}

function drawRow(states, row)
{
	for (var col = 0; col < states.length; col++)
	{
		drawHexagon(row, col, states[col]);
	}
}

function drawHexagon(row, col, state)
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
	
	drawFilledInHexagon(x1, x2, x3, y1, y2, y3, y4, HEXAGON_EDGE_LENGTH, state);
	drawHexagonBorder(x1, x2, x3, y1, y2, y3, y4, HEXAGON_EDGE_LENGTH, row, col);
}


function drawFilledInHexagon(x1, x2, x3, y1, y2, y3, y4, l, state) 
{
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

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y1);
	ctx.lineTo(x3, y3);
	ctx.lineTo(x2, y4);
	ctx.lineTo(x1, y3);
	ctx.lineTo(x1, y1);
	ctx.fill();
}

//has special logic to create the game borders
function drawHexagonBorder(x1, x2, x3, y1, y2, y3, y4, l, row, col) 
{
	ctx.strokeStyle='black';
		
	if (col == 0)
	{
		ctx.lineWidth = BORDER_WIDTH;
		ctx.strokeStyle = player2Piece;
	}

	ctx.beginPath();
	ctx.moveTo(x1, y3);
	ctx.lineTo(x1, y1);
	ctx.stroke();

	ctx.strokeStyle='black'
	ctx.lineWidth = 1;

	
	if (row == 0)
	{
		ctx.lineWidth = BORDER_WIDTH;
		ctx.strokeStyle = player1Piece;
	}

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();

	ctx.lineWidth = 1;

	
	if (col == BOARD_DIMENSION - 1 && row != 0)
	{
		ctx.lineWidth = BORDER_WIDTH;
		ctx.strokeStyle = player2Piece;
	}

	ctx.beginPath();
	ctx.moveTo(x2, y2);
	ctx.lineTo(x3, y1);
	ctx.stroke();

	ctx.strokeStyle = 'black';
	ctx.lineWidth = 1;
	
	if (col == BOARD_DIMENSION - 1)
	{
		ctx.lineWidth = BORDER_WIDTH;
		ctx.strokeStyle = player2Piece;
	}

	ctx.beginPath();
	ctx.moveTo(x3, y1);
	ctx.lineTo(x3, y3);
	ctx.stroke();

	ctx.strokeStyle = 'black';
	ctx.lineWidth = 1;

	if (row == BOARD_DIMENSION - 1)
	{
		ctx.lineWidth = BORDER_WIDTH;
		ctx.strokeStyle = player1Piece;
	}

	ctx.beginPath();
	ctx.moveTo(x3, y3);
	ctx.lineTo(x2, y4);
	ctx.stroke();

	ctx.lineWidth = 1;

	if (col == 0)
	{
		ctx.lineWidth = BORDER_WIDTH;
		ctx.strokeStyle = player2Piece;
	}

	ctx.beginPath();
	ctx.moveTo(x2, y4);
	ctx.lineTo(x1, y3);
	ctx.stroke();

	ctx.lineWidth = 1;
}