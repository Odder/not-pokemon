function removeWhiteBackground(canvas, ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (r === 230 && g === 230 && b === 230) {
            data[i + 3] = 0;
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

class SpriteSheet {
    constructor(path, width = 32, height = 32, offsetX = 0, offsetY = 0) {
        this.path = `assets/${path}`;
        this.spriteWidth = width;
        this.spriteHeight = height;
        this.sheet = null
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        const sheet = new Image();
        sheet.src = this.path
        this.isLoaded = false;

        sheet.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = sheet.width;
            canvas.height = sheet.height;

            ctx.drawImage(sheet, 0, 0);

            removeWhiteBackground(canvas, ctx);
            this.sheet = canvas;
            this.isLoaded = true;
        }
    }

    draw(ctx, x, y, row, col, dx=null, dy=null) {
        if (!this.isLoaded) {
            ctx.fillStyle = 'black';
            ctx.fillRect(x, y, 32, 32);
            return;
        }

        const sx = col * this.spriteWidth + this.offsetX;
        const sy = row * this.spriteHeight + this.offsetY;

        ctx.drawImage(
            this.sheet,
            sx,
            sy,
            this.spriteWidth,
            this.spriteHeight,
            x,
            y,
            dx || this.spriteWidth,
            dy || this.spriteHeight,
        );
    }
}

export const playerSpriteSheet = new SpriteSheet('player-spritesheet.png', 32, 32, 0, 5);
export const npcSpriteSheet = new SpriteSheet('eevee.png', 64, 64, 0, 0);
export const worldSpriteSheet = new SpriteSheet('landscape-spritesheet.png', 32, 32, 0, 0);
export const pokemonNpcSpriteSheet = new SpriteSheet('pokemon-spritesheet.png', 64, 64, 0, 0);
