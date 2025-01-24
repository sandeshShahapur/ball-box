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
            window.addEventListener("touchstart", (event) => this.handleTouchStart(event), { passive: false });
            window.addEventListener("touchmove", (event) => this.handleTouchStart(event), { passive: false });
            window.addEventListener("touchend", (event) => this.handleTouchEnd(event));
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
    handleTouchStart(event) {
        const E = event.touches[0];
        if (!(E.target instanceof HTMLElement) ||
            E.target.id !== "joyStickBall")
            return;
        event.preventDefault();
        this.moveJoyStickBall(E);
    }
    handleTouchMove(event) {
        const E = event.touches[0];
        if (!(E.target instanceof HTMLElement) ||
            E.target.id !== "joyStickBall")
            return;
        event.preventDefault();
        this.moveJoyStickBall(E);
    }
    handleTouchEnd(event) {
        const E = event.changedTouches[0];
        if (!(E.target instanceof HTMLElement) ||
            E.target.id !== "joyStickBall")
            return;
        event.preventDefault();
        this.resetJoyStickBall();
    }
    moveJoyStickBall(E) {
        const joyStickBall = document.getElementById("joyStickBall");
        const joyStickRing = document.getElementById("joyStickRing");
        const ringRect = joyStickRing.getBoundingClientRect();
        const ringCenterX = ringRect.left + ringRect.width / 2;
        const ringCenterY = ringRect.top + ringRect.height / 2;
        const touchX = E.clientX - ringCenterX;
        const touchY = E.clientY - ringCenterY;
        joyStickBall.style.left = `${touchX}px`;
        joyStickBall.style.top = `${touchY}px`;
        const angle_rad = Math.atan2(touchY, touchX);
        const angle_deg = angle_rad * (180 / Math.PI);
        const normalized_angle = (-1 * (angle_deg - 360 - 22.5)) % 360;
        const direction = Math.floor(normalized_angle / (360 / 8));
        this.resetKeys();
        switch (direction) {
            case 0:
                this.keys["ArrowRight"] = true;
                break;
            case 1:
                this.keys["ArrowRight"] = true;
                this.keys["ArrowUp"] = true;
                break;
            case 2:
                this.keys["ArrowUp"] = true;
                break;
            case 3:
                this.keys["ArrowUp"] = true;
                this.keys["ArrowLeft"] = true;
                break;
            case 4:
                this.keys["ArrowLeft"] = true;
                break;
            case 5:
                this.keys["ArrowLeft"] = true;
                this.keys["ArrowDown"] = true;
                break;
            case 6:
                this.keys["ArrowDown"] = true;
                break;
            case 7:
                this.keys["ArrowDown"] = true;
                this.keys["ArrowRight"] = true;
                break;
            default:
                break;
        }
    }
    resetJoyStickBall() {
        const joyStickBall = document.getElementById("joyStickBall");
        joyStickBall.style.left = "auto";
        joyStickBall.style.top = "auto";
        this.resetKeys();
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
