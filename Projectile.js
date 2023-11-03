class Projectile {
    constructor ({position = {x : 0, y : 0}, direction = "d"}) {
        this.position = position;
        this.radius = 3;
        this.height = this.radius;
        this.width = this.radius;
        this.velocity = 4;
        this.direction = direction;
    }

    draw() {
        c.fillStyle = "rgba(70,5,10,1)";
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        c.stroke();
        c.fill()
    }

    update(){
        switch (this.direction) {
            case "u" :
                this.position.y -= this.velocity;
                break;
            case "d" :
                this.position.y += this.velocity;
                break;
            case "l" :
                this.position.x -= this.velocity;
                break;
            case "r" :
                this.position.x += this.velocity;
                break;
        }
    }

    
}