class Enemy {
    constructor ({position = {x: 0, y: 0}}) {
        this.position = position
        this.width = 64;
        this.height = 64;
        this.velocity = { x: 0, y :0};
        this.angle = 0;
    }

    draw() {
        c.fillStyle = 'rgba(255,0,0,1)';
        c.fillRect(this.position.x - (this.width/2), this.position.y-(this.height/2), this.width, this.height);
    }

    update() {
        const angle = Math.atan2(
            hero.position.y - this.position.y,
            hero.position.x - this.position.x
          )
        
          const power = 1
          this.velocity.x = Math.cos(angle) * power
          this.velocity.y = Math.sin(angle) * power

          this.position.x += this.velocity.x
          this.position.y += this.velocity.y
    }

}