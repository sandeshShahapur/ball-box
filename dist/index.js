import { Game } from './Game.js';
let currentGame = null;
function main() {
    if (currentGame) {
        currentGame.stop();
        currentGame = null;
    }
    currentGame = new Game('gameCanvas');
    currentGame.start();
}
window.main = main;
