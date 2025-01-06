import {Counter} from "../utils.js";


export class Inventory {
    constructor() {
        this.items = {
            ball: new Counter(),
            potion: new Counter(),
            attack: new Counter(),
        }
    }

    add(item) {
        this.items[item.type].add(item.id);
    }

    use(item) {
        this.items[item.type].remove(item);
    }
}