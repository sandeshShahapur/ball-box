import { Game } from './Game.js';

declare global {
    interface Window {
        main: () => void;
    }
}

let currentGame: Game | null = null; // Store the currently running game

function main() {
    // Stop the current game if it exists
    if (currentGame) {
        currentGame.stop();
        currentGame = null;
    }

    currentGame = new Game('gameCanvas');
    currentGame.start();
}

window.main = main;