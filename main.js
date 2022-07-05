function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomGen(seed) {
    if (seed === 0) {
        seed = performance.now();
    }

    return function () {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    }
}

function setCoordinates() {
    posX = 0;
    posY = random(0, MAP_SIZE_Y - 1);
    endX = MAP_SIZE_X - 1;
    endY = random(0, MAP_SIZE_Y - 1);

    map[posY][posX] = 1;
    map[endY][endX] = 1;
}

function render() {
    for (let y = 0; y < MAP_SIZE_Y; y++) {
        for (let x = 0; x < MAP_SIZE_X; x++) {
            let colorType = colors.wall;

            if ((x === posX) && (y === posY)) {
                colorType = colors.player;
            } else if ((x === endX) && (y === endY)) {
                colorType = colors.goal;
            } else if (map[y][x]) {
                colorType = colors.path;
            }

            ctx.fillStyle = colorType;
            ctx.fillRect(
                x * BLOCK_SIZE,
                y * BLOCK_SIZE,
                BLOCK_SIZE,
                BLOCK_SIZE,
            );
        }
    }

}

const BLOCK_SIZE   = 20,
    MAP_SIZE_X_MIN = 5,
    MAP_SIZE_X_MAX = window.innerWidth / BLOCK_SIZE | 0,
    MAP_SIZE_Y_MIN = 5,
    MAP_SIZE_Y_MAX = window.innerHeight / BLOCK_SIZE | 0,
    MAP_SIZE_X     = random(MAP_SIZE_X_MIN, MAP_SIZE_X_MAX),
    MAP_SIZE_Y     = random(MAP_SIZE_Y_MIN, MAP_SIZE_Y_MAX)
;

const canvas = document.getElementsByTagName('canvas')[0],
    ctx = canvas.getContext('2d'),
    elmLevel = document.getElementById('level')
;

let map = generateMap(MAP_SIZE_X, MAP_SIZE_Y),
    posX = 0,
    posY = 0,
    endX = MAP_SIZE_X - 1,
    endY = 0,
    colors = {
        wall  : '#000',
        path  : '#ccc',
        player: '#f00',
        goal  : '#080',
    },
    levelCounter = 1
;

canvas.width  = MAP_SIZE_X * BLOCK_SIZE;
canvas.height = MAP_SIZE_Y * BLOCK_SIZE;

window.onload = function () {
    window.onkeydown = function (e) {
        switch (e.keyCode) {
            // left
            case 37: // Arrow
            case 100: // Numpad 4
                posX--;
                if (posX < 0) {
                    posX = 0;
                }

                if (map[posY][posX] === 0) {
                    posX++;
                }
                break;
    
            // up
            case 38: // Arrow
            case 104: // Numpad 8
                posY--;
                if (posY < 0) {
                    posY = 0;
                }

                if (map[posY][posX] === 0) {
                    posY++;
                }
                break;
    
            // right
            case 39:
            case 102: // Numpad 6
                posX++;
                if (posX >= MAP_SIZE_X) {
                    posX = MAP_SIZE_X - 1;
                }

                if (map[posY][posX] === 0) {
                    posX--;
                }
                break;
    
            // down
            case 40:
            case 98: // Numpad 5
            case 101: // Numpad 5
                posY++;
                if (posY >= MAP_SIZE_Y) {
                    posY = MAP_SIZE_Y - 1;
                }

                if (map[posY][posX] === 0) {
                    posY--;
                }
                break;
        }

        if ((posX === endX) && (posY === endY)) {
            map = generateMap(MAP_SIZE_X, MAP_SIZE_Y);
            setCoordinates();

            elmLevel.textContent = ++levelCounter;
        }

        render();
    }

    setCoordinates();
    render();
}
