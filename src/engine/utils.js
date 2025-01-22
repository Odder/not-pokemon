import {Coord} from "./Coord.js";

export class Counter {
    constructor(list = []) {
        this.items = {};
        list.forEach((item) => {this.add(item);});
    }

    add(item) {
        if (!this.items.hasOwnProperty(item)) {
            this.items[item] = 0;
        }
        this.items[item]++;
        return this;
    }

    remove(item) {
        if (!this.items.hasOwnProperty(item)) {
           return;
        }
        this.items[item]--;
        if (this.items[item] === 0) {
            delete this.items[item];
        }
        return this;
    }

    union(other) {
        for (const item of other.items) {
            if (!this.items.hasOwnProperty(item)) {
                this.items[item] = 0;
            }
            this.items[item] += other.items[item];
        }
    }
}

export class Array2D {
    constructor(fallback = null) {
        this.items = {};
        this.fallback = fallback;
    }

    set(coord, value) {
        this.items[coord.x*1_000_000 + coord.y] = value;
    }

    get(coord) {
        return this.items[coord.x*1_000_000 + coord.y] || this.fallback;
    }

    *traverse() {
        for (const idx in this.items) {
            const i = 0 | (idx / 1_000_000);
            const j = idx % 1_000_000;
            const coord = new Coord(i, j);
            yield [coord, this.items[idx]];
        }
    }
}
