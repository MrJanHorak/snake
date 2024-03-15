const body = document.querySelector('body');
const h1 = document.createElement('h1');
const cover = document.createElement('div');
const coverImage = document.createElement('img');
const startButton = document.createElement('button');


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

body.appendChild(h1);
body.appendChild(cover);
body.appendChild(startButton);




