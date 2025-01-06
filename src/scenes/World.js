import {Coord} from "../engine/Coord.js";
import {Player} from "../Player.js";
import {TwoDTileCameraSoftFollow, TwoDTileWorld} from "../engine/scenes/TwoDTileWorld.js";
import {zones} from "../zones.js";
import {dialogue} from "../huds/Dialogue.js";


export class World extends TwoDTileWorld {
    constructor(canvas, currentMap) {
        const player = new Player(new Coord(0, 0));
        super(canvas, {
            player,
            currentMap,
            camera: new TwoDTileCameraSoftFollow(canvas, player, {canvasDimensions: new Coord(20, 15)})
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
        this.canvas.style.transition = "none";
        setTimeout(() => {
            this.canvas.style.transition = "all 0.4s ease-in-out";
        }, 200)
        this.currentMap = zones[zoneKey];
        this.player.snapToTile(spawn);
    }
}