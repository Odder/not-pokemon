import {palletTownZone} from "./zones/palletTown.js";
import {World} from "./scenes/World.js";
import {Coord} from "./engine/Coord.js";
import {eventBus} from "./EventBus.js";
import {BattleScene} from "./scenes/BattleScene.js";


export const scenes = {
    'world': new World(palletTownZone, {}),
    'battleScene': new BattleScene(),
}

export class Game {
    constructor() {
        this.activeScene = scenes.world;
        this.activeScene.start()
        this.activeScene.player.snapToTile(palletTownZone.spawnTile);

        eventBus.register('dialogue.started', () => this.pauseScene());
        eventBus.register('dialogue.ended', () => this.unpauseScene());
        eventBus.register('wildEncounter.started', (pokemon) => this.wildEncounter(pokemon));
        eventBus.register('wildEncounter.ended', () => this.endWildEncounter());
    }

    pauseScene() {
        this.activeScene.pause();
    }

    unpauseScene() {
        this.activeScene.start();
    }

    wildEncounter(pokemon) {
        scenes.world.pause();
        scenes.battleScene.start(scenes.world.player, pokemon);
    }

    endWildEncounter() {
        scenes.battleScene.pause();
        scenes.world.start();
    }
}