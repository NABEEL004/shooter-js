class Timer {
    constructor() {
        this.width = canvas.width / 32;
        this.height = canvas.height / 11;
        this.position = {x: canvas.width - this.width, y: this.height}
        this.fontsize = 12
        this.value = 0
    }

    draw() {
        c.font = `700 ${this.fontsize}px monospace`;
        c.textAlign = "right"
        c.fillText(`${this.value}`, this.position.x, this.position.y);
    }
}