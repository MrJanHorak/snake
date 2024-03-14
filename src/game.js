// selectors
const body = document.querySelector('body');

// HTML elements
const h1 = document.createElement('h1');
const board = document.createElement('div');
board.classList.add('board');

//buttons
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');
const startButton = document.createElement('button');
startButton.textContent = 'Start';
startButton.classList.add('start-button');
const replayButton = document.createElement('button');
replayButton.textContent = 'Replay';
replayButton.classList.add('replay-button');

//touch screen controls for mobile
const touchControls = document.createElement('div');
touchControls.classList.add('touch-controls');
const upButton = document.createElement('button');
upButton.textContent = 'Up';
upButton.classList.add('up-button');
const downButton = document.createElement('button');
downButton.textContent = 'Down';
downButton.classList.add('down-button');
const leftButton = document.createElement('button');
leftButton.textContent = 'Left';
leftButton.classList.add('left-button');
const rightButton = document.createElement('button');
rightButton.textContent = 'Right';
rightButton.classList.add('right-button');

// score
const scoreContainer = document.createElement('div');
scoreContainer.classList.add('score-container');
const scoreDisplay = document.createElement('p');
scoreDisplay.classList.add('score-display');
const highScoreDisplay = document.createElement('p');
highScoreDisplay.classList.add('score-display');
const levelDisplay = document.createElement('p');
levelDisplay.classList.add('score-display');

// game over display
const gameOverDisplay = document.createElement('p');
gameOverDisplay.classList.add('game-over-display');

let level = 1;
let highScore = localStorage.getItem('highScore') || 0;
let score = 0;
let cells;

const snake = {
  body: [],
  direction: 'right',
  grow: false,
  speed: 300,
  interval: null,
};

const food = {
  x: 0,
  y: 0,
};

// functions

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 400; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
  board.appendChild(gameOverDisplay);
  cells = document.querySelectorAll('.cell');
}

function renderBoard() {
  cells.forEach((cell) => {
    cell.classList.remove('snake');
    cell.classList.remove('snakeHead');
    cell.classList.remove('snakeHeadUp');
    cell.classList.remove('snakeHeadDown');
    cell.classList.remove('snakeHeadLeft');
    cell.classList.remove('snakeHeadRight');
    cell.classList.remove('snakeCornerRightUp');
    cell.classList.remove('snakeCornerLeftUp');
    cell.classList.remove('snakeCornerRightDown');
    cell.classList.remove('snakeCornerLeftDown');
    cell.classList.remove('snakeUp');
    cell.classList.remove('snakeDown');
    cell.classList.remove('snakeLeft');
    cell.classList.remove('snakeRight');
    cell.classList.remove('food');
  });
  console.log(snake);
  snake.body.forEach((segment, idx) => {
    if (idx === 0) {
      if (segment.direction === 'up') {
        cells[segment.x * 20 + segment.y].classList.add('snakeHeadUp');
      } else if (segment.direction === 'down') {
        cells[segment.x * 20 + segment.y].classList.add('snakeHeadDown');
      } else if (segment.direction === 'left') {
        cells[segment.x * 20 + segment.y].classList.add('snakeHeadRight');
      } else if (segment.direction === 'right') {
        cells[segment.x * 20 + segment.y].classList.add('snakeHeadLeft');
      }
    } else {
      if (segment.direction === 'up') {
        if (snake.body[idx - 1].direction === 'left') {
          cells[segment.x * 20 + segment.y].classList.add('snakeCornerRightUp');
        } else if (snake.body[idx - 1].direction === 'right') {
          cells[segment.x * 20 + segment.y].classList.add('snakeCornerLeftUp');
        } else {
          cells[segment.x * 20 + segment.y].classList.add('snakeUp');
        }
      } else if (segment.direction === 'down') {
        if (snake.body[idx - 1].direction === 'left') {
          cells[segment.x * 20 + segment.y].classList.add(
            'snakeCornerLeftDown'
          );
        } else if (snake.body[idx - 1].direction === 'right') {
          cells[segment.x * 20 + segment.y].classList.add(
            'snakeCornerRightDown'
          );
        } else {
          cells[segment.x * 20 + segment.y].classList.add('snakeDown');
        };
      } else if (segment.direction === 'left') {
        if (snake.body[idx - 1].direction === 'up') {
          cells[segment.x * 20 + segment.y].classList.add('snakeCornerRightUp');
        } else if (snake.body[idx - 1].direction === 'down') {
          cells[segment.x * 20 + segment.y].classList.add('snakeCornerRightDown');
        } else {
          cells[segment.x * 20 + segment.y].classList.add('snakeLeft');
        }
      } else if (segment.direction === 'right') {
        if (snake.body[idx - 1].direction === 'up') {
          cells[segment.x * 20 + segment.y].classList.add('snakeCornerLeftUp');
        } else if (snake.body[idx - 1].direction === 'down') {
          cells[segment.x * 20 + segment.y].classList.add('snakeCornerLeftDown');
        } else {
        cells[segment.x * 20 + segment.y].classList.add('snakeRight');
        }
      }
    }
  });

  // const index = segment.x * 20 + segment.y;
  // cells[index].classList.add('snake');

  cells[food.x * 20 + food.y].classList.add('food');
}

function createFood() {
  let randomCell = Math.floor(Math.random() * 400);
  food.x = Math.floor(randomCell / 20);
  food.y = randomCell % 20;
  cells[randomCell].classList.add('food');
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
  highScoreDisplay.textContent = `High Score: ${highScore}`;
  localStorage.setItem('highScore', highScore);
}

function updateLevel() {
  levelDisplay.textContent = `Level: ${level}`;
}

function gameOver() {
  clearInterval(snake.interval);
  gameOverDisplay.textContent = 'Game Over';
  startButton.style.display = 'none';
  replayButton.style.display = 'block';
}

function moveSnake() {
  const head = { ...snake.body[0] };
  switch (snake.direction) {
    case 'up':
      head.x -= 1;
      head.direction = 'up';
      break;
    case 'down':
      head.x += 1;
      head.direction = 'down';
      break;
    case 'left':
      head.y -= 1;
      head.direction = 'left';
      break;
    case 'right':
      head.y += 1;
      head.direction = 'right';
      break;
    default:
      break;
  }
  snake.body.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    snake.grow = true;
    score += 10;
    if (score > highScore) {
      highScore = score;
    }
    updateScore();
    if (score % 100 === 0) {
      level += 1;
      updateLevel();
      clearInterval(snake.interval);
      snake.speed -= 20;
      snake.interval = setInterval(moveSnake, snake.speed);
    }
    createFood();
  }
  if (!snake.grow) {
    snake.body.pop();
  } else {
    snake.grow = false;
  }
  if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
    gameOver();
  }
  for (let i = 1; i < snake.body.length; i++) {
    if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
      gameOver();
    }
  }
  renderBoard();
}

function startGame() {
  snake.body = [{ x: 10, y: 10, direction: 'right' }];
  snake.direction = 'right';
  snake.grow = false;
  snake.speed = 300;
  snake.interval = setInterval(moveSnake, snake.speed);
  createBoard();
  createFood();
  moveSnake();
  updateScore();
  updateLevel();
  renderBoard();
  gameOverDisplay.innerHTML = '';
  startButton.style.display = 'none';
  replayButton.style.display = 'none';
  levelDisplay.style.display = 'block';
}

// append elements to the body
createBoard();
body.appendChild(h1);
scoreContainer.appendChild(scoreDisplay);
scoreContainer.appendChild(highScoreDisplay);
scoreContainer.appendChild(levelDisplay);
body.appendChild(scoreContainer);
body.appendChild(board);
body.appendChild(buttonContainer);
buttonContainer.appendChild(startButton);
buttonContainer.appendChild(replayButton);
touchControls.appendChild(leftButton);
touchControls.appendChild(upButton);
touchControls.appendChild(downButton);
touchControls.appendChild(rightButton);
body.appendChild(touchControls);

startButton.addEventListener('click', startGame);
replayButton.addEventListener('click', startGame);

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (snake.direction !== 'down') {
        snake.direction = 'up';
      }
      break;
    case 'ArrowDown':
      if (snake.direction !== 'up') {
        snake.direction = 'down';
      }
      break;
    case 'ArrowLeft':
      if (snake.direction !== 'right') {
        snake.direction = 'left';
      }
      break;
    case 'ArrowRight':
      if (snake.direction !== 'left') {
        snake.direction = 'right';
      }
      break;
    default:
      break;
  }
});

document.addEventListener('click', (event) => {
  switch (event.target) {
    case upButton:
      if (snake.direction !== 'down') {
        snake.direction = 'up';
      }
      break;
    case downButton:
      if (snake.direction !== 'up') {
        snake.direction = 'down';
      }
      break;
    case leftButton:
      if (snake.direction !== 'right') {
        snake.direction = 'left';
      }
      break;
    case rightButton:
      if (snake.direction !== 'left') {
        snake.direction = 'right';
      }
      break;
    default:
      break;
  }
});
