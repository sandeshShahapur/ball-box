import Joystick from "./JoyStick";
import { Utils } from "../core/Utils";

export class InputHandler {
    private keys: Record<string, boolean>;
    private altKeys: Record<string, string>;
    private joystick: Joystick | undefined;

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
            window.addEventListener("keydown", (event) =>
                this.handleKeyDownUp(event)
            );
            window.addEventListener("keyup", (event) =>
                this.handleKeyDownUp(event)
            );
        } else {
            this.joystick = new Joystick(this.keys);
            this.joystick.setupTouchListeners();
        }
    }

    handleKeyDownUp(event: KeyboardEvent) {
        let key = event.key;
        if (key.toLocaleLowerCase() in this.altKeys)
            key = this.altKeys[key.toLocaleLowerCase()];

        if (key in this.keys) {
            event.preventDefault();
            this.keys[key] = event.type === "keydown";
        }
    }

    isKeyPressed(key: string): boolean {
        return !!this.keys[key];
    }

    resetKeys() {
        for (let key in this.keys) {
            this.keys[key] = false;
        }
    }
}
