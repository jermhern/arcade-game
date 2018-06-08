// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + 10) * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    this.x = 1;
    this.y = 500;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

        console.log("x: " + this.x, "y: " + this.y)

        // prevent player from exiting the x-axis
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
const allEnemies = [];
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
