# Snake Game

Welcome to our Snake game! This is a classic game where the player maneuvers a line which grows in length, with the line itself being a primary obstacle.

I developed this version of the classic snake game while a group of students in the bootcamp I work at were going through unit 1 and had to create a VanillaJS, HTML, CSS based browser game as a final Unit project. I always enjoy seeing the creativity of students that it inspires me to try a new game as well. This time around I wanted to create a game I was hooked on since I spent hours on it on my Nokia 5110.

## How to Play

Use the arrow keys, the WASD keys or the buttons on the screen to move the snake. Eat the apples as they fall off the tree to grow and score points. Avoid running into the walls or yourself. The game levels up and thus speeds up every 50 points. Good luck!

## Live Demo

You can play the game all: [here](theserpantshome.surge.sh).

## Screenshots

<p align="center">
<img src="https://i.imgur.com/Jo9anGYm.png" alt='title screen'>
<img src="https://i.imgur.com/gZwzZAMm.png" alt='game screen desktop view'>
</p>

<p align="center">
<img src="https://i.imgur.com/U41e2vnm.png" alt='game screen in play mobile view'>
<img src="https://i.imgur.com/YcnOq5Bm.png" alt='game screen in mobile view'>
</p>

## Technologies Used

- HTML
- JavaScript
- CSS3
- Generative AI: Gemini to create all graphics used in the game.

## Challenging Parts

One of the more challenging parts of the code was managing the direction of the snake's head and its turns. I used a JavaScript object to keep track of the snake's body and direction. Each part of the snake's body is an object with `x`, `y`, and `direction` properties. The `direction` property is updated based on the user's input, and the `x` and `y` properties are updated based on the `direction`.

Here's a snippet of the `snake` object:

```JavaScript
const snake = {
  body: [],
  direction: 'right',
  grow: false,
  speed: 300,
  interval: null,
};
```

And here's how we update the snake's direction based on user input:

```JavaScript
switch (event.key) {
  case 'ArrowUp':
  case 'w':
    if (snake.direction !== 'down') {
      snake.direction = 'up';
    }
    break;
  // ...rest of the switch cases
}
```

### Credits

Images used were all created with Google Gemini. Sound effects from Pixabay.
