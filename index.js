// Canvas Configuration
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Width, Height of screen
canvas.width = innerWidth;
canvas.height = innerHeight;

// Gravity
const gravity = 1.5;

// Player Class
class Player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 0 };
        this.width = 30;
        this.height = 30;
    };

    draw() {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }

        this.draw();
    }
}

// New Player
const player = new Player();

// Keys
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    down: {
        pressed: false
    }
};

// Animation Function
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();

    if (keys.right.pressed) {
        player.velocity.x = 5;
    } else if(keys.left.pressed) {
        player.velocity.x = -5;
    } else player.velocity.x = 0;
};

animate();

// Player Movement
window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = true;
            break
        case 83:
            console.log('down');
            break
        case 68:
            console.log('right');
            keys.right.pressed = true;
            break
        case 87:
            console.log('up');
            player.velocity.y -= 20;
            break
    }
});

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = false;
            break
        case 83:
            console.log('down');
            break
        case 68:
            console.log('right');
            keys.right.pressed = false;
            break
        case 87:
            console.log('up');
            player.velocity.y -= 20;
            break
    }
});
