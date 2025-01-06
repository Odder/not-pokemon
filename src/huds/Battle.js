const DOM = {
    container: document.querySelector("#battle-container"),
    enemy: {
        health: document.getElementById('enemy-hp-fill'),
        name: document.getElementById('enemy-name-level'),
        sprite: document.getElementById('enemy-pokemon-sprite'),
    },
    player: {
        health: document.getElementById('player-hp-fill'),
        name: document.getElementById('player-name-level'),
        healthText: document.getElementById('player-hp-text'),
        sprite: document.getElementById('player-pokemon-sprite'),
    },
    attackMenu: document.getElementById('attack-menu'),
    messageBox: document.getElementById('message-box'),
    attackMoves: [
        document.getElementById('attack-0'),
        document.getElementById('attack-1'),
        document.getElementById('attack-2'),
        document.getElementById('attack-3'),
    ]
}

const reset = () => {
    DOM.container.style.opacity = "0";
    DOM.container.classList.remove('show');
    DOM.enemy.health.style.backgroundColor = '#00ff00';
    DOM.enemy.health.style.width = '100%';
    DOM.player.health.style.backgroundColor = '#00ff00';
    DOM.player.health.style.width = '100%';
    DOM.enemy.name.innerText = ``
    DOM.player.name.innerText = ``
    DOM.player.healthText.innerText = `0 / 100`
    DOM.attackMoves[0].classList.add('selected');
    DOM.attackMoves[1].classList.remove('selected');
    DOM.attackMoves[2].classList.remove('selected');
    DOM.attackMoves[3].classList.remove('selected');
}

const start = (player, enemy) => {
    DOM.container.style.opacity = "0";
    DOM.container.classList.add('show');
    setTimeout(() => DOM.container.style.opacity = "1", 50);

    battleHUD.enemy.hpBar(enemy);
    battleHUD.player.hpBar(player);
    DOM.enemy.name.innerText = `${enemy.name}  Lvl ${enemy.level}`;
    DOM.player.name.innerText = `${player.name}  Lvl ${player.level}`;
    DOM.player.healthText.innerText = `${player.currentHealth} / ${player.maxHealth}`;

    for (let i = 0; i < player.moves.length; i++) {
        DOM.attackMoves[i].innerText = player.moves[i].name;
    }

    DOM.player.sprite.style.background = `url(${player.spriteBack}) no-repeat center / 100% 100%`;
    DOM.enemy.sprite.style.background = `url(${enemy.spriteFront}) no-repeat center / 100% 100%`;
}

const hpBar = (bar, pokemon) => {
    let colour = '#00ff00';
    const percentageHealth = 100 * pokemon.currentHealth / pokemon.maxHealth;
    if (percentageHealth < 25) {
        colour = '#ff0000';
    }
    bar.style.backgroundColor = colour;
    bar.style.width = `${percentageHealth}%`;
}

const hpBars = (player, enemy) => {
    hpBar(DOM.player.health, player);
    hpBar(DOM.enemy.health, enemy);
    DOM.player.healthText.innerText = `${player.currentHealth} / ${player.maxHealth}`;
}

const selectAttack = (attack) => {
    DOM.attackMoves.forEach(move => {
        move.classList.remove('selected');
    })
    DOM.attackMoves[attack].classList.add('selected');
}

const attacking = (pokemon) => {
    pokemon.classList.add('attacking');
    setTimeout(() => {
        pokemon.classList.remove('attacking');
    }, 1000);
}

const showAttackMenu = (attack) => {
    DOM.attackMenu.classList.add('show');
}

const hideAttackMenu = (attack) => {
    DOM.attackMenu.classList.remove('show');
}

export const battleHUD =  {
    reset,
    start,
    selectAttack,
    showAttackMenu,
    hideAttackMenu,
    hpBars: hpBars,
    enemy: {
        hpBar: (mon) => hpBar(DOM.enemy.health, mon),
        attack: () => attacking(DOM.enemy.sprite),
    },
    player: {
        hpBar: (mon) => hpBar(DOM.player.health, mon),
        attack: () => attacking(DOM.player.sprite),
    }
}

