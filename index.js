// Images
import platform from '../assets/platform.png';
import hills from '../assets/hills.png';
import background from '../assets/background.png';
import platformSmallTall from '../assets/platformSmallTall.png';

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
        this.speed = 10;
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

// First Start
let platformImage = createImage(platform);

// New Player and Platform and Objects
let player = new Player();
let platforms = [
  new Platform({ x: platformImage.width * 2 + 300 - 2 + platformImage.width - createImage(platform).width , y: 270, image: createImage(platformSmallTall) }),  
  new Platform({ x: -1, y: 470, image: createImage(platform) }), 
  new Platform({ x: platformImage.width - 3 , y: 470, image: createImage(platform) }),
  new Platform({ x: platformImage.width * 2 + 100, y: 470, image: createImage(platform) }),
  new Platform({ x: platformImage.width * 3 + 400, y: 470, image: createImage(platform) }),
  new Platform({ x: platformImage.width * 4 + 600, y: 470, image: createImage(platform) }),
  new Platform({ x: platformImage.width * 6 + 200, y: 450, image: createImage(platform) }),
];
let genericObject = [
  new GenericObject({ x: 0, y: 0, image: createImage(background) }), 
  new GenericObject({ x: 0, y: 0, image: createImage(hills) })
];

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

// Init function
function init() {
  platformImage = createImage(platform);

  // New Player and Platform and Objects
  player = new Player();
  platforms = [
    new Platform({ x: -1, y: 470, image: createImage(platform) }), 
    new Platform({ x: platformImage.width - 3 , y: 470, image: createImage(platform) }),
    new Platform({ x: platformImage.width * 2 + 100 , y: 470, image: createImage(platform) })
  ];
  genericObject = [
    new GenericObject({ x: 0, y: 0, image: createImage(background) }), 
    new GenericObject({ x: 0, y: 0, image: createImage(hills) })
  ];

  // Win Scenario
  scrollOffset = 0;
}

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
        player.velocity.x = player.speed;
    } else if((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
        player.velocity.x = player.speed;
    } else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffset += player.speed;
            platforms.forEach(platform => {
                platform.position.x -= player.speed;       
            });
            genericObject.forEach(genericObject => {
              genericObject.position.x -= player.speed * 0.66;
            });
        } else if (keys.left.pressed) {
            scrollOffset -= player.speed;
            platforms.forEach(platform => {
                platform.position.x += player.speed;        
            }); 

            genericObject.forEach(genericObject => {
                genericObject.position.x -= player.speed * 0.66;
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
    if (scrollOffset > 3500) {
        alert("YOU WIN");
    }

    // Aler If You Lose
    if (player.position.y > canvas.height) {
        alert("YOU LOSE");
        init();
    };
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
