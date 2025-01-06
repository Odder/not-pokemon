import { Entity } from "../engine/Entity.js";
import { Door } from "./Door.js";
import { Coord } from "../engine/Coord.js";
import {worldSpriteSheet} from "../sprites.js";
import {TILE_SIZE} from "../constants.js";
import {Portal} from "./Portal.js";

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
        super(tile, dimensions, '#888');

        this.doorOffsets = doors.map(door => door[0]);

        this.doorPortals = doors.map(([pos, zoneKey, spawn]) => {
            const doorTile = tile.add(pos);
            return new Portal(
                doorTile,
                zoneKey,
                spawn,
                null,
            )
        })
        this.baseSpritePosition = new Coord(0, 67);
    }

    /**
     * By default, block the entire house footprint except the door tile.
     */
    getCollisionMatrix() {
        const matrix = [];
        for (let row = 0; row < this.dimensions.y; row++) {
            matrix[row] = [];
            for (let col = 0; col < this.dimensions.x; col++) {
                matrix[row][col] = !(this.doorOffsets.some(door => col === door.x && row === door.y));
            }
        }
        return matrix;
    }

    /**
     * The house "owns" the door.
     * We expose it (or them, if multiple doors) via a method.
     */
    getSubEntities() {
        return [...this.doorPortals];
    }

    draw(ctx, tileSize) {
        for (let row = 0; row < this.dimensions.y; row++) {
            for (let col = 0; col < this.dimensions.x; col++) {
                worldSpriteSheet.draw(ctx, (this.tile.x + col) * TILE_SIZE, (this.tile.y + row) * TILE_SIZE, this.baseSpritePosition.y + row, this.baseSpritePosition.x + col);
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
        matrix[4][4] = false;
        matrix[3][4] = false;
        return matrix;
    }
}