// Canvas Configuration
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Width, Height of screen
canvas.width = innerWidth;
canvas.height = innerHeight;

// Player Class
class Player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 1 };
        this.width = 30;
        this.height = 30;
    };

    draw() {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.y += this.velocity.y;
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
