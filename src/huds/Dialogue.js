import {eventBus} from "../EventBus.js";

export class Dialogue {
    constructor() {
        this.isActive = false;
        this._isReady = false;
        this._justEnded = false;
        this.conversation = [];
        this.manualMode = false;
        this.justEnded = false;

        this.listeners = [
            eventBus.register('key.interact', () => {
                if (!this.manualMode) this.next()
            }),
        ];
    }

    start() {
        this.getDOM().classList.add('active');
        this.listeners.forEach((listener) => {eventBus.on(listener)})
        this.isActive = true;
        this.isReady = true;
        eventBus.emit('dialogue.started');
    }

    pause() {
        this.hide();
        this.listeners.forEach((listener) => {eventBus.off(listener)})
        this.isReady = false;
        this.justEnded = true;
        setTimeout(() => this.justEnded = false,)
        eventBus.emit('dialogue.ended');
    }

    get isReady() {
        return this._isReady;
    }

    set isReady(value) {
        if (value) {
            this.getDOM().classList.add('ready');
        } else {
            this.getDOM().classList.remove('ready');
        }
        this._isReady = value;
    }

    get justEnded() {
        return this._justEnded;
    }

    set justEnded(value) {
        if (value) {
            this._justEnded = true;
            setTimeout(
                () => this._justEnded = false,
                100
            )
        }
    }

    getDOM() {
        return document.getElementById('dialogue');
    }

    hide() {
        this.getDOM().classList.remove('active');
        this.isActive = false;
    }

    converse(messages, manualMode = false) {
        this.pause();
        this.conversation = messages;
        this.manualMode = manualMode;
        this.start();
        this.next();
    }

    add(message) {
        this.conversation = [...this.conversation, message];
    }

    next() {
        if (!this.isReady || !this.isActive) {
            return;
        }
        if (this.conversation.length > 0) {
            this.display(this.conversation.shift());
        } else {
            this.pause();
        }
    }

    display(message) {
        const [text, callback] = message;
        let i = 0;
        this.getDOM().innerText = '';
        this.isReady = false;
        if (callback) {
            callback();
        }
        setTimeout(() => {
            const intervalId = setInterval(() => {
                if (i === text.length) {
                    clearInterval(intervalId);
                    this.isReady = true;
                } else {
                    this.getDOM().innerText = text.slice(0, i + 1);
                }
                i++;
            }, 35)
        }, 400)
    }
}

export const dialogue = new Dialogue();