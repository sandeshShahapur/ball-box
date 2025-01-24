import Joystick from "./JoyStick.js";
import { Utils } from "./Utils.js";
export class InputHandler {
    constructor() {
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
        };
        this.altKeys = {
            w: "ArrowUp",
            s: "ArrowDown",
            a: "ArrowLeft",
            d: "ArrowRight",
        };
        this.setupEventListeners();
    }
    setupEventListeners() {
        if (!Utils.isUserUsingMobile()) {
            window.addEventListener("keydown", (event) => this.handleKeyDownUp(event));
            window.addEventListener("keyup", (event) => this.handleKeyDownUp(event));
        }
        else {
            this.joystick = new Joystick(this.keys);
            this.joystick.setupTouchListeners();
        }
    }
    handleKeyDownUp(event) {
        let key = event.key;
        if (key.toLocaleLowerCase() in this.altKeys)
            key = this.altKeys[key.toLocaleLowerCase()];
        if (key in this.keys) {
            event.preventDefault();
            this.keys[key] = event.type === "keydown";
        }
    }
    isKeyPressed(key) {
        return !!this.keys[key];
    }
    resetKeys() {
        for (let key in this.keys) {
            this.keys[key] = false;
        }
    }
}
