const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');

canvas.height = 640;
canvas.width = 1024;

const projectiles = []
const enemies = []
var hearts = 3;
var enemyCount = 1;
let keysPressed = {}

const hero = new Hero()

function drawBackground() {
    c.fillStyle = 'orange';
    c.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
    drawBackground();
    for (let i = 0; i < hearts; i ++) {
        c.fillStyle = 'red';
        c.beginPath();
        c.arc(30 + (i * 60), 30, 20, 0, 2 * Math.PI);
        c.stroke();
        c.fill()
        console.log("hearts drawn")
    }
    if (keysPressed['ArrowUp']) {
        hero.up()
    }
    if (keysPressed['ArrowDown']) {
        hero.down()
    }
    if (keysPressed['ArrowLeft']) {
        hero.left()
    }
    if (keysPressed['ArrowRight']) {
        hero.right()
    }

    for (let i = projectiles.length - 1 ; i >= 0; i--){
        projectiles[i].update()
        projectiles[i].draw()
        for (let j = enemies.length -1; j >= 0 ; j --) {
            if (isCollision (projectiles[i], enemies[j])) {
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
        if (isCollision(enemies[i],hero)) {
            enemies.splice(i,1);
            hearts -= 1;
            console.log(hearts)
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

function isCollision(object1, object2) {
    if (Math.abs(object1.position.y - object2.position.y) < object1.height/2 + object2.height/2 &&
        Math.abs(object1.position.x - object2.position.x) < object1.width/2 + object2.width/2){
            return true
        }
    return false
}

const intervalID = setInterval(function () {
    console.log("interval running");
    // randomA = Math.random 
    for (let i = 0; i < enemyCount; i ++) {
        const randomSide = Math.floor(Math.random() * 4) + 1
        switch (randomSide){
            case 1: 
                var varY = -20;
                var varX = Math.floor(Math.random() * canvas.width);
                console.log(varY);
                console.log(varX);
                break;
            case 2: 
                var varY = canvas.height + 20;
                var varX = Math.floor(Math.random() * canvas.width);
                console.log(varY);
                console.log(varX);
                break;
            case 3: 
                var varY = Math.floor(Math.random() * canvas.height);
                var varX = -20;
                console.log(varY);
                console.log(varX);
                break;
            case 4: 
                var varY = Math.floor(Math.random() * canvas.height);
                var varX = canvas.width + 20 
                console.log(varY);
                console.log(varX);
                break;
    
        }
        enemies.push(new Enemy({position: {x: varX, y: varY}}));
    }
    enemyCount += 1
}
    ,7000
)