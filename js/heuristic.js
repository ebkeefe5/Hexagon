//calculate heuristic as moves needed for red to win 
//the game minus moves needed for blue to win the game

const toVisit = new BinaryHeap();

var trackBoard = null; //keep track of which parts of the board have been visited
var toVisit = 
var size;

function calculateRedMovesToWin(board)
{
	trackBoard = JSON.parse(JSON.stringify(board));
    toVisit = new BinaryHeap((a, b) => a.stepsFromStart - b.stepsFromStart);; //min heap of hexagons to explore
    size = trackBoard.length;
	for (var col = 0; col < trackBoard.length; col++)
	{
		insertHexagon(col, 0, trackBoard[0][col], 0);
		trackBoard[0][col] = -1;
	}
	
	const directions = [[0, -1], [1, -1], 
						[-1, 0], [1, 0], 
						[-1, 1], [0, 1]];

	while(!toVisit.isEmpty())
	{
		var hex = toVisit.extract();
		if (hex.yPos == size)
			return hex.stepsFromStart;
		else
		{
			for (const [di, dj] of directions) 
			{
				var row = curr.x + di; var col = curr.y + dj;
		    	if (row >= 0 && row < size && col >= 0 && col < size)
		    	{
		    		insertHexagon(row, col, trackBoard[row][col], hex.stepsFromStart);
		    	}
	    	}
		}
	}
	console.log("error: trying to check min moves to win for red and the game is over");
	return 100000;
}

function insertHexagon(xPos, yPos, value, steps)
{
	if (value == -1 || value == 2) //red cannot move where blue has moved or on an illegal move
		return;
	else if (value == 0)
		toVisit.insert({xPos: xPos, yPos: yPos, stepsFromStart: steps + 1});
	else if (value == 1)
		toVisit.insert({xPos: xPos, yPos: yPos, stepsFromStart: steps});
}



//as long as the heap is not empty, pop from the heap
	//if the hex ypos is at the last row, return the steps from start for this hex
	//otherwise, add all of it's neighbors to the heap and mark them as visited 

//find moves needed for blue to win
//adjust above algorithm for blue