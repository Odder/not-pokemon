import { Entity } from "../engine/Entity.js";
import {worldSpriteSheet} from "../sprites.js";
import {TILE_SIZE} from "../constants.js";
import {ctx} from "../engine/Canvas.js";
import {Array2D} from "../engine/utils.js";

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
        return new Array2D();
    }

    drawBackground() {
        for (let row = 0; row < this.dimensions.y; row++) {
            for (let col = 0; col < this.dimensions.x; col++) {
                worldSpriteSheet.draw(ctx.background, (this.tile.x + col) * TILE_SIZE, (this.tile.y + row) * TILE_SIZE, 1, 1);
            }
        }
    }
}