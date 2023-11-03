class Hero {
    constructor () {
        this.width = 32;
        this.height = 32;
        this.velocity = 2;
        this.image = new Image()
        this.image.src = 'Archer-Green.png'
        this.frames = {
            max: 4,
            current: 0,
            elapsed: 0,
            hold: 5,
            row: 0,
            column: 1
        }
        this.reset();
    }

    reset() {
        this.position = {x : canvas.width /2, y: canvas.height/2};
        this.draw();
    }

    draw() {
        const crop = {
            position : {
                x: this.frames.column * (this.image.width/24),
                y: this.frames.row * (this.image.height/8)
            },
            width: 32,
            height: 32, 

        }
        c.fillStyle = 'rgba(255,255,255,1)';
        // c.fillRect(this.position.x - (this.width/2), this.position.y-(this.height/2), this.width, this.height);
        c.drawImage(this.image, 
            crop.position.x, 
            crop.position.y, 
            crop.width, 
            crop.height, 
            this.position.x - (this.width/2), 
            this.position.y-(this.height/2),
            this.width,
            this.height, 
            );
        this.frames.elapsed++
    }


    down() {
        if (this.position.y < canvas.height - this.height*0.75) {
            this.position.y += this.velocity;
        }
        this.direction = "d";
        this.frames.row = 0;
        this.move()
    }
    up() {
        if (this.position.y > this.height*0.75) {
            this.position.y -= this.velocity;
        }
        this.direction = "u";
        this.frames.row = 4;
        this.move()
    }

    left() {
        if (this.position.x > this.width*0.75) {
            this.position.x -= this.velocity;
        }
        this.direction = "l";
        this.frames.row = 6;
        this.move()
    }
    right() {
        if (this.position.x < canvas.width - this.width*0.75) {
            this.position.x += this.velocity;
        }
        this.direction = "r";
        this.frames.row = 2;
        this.move()
    }

    move() {
        if (this.frames.elapsed % this.frames.hold == 0) {
            if (this.frames.column !=2) {
                this.frames.column = 2;
            }
            else {
                this.frames.column = 3;
            }
        }
        return true
    }
    stationary () {
        this.frames.column = 1;
    }

    shoot() {
        projectiles.push(new Projectile({position : {x: this.position.x, y: this.position.y}, direction : this.direction}))
    }


}