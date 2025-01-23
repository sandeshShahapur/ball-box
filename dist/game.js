import { Ball } from "./Ball.js";
import { InputHandler } from "./InputHandler.js";
import { Weapon } from "./Weapon.js";
export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.textBaseline = "top";
        this.running = false;
        this.animationFrameId = null;
        this.inputHandler = new InputHandler();
        this.difficultySlider = document.getElementById("difficultySlider");
        this.difficulty = parseInt(this.difficultySlider.value);
        this.difficultySlider.addEventListener("input", () => this.difficulty = parseInt(this.difficultySlider.value));
        this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2, 2, 2, this.difficulty * 2);
        this.weapons = [];
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    gameLoop() {
        if (!this.running)
            return;
        if (Math.random() < this.difficulty / 100) {
            this.weapons.push(new Weapon(this.ctx));
        }
        this.ball.move(this.canvas, this.inputHandler);
        for (let weapon of this.weapons)
            weapon.move();
        this.weapons = this.weapons.filter(weapon => {
            if (weapon.isTrajectoryComplete(this.canvas))
                return false;
            if (weapon.hasCollidedWithBall(this.ball)) {
                this.ball.handleCollisionWithWeapon(weapon);
                return false;
            }
            return true;
        });
        this.clearCanvas();
        this.ball.draw(this.ctx);
        for (let weapon of this.weapons)
            weapon.draw(this.ctx);
        if (this.ball.isCollidingWithWall(this.canvas)) {
            this.animationFrameId = requestAnimationFrame(() => this.gameOver());
            return;
        }
        this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
    }
    start() {
        this.running = true;
        this.gameLoop();
    }
    restartGame() {
        const modal = document.querySelector(".fsModal");
        if (modal)
            modal.remove();
        this.clearCanvas();
        this.inputHandler.reset();
        this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2, 2, 2, this.difficulty * 2);
        this.weapons = [];
        this.start();
    }
    gameOver() {
        const modal = document.createElement("div");
        modal.classList.add("fsModal");
        modal.innerHTML = `
            <div class="modalContent">
                <h1 class="gameOver">Game Over</h1>
                <button class="controlButton">Restart</button>
            </div>
        `;
        modal.querySelector(".controlButton").addEventListener("click", this.restartGame.bind(this));
        document.body.appendChild(modal);
    }
    stop() {
        this.running = false;
        if (this.animationFrameId)
            cancelAnimationFrame(this.animationFrameId);
    }
}
