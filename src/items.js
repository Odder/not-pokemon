import {BallItem} from "./engine/inventory/Item.js";

export class PokeBall extends BallItem {
    constructor() {
        super();
        this.id = 'ball-poke-ball';
        this.name = 'Poké ball';
        this.efficiency = 0.1;
    }
}

export class GreatBall extends BallItem {
    constructor() {
        super();
        this.id = 'ball-great-ball';
        this.name = 'Great ball';
        this.efficiency = 0.5;
    }
}

export class UltraBall extends BallItem {
    constructor() {
        super();
        this.id = 'ball-ultra-ball';
        this.name = 'Ultra Ball';
        this.efficiency = 0.7;
    }
}

export class MasterBall extends BallItem {
    constructor() {
        super();
        this.id = 'ball-master-ball';
        this.name = 'Master Ball';
        this.efficiency = 1;
    }
}

export const items = {};
const balls = [
    new PokeBall(),
    new GreatBall(),
    new UltraBall(),
    new MasterBall(),
]
balls.forEach(ball => {
    items[ball.name] = ball;
})