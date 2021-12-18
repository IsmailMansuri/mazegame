//The game board 1 = walls, 0 = free space, and -1 = the goal
var board = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [ 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
    [ 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0],
    [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0],
    [ 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1],
    [ 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [ 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1],
    [ 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [ 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [ 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [ 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1],
    [ 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 1, -1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
 ];
 var player = {
    x: 0,
    y: 0
 };
 var goal = {
    x: 3,
    y: 14
 };
 var canvas = document.getElementById('GameBoardCanvas');
 var ctx = canvas.getContext('2d');
 var width = 600;
 var blockSize = width/board.length;
 var playing = false;
 
 
 class game{

constructor(points){
    this.points=points;

}
 
 
 
 drawBoard(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle="white";
    //Loop through the board array drawing the walls and the goal
    for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[y].length; x++) {
          //Draw a wall
          if (board[y][x] === 1) {
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
          }
          //Draw the goal
          else if (board[y][x] === -1) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "gold";
            ctx.moveTo(x * blockSize, y * blockSize);
            ctx.lineTo((x + 1) * blockSize, (y + 1) * blockSize);
            ctx.moveTo(x * blockSize, (y + 1) * blockSize);
            ctx.lineTo((x + 1) * blockSize, y * blockSize);
            ctx.stroke();
          }
        }
      }
         
 }
}
 
 function drawPoints() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Moves: "+game.points, 500, 25);
 
 }
 
 function checkIfGameOver() {
    if(player.x === goal.x && player.y === goal.y){
        if(game.points<1){
            return true;
        }
        else{
            return false;
        }  
    }
    else{
        return;
    }
 }
 
 function score(){
    if(checkIfGameOver()){
        alert("You almost won. To win you need to finish with more 1 or more moves");
        game.points = 40;
        player.x = 0;
        player.y = 0;
        drawPlayer(); 
        drawPoints();
    }
    else if(checkIfGameOver() === false){
        alert("You won!");
        game.points = 40;
        player.x = 0;
        player.y = 0;
        drawPlayer(); 
        drawPoints();
    }
    else{
        game.points--;
        drawPoints();
    }
 
 }
 
 function drawPlayer(){
    //Draw the player
    var half = blockSize/2;
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(player.x*blockSize+half, player.y*blockSize+half, half, 0, 2*Math.PI);
    ctx.fill();
 }
 
 //Check to see if the new space is inside the board and the player will not run into the wall
 function canMove(x, y){
    return (y>=0) && (y<board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
 }

 function moveup(){
    if(canMove(player.x, player.y-1)){
        player.y--;
        myGame.drawBoard();
        drawPlayer();
        score();
        if(playing === false){
            new Audio('bruhbaby.wav').play();
            playing = true;
        }
    }
 }

 function movedown(){
    if(canMove(player.x, player.y+1)){
        player.y++;
        myGame.drawBoard();
        drawPlayer();
        score();
        if(playing === false){
            new Audio('bruhbaby.wav').play();
            playing = true;
        }
    }
    
}

function moveleft(){
    if(canMove(player.x-1, player.y)){
        player.x--;
        myGame.drawBoard();
        drawPlayer();
        score();
        if(playing === false){
            new Audio('bruhbaby.wav').play();
            playing = true;
        }
    }
    
}

function moveright(){
    if(canMove(player.x+1, player.y)){
        player.x++;
        myGame.drawBoard();
        drawPlayer();
        score();
        if(playing === false){
            new Audio('bruhbaby.wav').play();
            playing = true;
        }
    }
    
}
 
 function move() {
    
 document.addEventListener('keydown', function(event){
    if((event.which === 38) && canMove(player.x, player.y-1)){ //Up arrow
        player.y--;
    }
    else if((event.which === 40) && canMove(player.x, player.y+1)){ //Down arrow
        player.y++;
    }
    else if((event.which === 37) && canMove(player.x-1, player.y)){ //Left arrow
        player.x--;
    }
    else if((event.which === 39) && canMove(player.x+1, player.y)){ //Right arrow
        player.x++;
    }
 
   
    myGame.drawBoard();
    drawPlayer();
    score();
    if(playing === false){
        new Audio('bruhbaby.wav').play();
        playing = true;
    }
    event.preventDefault();
 });}
 
 let myGame = new game(40);
 move();
 myGame.drawBoard();
 drawPlayer();
 drawPoints();
 
 
 
 
 
