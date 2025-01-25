import { Utils } from "./core/Utils";
import { Game } from "./core/Game";

declare global {
    interface Window {
        main: () => void;
    }
}

if (Utils.isUserUsingMobile()) {
    document.getElementById("joyStickContainer")!.style.display = "block";

    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // draw text "click on start button"
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Tap on Start", canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText("to use JoyStick", canvas.width / 2, canvas.height / 2 + 20);
}

// Game entry point
let currentGame: Game | null = null; // Store the currently running game

function main() {
    // Stop the current game if it exists
    if (currentGame) {
        currentGame.stop();
        currentGame = null;
    }

    currentGame = new Game("gameCanvas");
    currentGame.start();
}

window.main = main;
