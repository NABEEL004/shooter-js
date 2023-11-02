class Hero {
    constructor () {
        this.reset();
        this.width = 64;
        this.height = 64;
        this.velocity = 4;
    }

    reset() {
        this.position = {x : canvas.width /2, y: canvas.height/2};
        console.log(this.position)

        this.draw();
    }

    draw() {
        c.fillStyle = 'rgba(255,255,255,1)';
        c.fillRect(this.position.x - (this.width/2), this.position.y-(this.height/2), this.width, this.height);
    }


    down() {
        if (this.position.y < canvas.height - this.height/2) {
            this.position.y += this.velocity;
        }
        this.direction = "d";
    }
    up() {
        if (this.position.y > this.height/2) {
            this.position.y -= this.velocity;
        }
        this.direction = "u";
    }
    left() {
        if (this.position.x > this.width/2) {
            this.position.x -= this.velocity;
        }
        this.direction = "l";
    }
    right() {
        if (this.position.x < canvas.width - this.width/2) {
            this.position.x += this.velocity;
        }
        this.direction = "r";
    }

    shoot() {
        projectiles.push(new Projectile({position : {x: this.position.x, y: this.position.y}, direction : this.direction}))
        console.log("shooting")
        console.log(this.position)
        console.log(projectiles[0].position)
    }


}