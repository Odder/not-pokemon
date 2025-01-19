import {Entity} from "../engine/Entity.js";
import {worldSpriteSheet} from "../sprites.js";
import {ctx} from "../engine/Canvas.js";
import {TILE_SIZE} from "../constants.js";


export class SmallTree extends Entity {
    drawBackground() {
        worldSpriteSheet.draw(ctx.background, (this.tile.x) * TILE_SIZE, (this.tile.y) * TILE_SIZE, 32, 0);
    }

    drawBackground3D() {
        worldSpriteSheet.draw(ctx.background3D, (this.tile.x) * TILE_SIZE, (this.tile.y-1) * TILE_SIZE, 31, 0);
    }
}
export class Tree extends Entity {
    drawBackground() {
        worldSpriteSheet.draw(ctx.background, (this.tile.x) * TILE_SIZE, (this.tile.y) * TILE_SIZE, 32, 2);
    }

    drawBackground3D() {
        worldSpriteSheet.draw(ctx.background3D, (this.tile.x) * TILE_SIZE, (this.tile.y-1) * TILE_SIZE, 31, 2);
    }
}