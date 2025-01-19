import { Entity } from "../engine/Entity.js";
import { Coord } from "../engine/Coord.js";
import {worldSpriteSheet} from "../sprites.js";
import {TILE_SIZE} from "../constants.js";
import {Portal} from "./Portal.js";
import {ctx} from "../engine/Canvas.js";
import {Array2D} from "../engine/utils.js";

/**
 * A House occupies a rectangular footprint in tiles (width × height).
 * It has a door at (doorX, doorY) relative to its top-left corner,
 * which is NOT blocked in the collision matrix.
 *
 * On top of that, it automatically creates a PortalEntity that can lead
 * to another zone.
 */
export class House extends Entity {
    constructor(
        tile,
        dimensions,
        doors,
    ) {
        super(tile, dimensions);

        this.doorOffsets = doors.map(door => door[0]);

        this.doorPortals = doors.map(([pos, zoneKey, spawn]) => {
            const doorTile = tile.add(pos);
            return new Portal(
                doorTile,
                zoneKey,
                spawn,
                false,
            )
        })
        this.baseSpritePosition = new Coord(0, 67);
    }

    /**
     * By default, block the entire house footprint except the door tile.
     */
    getCollisionMatrix() {
        const matrix = new Array2D(false);

        for (const coord of this.dimensions.traverse()) {
            matrix.set(coord, !(this.doorOffsets.some(door => coord.isEqual(door))));
        }

        return matrix;
    }

    getSubEntities() {
        return [...this.doorPortals];
    }

    drawBackground() {
        for (let row = 0; row < this.dimensions.y; row++) {
            for (let col = 0; col < this.dimensions.x; col++) {
                worldSpriteSheet.draw(ctx.background, (this.tile.x + col) * TILE_SIZE, (this.tile.y + row) * TILE_SIZE, this.baseSpritePosition.y + row, this.baseSpritePosition.x + col);
            }
        }
    }
}

export class SmallGreenHouse extends House {
    constructor(tile, zoneKey, spawn) {
        super(tile, new Coord(5, 4), [[new Coord(2, 3), zoneKey, spawn]]);
    }
}

export class BigGreenHouse extends House {
    constructor(tile, zoneKey, spawn, zoneKey2 = null, spawn2 = null) {
        super(tile, new Coord(6, 5), [[new Coord(2, 4), zoneKey, spawn], [new Coord(4, 2), zoneKey2, spawn2]]);
        this.baseSpritePosition = new Coord(0, 76);
    }

    getCollisionMatrix() {
        const matrix = super.getCollisionMatrix();
        matrix.set(new Coord(4, 4), false);
        matrix.set(new Coord(4, 3), false);
        return matrix;
    }
}