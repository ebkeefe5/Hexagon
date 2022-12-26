//simple utility function to create a board for one player

function createBoard() {
  board = []
  for (var i = 0 ; i < BOARD_DIMENSION; i++)
  {
    row = new Array(BOARD_DIMENSION).fill(0);
    board.push(row);
  }

  board[(BOARD_DIMENSION-1)/2][(BOARD_DIMENSION-1)/2]=-1;

  return board;
}