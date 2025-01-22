import {BigGreenHouse, House, SmallGreenHouse} from "../entities/House.js";
import {Grass} from "../entities/Grass.js";
import {Zone} from "../engine/map/Zone.js";
import {Coord} from "../engine/Coord.js";
import {Eevee, Human} from "../entities/humans/Human.js";
import palletTownLayout from "./palletTown.layout.js";

const house3 = new BigGreenHouse(
    new Coord(15, 59),
    "interior",
    new Coord(47, 15),
    "interior",
    new Coord(51, 5),
);

const house1 = new SmallGreenHouse(
    new Coord(9, 53),
    "interior",
    new Coord(7, 5),
);

const house2 = new SmallGreenHouse(
    new Coord(17, 53),
    "interior",
    new Coord(27, 5),
);

export const palletTownZone = new Zone("Pellet Town",
    [
        ...house1.getEntities(),
        ...house2.getEntities(),
        ...house3.getEntities(),
        new Grass(new Coord(13, 40), new Coord(4, 10)),
        new Eevee(new Coord(15, 46)),
    ],
    new Coord(10, 51), new Coord(100, 100),
    palletTownLayout
);