export class BallItem {
    constructor() {
        this.name = 'missingname';
        this.type = 'ball';
        this.id = 'missingid';
        this.efficiency = 1;
    }
}

export class PotionItem {
    constructor(name) {
        this.name = name;
        this.id = `potion-${name}`;
        this.type = 'potion';
        this.id = 'missingid';
    }

    get id() {
        return `potion-${this.name}`;
    }

    use(pokemon) {
        this.pokemon = pokemon;
    }
}

export class AttackItem {
    constructor(name) {
        this.name = name;
        this.id = `attack-${name}`;
        this.type = 'attack';
        this.id = 'missingid';
    }

    get id() {
        return `attack-${this.name}`;
    }

    use(pokemon) {
        this.pokemon = pokemon;
    }
}