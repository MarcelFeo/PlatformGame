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
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }

        this.draw();
    }
}

const player = new Player();
player.update();

// Animation Function
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
};

animate();
