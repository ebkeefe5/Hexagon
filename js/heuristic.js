//calculate heuristic as moves needed for red to win 
//the game minus moves needed for blue to win the game

//find moves needed for red to win

//copy board
//11 by 11 matrix
//replace -1 (center piece) with 0 if needed
//0 unclaimed takes 1 step to move to
//1 red takes 0 steps to move to
//2 blue cannot move here
//-1 already visited cannot move here

//hex object
	//steps from start
	//xpos, ypos

//min heap of hexs, based on distance from start

//add all hexes in top row to heap
//mark all of these hexes as visited

//as long as the heap is not empty, pop from the heap
	//if the hex ypos is at the last row, return the steps from start for this hex
	//otherwise, add all of it's neighbors to the heap and mark them as visited 

//find moves needed for blue to win
//adjust above algorithm for blue