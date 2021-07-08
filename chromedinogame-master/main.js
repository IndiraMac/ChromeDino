//Constants
const game = document.querySelector('#game');
const dino = document.querySelector('#dino');
const restart = document.querySelector('#restart-btn');
const gameOverText = document.querySelector('#gameOverText')
const jumpDuration = 35;  //In milliseconds
const increment = 5;
const gravity = 0.7;
const speed = 10
const initVelocity = 12
const jump = 2
const collPaddingX = 21
const collPaddingY = 10
let isJumping = false
let initObstacleSize = 2
let initObstacleDuplicate = 2;
const maxObstacleSize = 6
let isGameOver = false;
let currDiff = 4

let dinoDef = {
  x: 20,
  y: 51, 
  width: 44,
  height: 51,
  
}
// Maximum and minimum distances between obstacles
const max = 9
const min = 2
function ObstacleDef(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

// Array of the six types of obstacles
let obstacles = [
                new ObstacleDef(-227, 0, 18, 40),
                new ObstacleDef(-245, 0, 34, 40),
                new ObstacleDef( -332, 0, 25, 53), 
                new ObstacleDef(-279, 0, 51, 40), 
                new ObstacleDef( -357, 0, 50, 53), 
                new ObstacleDef( -407, 0, 74, 53)
                ]

//Functions
function startJump (){
  if (!isJumping && !isGameOver) {
  let count = 0;
  let pos = 0
  let jumpFrame = 0
  dino.style.animation = "2s re"
  dino.style.backgroundPosition = "-677px 0px"
    let timerId = setInterval(function(){
      if (isGameOver) {
        clearInterval(timerId)
      } else {
      let y = initVelocity*jumpFrame - (0.5*Math.floor(gravity*Math.pow(jumpFrame,2)))
      dino.style.bottom = y + 'px';
      if (y <= 6 && isJumping === true ) {
        isJumping = false;
        dino.style.bottom = 0;
        clearTimeout(timerId)
        dino.style.animation = "0.2s run steps(2) infinite";
      } else {
      jumpFrame += jump
      isJumping = true
      }
      }
    }, jumpDuration);
  }
}

function gameOver(arg) {
  // body...
  isGameOver = true
  gameOverText.style.display = 'block'
  dino.style.animation = "2s re"
  dino.style.backgroundPosition = "-897px 0px"
  ground.style.animationPlayState = "paused"
  document.removeEventListener("touchstart", startJump )
  restart.addEventListener('click', initGame);
}


function collisionDetection(obstacle){
  // body...
  return (
    dino.offsetLeft + dinoDef.width > obstacle.offsetLeft + collPaddingX &&
    obstacle.offsetLeft + obstacle.offsetWidth > dino.offsetLeft + collPaddingX &&
    dino.offsetTop + dinoDef.height > obstacle.offsetTop + collPaddingY
  ) 
}
function moveObstacle(obstacle) {
  // body...
  if (!isGameOver) {
    
  let right = -100;
  let distance = -1*(Math.floor(Math.random() * (max-min)) +1)*10
  console.log(distance);
  //obstacle.style.animation = time+'s moveout linear forwards'
  let oTimerId = setInterval(function (){
    if (!isGameOver) {
      
    distance += 0.95
    obstacle.style.right = distance + '%';
    //For collision detection
    if (collisionDetection(obstacle)  ) {
      clearInterval(oTimerId)
      isGameOver = true;
      gameOver()
    //obstacle.style.animationPlayState = 'paused'
    }
      if(parseInt(obstacle.style.right) >= 105) {
      clearInterval(oTimerId)
      obstacle.remove()
      }
    }
  }, 2*speed);
    
   

  }
}
function createObstacle (){
  let randomObstacle = Math.floor(Math.random() * currDiff)
  console.log(randomObstacle);
  let obstacle = document.createElement('div');
  if (!isGameOver) {
  obstacle.classList.add('obstacle');
  }
 obstacle.style.backgroundPosition = obstacles[randomObstacle].x +'px '+obstacles[randomObstacle].y+'px' 
  obstacle.style.width = obstacles[randomObstacle].width + 'px'
  obstacle.style.height = obstacles[randomObstacle].height + 'px'
  game.appendChild(obstacle);
  if (!isGameOver){
  moveObstacle(obstacle);
  }
}

function gameIntro(arg) {
  // body...
  dino.removeEventListener('touchstart', gameIntro)
  startJump()
  let a = setTimeout( function (){
  game.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
  groundmove(8)
  
  initGame()}, 690)
}

function groundmove(x) {
  // body...
    // body...
    ground.style.animation = x + 's groundmove linear infinite'
}
function initGame() {
  // body...
document.addEventListener('touchstart', startJump); 

let obstacleId = setInterval(
  function () {
    if (!isGameOver) {
      createObstacle()
    } else {
      
      clearInterval(obstacleId);
      
    }
  }, 200*speed)
}

function scoreCount() {
  // body...
  setInterval(function () {
    // body...
  }, 200)
}
dino.addEventListener(
  'touchstart', gameIntro
)