import { Entity } from "../engine/Entity.js";
import {worldSpriteSheet} from "../sprites.js";
import {TILE_SIZE} from "../constants.js";

export class Path extends Entity {
    constructor(tile, dimensions, colour = "#876f65") {
        super(tile, dimensions, colour);
        this.speedFactor = 1; // e.g. 1.5 => 50% slower
    }

    getCollisionMatrix() {
        const matrix = [];
        for (let row = 0; row < this.dimensions.y; row++) {
            matrix[row] = [];
            for (let col = 0; col < this.dimensions.y; col++) {
                matrix[row][col] = false;
            }
        }
        return matrix;
    }

    draw(ctx) {
        for (let row = 0; row < this.dimensions.y; row++) {
            for (let col = 0; col < this.dimensions.x; col++) {
                worldSpriteSheet.draw(ctx, (this.tile.x + col) * TILE_SIZE, (this.tile.y + row) * TILE_SIZE, 3, 6);
            }
        }
    }
}

export class WoodenFloor extends Path {
    draw(ctx) {
        for (let row = 0; row < this.dimensions.y; row++) {
            for (let col = 0; col < this.dimensions.x; col++) {
                worldSpriteSheet.draw(ctx, (this.tile.x + col) * TILE_SIZE, (this.tile.y + row) * TILE_SIZE, 111, 6);
            }
        }
    }
}