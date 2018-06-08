// Enemies our player must avoid
class Enemy {
    constructor(xPos, yPos, speed) {
        
        // pass in new xPos, Ypos and speed for unique enemy position
        this.x = xPos;
        this.y = yPos;
        this.speed = speed;

        // The image/sprite for our enemies
        this.sprite = 'images/enemy-bug.png';
    }

    // Parameter: dt, a time delta between ticks
    // Update the enemy's position, required method for game
    update(dt) {
        this.x = this.x + (this.speed * 40 * dt) + 1;

        // collison detection
        if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {

            // respawn when hit by bug
            player.x = 200;
            player.y = 370;

            // decrease level count on player contact with bug
            level--;
        };
    }

    render() {
        // Draw the enemy on the screen
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        // if enemy goes off screen, reset.
        if (this.x > 600) {
            this.x = this.x - 1000;
        }
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 370;
    }

    update() {
        this.x = this.x;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(allowedKeys) {

        // allowedKeys returns 'up', 'left', 'right', 'down'
        // when a case has matched sprite changes position
        switch(allowedKeys) {
            case 'up':
                this.y = this.y - 50;
                break;
            case 'down':
                this.y = this.y + 50;
                break;
            case 'left':
                this.x = this.x - 50;
                break;
            case 'right':
                this.x = this.x + 50;
                break
        }

        // prevent player from exiting the x-axis
        // used switch to shorten code
        switch(this.x) {
            case -100:
               this.x = this.x + 50;
               break;
            case 500:
                this.x = this.x - 50;
                break; 
        }

        // prevent player from moving down from spawn
        if(this.y === 470) {
            this.y = this.y - 50;
        }

        // when player reaches water reset to spawn position
        if (this.y === -30) {
            this.x = 200;
            this.y = 370;

            // increase level count on successful completion
            level++;

            console.log(level);
        }
    }
}




// pass in xPos, Ypos, and speed for new Enemy instance
const enemy1 = new Enemy(-200, 230, 10);
const enemy2 = new Enemy(0, 140, 25);
const enemy3 = new Enemy(-150, 55, 10);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
const player = new Player();

// level variable, initialized once
let level = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
