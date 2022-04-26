# Hexagon
This is the front end code for a two player version of the <a href="https://en.wikipedia.org/wiki/Hex_(board_game)"> hexagon </a> board game. The game is available to play at 
https://ebkeefe5.github.io/Hexagon/. One player creates a game, which generates a join code. The second player can then use that join code to join the game. It's also possible to play yourself on two tabs, by creating a game
and then joining in a seperate tab.

This front end code is concerned with detecting the location of mouse clicks, rendering the game, and styling. It communicates with the server to obtain the state of the game as well as send the server information about click events. The server then decides whether to update the game state or not. The server is hosted on a GCP instance running an apache2 web server, that I self installed an https certificate on. The client and server are communicating with one another via socket.io. 

I hope to expand on this work by improving the graphics, moving the code into a framework such as angular, and coding a one player AI version of the game. 

Note: this was inspired by a two player snake game tutorial with socket.io: https://www.youtube.com/watch?v=ppcBIHv_ZPs (although it was up to me to figure out to adapt that to work for this board game over an actual website)
