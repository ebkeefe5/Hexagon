//improve this strategy to be a little bit smarter
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

//idea use a min-max algorithm to be able to play at an intermediate level
//http://web.stanford.edu/class/archive/cs/cs221/cs221.1192/2018/restricted/posters/eliew/poster.pdf 
//has ideas for an evaluation function
//make sure to credit the students for the idea
function moveAILevel2()
{

}

//TODO figure out how to create an advanced AI
function moveAILevel3()
{

}