export class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Coord(this.x + other.x, this.y + other.y);
    }

    subtract(other) {
        return new Coord(this.x - other.x, this.y - other.y);
    }

    scalar(num) {
        return new Coord(this.x * num, this.y * num);
    }

    bound(min, max) {
        return new Coord(Math.max(min.x, Math.min(max.x, this.x)), Math.max(min.y, Math.min(max.y, this.y)));
    }

    isInBound(min, max) {
        return this.x >= min.x && this.x <= max.x && this.y >= min.y && this.y <= max.y;
    }

    boundX(min, max) {
        return new Coord(Math.max(min.x, Math.min(max.x, this.x), this.y));
    }

    isInBoundX(min, max) {
        return this.x >= min.x && this.x <= max.x;
    }

    boundY(min, max) {
        return new Coord(Math.max(min.x, Math.min(max.x, this.x), this.y));
    }

    isInBoundY(min, max) {
        return this.y >= min.y && this.y <= max.y;
    }

    toString() {
        return `Coord(${this.x}, ${this.y})`
    }

    *traverse() {
        for (let row = 0; row < this.y; row++) {
            for (let col = 0; col < this.x; col++) {
                yield new Coord(col, row);
            }
        }
    }
}

export const CONSTS = {
    LEFT: new Coord(-1, 0),
    RIGHT: new Coord(1, 0),
    UP: new Coord(0, -1),
    DOWN: new Coord(0, 1),
    ZERO: new Coord(0, 0),
    ONE: new Coord(1, 1),
}

