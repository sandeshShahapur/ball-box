class Joystick {
    private keys: Record<string, boolean>;

    constructor(keys: Record<string, boolean>) {
        this.keys = keys;
    }

    setupTouchListeners() {
        window.addEventListener(
            "touchstart",
            (event) => this.handleTouchMoveOrStart(event),
            { passive: false }
        );
        window.addEventListener(
            "touchmove",
            (event) => this.handleTouchMoveOrStart(event),
            { passive: false }
        );
        window.addEventListener("touchend", (event) =>
            this.handleTouchEnd(event)
        );
    }

    private handleTouchMoveOrStart(event: TouchEvent) {
        const touch = event.touches[0];
        if (!this.isJoystickTouch(touch)) return;

        event.preventDefault();
        this.moveJoystickBall(touch);
    }

    private handleTouchEnd(event: TouchEvent) {
        const touch = event.changedTouches[0];
        if (!this.isJoystickTouch(touch)) return;

        event.preventDefault();
        this.resetJoystickBall();
    }

    private isJoystickTouch(touch: Touch): boolean {
        return (
            touch.target instanceof HTMLElement &&
            touch.target.id === "joyStickBall"
        );
    }

    private moveJoystickBall(touch: Touch) {
        const joystickBall = document.getElementById(
            "joyStickBall"
        ) as HTMLElement;
        const joystickRing = document.getElementById(
            "joyStickRing"
        ) as HTMLElement;

        const { left, top, width, height } =
            joystickRing.getBoundingClientRect();
        const ringCenterX = left + width / 2;
        const ringCenterY = top + height / 2;

        const deltaX = touch.clientX - ringCenterX;
        const deltaY = touch.clientY - ringCenterY;

        joystickBall.style.left = `${deltaX}px`;
        joystickBall.style.top = `${deltaY}px`;

        this.updateKeysBasedOnAngle(deltaX, deltaY);
    }

    private updateKeysBasedOnAngle(deltaX: number, deltaY: number) {
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        const adjustedAngle = (-angle + 360 + 22.5) % 360; // Offset by 22.5 for direction alignment
        const directionIndex = Math.floor(adjustedAngle / 45); // 360° divided into 8 directions

        const directionMapping: Record<number, string[]> = {
            0: ["ArrowRight"],
            1: ["ArrowRight", "ArrowUp"],
            2: ["ArrowUp"],
            3: ["ArrowUp", "ArrowLeft"],
            4: ["ArrowLeft"],
            5: ["ArrowLeft", "ArrowDown"],
            6: ["ArrowDown"],
            7: ["ArrowDown", "ArrowRight"],
        };

        this.resetKeys();
        const directions = directionMapping[directionIndex] || [];
        directions.forEach((dir) => (this.keys[dir] = true));
    }

    private resetJoystickBall() {
        const joystickBall = document.getElementById(
            "joyStickBall"
        ) as HTMLElement;
        joystickBall.style.left = "auto";
        joystickBall.style.top = "auto";
        this.resetKeys();
    }

    private resetKeys() {
        Object.keys(this.keys).forEach((key) => (this.keys[key] = false));
    }
}

export default Joystick;