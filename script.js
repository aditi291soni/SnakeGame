let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 7
lastPaintTime = 0;
let snakeArr = [{ x: 15, y: 9 }];
let food = { x: 3, y: 15 }
let score = 0;
const isCollide = (snakes) => {
    // console.log(score);
for(let i=0;i<=snakeArr;i++){
    if(snakes[i].x===snakes[0].x && snakes[i].y===snakes[0].y){
        
        gameOverSound.play()
        musicSound.pause()
        return true;
    }
    }
    
    if(snakes[0].x>=18 ||snakes[0].x<=0 || snakes[0].y>=18||snakes[0].y<=0){
        
        gameOverSound.play();

        musicSound.pause();
        return true;
}

}
const gameEngine = () => {
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        moveSound.pause();
        inputDir = { x: 0, y: 0 };
        alert(`Game Over,press any key to continue,your Score is ${score*10} ` );
        snakeArr = [{ x: 15, y: 9 }];
        musicSound.play();
        score = 0;
    }
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 1, b = 18;
        foodSound.play()
        score++;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
       for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 };
    moveSound.play()
    // console.log(e.keyCode);
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

})