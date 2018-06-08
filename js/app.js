// Enemies our player must avoid
class Enemy {
    constructor(xPos, yPos) {
        
        // pass in new xPos and Ypos for unique enemy position
        this.x = xPos;
        this.y = yPos;

        // The image/sprite for our enemies, this uses
        // Parameter: dt, a time delta between ticks
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    update(dt) {
        this.x = this.x + 800 * dt;
    }

    render() {
        // Draw the enemy on the screen
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        // if enemy goes off screen, reset.
        if (this.x > 600) {
            this.x = this.x -1000;
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
        
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(allowedKeys) {

        // allowedKeys returns 'up', 'left', 'right', 'down'
        // when a case has matched sprite changes position
        switch(allowedKeys) {
            case 'up':
                this.y = this.y - 100;
                break;
            case 'down':
                this.y = this.y + 100;
                break;
            case 'left':
                this.x = this.x - 100;
                break;
            case 'right':
                this.x = this.x + 100;
                break
        }

        // prevent player from exiting the x-axis
        // used switch to shorten code
        switch(this.x) {
            case -100:
               this.x = this.x + 100;
               break;
            case 500:
                this.x = this.x - 100;
                break; 
        }

        // prevent player from moving down from spawn
        if(this.y === 470) {
            this.y = this.y - 100;
        }

        // when player reaches water reset to spawn position
        if (this.y === -30) {
            this.x = 200;
            this.y = 370;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(1, 140);
const enemy2 = new Enemy(1, 230);
const enemy3 = new Enemy(1, 55);

const allEnemies = [enemy1, enemy2, enemy3];
console.log(allEnemies);

const player = new Player();

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
