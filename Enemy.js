class Enemy {
    constructor ({position = {x: 0, y: 0}}) {
        this.position = position
        this.width = 32;
        this.height = 32;
        this.velocity = { x: 0, y :0};
        this.angle = 0;
        this.image = new Image()
        this.image.src = 'Slime.png'
        this.frames = {
            max: 4,
            current: 0,
            elapsed: 0,
            hold: 5,
            row: 0,
            column: 0,
        }
    }

    draw() {
        const crop = {
            position : {
                x: this.frames.column * (this.image.width/15),
                y: 0,
            },
            width: 32,
            height: 32, 

        }
        // c.fillStyle = 'rgba(255,0,0,1)';
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

    update() {
        const angle = Math.atan2(
            hero.position.y - this.position.y,
            hero.position.x - this.position.x
          )
        
          const power = 0.3
          this.velocity.x = Math.cos(angle) * power
          this.velocity.y = Math.sin(angle) * power

          this.position.x += this.velocity.x
          this.position.y += this.velocity.y

          if (this.frames.elapsed % this.frames.hold == 0) {
              if (this.frames.column != 8) {
                this.frames.column += 1
            }
            else {
                this.frames.column = 0
            }
        }
    }

}