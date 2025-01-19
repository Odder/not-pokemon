import { Entity } from "../engine/Entity.js";
import {CONSTS} from "../engine/Coord.js";
import {Array2D} from "../engine/utils.js";

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
        const matrix = new Array2D();
        matrix.set(CONSTS.ZERO, this.blocked);
        return matrix;
    }
}
