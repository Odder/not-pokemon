import {eventBus} from "../EventBus.js";

const randomElement = (list) => {
    return list[Math.floor(Math.random() * list.length)];
}

export class Battle {
    constructor(playerTrainer, enemyPokemon) {
        this.activePlayerPokemon = playerTrainer.pokemons[0];
        this.enemyPokemon = enemyPokemon;
    }

    /**
     * Called when the player chooses a move.
     */
    playerMove(move) {
        const playerMove = move;
        const enemyMove = randomElement(this.enemyPokemon.moves);

        const playerSpeed = this.activePlayerPokemon.speed + playerMove.speed;
        const enemySpeed = this.enemyPokemon.speed + enemyMove.speed;

        if (playerSpeed >= enemySpeed)  {
            return [
                () => this.useMove(this.activePlayerPokemon, this.enemyPokemon, playerMove),
                () => this.useMove(this.enemyPokemon, this.activePlayerPokemon, enemyMove),
                true,
            ];
        } else {
            return [
                () => this.useMove(this.enemyPokemon, this.activePlayerPokemon, enemyMove),
                () => this.useMove(this.activePlayerPokemon, this.enemyPokemon, playerMove),
                false,
            ];
        }
    }

    /**
     * The core logic for applying a move: damage calculation, accuracy, etc.
     */
    useMove(attacker, defender, move) {
        // Check accuracy
        const hitChance = Math.random() * 100;
        if (hitChance > move.accuracy) {
            eventBus.emit('moveUsed', {damage: 0, attacker, defender, move, hasMissed: true});
            return;
        }

        // Simple damage formula
        // damage = (attacker.attack / defender.defense) * move.power
        const damage = Math.floor((attacker.attack / defender.defense) * (move.power*0.2));
        defender.currentHealth = Math.max(0, defender.currentHealth - damage);

        eventBus.emit('moveUsed', {damage, attacker, defender, move, hasMissed: false});

        if (defender.currentHealth <= 0) {
            eventBus.emit('pokemonFainted', null);
        }
    }
}