export class Weapon {
    private static startingLocs: string[] = ["top", "bottom", "left", "right"];

    private startingLoc: string;
    private size: number;
    private x: number;
    private y: number;
    private dx: number;
    private dy: number;
    private speed: number;
    private font: string;
    private letter: string;
    private color: string;

    public static randomStartingLoc(): string {
        return Weapon.startingLocs[Math.floor(Math.random() * Weapon.startingLocs.length)];
    }

    public static randomTrajectory(weaponSize: number, startingLoc: string, canvas: HTMLCanvasElement): [number, number, number, number] {
        let x: number, y: number, dx: number, dy: number;
        switch (startingLoc) {
            case "top":
                x = Math.floor(Math.random() * canvas.width);
                y = 0 - weaponSize;
                dx = (Math.random() * 2) - 1;
                dy = Math.random();
                break;
            case "bottom":
                x = Math.floor(Math.random() * canvas.width);
                y = canvas.height + weaponSize;
                dx = (Math.random() * 2) - 1;
                dy = -Math.random();
                break;
            case "left":
                x = 0 - weaponSize;
                y = Math.floor(Math.random() * canvas.height);
                dx = Math.random();
                dy = (Math.random() * 2) - 1;
                break;
            case "right":
                x = canvas.width + weaponSize;
                y = Math.floor(Math.random() * canvas.height);
                dx = -Math.random();
                dy = (Math.random() * 2) - 1;
                break;
        }
        return [x, y, dx, dy];
    }

    public static randomFont(): string {
        const fonts = ["Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman", "Georgia", "Garamond", "Courier New", "Brush Script MT"];
        return fonts[Math.floor(Math.random() * fonts.length)];
    }

    public static randomChar(): string {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26))
    }

    public static randomHexColor(): string {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    constructor(canvas: HTMLCanvasElement) {
        this.size = Math.floor(Math.random() * 20) + 10; // [10, 30)

        this.startingLoc = Weapon.randomStartingLoc();
        [this.x, this.y, this.dx, this.dy] = Weapon.randomTrajectory(this.size, this.startingLoc, canvas);

        this.speed = Math.floor(Math.random() * 2) + 1; // [1, 3)

        this.font = `${this.size}px ${Weapon.randomFont()}`;
        this.letter = Weapon.randomChar();
        this.color = Weapon.randomHexColor();
    }

    getSize(): number {
        return this.size;
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

    hasCollidedWithBall(ballX: number, ballY: number, ballRadius: number): boolean {
        return Math.sqrt((this.x - ballX) ** 2 + (this.y - ballY) ** 2) < this.size + ballRadius;
    }

    isOutOfBounds(canvas: HTMLCanvasElement): boolean {
        return (
            this.x < 0 - this.size ||
            this.x > canvas.width + this.size ||
            this.y < 0 - this.size ||
            this.y > canvas.height + this.size
        );
    }

    isTrajectoryComplete(canvas: HTMLCanvasElement): boolean {
        if (!this.isOutOfBounds(canvas)) return false;

        switch (this.startingLoc) {
            case "top":
                return this.y > 0 + this.size;
            case "bottom":
                return this.y < canvas.height - this.size;
            case "left":
                return this.x > 0 + this.size;
            case "right":
                return this.x < canvas.width - this.size;
        }
    }
}