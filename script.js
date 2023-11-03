const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');

canvas.height = 160;
canvas.width = 256;

const projectiles = []
const enemies = []
var hearts = 3;
var enemyCount = 1;
let keysPressed = {}

const hero = new Hero()
const image = new Image()
image.src = './map2.png'

function drawBackground() {
    c.fillStyle = 'orange';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
}

function animate() {
    c.drawImage(image, 0, 0)
    for (let i = 0; i < hearts; i ++) {
        c.fillStyle = 'red';
        c.beginPath();
        c.arc(8 + (i * 16), 8, 4, 0, 2 * Math.PI);
        c.stroke();
        c.fill()
    }
    if (keysPressed['ArrowUp']) {
        hero.up()
    }
    else if (keysPressed['ArrowDown']) {
        hero.down()
    }
    else if (keysPressed['ArrowLeft']) {
        hero.left()
    }
    else if (keysPressed['ArrowRight']) {
        hero.right()
    }
    else  {
        hero.stationary()
    }

    for (let i = projectiles.length - 1 ; i >= 0; i--){
        projectiles[i].update()
        projectiles[i].draw()
        for (let j = enemies.length -1; j >= 0 ; j --) {
            if (isCollision (projectiles[i], enemies[j], 0)) {
                projectiles.splice(i,1);
                enemies.splice(j,1);
                break;
            }
        }
        if (projectiles.length > 0 && outOfBounds(projectiles[i])) {projectiles.splice(i,1)}
    }
    hero.draw();
    for (let i = enemies.length - 1 ; i >= 0; i--){
        enemies[i].update()
        enemies[i].draw()
        if (isCollision(enemies[i],hero, 8)) {
            enemies.splice(i,1);
            hearts -= 1;
        }
    }
    requestAnimationFrame(animate);
}


animate()

// document.onkeydown = checkDownKey;
// document.onkeyup = checkUpKey;

// function checkDownKey(e) {

//     e = e || window.event;

//     if (e.keyCode == 38) {
//         hero.up()
//     }
//     if (e.keyCode == 37) {
//         hero.left()
//     }
//     if (e.keyCode == 39) {
//        hero.right()
//     }
//     if (e.keyCode == 40) {
//        hero.down()
//     }
//     if (e.keyCode == 32) {
//        hero.shoot()
//        console.log(projectiles)
//     }
// }



document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    if (event.key == ' ') {
        hero.shoot()
    }
 });
 
 document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });

function outOfBounds (obj) {
        try{
            if (obj.position.y < 0 || 
                obj.position.y > canvas.height ||
                obj.position.x > canvas.width ||
                obj.position.x < 0 ) {
                    return true
                }
            }
        catch{
            return false
        }
    return false
}

function isCollision(object1, object2, offset) {
    if (Math.abs(object1.position.y - object2.position.y) < object1.height/2 + object2.height/2 - offset &&
        Math.abs(object1.position.x - object2.position.x) < object1.width/2 + object2.width/2 - offset){
            return true
        }
    return false
}

const intervalID = setInterval(function () {
    // randomA = Math.random 
    for (let i = 0; i < enemyCount; i ++) {
        const randomSide = Math.floor(Math.random() * 4) + 1
        switch (randomSide){
            case 1: 
                var varY = -20;
                var varX = Math.floor(Math.random() * canvas.width);
                break;
            case 2: 
                var varY = canvas.height + 20;
                var varX = Math.floor(Math.random() * canvas.width);
                break;
            case 3: 
                var varY = Math.floor(Math.random() * canvas.height);
                var varX = -20;
                break;
            case 4: 
                var varY = Math.floor(Math.random() * canvas.height);
                var varX = canvas.width + 20 
                break;
    
        }
        enemies.push(new Enemy({position: {x: varX, y: varY}}));
    }
    enemyCount += 1
}
    ,7000
)