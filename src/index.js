const body = document.querySelector('body');
const h1 = document.createElement('h1');
const cover = document.createElement('div');
const coverImage = document.createElement('img');
const startButton = document.createElement('button');
const rulesButton = document.createElement('button');

h1.textContent = 'Welcome to Snake!';
h1.classList.add('title');

cover.classList.add('cover');
coverImage.src = '/assets/title2.jpeg';
cover.appendChild(coverImage);

startButton.classList.add('start-button');
startButton.textContent = 'Start Game';
startButton.addEventListener('click', () => {
  window.location.href = '/game.html';
});

rulesButton.classList.add('rules-button');
rulesButton.textContent = 'Rules';
rulesButton.addEventListener('click', () => {
  showRules();
});

body.appendChild(h1);
body.appendChild(cover);
body.appendChild(startButton);
body.appendChild(rulesButton);

function showRules() {
  const rulesModal = document.getElementById('rulesModal');
  const rulesText = document.getElementById('rulesText');
  const close = document.getElementsByClassName('close')[0];

  rulesText.textContent =
    'Use the arrow keys, the WASD keys or the buttons on the screen to move the snake. \n\n Eat the apples as they fall off the tree to grow and score points. \n\nAvoid running into the walls or yourself. \n\nThe games levels up and thus speeds up every 50 points. \n\nGood luck!';

  rulesModal.style.display = 'block';

  close.onclick = function () {
    rulesModal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == rulesModal) {
      rulesModal.style.display = 'none';
    }
  };
}
