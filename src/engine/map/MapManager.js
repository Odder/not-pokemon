import { TILE_SIZE } from "../../constants.js";
import { Coord, CONSTS } from "../Coord.js";
import {Array2D} from "../utils.js";

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
        const collisionMap = new Array2D(false);

        this.entities.forEach((entity) => {
            const matrix = entity.getCollisionMatrix();
            for (const coord of entity.dimensions.traverse()) {
                const global = entity.tile.add(coord);
                if (global.isInBound(CONSTS.ZERO, this.dimensions)) {
                    collisionMap.set(global, matrix[coord.y][coord.x]);
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
        const speedMap = new Array2D(1.0);

        this.entities.forEach(entity => {
            const entitySpeed = entity.speedFactor || 1.0;
            for (const coord of entity.dimensions.traverse()) {
                const global = entity.tile.add(coord);
                if (global.isInBound(CONSTS.ZERO, this.dimensions)) {
                    if (entitySpeed > speedMap.get(global)) {
                        speedMap.set(global, entitySpeed);
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
        const portalLookup = new Array2D();

        this.entities.forEach((entity) => {
            if (entity.destinationZoneKey !== undefined) {
                portalLookup.set(entity.tile, entity);
            }
        });

        return portalLookup;
    }

    generateInteractableMap() {
        const interactableLookup = new Array2D();

        this.entities.forEach((entity) => {
            if (entity.isInteractable) {
                interactableLookup.set(entity.tile, entity);
            }
        });

        return interactableLookup;
    }

    generateOnWalkMap() {
        const onWalkMap = new Array2D();

        this.entities.forEach((entity) => {
            if (entity.hasOnWalk) {
                for (const tile of entity.dimensions.traverse()) {
                    onWalkMap.set(tile, entity);
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
        return this.collisionMap.get(tile) === true;
    }

    isInteractable(tile) {
        return !!this.interactableMap.get(tile);
    }

    getInteractableAt(tile) {
        return this.interactableMap.get(tile);
    }

    getOnWalkedAt(tile) {
        return this.onWalkMap.get(tile);
    }

    /**
     * Returns the portal entity at the given tile (if any), otherwise undefined.
     */
    getPortalAt(tile) {
        return this.portalMap.get(tile);
    }

    /**
     * Return how much slower (or faster) the tile is,
     * e.g., 1.0 => normal, 1.5 => slower, etc.
     */
    getSpeedFactor(coord) {
        return this.speedFactorMap.get(coord);
    }

    draw(ctx) {
        // 1) Draw simple green background
        for (const coord of this.dimensions.traverse()) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(coord.x * TILE_SIZE, coord.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }

        // 2) Draw all entities
        this.entities.forEach((entity) => {
            entity.draw(ctx, TILE_SIZE);
        });
    }
}