import {eventBus} from "../../EventBus.js";

export class Scene {
    constructor() {
        this.isActive = false;
        this.listeners = [];
        const listeners = this.listen();
        for (const key in listeners) {
            this.listeners.push(eventBus.register(key, listeners[key]));
        }
    }

    listen() {
        return {};
    }

    start() {
        this.listeners.forEach(listener => {
            eventBus.on(listener);
        })
        this.isActive = true;
    }

    pause() {
        this.listeners.forEach(listener => {
            eventBus.off(listener);
        })
        this.isActive = false;
    }
}