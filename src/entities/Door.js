import { Portal } from "./Portal.js";
import {CONSTS, Coord} from "../engine/Coord.js";
import {ctx} from "../engine/Canvas.js";
import {TILE_SIZE} from "../constants.js";

/**
 * Single-tile portal (door, warp point).
 * - tileX, tileY = location of this portal in the current zone
 * - destinationZoneKey, destinationSpawnX, destinationSpawnY = where it leads
 * - colour = for demo rendering
 * - blocked = whether or not the tile is blocked
 */
export class Door extends Portal {
    drawBackground() {
        ctx.background.fillStyle = 'red';
        ctx.background.beginPath();
        ctx.background.roundRect(
            this.tile.x * TILE_SIZE,
            this.tile.y * TILE_SIZE,
            this.dimensions.x * TILE_SIZE,
            this.dimensions.y * TILE_SIZE,
            [TILE_SIZE / 4, TILE_SIZE / 4, 0, 0]
        );
        ctx.background.fill();
    }
}
