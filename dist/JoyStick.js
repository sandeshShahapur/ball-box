class Joystick {
    constructor(keys) {
        this.keys = keys;
    }
    setupTouchListeners() {
        window.addEventListener("touchstart", (event) => this.handleTouchMoveOrStart(event), { passive: false });
        window.addEventListener("touchmove", (event) => this.handleTouchMoveOrStart(event), { passive: false });
        window.addEventListener("touchend", (event) => this.handleTouchEnd(event));
    }
    handleTouchMoveOrStart(event) {
        const touch = event.touches[0];
        if (!this.isJoystickTouch(touch))
            return;
        event.preventDefault();
        this.moveJoystickBall(touch);
    }
    handleTouchEnd(event) {
        const touch = event.changedTouches[0];
        if (!this.isJoystickTouch(touch))
            return;
        event.preventDefault();
        this.resetJoystickBall();
    }
    isJoystickTouch(touch) {
        return (touch.target instanceof HTMLElement &&
            touch.target.id === "joyStickBall");
    }
    moveJoystickBall(touch) {
        const joystickBall = document.getElementById("joyStickBall");
        const joystickRing = document.getElementById("joyStickRing");
        const { left, top, width, height } = joystickRing.getBoundingClientRect();
        const ringCenterX = left + width / 2;
        const ringCenterY = top + height / 2;
        const deltaX = touch.clientX - ringCenterX;
        const deltaY = touch.clientY - ringCenterY;
        joystickBall.style.left = `${deltaX}px`;
        joystickBall.style.top = `${deltaY}px`;
        this.updateKeysBasedOnAngle(deltaX, deltaY);
    }
    updateKeysBasedOnAngle(deltaX, deltaY) {
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        const adjustedAngle = (-angle + 360 + 22.5) % 360;
        const directionIndex = Math.floor(adjustedAngle / 45);
        const directionMapping = {
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
    resetJoystickBall() {
        const joystickBall = document.getElementById("joyStickBall");
        joystickBall.style.left = "auto";
        joystickBall.style.top = "auto";
        this.resetKeys();
    }
    resetKeys() {
        Object.keys(this.keys).forEach((key) => (this.keys[key] = false));
    }
}
export default Joystick;
