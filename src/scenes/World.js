import {Coord} from "../engine/Coord.js";
import {Player} from "../Player.js";
import {TwoDTileCameraSoftFollow, TwoDTileWorld} from "../engine/scenes/TwoDTileWorld.js";
import {zones} from "../zones.js";
import {dialogue} from "../huds/Dialogue.js";
import {canvas} from "../engine/Canvas.js";


export class World extends TwoDTileWorld {
    constructor(currentMap) {
        const player = new Player(new Coord(0, 0));
        super({
            player,
            currentMap,
            camera: new TwoDTileCameraSoftFollow(player, {canvasDimensions: new Coord(20, 15)})
        });
    }

    listen() {
        return {
            ...super.listen(),
            'key.interact': () => this.tryInteract(),
        }
    }

    tryInteract() {
        const newTile = this.player.tile.add(this.player.facing);
        const interactable = this.currentMap.mapManager.getInteractableAt(newTile);
        if (!!interactable && !dialogue.justEnded) {
            interactable.interact(dialogue);
        }
    }

    checkForEventsOnTile(tile) {
        const portal = this.currentMap.mapManager.getPortalAt(tile);
        if (portal) {
            this.loadZone(
                portal.destinationZoneKey,
                portal.destinationSpawn
            );
        }

        const entity = this.currentMap.mapManager.getOnWalkedAt(tile);
        if (entity) {
            return entity.onWalk();
        }
        return false;
    }

    loadZone(zoneKey, spawn) {
        canvas.foreground.style.transition = "none";
        canvas.background.style.transition = "none";
        canvas.background3D.style.transition = "none";
        setTimeout(() => {
            canvas.foreground.style.transition = "all 0.4s ease-in-out";
            canvas.background.style.transition = "all 0.4s ease-in-out";
            canvas.background3D.style.transition = "all 0.4s ease-in-out";
        }, 100)
        this.currentMap = zones[zoneKey];
        this.draw(true);
        this.player.snapToTile(spawn);
    }
}