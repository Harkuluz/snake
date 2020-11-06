const cnv = document.getElementById('board');
const ctx = cnv.getContext("2d");
// create unit
const box = 32;
// Load image
// const ground = new Image();
// ground.src = "img/ground.png";
// const foodImg = new Image();
// foodImg.src = "img/food.png";

// create snake
let snake = [];
snake[0] = {
    x: 9*box,
    y: 10*box
}
let food ={
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}
// score
let score = 0;
//snake controller
let d;
document.addEventListener("keydown",direction)
function direction(e){
    console.log(e.keyCode);
    if(e.keyCode == 37 && d != "RIGHT"){
        d = "LEFT"
    }else if(e.keyCode == 38 && d != "DOWN"){
        d = "UP"
    }else if(e.keyCode == 39 && d != "LEFT"){
        d = "RIGHT"
    }else if(e.keyCode == 40 && d != "UP"){
        d = "DOWN"
    }else if(e.keyCode == 32){
        //call a pause function
    }
}
//check collision 
function collision(head,arr){
    for(let i=0; i<arr.length;i++){
        if(head.x == arr[i].x && head.y == arr[i].y)
        return true;
    }
    return false;
}

// draw canvas
function draw(){
    // ctx.drawImage(ground,0,0)
    ctx.fillStyle = "steelblue";
    ctx.fillRect(0,0,608,608)
    ctx.strokeStyle = "red";
    ctx.strokeRect(box,2*box,608 - 2*box, 608 - 3* box)
    // ctx.strokeRect(box,2*box,605 - 2*box, 605 - 3* box)
    // ctx.strokeRect(box,2*box,600 - 2*box, 600 - 3* box)
    // ctx.fillStyle = "darkred";
    // ctx.beginPath();
    // ctx.arc(food.x+6,food.y+16,box/2,0,Math.PI*2)
    // ctx.fill();
    // draw snake
    for(let i =0; i<snake.length;i++){
        ctx.fillStyle = (i == 0)? "green": "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box)
            ctx.strokeStyle = "yellow";
            ctx.strokeRect(snake[i].x,snake[i].y,box,box)
        // if(i == 0){
        //     ctx.fillStyle = "green";
        //     // ctx.fillRect(snake[i].x,snake[i].y,box,box)
        //     ctx.beginPath();
        //     ctx.arc(snake[i].x+16,snake[i].y+26,box/2,0,Math.PI*2)
        //     ctx.fill();
        // }else{
        //     ctx.fillStyle = "white";
        //     ctx.fillRect(snake[i].x,snake[i].y,box,box)
        //     ctx.strokeStyle = "yellow";
        //     ctx.strokeRect(snake[i].x,snake[i].y,box,box)
        // }
    }
    //draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x,food.y,box,box)

    // old head position
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    //which direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    //if snake eat food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()*15+2) * box
        }
        //don't remove tail
    }else{
        // remove tail
        snake.pop()
    }
    
    //add new had
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    //game over rule
    if(snakeX < box || snakeX > 17 *box || snakeY < 2*box || snakeY > 17*box || collision(newHead,snake)){
        // clearInterval(game.start)
        clearInterval(game)
        ctx.fillStyle = "white"
        ctx.font = "80px Changa one"
        ctx.fillText('Game Over',608/6,608/2)
        ctx.fillStyle = "red"
        ctx.font = "20px Changa one"
        ctx.fillText('Press Space to start New game',608/3.5,648/2)
        //restart game if press space btn
        document.addEventListener("keydown",function(e){
            if(e.keyCode == 32){
                //call draw every 200ms
                console.log(game)
                game.start;
            }
        })
    }

    snake.unshift(newHead);
    //draw score
    ctx.fillStyle = "white"
    ctx.font = "45px Changa one"
    ctx.fillText('Score : '+score,1,1.2*box)
    
}
//call draw every 200ms
let game = setInterval(draw,200);
// let game = {
//   start : setInterval(draw,200)
// }
// game.start;