import { InputHandler } from "../input/InputHandler";
import { Weapon } from "./Weapon";

export class Ball {
    private radius: number;
    private x: number;
    private y: number;
    private dx: number;
    private dy: number;

    constructor(x: number, y: number, dx: number, dy: number, radius: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getRadius(): number {
        return this.radius;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }

    move(canvas: HTMLCanvasElement, inputHandler: InputHandler): void {
        if (inputHandler.isKeyPressed("ArrowUp"))
            this.y = Math.max(this.y - this.dy, this.radius);
        if (inputHandler.isKeyPressed("ArrowDown"))
            this.y = Math.min(this.y + this.dy, canvas.height - this.radius);
        if (inputHandler.isKeyPressed("ArrowLeft"))
            this.x = Math.max(this.x - this.dx, this.radius);
        if (inputHandler.isKeyPressed("ArrowRight"))
            this.x = Math.min(this.x + this.dx, canvas.width - this.radius);
    }

    handleCollisionWithWeapon(weapon: Weapon): void {
        this.radius += weapon.getSize() / 10;
    }

    isCollidingWithWall(canvas: HTMLCanvasElement): boolean {
        return (
            this.x - this.radius <= 0 ||
            this.x + this.radius >= canvas.width ||
            this.y - this.radius <= 0 ||
            this.y + this.radius >= canvas.height
        );
    }
}
