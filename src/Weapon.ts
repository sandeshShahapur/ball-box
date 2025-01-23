import { Utils } from "./Utils.js";
import { Ball } from "./Ball.js";

export class Weapon {
    private static startingLocs: string[] = ["top", "bottom", "left", "right"];

    private startingLoc: string;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private dx: number;
    private dy: number;
    private speed: number;
    private font: string;
    private letter: string;
    private color: string;

    constructor(ctx: CanvasRenderingContext2D) {
        let size = Math.floor(Math.random() * 20) + 10; // [10, 30)

        this.font = `${size}px ${Utils.randomFont()}`;
        this.letter = Utils.randomChar();
        this.color = Utils.randomHexColor();

        ctx.font = this.font;
        ctx.fillStyle = this.color;
        let metrics = ctx.measureText(this.letter);

        this.width = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
        this.height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;


        this.startingLoc = Weapon.randomStartingLoc();
        [this.x, this.y, this.dx, this.dy] = this.randomTrajectory(this.startingLoc, ctx.canvas);

        this.speed = Math.floor(Math.random() * 2) + 1; // [1, 3)
    }

    public static randomStartingLoc(): string {
        return Weapon.startingLocs[Math.floor(Math.random() * Weapon.startingLocs.length)];
    }

    public randomTrajectory(startingLoc: string, canvas: HTMLCanvasElement): [number, number, number, number] {
        let x: number, y: number, dx: number, dy: number;
        switch (startingLoc) {
            case "top":
                x = Math.floor(Math.random() * canvas.width);
                y = 0 - this.height;
                dx = (Math.random() * 2) - 1;
                dy = Math.random();
                break;

            case "bottom":
                x = Math.floor(Math.random() * canvas.width);
                y = canvas.height;
                dx = (Math.random() * 2) - 1;
                dy = -Math.random();
                break;

            case "left":
                x = 0 - this.width;
                y = Math.floor(Math.random() * canvas.height);
                dx = Math.random();
                dy = (Math.random() * 2) - 1;
                break;

            case "right":
                x = canvas.width;
                y = Math.floor(Math.random() * canvas.height);
                dx = -Math.random();
                dy = (Math.random() * 2) - 1;
                break;
        }

        return [x, y, dx, dy];
    }

    getSize(): number {
        return this.width + this.height/2;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(this.letter, this.x, this.y);
    }

    move() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }

    hasCollidedWithBall(ball: Ball): boolean {
        const centersDiffX = Math.abs(ball.getX() - this.x - this.width / 2);
        const centersDiffY = Math.abs(ball.getY() - this.y - this.height / 2);

        if (centersDiffX > (this.width / 2 + ball.getRadius())) return false;
        if (centersDiffY > (this.height / 2 + ball.getRadius())) return false;

        if (centersDiffX <= this.width / 2) return true;
        if (centersDiffY <= this.height / 2) return true;

        const cornerDistanceSq = (centersDiffX - this.width / 2) ** 2 + (centersDiffY - this.height / 2) ** 2;
        return cornerDistanceSq <= ball.getRadius() ** 2;
    }

    isOutOfBounds(canvas: HTMLCanvasElement): boolean {
        return (
            this.x + this.width < 0 ||
            this.x > canvas.width ||
            this.y + this.height < 0 ||
            this.y > canvas.height
        );
    }

    isTrajectoryComplete(canvas: HTMLCanvasElement): boolean {
        switch (this.startingLoc) {
            case "top":
                return this.y > canvas.height;
            case "bottom":
                return this.y + this.height < 0;
            case "left":
                return this.x > canvas.width;
            case "right":
                return this.x + this.width < 0;
        }
    }
}