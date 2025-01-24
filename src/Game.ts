import { Ball } from "./Ball.js";
import { InputHandler } from "./InputHandler.js";
import { Weapon } from "./Weapon.js";

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    running: boolean;
    animationFrameId: number | null;

    inputHandler: InputHandler;
    difficultySlider: HTMLSelectElement;
    difficulty: number;
    ball: Ball;
    weapons: Weapon[];

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.ctx.textBaseline = "top";

        this.running = false;
        this.animationFrameId = null;

        this.inputHandler = new InputHandler();

        this.difficultySlider = document.getElementById(
            "difficultySlider"
        ) as HTMLSelectElement;
        this.difficulty = parseInt(this.difficultySlider.value);
        this.difficultySlider.addEventListener(
            "input",
            () => (this.difficulty = parseInt(this.difficultySlider.value))
        );

        this.ball = new Ball(
            this.canvas.width / 2,
            this.canvas.height / 2,
            2,
            2,
            this.difficulty * 2
        );
        this.weapons = [];
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    gameLoop() {
        if (!this.running) return;

        if (Math.random() < this.difficulty / 100) {
            this.weapons.push(new Weapon(this.ctx));
        }

        this.ball.move(this.canvas, this.inputHandler);
        for (let weapon of this.weapons) weapon.move();

        this.weapons = this.weapons.filter((weapon) => {
            if (weapon.isTrajectoryComplete(this.canvas)) return false;

            if (weapon.hasCollidedWithBall(this.ball)) {
                this.ball.handleCollisionWithWeapon(weapon);
                return false;
            }

            return true;
        });

        this.clearCanvas();
        this.ball.draw(this.ctx);
        for (let weapon of this.weapons) weapon.draw(this.ctx);

        // if ball is colliding with wall, game over
        if (this.ball.isCollidingWithWall(this.canvas)) {
            this.animationFrameId = requestAnimationFrame(() =>
                this.gameOver()
            );
            return;
        }

        /*
         * requestAnimationFrame is like setTimeout(1000/60) but better (therefore non blocking)
         * it tells the browser to call the callback function before the next repaint
         * 2 advantages:
         *   1. It only executes as many times as the browser can repaint the screen (typically 60hz)
         *      instead of executing as fast is it can thus saving unnecessary work
         *   2. It is executed in the optimal time for the browser, typically before the next repaint
         */
        this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
    }

    start() {
        this.clearCanvas();
        
        this.running = true;
        this.gameLoop();
    }

    restartGame() {
        const modal = document.querySelector(".fsModal");
        if (modal) modal.remove();

        this.clearCanvas();
        this.inputHandler.resetKeys();
        //TODO DRY
        this.ball = new Ball(
            this.canvas.width / 2,
            this.canvas.height / 2,
            2,
            2,
            this.difficulty * 2
        );
        this.weapons = [];
        this.start();
    }

    gameOver() {
        // modal with restart button
        const modal = document.createElement("div");
        modal.classList.add("fsModal"); // full screen modal
        modal.innerHTML = `
            <div class="modalContent">
                <h1 class="gameOver">Game Over</h1>
                <button class="controlButton">Restart</button>
            </div>
        `;
        modal
            .querySelector(".controlButton")
            .addEventListener("click", this.restartGame.bind(this));

        document.body.appendChild(modal);
    }

    stop() {
        this.running = false;
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

        // TODO cleanup like remove event listeners
    }
}
