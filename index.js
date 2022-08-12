// Canvas Configuration
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Width, Height of screen
canvas.width = innerWidth;
canvas.height = innerHeight;

// Gravity
const gravity = 1.5;

// Platform Class
class Platform {
    constructor({ x, y }) {
        this.position = { x, y };
        this.width = 200;
        this.height = 20;
    }

    draw() {
        context.fillStyle = "yellow";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

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

// New Player and PLatform
const player = new Player();
// const platform = new Platform();
const platforms = [new Platform({ x: 200, y: 100 }), new Platform({ x: 400, y: 200 })];

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

// Win Scenario
let scrollOffset = 0;

// Animation Function
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    platforms.forEach(platform => {
        platform.draw();        
    });

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5;
    } else if(keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffset += 5;
            platforms.forEach(platform => {
                platform.position.x -= 5;       
            });
        } else if (keys.left.pressed) {
            scrollOffset -= 5;
            platforms.forEach(platform => {
                platform.position.x += 5;        
            }); 
        };
    };

    // Platform Contact
    platforms.forEach(platform => {
        if (
            player.position.y + player.height <= platform.position.y 
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            &&  player.position.x + player.width >= platform.position.x
            &&  player.position.x <= platform.position.x + platform.width
        ) {
            player.velocity.y = 0;
        }
    });

    // Alert If You Win
    if (scrollOffset > 2000) {
        alert('YOU WIN')
    }
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
