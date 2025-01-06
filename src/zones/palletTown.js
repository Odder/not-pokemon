import {BigGreenHouse, House, SmallGreenHouse} from "../entities/House.js";
import {Grass} from "../entities/Grass.js";
import {Zone} from "../engine/map/Zone.js";
import {CONSTS, Coord} from "../engine/Coord.js";
import {BoulderWall, Wall} from "../entities/Wall.js";
import {Path} from "../entities/Path.js";
import {LowGrass} from "../entities/LowGrass.js";
import {Eevee, Human} from "../entities/humans/Human.js";

const walls = new BoulderWall(new Coord(7, 42), CONSTS.ZERO)
    .drawSegment(CONSTS.DOWN, 10)
    .drawSegment(CONSTS.LEFT, 7)
    .drawSegment(CONSTS.DOWN, 18)
    .drawSegment(CONSTS.RIGHT, 19)
    .drawSegment(CONSTS.UP, 18)
    .drawSegment(CONSTS.LEFT, 8)
    .drawSegment(CONSTS.UP, 10)
    .drawSegment(CONSTS.RIGHT, 8)
    .drawSegment(CONSTS.UP, 20)
    .drawSegment(CONSTS.LEFT, 19)
    .drawSegment(CONSTS.DOWN, 20)
    .drawSegment(CONSTS.RIGHT, 7)
;

const house3 = new BigGreenHouse(
    new Coord(10, 60),
    "interior",
    new Coord(47, 15),
    "interior",
    new Coord(51, 5),
);

const house1 = new SmallGreenHouse(
    new Coord(4, 54),
    "interior",
    new Coord(7, 5),
);

const house2 = new SmallGreenHouse(
    new Coord(12, 54),
    "interior",
    new Coord(27, 5),
);

export const palletTownZone = new Zone("Pellet Town",
    [
        new LowGrass(new Coord(0, 0), new Coord(30, 70)),
        new Path(new Coord(2, 52), new Coord(17, 16)),
        ...walls.getEntities(),
        ...house1.getEntities(),
        ...house2.getEntities(),
        ...house3.getEntities(),
        new Grass(new Coord(8, 42), new Coord(4, 10), '#00FF00'),
        new Eevee(new Coord(10, 48)),
    ],
    new Coord(5, 53), new Coord(100, 100)
);