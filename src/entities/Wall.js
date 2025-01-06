import { Entity } from "../engine/Entity.js";
import {Coord} from "../engine/Coord.js";
import {worldSpriteSheet} from "../sprites.js";

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
        colour = "#66350b",
    ) {
        super(tile, dimensions, colour);
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

    draw(ctx, tileSize) {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.roundRect(this.tile.x * tileSize, this.tile.y * tileSize, this.dimensions.x * tileSize, this.dimensions.y * tileSize, 20);
        ctx.fill();
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

    draw(ctx, tileSize) {
        for (let row = 0; row < this.dimensions.y; row++) {
            for (let col = 0; col < this.dimensions.x; col++) {
                worldSpriteSheet.draw(ctx, (this.tile.x + col) * tileSize, (this.tile.y + row) * tileSize, 3, 0);
            }
        }
    }
}