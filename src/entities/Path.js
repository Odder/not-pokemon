import { Entity } from "../engine/Entity.js";
import {worldSpriteSheet} from "../sprites.js";
import {TILE_SIZE} from "../constants.js";
import {ctx} from "../engine/Canvas.js";

export class Path extends Entity {
    constructor(tile, dimensions) {
        super(tile, dimensions);
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

    drawBackground() {
        for (let row = 0; row < this.dimensions.y; row++) {
            for (let col = 0; col < this.dimensions.x; col++) {
                worldSpriteSheet.draw(ctx.background, (this.tile.x + col) * TILE_SIZE, (this.tile.y + row) * TILE_SIZE, 3, 6);
            }
        }
    }
}

export class WoodenFloor extends Path {
    drawBackground() {
        for (let row = 0; row < this.dimensions.y; row++) {
            for (let col = 0; col < this.dimensions.x; col++) {
                worldSpriteSheet.draw(ctx.background, (this.tile.x + col) * TILE_SIZE, (this.tile.y + row) * TILE_SIZE, 111, 6);
            }
        }
    }
}