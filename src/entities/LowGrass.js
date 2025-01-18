import { Entity } from "../engine/Entity.js";
import {worldSpriteSheet} from "../sprites.js";
import {TILE_SIZE} from "../constants.js";
import {ctx} from "../engine/Canvas.js";

/**
 * Represents a rectangular patch of grass, non-blocking.
 */
export class LowGrass extends Entity {
    constructor(tile, dimensions) {
        super(tile, dimensions);
        this.speedFactor = 1; // e.g. 1.5 => 50% slower
    }

    /**
     * All false => no collision in any tile of this grass patch.
     */
    getCollisionMatrix() {
        const matrix = [];
        for (let row = 0; row < this.dimensions.y; row++) {
            matrix[row] = [];
            for (let col = 0; col < this.dimensions.x; col++) {
                matrix[row][col] = false; // not blocked
            }
        }
        return matrix;
    }

    drawBackground() {
        for (let row = 0; row < this.dimensions.y; row++) {
            for (let col = 0; col < this.dimensions.x; col++) {
                worldSpriteSheet.draw(ctx.background, (this.tile.x + col) * TILE_SIZE, (this.tile.y + row) * TILE_SIZE, 1, 1);
            }
        }
    }
}