export class Weapon {
    static randomStartingLoc() {
        return Weapon.startingLocs[Math.floor(Math.random() * Weapon.startingLocs.length)];
    }
    static randomTrajectory(weaponSize, startingLoc, canvas) {
        let x, y, dx, dy;
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
    static randomFont() {
        const fonts = ["Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman", "Georgia", "Garamond", "Courier New", "Brush Script MT"];
        return fonts[Math.floor(Math.random() * fonts.length)];
    }
    static randomChar() {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    static randomHexColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    constructor(canvas) {
        this.size = Math.floor(Math.random() * 20) + 10;
        this.startingLoc = Weapon.randomStartingLoc();
        [this.x, this.y, this.dx, this.dy] = Weapon.randomTrajectory(this.size, this.startingLoc, canvas);
        this.speed = Math.floor(Math.random() * 2) + 1;
        this.font = `${this.size}px ${Weapon.randomFont()}`;
        this.letter = Weapon.randomChar();
        this.color = Weapon.randomHexColor();
    }
    getSize() {
        return this.size;
    }
    draw(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(this.letter, this.x, this.y);
    }
    move() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }
    hasCollidedWithBall(ballX, ballY, ballRadius) {
        return Math.sqrt(Math.pow((this.x - ballX), 2) + Math.pow((this.y - ballY), 2)) < this.size + ballRadius;
    }
    isOutOfBounds(canvas) {
        return (this.x < 0 - this.size ||
            this.x > canvas.width + this.size ||
            this.y < 0 - this.size ||
            this.y > canvas.height + this.size);
    }
    isTrajectoryComplete(canvas) {
        if (!this.isOutOfBounds(canvas))
            return false;
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
Weapon.startingLocs = ["top", "bottom", "left", "right"];
