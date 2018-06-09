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
        this.x = this.x + (this.speed * 30 * dt) + 1;

        // collison detection
        if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {

            // respawn when player hit by bug (Enemy)
            player.x = 200;
            player.y = 370;

            // decrease level count on player contact with bug
            // dont go under level 1
            if (level > 1) {
                level--;

                // lower bug speed when lose level
                // make every enemy a little faster
                for (const enemy of allEnemies) {
                    enemy.speed = enemy.speed - 2;
                }

                // audio when player losses level
                loss.play();

                // update level number on screen
                document.querySelector('#level-number').innerHTML = level;
            }
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
                clicks++;
                break;
            case 'down':
                this.y = this.y + 50;
                clicks++;
                break;
            case 'left':
                this.x = this.x - 50;
                clicks++;
                break;
            case 'right':
                this.x = this.x + 50;
                clicks++;
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

            // audio when player gets passed level
            point.play();

            // make every enemy a little faster
            for (const enemy of allEnemies) {
                enemy.speed = enemy.speed + 2;
            }

           // update level number on screen
           document.querySelector('#level-number').innerHTML = level;
        }

        // if winner beats the game
        if (level === 10) {
            document.querySelector('.modal').classList.add('show-modal');
            document.querySelector('.clicks').innerHTML = clicks;
            document.querySelector('.restart').addEventListener('click', function() {
                location.reload();
            });
            // insert timer information
        }
    }
}

// audio files
const point = new Audio('./mp3/point.wav');
const loss = new Audio('./mp3/loss.wav');

// pass in xPos, Ypos, and speed for new Enemy instance
const enemy1 = new Enemy(-100, 230, 5);
const enemy2 = new Enemy(0, 140, 10);
const enemy3 = new Enemy(-10, 55, 5);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
const player = new Player();

// level variable, initialized once
let level = 1;

// keep track of clicks to show user 
let clicks = 0;

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
