console.log("hello world !");

const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector(".score span");
const startBtn = document.querySelector(".start");
let width = 20;
let squares = [];
let score = 0;
let interval = 0;
let timeIncrease = 0.9;

// Create Board
function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    // To keep track of squares's index
    square.setAttribute("id", i);
    grid.appendChild(square);
    squares.push(square);
  }
}

createBoard();

// Create Snake using Constructors
class Snake {
  constructor() {
    this.startIndex = [2, 1, 0];
    this.speed = 400;
    this.currentIndex = this.startIndex;
    this.direction = 1;
  }

  draw() {
    this.currentIndex.forEach((snakePieceIdx) =>
      squares[snakePieceIdx].classList.add("snake")
    );
  }

  remove() {
    this.currentIndex.forEach((snakePieceIdx) =>
      squares[snakePieceIdx].classList.remove("snake")
    );
  }
}

const snake = new Snake();

function control(e) {
  switch (e.keyCode) {
    case 37:
      // This If statement prevents the snake of running backwards into itself
      if (snake.direction !== 1) snake.direction = -1;
      break;
    case 38:
      // This If statement prevents the snake of running backwards into itself
      if (snake.direction !== width) snake.direction = -width;
      break;
    case 39:
      // This If statement prevents the snake of running backwards into itself
      if (snake.direction !== -1) snake.direction = 1;
      break;
    case 40:
      // This If statement prevents the snake of running backwards into itself
      if (snake.direction !== -width) snake.direction = width;
      break;
  }
}

function move() {
  //deals with snake hitting border and snake hitting self
  if (
    (snake.currentIndex[0] + width >= width * width &&
      snake.direction === width) || //if snake hits bottom
    (snake.currentIndex[0] % width === width - 1 && snake.direction === 1) || //if snake hits right wall
    (snake.currentIndex[0] % width === 0 && snake.direction === -1) || //if snake hits left wall
    (snake.currentIndex[0] - width < 0 && snake.direction === -width) || //if snake hits the top
    squares[snake.currentIndex[0] + snake.direction].classList.contains("snake") //if snake goes into itself
  ) {
    return clearInterval(interval); //this will clear the interval if any of the above happen
  }

  let tail = snake.currentIndex.pop();
  squares[tail].classList.remove("snake");
  snake.currentIndex.unshift(snake.currentIndex[0] + snake.direction);

  //deals with snake getting apple
  if (squares[snake.currentIndex[0]].classList.contains("apple")) {
    removeApple();
    squares[tail].classList.add("snake");
    snake.currentIndex.push(tail);
    randomApple();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    snake.speed = snake.speed * timeIncrease;
    interval = setInterval(move, snake.speed);
  }
  snake.draw();
}

function startGame() {
  snake.remove();
  removeApple();
  clearInterval(interval);
  score = 0;
  scoreDisplay.innerHTML = score;
  randomApple();
  direction = 1;
  snake.currentIndex = [2, 1, 0];
  snake.speed = 400;
  snake.direction = 1;
  snake.draw();

  interval = setInterval(move, snake.speed);
}

// Draw apple
let appleCurrentIndex = 18;

function drawApple() {
  squares[appleCurrentIndex].classList.add("apple");
  squares[appleCurrentIndex].innerHTML = "🍎";
}

function removeApple() {
  squares[appleCurrentIndex].classList.remove("apple");
  squares[appleCurrentIndex].innerHTML = "";
}

drawApple();
//generate new apple once apple is eaten
function randomApple() {
  do {
    appleCurrentIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleCurrentIndex].classList.contains("snake")); //making sure apples dont appear on the snake
  drawApple();
}

document.addEventListener("keyup", control);
startBtn.addEventListener("click", startGame);
