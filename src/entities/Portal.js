import { Entity } from "../engine/Entity.js";
import {CONSTS, Coord} from "../engine/Coord.js";

export class Portal extends Entity {
    constructor(
        tile,
        destinationZoneKey,
        destinationSpawn,
        blocked = false
    ) {
        super(tile, CONSTS.ONE);
        this.destinationZoneKey = destinationZoneKey;
        this.destinationSpawn = destinationSpawn;
        this.blocked = blocked;
    }

    getCollisionMatrix() {
        return [[this.blocked]];
    }
}
