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