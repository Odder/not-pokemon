import {CONSTS} from "./engine/Coord.js";
import {eventBus} from "./EventBus.js";

export class InputHandler {
    constructor() {
        this.keysDown = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
            e: false,
            w: false,
            a: false,
            s: false,
            d: false,
        };

        window.addEventListener("keydown", (e) => {
            if (this.keysDown.hasOwnProperty(e.key)) {
                const isToggled = this.keysDown[e.key] === false
                this.keysDown[e.key] = true;
                if (isToggled) {
                    switch (e.key) {
                        case "ArrowDown":
                        case "s":
                            eventBus.emit('key.down', null)
                            break;
                        case "ArrowUp":
                        case "w":
                            eventBus.emit('key.up', null)
                            break;
                        case "ArrowRight":
                        case "d":
                            eventBus.emit('key.right', null)
                            break;
                        case "ArrowLeft":
                        case "a":
                            eventBus.emit('key.left', null)
                            break;
                        case "e":
                            eventBus.emit('key.interact', '')
                    }
                }
            }
        });

        window.addEventListener("keyup", (e) => {
            if (this.keysDown.hasOwnProperty(e.key)) {
                this.keysDown[e.key] = false;
                switch (e.key) {
                    case "ArrowDown":
                    case "ArrowUp":
                    case "ArrowRight":
                    case "ArrowLeft":
                    case "w":
                    case "a":
                    case "d":
                    case "s":
                        eventBus.emit('inputMoveEnded', e.key)
                        break;
                }
            }
        });
    }

    getMovementDirection() {
        if (this.keysDown.ArrowUp || this.keysDown.w) return CONSTS.UP;
        if (this.keysDown.ArrowDown || this.keysDown.s) return CONSTS.DOWN;
        if (this.keysDown.ArrowLeft || this.keysDown.a) return CONSTS.LEFT;
        if (this.keysDown.ArrowRight || this.keysDown.d) return CONSTS.RIGHT;
        return null;
    }
}

export const inputHandler = new InputHandler();
