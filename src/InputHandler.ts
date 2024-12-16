export class InputHandler {
    private keys: Record<string, boolean>;
    private altKeys: Record<string, string>;

    constructor() {
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false
        };
        this.altKeys = {
            w: "ArrowUp",
            s: "ArrowDown",
            a: "ArrowLeft",
            d: "ArrowRight"
        };
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener("keydown", (event) => this.handleKeyDownUp(event));
        window.addEventListener("keyup", (event) => this.handleKeyDownUp(event));
    }

    handleKeyDownUp(event: KeyboardEvent) {
        let key = event.key;
        if (key.toLocaleLowerCase() in this.altKeys) key = this.altKeys[key.toLocaleLowerCase()];

        if (key in this.keys) this.keys[key] = event.type === "keydown";
    }

    isKeyPressed(key: string): boolean {
        return !!this.keys[key];
    }

    reset() {
        for (let key in this.keys) {
            this.keys[key] = false;
        }
    }
}
