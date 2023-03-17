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