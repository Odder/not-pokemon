import { Portal } from "./Portal.js";
import {CONSTS, Coord} from "../engine/Coord.js";

/**
 * Single-tile portal (door, warp point).
 * - tileX, tileY = location of this portal in the current zone
 * - destinationZoneKey, destinationSpawnX, destinationSpawnY = where it leads
 * - colour = for demo rendering
 * - blocked = whether or not the tile is blocked
 */
export class Door extends Portal {
    draw(ctx, tileSize) {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.roundRect(
            this.tile.x * tileSize,
            this.tile.y * tileSize,
            this.dimensions.x * tileSize,
            this.dimensions.y * tileSize,
            [tileSize / 4, tileSize / 4, 0, 0]
        );
        ctx.fill();
    }
}
