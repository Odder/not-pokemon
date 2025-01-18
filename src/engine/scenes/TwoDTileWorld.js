import {CONSTS, Coord} from "../Coord.js";
import {TILE_SIZE} from "../../constants.js";
import {Scene} from "./Scene.js";
import {inputHandler} from "../../InputHandler.js";
import {canvas, ctx} from "../Canvas.js";

export class TwoDTileWorld extends Scene {
    constructor({
        player = new TwoDTilePlayer(),
        currentMap = '',
        tick = 150,
        tileSize = 32,
        moveDuration = 300,
        camera = {update: () => {}},
    }) {
        super();
        this.currentMap = currentMap;
        this.player = player;
        this.tick = tick;
        this.tileSize = tileSize;
        this.ts = 0;
        this.fromTile = null;
        this.toTile = null;
        this.moveDuration = moveDuration;
        this.camera = camera;

        requestAnimationFrame((ts) => this.gameLoop(ts));
        setTimeout(
            () => {
                canvas.background.style.transition = "all 0.4s ease-in-out";
                canvas.background3D.style.transition = "all 0.4s ease-in-out";
                canvas.foreground.style.transition = "all 0.4s ease-in-out";

            },
            100
        );
    }

    start() {
        super.start();
        setTimeout(() =>
            this.draw(true), 10);
    }

    pause() {
        super.pause();

    }

    gameLoop(ts) {
        this.ts = ts;
        this.update();
        this.draw();
        this.tick++;
        requestAnimationFrame((ts) => this.gameLoop(ts));
    }

    listen() {
        return {
            'key.up': () => this.tryMove(CONSTS.UP),
            'key.down': () => this.tryMove(CONSTS.DOWN),
            'key.left': () => this.tryMove(CONSTS.LEFT),
            'key.right': () => this.tryMove(CONSTS.RIGHT),
            'key.interact': () => this.tryInteract(),
        }
    }

    update() {
        if (this.player.isMoving) {
            this.continueMove();
        }

        this.camera.update();
    }

    draw(force= false) {
        if (force) {
            ctx.background.clearRect(0, 0, canvas.background.width, canvas.background.height);
            ctx.background3D.clearRect(0, 0, canvas.background3D.width, canvas.background3D.height);
        }
        ctx.foreground.clearRect(0, 0, canvas.foreground.width, canvas.foreground.height);

        this.currentMap.mapManager.drawForeground(this.camera);
        if (force) {
            this.currentMap.mapManager.drawBackground(this.camera);
        }
        this.player.draw(this.tick);
    }

    tryMove(move, override = false) {
        this.player.facing = move;
        if (!override && this.player.isMoving) {
            this.player.queuedMove = move;
            return;
        }

        this.player.facing = move;
        const newTile = this.player.tile
            .add(move)
            .bound(CONSTS.ZERO, this.currentMap.dimensions);

        if (!this.currentMap.mapManager.isBlocked(newTile)) {
            this.startMove(newTile);
        } else {
            this.player.isMoving = false;
        }
    }

    startMove(newTile) {
        this.player.isMoving = true;
        this.moveStartTime = this.ts;
        this.fromTile = this.player.tile;
        this.toTile = newTile;
        this.currentMoveDuration = this.moveDuration * this.currentMap.mapManager.getSpeedFactor(this.player.tile);
    }

    continueMove() {
        const elapsedTime = this.ts - this.moveStartTime;

        if (elapsedTime >= this.currentMoveDuration) {
            return this.endMove();
        }
        const t = elapsedTime / this.currentMoveDuration;
        this.player.pos = this.lerpCoord(
            this.fromTile.scalar(this.tileSize),
            this.toTile.scalar(this.tileSize),
            t);
    }

    endMove() {
        this.player.snapToTile(this.toTile);
        const hasEvents = this.checkForEventsOnTile(this.toTile);

        if (!hasEvents && inputHandler.getMovementDirection()) {
            this.tryMove(this.player.facing, true);
        } else {
            this.player.isMoving = false;
        }
    }

    checkForEventsOnTile() {
        return false;
    }

    lerp(start, end, t) {
        return start + (end - start) * t;
    }

    lerpCoord(start, end, t) {
        return new Coord(
            this.lerp(start.x, end.x, t),
            this.lerp(start.y, end.y, t),
        )
    }
}

export class TwoDTilePlayer {
    constructor(tile) {
        this.tile = tile;
        this.pos = tile.scalar(TILE_SIZE);
        this.facing = CONSTS.DOWN;
        this.isMoving = false;
        this.spriteSheet = null;
    }

    draw(tick) {
        const rowMap = {};
        rowMap[CONSTS.UP.toString()] = 2;
        rowMap[CONSTS.DOWN.toString()] = 0;
        rowMap[CONSTS.LEFT.toString()] = 1;
        rowMap[CONSTS.RIGHT.toString()] = 3;
        this.spriteSheet.draw(ctx.foreground, this.pos.x, this.pos.y, rowMap[this.facing.toString()], this.isMoving ? (((tick/5)^0) % 4) + 1 : 0);
    }

    // Optionally define a method to snap to a new tile
    snapToTile(newTile) {
        this.tile = newTile;
        this.pos = newTile.scalar(TILE_SIZE);
    }
}

export class TwoDTileCameraSoftFollow {
    constructor(player, {
        tileSize = 32,
        canvasDimensions = new Coord(20, 20),
        margin = 5,
    }) {
        this.pos = new Coord(0, 0);
        this.player = player;
        this.canvasDimensions = canvasDimensions.scalar(tileSize);
        this.margin = new Coord(margin * tileSize, margin * tileSize);

    }

    update() {
        const playerPosOnScreen = this.player.pos.subtract(this.pos);
        if (!playerPosOnScreen.isInBoundX(this.margin, this.canvasDimensions.subtract(this.margin))) {
            this.pos.x = this.player.pos.x - 320;
        }
        if (!playerPosOnScreen.isInBoundY(this.margin, this.canvasDimensions.subtract(this.margin))) {
            this.pos.y = this.player.pos.y - 240;
        }

        canvas.foreground.style.transform = `translate(${-this.pos.x}px, ${-this.pos.y}px)`;
        canvas.background.style.transform = `translate(${-this.pos.x}px, ${-this.pos.y}px)`;
        canvas.background3D.style.transform = `translate(${-this.pos.x}px, ${-this.pos.y}px)`;
    }
}