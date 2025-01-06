import { MapManager } from "./MapManager.js";
import { Coord } from "../Coord.js";

/**
 * A Zone wraps together:
 *  - An array of entities (houses, trees, etc.)
 *  - A MapManager that generates collision from those entities
 *  - Possibly a "spawnPoint" tile to place the player
 */
export class Zone {
    constructor(name, entities, spawnTile = new Coord(1, 1), dimensions = new Coord(20, 20)) {
        this.name = name;
        this.entities = entities;
        this.spawnTile = spawnTile;
        this.dimensions = dimensions;
        this.mapManager = new MapManager(entities, dimensions);
    }

    // A convenience method to re-generate collision if we add new entities
    refresh() {
        this.mapManager.refreshCollisionMap();
    }
}