import { Entity } from "../engine/Entity.js";
import {CONSTS, Coord} from "../engine/Coord.js";
import {worldSpriteSheet} from "../sprites.js";
import {TILE_SIZE} from "../constants.js";
import {ctx} from "../engine/Canvas.js";
import {Array2D} from "../engine/utils.js";

/**
 * Represents a wall entity in the game world. This class extends the functionality of the base Entity class and is used to create wall objects with specified dimensions and color.
 *
 * @class Wall
 * @extends Entity
 *
 * @param {Object} tile - Represents the position of the wall within the game world, typically a grid or tile-based system.
 * @param {number} width - The width of the wall.
 * @param {number} height - The height of the wall.
 * @param {string} [colour="#66350b"] - Optional parameter specifying the color of the wall. Defaults to a brown shade.
 */
export class Wall extends Entity {
    constructor(
        tile,
        dimensions,
        segments = [],
    ) {
        super(tile, dimensions);
        this.segments = segments;
        this.lastTile = tile;
    }

    drawSegment(direction, length, updateLastTile = true) {
        const start = this.lastTile;
        const end = this.lastTile.add(direction.scalar(length - 1));
        if (direction.x < 0 || direction.y < 0) {
            this.segments.push(new Wall(end, new Coord(-length * direction.x || 1, -length * direction.y || 1)))
        } else {
            this.segments.push(new Wall(start, new Coord(length * direction.x || 1, length * direction.y || 1)))
        }
        this.lastTile = end;
        return this;
    }

    getSubEntities() {
        return [...this.segments]
    }

    drawBackground() {
        ctx.background.fillStyle = 'brown';
        ctx.background.beginPath();
        ctx.background.roundRect(this.tile.x * TILE_SIZE, this.tile.y * TILE_SIZE, this.dimensions.x * TILE_SIZE, this.dimensions.y * TILE_SIZE, 20);
        ctx.background.fill();
    }
}

export class BoulderWall extends Wall {
    drawSegment(direction, length, updateLastTile = true) {
        const start = this.lastTile;
        const end = this.lastTile.add(direction.scalar(length - 1));
        if (direction.x < 0 || direction.y < 0) {
            this.segments.push(new BoulderWall(end, new Coord(-length * direction.x || 1, -length * direction.y || 1)))
        } else {
            this.segments.push(new BoulderWall(start, new Coord(length * direction.x || 1, length * direction.y || 1)))
        }
        this.lastTile = end;
        return this;
    }

    drawBackground() {
        for (let row = 0; row < this.dimensions.y; row++) {
            for (let col = 0; col < this.dimensions.x; col++) {
                worldSpriteSheet.draw(ctx.background, (this.tile.x + col) * TILE_SIZE, (this.tile.y + row) * TILE_SIZE, 3, 0);
            }
        }
    }
}

export class Boulder extends Entity {
    constructor() {
        super(CONSTS.ZERO, CONSTS.ONE);
        this.tiles = new Array2D(false);
    }

    getCollisionMatrix() {
        return this.tiles;
    }

    add(tile) {
        this.tiles.set(tile, true);
    }

    drawBackground() {
        for (const [tile, _] of this.tiles.traverse()) {
            worldSpriteSheet.draw(ctx.background, (tile.x) * TILE_SIZE, (tile.y) * TILE_SIZE, 3, 0);
        }
    }
}