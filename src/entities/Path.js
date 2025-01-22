import { Entity } from "../engine/Entity.js";
import {worldSpriteSheet} from "../sprites.js";
import {TILE_SIZE} from "../constants.js";
import {ctx} from "../engine/Canvas.js";
import {Array2D} from "../engine/utils.js";
import {CONSTS} from "../engine/Coord.js";

export class Path extends Entity {
    constructor(tile, dimensions) {
        super(tile, dimensions);
        this.speedFactor = 1; // e.g. 1.5 => 50% slower
    }

    getCollisionMatrix() {
        return new Array2D();
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

export class PathFree extends Entity {
    constructor() {
        super(CONSTS.ZERO, CONSTS.ONE);
        this.tiles = new Array2D(false);
    }

    add(tile) {
        this.tiles.set(tile, true);
    }

    drawBackground() {
        for (const [tile, _] of this.tiles.traverse()) {
            let spriteOffset = CONSTS.ZERO;
            if (!this.tiles.get(tile.add(CONSTS.UP))) {
                spriteOffset = spriteOffset.add(CONSTS.UP);
            }
            if (!this.tiles.get(tile.add(CONSTS.LEFT))) {
                spriteOffset = spriteOffset.add(CONSTS.LEFT);
            }
            if (!this.tiles.get(tile.add(CONSTS.RIGHT))) {
                spriteOffset = spriteOffset.add(CONSTS.RIGHT);
            }
            if (!this.tiles.get(tile.add(CONSTS.DOWN))) {
                spriteOffset = spriteOffset.add(CONSTS.DOWN);
            }
            worldSpriteSheet.draw(ctx.background, (tile.x) * TILE_SIZE, (tile.y) * TILE_SIZE, 3+spriteOffset.y, 6+spriteOffset.x);
        }
    }
}

