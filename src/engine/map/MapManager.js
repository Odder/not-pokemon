import { TILE_SIZE } from "../../constants.js";
import { Coord, CONSTS } from "../Coord.js";

/**
 * Manages the dynamic creation of a map's collision data
 * and optional portal-lookup for zone transitions.
 */
export class MapManager {
    constructor(entities = [], dimensions = new Coord(20, 20)) {
        this.entities = entities;
        this.dimensions = dimensions;

        // We'll generate these once
        this.collisionMap = this.generateCollisionMap();
        // A dictionary (or 2D array) that references portal entities by tile coords
        this.portalMap = this.generatePortalMap();
        // Build speed factor map (defaults to 1.0 => normal speed)
        this.speedFactorMap = this.generateSpeedFactorMap();

        this.interactableMap = this.generateInteractableMap();
        this.onWalkMap = this.generateOnWalkMap();
    }

    generateCollisionMap() {
        const collisionMap = [];
        for (let row = 0; row < this.dimensions.y; row++) {
            collisionMap[row] = [];
            for (let col = 0; col < this.dimensions.x; col++) {
                collisionMap[row][col] = false; // start as all walkable
            }
        }

        this.entities.forEach((entity) => {
            const matrix = entity.getCollisionMatrix();
            for (let row = 0; row < entity.dimensions.y; row++) {
                for (let col = 0; col < entity.dimensions.x; col++) {
                    const global = new Coord(entity.tile.x + col, entity.tile.y + row);
                    if (global.isInBound(CONSTS.ZERO, new Coord(this.dimensions.x, this.dimensions.y))) {
                        if (matrix[row][col] === false || matrix[row][col] === true) {
                            collisionMap[global.y][global.x] = matrix[row][col];
                        }
                    }
                }
            }
        });

        return collisionMap;
    }

    /**
     * For each tile, determine if any entity “sets” a speed factor above normal (1.0).
     * If multiple entities overlap, we can pick the maximum.
     */
    generateSpeedFactorMap() {
        const speedMap = [];
        // Initialize everything to 1.0 (normal speed)
        for (let y = 0; y < this.dimensions.y; y++) {
            speedMap[y] = [];
            for (let x = 0; x < this.dimensions.x; x++) {
                speedMap[y][x] = 1.0;
            }
        }

        // For each entity, see if it defines a custom speed factor
        this.entities.forEach(entity => {
            // If an entity DOESN’T define speedFactor, skip
            const entitySpeed = entity.speedFactor || 1.0;

            // For each tile of the entity’s footprint
            for (let row = 0; row < entity.dimensions.y; row++) {
                for (let col = 0; col < entity.dimensions.x; col++) {
                    const global = new Coord(entity.tile.x + col, entity.tile.y + row);

                    if (global.isInBound(CONSTS.ZERO, new Coord(this.dimensions.x, this.dimensions.y))) {
                        // We pick the max factor (so tall grass overrides short grass, etc.)
                        if (entitySpeed > speedMap[global.y][global.x]) {
                            speedMap[global.y][global.x] = entitySpeed;
                        }
                    }
                }
            }
        });

        return speedMap;
    }

    /**
     * Creates a dictionary or 2D array to quickly find
     * which portal (if any) exists at a given tile coordinate.
     */
    generatePortalMap() {
        // A 2D array or a dictionary keyed by "row_col"
        const portalLookup = {};

        this.entities.forEach((entity) => {
            // We'll check if it's a portal by checking if it has the relevant properties
            // or by instanceOf check (PortalEntity, DoorEntity, etc.)
            if (entity.destinationZoneKey !== undefined) {
                // Then it's some kind of portal. We assume single-tile for simplicity:
                const key = `${entity.tile.y}_${entity.tile.x}`;
                portalLookup[key] = entity;
            }
        });

        return portalLookup;
    }

    generateInteractableMap() {
        // A 2D array or a dictionary keyed by "row_col"
        const interactableLookup = {};

        this.entities.forEach((entity) => {
            // We'll check if it's a portal by checking if it has the relevant properties
            // or by instanceOf check (PortalEntity, DoorEntity, etc.)
            if (entity.isInteractable) {
                // Then it's some kind of portal. We assume single-tile for simplicity:
                const key = `${entity.tile.y}_${entity.tile.x}`;
                interactableLookup[key] = entity;
            }
        });

        return interactableLookup;
    }

    generateOnWalkMap() {
        // A 2D array or a dictionary keyed by "row_col"
        const onWalkMap = {};

        this.entities.forEach((entity) => {
            if (entity.hasOnWalk) {
                for (let row = 0; row < entity.dimensions.y; row++) {
                    for (let col = 0; col < entity.dimensions.x; col++) {
                        const key = `${entity.tile.y + row}_${entity.tile.x + col}`;
                        onWalkMap[key] = entity;
                    }
                }
            }
        });

        return onWalkMap;
    }

    /**
     * Re-generate both collisionMap and portalMap if new entities are added.
     */
    refreshCollisionMap() {
        this.collisionMap = this.generateCollisionMap();
        this.portalMap = this.generatePortalMap();
        this.interactableMap = this.generateInteractableMap();
    }

    isBlocked(tile) {
        return this.collisionMap[tile.y][tile.x] === true;
    }

    isInteractable(tile) {
        const key = `${tile.y}_${tile.x}`;
        return !!this.interactableMap[key];
    }

    getInteractableAt(tile) {
        const key = `${tile.y}_${tile.x}`;
        return this.interactableMap[key];
    }

    getOnWalkedAt(tile) {
        const key = `${tile.y}_${tile.x}`;
        return this.onWalkMap[key];
    }

    /**
     * Returns the portal entity at the given tile (if any), otherwise undefined.
     */
    getPortalAt(tile) {
        const key = `${tile.y}_${tile.x}`;
        return this.portalMap[key];
    }

    /**
     * Return how much slower (or faster) the tile is,
     * e.g., 1.0 => normal, 1.5 => slower, etc.
     */
    getSpeedFactor(coord) {
        return this.speedFactorMap[coord.y][coord.x];
    }

    draw(ctx) {
        // 1) Draw simple green background
        for (let row = 0; row < this.dimensions.y; row++) {
            for (let col = 0; col < this.dimensions.x; col++) {
                ctx.fillStyle = "#000000";
                ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
        // 2) Draw all entities
        this.entities.forEach((entity) => {
            entity.draw(ctx, TILE_SIZE);
        });
    }
}