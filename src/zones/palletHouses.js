import {Zone} from "../engine/map/Zone.js";
import {CONSTS, Coord} from "../engine/Coord.js";
import {Wall} from "../entities/Wall.js";
import {Path, WoodenFloor} from "../entities/Path.js";
import {Portal} from "../entities/Portal.js";
import {Bulbasaur, Charmander, ProfessorOak, Squirtle} from "../entities/humans/Human.js";


/** HOUSE 1 **/
const house1 = [
    ...(
        new Wall(new Coord(0, 0), CONSTS.ZERO) // boundary
            .drawSegment(CONSTS.RIGHT, 12)
            .drawSegment(CONSTS.DOWN, 7)
            .drawSegment(CONSTS.LEFT, 12)
            .drawSegment(CONSTS.UP, 7)
            .getEntities()
    ),
    new WoodenFloor(new Coord(1, 1), new Coord(10, 5)), // floor
    new Portal(new Coord(7, 6), "palletTown", new Coord(11, 57), "#934e4e", false) // door out
]

/** HOUSE 2 **/
const house2 = [
    ...(
        new Wall(new Coord(20, 0), CONSTS.ZERO) // boundary
            .drawSegment(CONSTS.RIGHT, 12)
            .drawSegment(CONSTS.DOWN, 7)
            .drawSegment(CONSTS.LEFT, 12)
            .drawSegment(CONSTS.UP, 7)
            .getEntities()
    ),
    new WoodenFloor(new Coord(21, 1), new Coord(10, 5)), // floor
    new Portal(new Coord(27, 6), "palletTown", new Coord(19, 57), "#934e4e", false) // door out
]
/** HOUSE 3 **/
const house3 = [ // Professor Oak!
    ...(
        new Wall(new Coord(40, 0), CONSTS.ZERO) // boundary
            .drawSegment(CONSTS.RIGHT, 15)
            .drawSegment(CONSTS.DOWN, 17)
            .drawSegment(CONSTS.LEFT, 15)
            .drawSegment(CONSTS.UP, 17)
            .getEntities()
    ),
    new WoodenFloor(new Coord(41, 1), new Coord(13, 15)), // floor
    new Wall(new Coord(40, 6), new Coord(6, 1)),
    new Wall(new Coord(49, 6), new Coord(6, 1)),
    new ProfessorOak(new Coord(44, 3)),
    new Charmander(new Coord(49, 3)),
    new Squirtle(new Coord(50, 3)),
    new Bulbasaur(new Coord(51, 3)),

    new Portal(new Coord(47, 16), "palletTown", new Coord(17, 64), "#934e4e", false) // door out
]

export const palletHouses =  new Zone("Pallet Town Houses",
        [
            ...house1,
            ...house2,
            ...house3,
        ],
    new Coord(5, 3),
    new Coord(100, 20)
);