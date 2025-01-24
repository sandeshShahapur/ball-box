import { Utils } from './Utils.js';
import { Game } from './Game.js';
if (Utils.isUserUsingMobile()) {
    document.getElementById('joyStickContainer').style.display = 'block';
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('Tap on Start', canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText('to use JoyStick', canvas.width / 2, canvas.height / 2 + 20);
}
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
