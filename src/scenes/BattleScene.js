import {eventBus} from "../EventBus.js";
import {Battle} from "../battle/Battle.js";
import {dialogue} from "../huds/Dialogue.js";
import {CONSTS} from "../engine/Coord.js";
import {Scene} from "../engine/scenes/Scene.js";
import {battleHUD} from "../huds/Battle.js";

export class BattleScene extends Scene {
    constructor() {
        super();
        this.state = 'inactive';
    }

    listen() {
        return {
            'key.interact': () => this.onInteraction(),
            'key.up': () => this.onMoveDirection(CONSTS.UP),
            'key.down': () => this.onMoveDirection(CONSTS.DOWN),
            'pokemonFainted': () => this.onFainted(),
            'moveUsed': ({
                             damage,
                             attacker,
                             defender,
                             move,
                             hasMissed
                         }) => this.onMoveUsed(damage, attacker, defender, move, hasMissed),
        }
    }

    start(player, enemyMon) {
        super.start();
        this.selectedAttack = 0
        this.state = 'encountered';
        this.battle = new Battle(player, enemyMon);
        this.nextMove = null;
        dialogue.converse([[`A wild ${enemyMon.name} has appeared!`]], true);
        battleHUD.start(this.battle.activePlayerPokemon, enemyMon);
    }

    pause() {
        super.pause();
        battleHUD.reset();
        this.state = 'inactive';
    }

    statePickAttack() {
        this.state = 'pickAttack';
        dialogue.add([`It's time to pick an attack!`])
        battleHUD.showAttackMenu();
    }

    stateUseAttack() {
        this.state = 'useAttack';
        battleHUD.hideAttackMenu();
        const [move1, move2, isPlayerAttackingFirst] = this.battle.playerMove(this.battle.activePlayerPokemon.moves[this.selectedAttack]);
        move1();
        isPlayerAttackingFirst ? battleHUD.player.attack() : battleHUD.enemy.attack();
        this.nextMove = [move2, !isPlayerAttackingFirst];
    }

    stateUseAttack2() {
        this.state = 'useAttack2';
        const [move2, isPlayerAttacking] = this.nextMove;
        move2();
        isPlayerAttacking ? battleHUD.player.attack() : battleHUD.enemy.attack();
    }

    stateYouFainted() {
        this.state = 'youFainted';
        dialogue.add([`${this.battle.activePlayerPokemon.name} has fainted...`]);
    }

    stateEnemyFainted() {
        this.state = 'enemyFainted'
        dialogue.add([`${this.battle.enemyPokemon.name} has fainted...`]);
    }

    onMoveDirection(direction) {
        if (this.state === 'pickAttack') {
            this.selectAttack(direction.y);
        }
    }

    onInteraction() {
        if (!dialogue.isReady) {
            return;
        }
        if (this.state === 'encountered') {
            this.statePickAttack();
        } else if (this.state === 'pickAttack') {
            this.stateUseAttack();
        } else if (this.state === 'useAttack') {
            this.stateUseAttack2();
        } else if (this.state === 'useAttack2') {
            this.statePickAttack();
        } else if (this.state === 'enemyFainted') {
            this.pause();
            dialogue.pause();
            eventBus.emit('wildEncounter.ended', null);
        } else if (this.state === 'youFainted') {
            this.pause();
            dialogue.pause();
            eventBus.emit('respawn', null);
        }
        dialogue.next();
    }

    onFainted() {
        battleHUD.hideAttackMenu();
        battleHUD.hpBars(this.battle.activePlayerPokemon, this.battle.enemyPokemon);

        if (this.battle.activePlayerPokemon.currentHealth === 0) {
            this.stateYouFainted();
        } else {
            this.stateEnemyFainted();
        }
    }

    onMoveUsed(damage, attacker, defender, move, hasMissed) {
        battleHUD.hideAttackMenu();
        if (hasMissed) {
            dialogue.add([`${attacker.name}'s attack missed!`])
            return;
        }

        dialogue.add([`${attacker.name} has used ${move.name}.\nIt dealt ${damage} to ${defender.name}`]);
        setTimeout(() => {
            battleHUD.hpBars(this.battle.activePlayerPokemon, this.battle.enemyPokemon);
        }, 500)
    }

    selectAttack(direction) {
        const newSelectedAttack = (this.selectedAttack + this.battle.activePlayerPokemon.moves.length + direction) % this.battle.activePlayerPokemon.moves.length;
        battleHUD.selectAttack(newSelectedAttack)
        this.selectedAttack = newSelectedAttack;
    }
}