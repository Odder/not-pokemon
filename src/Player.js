import {TILE_SIZE} from "./constants.js";
import {CONSTS, Coord} from "./engine/Coord.js";
import {playerSpriteSheet} from "./sprites.js";
import {Pikachu} from "./engine/pokemons/Pokemon.js";
import {TwoDTilePlayer} from "./engine/scenes/TwoDTileWorld.js";

/**
 * Represents the player entity, holding both tile and pixel coordinates.
 * Has logic to handle updates to position (if you want it self-contained),
 * or can simply store data while the game engine manipulates it.
 */
export class Player extends TwoDTilePlayer {
    constructor(tile) {
        super(tile);
        this.pokemons = [new Pikachu(3)];
        this.spriteSheet = playerSpriteSheet;
    }
}
