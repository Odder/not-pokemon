import {moves} from "../../pokemons/moves.js";

export class Pokemon {
    constructor(name, level, moves = [], experience = 0, health = 10, attack = 4, defense = 5, speed = 3, healthFactor = 2.5, attackFactor = 1, defenseFactor = 1, speedFactor = 1) {
        this.name = name;
        this.experience = experience;
        this.spriteFront = 'assets/pokemon-sprites/eevee.gif';
        this.spriteBack = 'assets/pokemon-sprites/eevee-back.gif';

        // Basic stats
        this.level = level;
        this.baseHealth = health;
        this.baseAttack = attack;
        this.baseDefense = defense;
        this.baseSpeed = speed;
        this.healthFactor = healthFactor
        this.attackFactor = attackFactor
        this.defenseFactor = defenseFactor
        this.speedFactor = speedFactor
        this.currentHealth = this.maxHealth;

        // Moves (array of Move objects)
        this.moves = moves;
    }

    get maxHealth() {
        return Math.floor(this.baseHealth + this.level*this.healthFactor);
    }

    get attack() {
        return Math.floor(this.baseAttack + this.level*this.attackFactor);
    }

    get defense() {
        return Math.floor(this.baseDefense + this.level*this.defenseFactor);
    }

    get speed() {
        return Math.floor(this.baseSpeed + this.level*this.speedFactor);
    }

    // Simple method to restore HP
    heal(amount) {
        this.currentHealth = Math.min(this.health + amount, this.maxHealth);
    }

    // Simple method to restore HP
    gainExperience(amount) {
        this.experience += amount;
        if (this.experience > this.maxHealth) {
            this.level += 1;
            this.experience = 0;
        }
    }

    // Check if fainted
    isFainted() {
        return this.health <= 0;
    }
}

export class Pidgey extends Pokemon {
    constructor(level, name = 'Pidgey') {
        super(name, level, [moves.gust])
        this.spriteFront = 'assets/pokemon-sprites/pidgey.gif';
        this.spriteBack = 'assets/pokemon-sprites/pidgey-back.gif';
    }
}

export class Rattata extends Pokemon {
    constructor(level, name = 'Rattata') {
        super(name, level, [moves.tackle])
        this.spriteFront = 'assets/pokemon-sprites/rattata.gif';
        this.spriteBack = 'assets/pokemon-sprites/rattata-back.gif';
    }
}

export class Pikachu extends Pokemon {
    constructor(level, name = 'Pikachu') {
        super(name, level, [moves.growl, moves.thunderbolt])
        this.speedFactor = 1.2
        this.baseAttack = 10
        this.spriteFront = 'assets/pokemon-sprites/pikachu.gif';
        this.spriteBack = 'assets/pokemon-sprites/pikachu-back.gif';
    }
}

export class Bulbasaur extends Pokemon {
    constructor(level, name = 'Bulbasaur') {
        super(name, level, [moves.growl, moves.thunderbolt])
        this.speedFactor = 1.2
        this.spriteFront = 'assets/pokemon-sprites/bulbasaur.gif';
        this.spriteBack = 'assets/pokemon-sprites/bulbasaur-back.gif';
    }
}

export class Squirtle extends Pokemon {
    constructor(level, name = 'Squirtle') {
        super(name, level, [moves.growl, moves.thunderbolt])
        this.speedFactor = 1.2
        this.spriteFront = 'assets/pokemon-sprites/squirtle.gif';
        this.spriteBack = 'assets/pokemon-sprites/squirtle-back.gif';
    }
}

export class Charmander extends Pokemon {
    constructor(level, name = 'Charmander') {
        super(name, level, [moves.growl, moves.thunderbolt])
        this.speedFactor = 1.2
        this.spriteFront = 'assets/pokemon-sprites/charmander.gif';
        this.spriteBack = 'assets/pokemon-sprites/charmander-back.gif';
    }
}