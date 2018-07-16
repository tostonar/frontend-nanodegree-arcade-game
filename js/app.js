const getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min;
};

// Enemies our player must avoid
const Enemy = function (x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // x pos
  this.x = x;
  // y pos
  this.y = y + 55; // center
  // DONE: make speed a random number between 200 & 300
  this.speed = getRandomArbitrary(200, 300);

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.step = 101;
  this.boundary = this.step * 5;
  this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  // If enemy is not past boundary
  if (this.x < this.boundary) {
    // move forward
    // increment x by speed * dt

    this.x += this.speed * dt;
  } else {
    // reset pos to start
    this.x = this.resetPos;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function (player) {
  if (this.y === player.y) {
    if (this.x >= player.x - 50 && this.x <= player.x + 50) {
      return true;
    }

    return false;
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Hero {
  // constructor
  constructor() {
    // properties
    // x pos
    this.x = 202;
    // y pos
    this.y = 387;
    // sprite image
    this.sprite = 'images/char-princess-girl.png';
    this.moving = false;
    this.win = false;
  }

  // methods


  // update position
  update() {
    // check win here
    if (this.y === -28 && !this.moving && !this.win) {
      alert('You won! Play again!');
      this.win = true;
    }
  }

  render() {
    // Draw player sprite on current x and y coord
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.moving = false;
  }

  // handle keyboard input
  handleInput(x) {
    // update player's x and y coord according to input
    // DONE: don't let player move off board
    switch (x) {
      case 'up':
        if (this.y <= -28) {
          console.log('You tried to move off the board! Nope!!!');
          this.y;
        } else {
          console.log(`You moved ${x}.`);
          this.y -= 83;
        }
        break;

      case 'down':
        if (this.y >= 387) {
          console.log('You tried to move off the board! Nope!!!');
          this.y;
        } else {
          console.log(`You moved ${x}.`);
          this.y += 83;
        }
        break;

      case 'left':
        if (this.x <= 0) {
          console.log('You tried to move off the board! Nope!!!');
          this.x;
        } else {
          console.log(`You moved ${x}.`);
          this.x -= 101;
        }
        break;

      case 'right':
        if (this.x >= 404) {
          console.log('You tried to move off the board! Nope!!!');
          this.x;
        } else {
          console.log(`You moved ${x}.`);
          this.x += 101;
        }
        break;

      default:
        console.log('Please choose a direction using the arrows on your keyboard.');
    }
    this.moving = true;
  }

  // reset hero
  reset() {
    // set x and y to starting x and y
    this.x = 202;
    this.y = 387;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const bug1 = new Enemy(-101, 0);
const bug2 = new Enemy(-101, 83);
const bug3 = new Enemy((-101 * 4), 83);
const bug4 = new Enemy((-101 * 2), 166);
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4);
console.log(allEnemies);
// new Hero object
const player = new Hero();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
