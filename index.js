// Images
import platform from '../assets/platform.png';
import hills from '../assets/hills.png';
import background from '../assets/background.png';

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
    constructor({ x, y, image }) {
        this.position = { x, y };
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }

    draw() {
        context.fillStyle = "yellow";
        context.drawImage(this.image, this.position.x, this.position.y);
      }
}

// GenericObject Class
class GenericObject {
    constructor({ x, y, image }) {
        this.position = { x, y };
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }

    draw() {
        context.fillStyle = "yellow";
        context.drawImage(this.image, this.position.x, this.position.y);
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

// Set Image Platform
function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image
};

const platformImage = createImage(platform);

// New Player and Platform and Objects
const player = new Player();
const platforms = [new Platform({ x: -1, y: 470, image: createImage(platform) }), new Platform({ x: platformImage.width - 3 , y: 470, image: createImage(platform) })];
const genericObject = [new GenericObject({ x: 0, y: 0, image: createImage(background) }), new GenericObject({ x: 0, y: 0, image: createImage(hills) })];

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
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    genericObject.forEach(genericObject => {
      genericObject.draw();
    });

    platforms.forEach(platform => {
        platform.draw();        
    });
    player.update();

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
            genericObject.forEach(genericObject => {
              genericObject.position.x -= 3;
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
