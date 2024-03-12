const body = document.querySelector('body');
const h1 = document.createElement('h1');
const startButton = document.createElement('button');


h1.textContent = 'Welcome to Snake!';
body.appendChild(h1);

startButton.classList.add('start-button');
startButton.textContent = 'Start Game';
startButton.addEventListener('click', () => {
  window.location.href = '/game.html';
  });
body.appendChild(startButton);




