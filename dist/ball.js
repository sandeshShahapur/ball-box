export class Ball {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getRadius() {
        return this.radius;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
    move(canvas, inputHandler) {
        if (inputHandler.isKeyPressed("ArrowUp"))
            this.y = Math.max(this.y - this.dy, this.radius);
        if (inputHandler.isKeyPressed("ArrowDown"))
            this.y = Math.min(this.y + this.dy, canvas.height - this.radius);
        if (inputHandler.isKeyPressed("ArrowLeft"))
            this.x = Math.max(this.x - this.dx, this.radius);
        if (inputHandler.isKeyPressed("ArrowRight"))
            this.x = Math.min(this.x + this.dx, canvas.width - this.radius);
    }
    handleCollisionWithWeapon(weapon) {
        this.radius += weapon.getSize() / 10;
    }
    isCollidingWithWall(canvas) {
        return (this.x - this.radius <= 0 ||
            this.x + this.radius >= canvas.width ||
            this.y - this.radius <= 0 ||
            this.y + this.radius >= canvas.height);
    }
}
