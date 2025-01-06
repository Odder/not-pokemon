import {CONSTS, Coord} from "../Coord.js";
import {TILE_SIZE} from "../../constants.js";
import {Scene} from "./Scene.js";
import {inputHandler} from "../../InputHandler.js";

export class TwoDTileWorld extends Scene {
    constructor(canvas, {
        player = new TwoDTilePlayer(canvas.width, canvas.height),
        currentMap = '',
        tick = 150,
        tileSize = 32,
        moveDuration = 300,
        camera = {update: () => {}},
    }) {
        super();
        this.currentMap = currentMap;
        this.player = player;
        this.canvas = document.getElementById(canvas);
        this.ctx = this.canvas.getContext("2d");
        this.tick = tick;
        this.tileSize = tileSize;
        this.ts = 0;
        this.fromTile = null;
        this.toTile = null;
        this.moveDuration = moveDuration;
        this.camera = camera;

        requestAnimationFrame((ts) => this.gameLoop(ts));
        setTimeout(
            () =>
                this.canvas.style.transition = "all 0.4s ease-in-out",
            200
        );
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

        this.camera.update(this.canvas);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentMap.mapManager.draw(this.ctx, this.camera);
        this.player.draw(this.ctx, this.tick);
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

    draw(ctx, tick) {
        const rowMap = {};
        rowMap[CONSTS.UP.toString()] = 2;
        rowMap[CONSTS.DOWN.toString()] = 0;
        rowMap[CONSTS.LEFT.toString()] = 1;
        rowMap[CONSTS.RIGHT.toString()] = 3;
        this.spriteSheet.draw(ctx, this.pos.x, this.pos.y, rowMap[this.facing.toString()], this.isMoving ? (((tick/5)^0) % 4) + 1 : 0);
    }

    // Optionally define a method to snap to a new tile
    snapToTile(newTile) {
        this.tile = newTile;
        this.pos = newTile.scalar(TILE_SIZE);
    }
}

export class TwoDTileCameraSoftFollow {
    constructor(canvas, player, {
        tileSize = 32,
        canvasDimensions = new Coord(20, 20),
        margin = 5,
    }) {
        this.canvas = canvas;
        this.pos = new Coord(0, 0);
        this.player = player;
        this.canvasDimensions = canvasDimensions.scalar(tileSize);
        this.margin = new Coord(margin * tileSize, margin * tileSize);

    }

    update(canvas) {
        const playerPosOnScreen = this.player.pos.subtract(this.pos);
        if (!playerPosOnScreen.isInBoundX(this.margin, this.canvasDimensions.subtract(this.margin))) {
            this.pos.x = this.player.pos.x - 320;
        }
        if (!playerPosOnScreen.isInBoundY(this.margin, this.canvasDimensions.subtract(this.margin))) {
            this.pos.y = this.player.pos.y - 240;
        }

        canvas.style.transform = `translate(${-this.pos.x}px, ${-this.pos.y}px)`;
    }
}