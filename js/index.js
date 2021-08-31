//game constants
let inputDir= {x:0, y:0};
const foodSound= new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound= new Audio('move.mp3');
const bgSound=new Audio('music.mp3');
const levelSound = new Audio('level.mp3');

let speed = 3;
let score = 0;
let lastPaintTime = 0;
let snakeArr=[
    {x:15, y:13}
]
food= {x:13, y:15};

//game functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //bump into yourself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if u bump into the wall
    if(snake[0].x >= 18 || snake[0].x < 0 || snake[0].y >= 18 || snake[0].y < 0){
        return true;
    }
}

function gameEngine(){
    // part1: updating the snake array and foodSound
    if(isCollide(snakeArr)){
        gameOverSound.play();
        bgSound.pause();
        inputDir = {x:0,y:0};
        alert("GAME OVER!! Press any key to play again!");
        snakeArr= [{x:15, y:13}];
        bgSound.play();
        score=0;
        speed=3;
    }

    //if snake eats food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        if(score<20){
            score+=1;
        }
        else if(score>=20 && score<40){
            score+=2;
        }
        else if(score>=40 && score<70){
            score+=3;
        }
        else{
            score+=5;
        }
        if(score===20 || score===40 || score===70){
            levelSound.play();
        }
        if(score<8){
            speed += 0.5;
        }
        else if(score>=8 && score<20) {
            speed += 0.3;
        }
        else if(score>=20 && score<40) {
            speed += 0.2;
        }
        else{
            speed += 0.1;
        }
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hiscore :" + hiscoreval;
        }
        scoreBox.innerHTML= "Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a=1;
        let b=16;
        food= {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }

    //moving the sanke
    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]= {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part2: display the snake and food
    // display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });
    // display food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart= food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//main logic starts here 

bgSound.play();
let hiscore= localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hiscore :" + hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0, y:1};   //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})