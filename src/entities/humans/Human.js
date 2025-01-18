import { Entity } from "../../engine/Entity.js";
import {CONSTS} from "../../engine/Coord.js";
import {npcSpriteSheet, pokemonNpcSpriteSheet} from "../../sprites.js";
import {TILE_SIZE} from "../../constants.js";
import {dialogue} from "../../huds/Dialogue.js";
import {ctx} from "../../engine/Canvas.js";

/**
 * Represents a rectangular patch of grass, non-blocking.
 */
export class Human extends Entity {
    /**
     * tileX, tileY: top-left tile coordinates
     * width, height: dimensions in tiles
     * colour: rendering colour
     */
    constructor(tile) {
        super(tile, CONSTS.ONE);
        this.speedFactor = 1.5; // e.g. 1.5 => 50% slower
        this.isInteractable = true;
    }

    /**
     * All false => no collision in any tile of this grass patch.
     */
    getCollisionMatrix() {
        return [[true]];
    }
}

export class Eevee extends Human {
    drawForeground() {
        npcSpriteSheet.draw(ctx.foreground, this.tile.x * TILE_SIZE, this.tile.y * TILE_SIZE, 0, 0, 32, 32);
    }

    interact() {
        dialogue.converse([
            ["Hello, I am a human! You have interacted with me. This is NOT a Pokemon game."],
            ["You didn't expect me to talk for this long... did you?"],
        ]);
    }
}

export class ProfessorOak extends Human {
    drawForeground() {
        npcSpriteSheet.draw(ctx.foreground, this.tile.x * TILE_SIZE, this.tile.y * TILE_SIZE, 0, 0, 32, 32);
    }

    interact() {
        dialogue.converse([
            ["Hello there! I'm Professor Oak. What leads you here?"],
            ["Ohhhh no, this is not a Pokemon game. You are not going to find any Pokemon here."],
        ]);
    }
}

export class Bulbasaur extends Human {
    drawForeground() {
        pokemonNpcSpriteSheet.draw(ctx.foreground, this.tile.x * TILE_SIZE, this.tile.y * TILE_SIZE, 0, 0, 32, 32);
    }

    interact() {
        dialogue.converse([
            ["I'm a Bulbasaur!"],
        ]);
    }
}

export class Squirtle extends Human {
    drawForeground() {
        pokemonNpcSpriteSheet.draw(ctx.foreground, this.tile.x * TILE_SIZE, this.tile.y * TILE_SIZE, 0, 3, 32, 32);
    }

    interact() {
        dialogue.converse([
            ["I'm a Squirtle!"],
        ]);
    }
}

export class Charmander extends Human {
    drawForeground() {
        pokemonNpcSpriteSheet.draw(ctx.foreground, this.tile.x * TILE_SIZE, this.tile.y * TILE_SIZE, 0, 1, 32, 32);
    }

    interact() {
        dialogue.converse([
            ["I'm a Charmander!"],
        ]);
    }
}