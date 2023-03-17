//BFS to detect if red has won the game

var visitedRedBoard = null; //keep track of which parts of the board have been visited
var toVisit = null; //queue of nodes to explore
var adj = null; //hashap to keep track of prev node
var size;

function checkWinBoardPlayer1(board)
{
	visitedRedBoard = JSON.parse(JSON.stringify(board)); 
	size = visitedRedBoard.length;

	for (var col = 0; col < visitedRedBoard.length; col++)
	{
		//start new BFS for each hex at the top row
        toVisit = []; adj = new Map(); 

        if (board[0][col] == 1)
        {
        	var lastHexagon = redBFS(toVisit, adj, {x:0, y:col});
        	if (lastHexagon != null)
        	{
        		markPathRed(lastHexagon, adj, board);
        		return true;
        	}
        }
	}

	return false;
}

function redBFS(toVisit, adj, root)
{
	toVisit.push(root);
	visitedRedBoard[root.x][root.y] = 3;

	const directions = [[0, -1], [1, -1], 
						[-1, 0], [1, 0], 
						[-1, 1], [0, 1]];
	
	while(toVisit.length > 0)
	{
		var curr = toVisit[0];
		toVisit.shift();
		if (curr.x == size - 1)
			return curr;
		for (const [di, dj] of directions) 
		{
			var row = curr.x + di; var col = curr.y + dj;
	    	if (row >= 0 && row < size && col >= 0 && col < size && visitedRedBoard[row][col] == 1)
	    	{
	    		var next = {x:row, y:col};
	    		adj.set(next, curr); 
	    		toVisit.push(next);
	    		visitedRedBoard[row][col] = 3;
	    	}
    	}
	}
  	return null;	
}

function markPathRed(lastHexagon, adj, board)
{
	var curr = lastHexagon;
	while(curr.x > 0)
	{
		board[curr.x][curr.y] = 3;
		curr = adj.get(curr);
	}
	board[curr.x][curr.y] = 3;
}