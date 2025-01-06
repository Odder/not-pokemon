import { Entity } from "../engine/Entity.js";
import {CONSTS, Coord} from "../engine/Coord.js";

export class Portal extends Entity {
    constructor(
        tile,
        destinationZoneKey,
        destinationSpawn,
        colour = "#FF00FF",
        blocked = false
    ) {
        super(tile, CONSTS.ONE, colour);
        this.destinationZoneKey = destinationZoneKey;
        this.destinationSpawn = destinationSpawn;
        this.blocked = blocked;
    }

    getCollisionMatrix() {
        return [[this.blocked]];
    }

    draw(ctx, tileSize) {
        if (this.colour) {
            super.draw(ctx, tileSize);
        }
    }
}
