import { Entity } from "../engine/Entity.js";
import {npcSpriteSheet, worldSpriteSheet} from "../sprites.js";
import {TILE_SIZE} from "../constants.js";
import {eventBus} from "../EventBus.js";
import {Bulbasaur, Charmander, Pidgey, Rattata, Squirtle} from "../engine/pokemons/Pokemon.js";

/**
 * Represents a rectangular patch of grass, non-blocking.
 */
export class Grass extends Entity {
    constructor(tile, dimensions, colour = "#66BB66") {
        super(tile, dimensions, colour);
        this.speedFactor = 1.5; // e.g. 1.5 => 50% slower
        this.hasOnWalk = true;
    }

    /**
     * All false => no collision in any tile of this grass patch.
     */
    getCollisionMatrix() {
        const matrix = [];
        for (let row = 0; row < this.dimensions.y; row++) {
            matrix[row] = [];
            for (let col = 0; col < this.dimensions.x; col++) {
                matrix[row][col] = false; // not blocked
            }
        }
        return matrix;
    }

    draw(ctx) {
        for (let row = 0; row < this.dimensions.y; row++) {
            for (let col = 0; col < this.dimensions.x; col++) {
                worldSpriteSheet.draw(ctx, (this.tile.x + col) * TILE_SIZE, (this.tile.y + row) * TILE_SIZE, 1, 5);
            }
        }
    }

    onWalk() {
        const pokemons = [Pidgey, Rattata, Bulbasaur, Charmander, Squirtle];
        if(Math.random() < 0.15) {
            const level = 2 + Math.floor(Math.random() * 3);
            const pokemon = new (pokemons[Math.floor(Math.random() * pokemons.length)])(level);
            eventBus.emit('wildEncounter.started', pokemon);
            return true;
        }
        return false;
    }
}