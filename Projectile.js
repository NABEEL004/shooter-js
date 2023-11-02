class Projectile {
    constructor ({position = {x : 0, y : 0}, direction = "u"}) {
        this.position = position;
        this.radius = 8;
        this.height = this.radius;
        this.width = this.radius;
        this.velocity = 16;
        this.direction = direction;
    }

    draw() {
        c.fillStyle = "rgba(0,0,255,1)";
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