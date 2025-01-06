function createRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}


class EventBus {
    constructor() {
        this.listeners = {};
        this.activeListeners = new Set()
    }

    /**
     * Register an event.
     * @param {string} eventName
     * @param {function} callback
     * @param {string} id
     */
    register(eventName, callback, id = null) {
        id = id ? id : createRandomString(24);
        if (!this.listeners[eventName]) {
            this.listeners[eventName] =  {};
        }
        this.listeners[eventName][id] = callback;
        this.on(id);
        return id;
    }

    /**
     * Subscribe to an event.
     * @param {string} id
     */
    on(id) {
        this.activeListeners.add(id);
    }

    /**
     * Unsubscribe from an event.
     * @param {string} id
     */
    off(id) {
        this.activeListeners.delete(id);
    }

    /**
     * Emit (or publish) an event. All subscribers get called.
     * @param {string} eventName
     * @param {any} data - optional payload
     */
    emit(eventName, data) {
        if (!this.listeners[eventName]) return;
        for (const id in this.listeners[eventName]) {
            const callback = this.listeners[eventName][id];
            if (this.activeListeners.has(id)) {
                callback(data);
            }
        }
    }
}

export const eventBus = new EventBus();