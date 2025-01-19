import { MapManager } from "./MapManager.js";
import {CONSTS, Coord} from "../Coord.js";
import {LowGrass} from "../../entities/LowGrass.js";
import {Boulder} from "../../entities/Wall.js";
import {SmallTree, Tree} from "../../entities/Tree.js";
import {Path} from "../../entities/Path.js";

/**
 * A Zone wraps together:
 *  - An array of entities (houses, trees, etc.)
 *  - A MapManager that generates collision from those entities
 *  - Possibly a "spawnPoint" tile to place the player
 */
export class Zone {
    constructor(name, entities, spawnTile = new Coord(1, 1), dimensions = new Coord(20, 20), layout) {
        this.name = name;
        this.entities = entities;
        this.spawnTile = spawnTile;
        this.dimensions = dimensions;
        if (layout) {
            this.loadFromLayout(layout);
        }
        this.mapManager = new MapManager(this.entities, dimensions);
        console.info('entities of ', this.name, this.entities.length);
    }

    refresh() {
        this.mapManager.refreshCollisionMap();
    }

    loadFromLayout(layout) {
        console.info('Loading form layout');
        const entities = [new LowGrass(CONSTS.ZERO, this.dimensions)];
        layout = layout.split('\n')

        for (let y = 1; y < layout.length; y++) {
            for (let x = 0; x < layout[y].length; x++) {
                const coord = new Coord(x, y-1);
                const char = layout[y][x];
                switch (char) {
                    case '.':
                        continue;
                    case '-':
                        //console.info('adding wall tile @ ', coord);
                        entities.push(new Path(coord, CONSTS.ONE));
                        break;
                    case 'o':
                        //console.info('adding wall tile @ ', coord);
                        entities.push(new Boulder(coord, CONSTS.ONE));
                        break;
                    case 'T':
                        entities.push(new Tree(coord, CONSTS.ONE));
                        break;
                    case 't':
                        entities.push(new SmallTree(coord, CONSTS.ONE));
                        break;
                    case 'X':
                        //console.info('adding spawn tile @ ', coord);
                        this.spawnTile = coord;
                        break;
                }
            }
        }

        this.entities = [...entities, ...this.entities];
    }
}