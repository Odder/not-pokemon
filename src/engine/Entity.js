import {ctx} from "./Canvas.js";
import {Array2D} from "./utils.js";

/**
 * Base class for any object/structure placed on the map.
 * It knows its top-left tile position, width, and height in tiles.
 */
export class Entity {
    constructor(tile, dimensions) {
        this.tile = tile;
        this.dimensions = dimensions;
        this.speedFactor = 1;
        this.isInteractable = false;
        this.hasOnWalk = false;
    }

    /**
     * By default, let's assume an entity's entire footprint blocks movement.
     * Subclasses can override to specify which tiles are not blocked (like doors).
     *
     * Return a 2D array (width x height) that is `true` for blocked cells,
     * `false` for non-blocked cells, relative to the top-left corner of the entity.
     */
    getCollisionMatrix() {
        const matrix = new Array2D();
        for (const coord of this.dimensions.traverse()) {
            matrix.set(coord, true);
        }
        return matrix;
    }

    /**
     * Draw each tile of the entity onto the canvas.
     * By default, we might fill a rectangle of the entity's footprint with `this.colour`.
     * Subclasses can override if they want more custom tile-by-tile drawing.
     */
    drawForeground() {
    }

    drawBackground() {
    }

    drawBackground3D() {
    }

    getEntities() {
        return [this, ...this.getSubEntities()];
    }

    getSubEntities() {
        return [];
    }

    onWalk() {
        return null;
    }
}