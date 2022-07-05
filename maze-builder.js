function generateMap(w = 10, h = 10) {
    w /= 2 | 0;
    h /= 2 | 0;

    let ret = [],
        route = [],
        x = w / 2 | 0,
        y = h / 2 | 0,
        rand = randomGen(Math.random() * 100000 | 0)
    ;

    for (let i = 0; i < h * 2; i++) {
        ret[i] = [];

        for (let j = 0; j < w * 2; j++) {
            ret[i][j] = 0;
        }
    }

    ret[y * 2][x * 2] = 1;
    route = [
        [ x, y ]
    ];

    function loop() {
        let alternatives = [],
            directions = [
                [  1,  0 ], // Right.
                [ -1,  0 ], // Left.
                [  0,  1 ], // Down.
                [  0, -1 ], // Up.
            ],
            direction = 0,
            directionX = 0,
            directionY = 0
        ;

        x = route[route.length - 1][0] | 0;
        y = route[route.length - 1][1] | 0;
    
        for (let i = 0; i < directions.length; i++) {
            if (ret[(directions[i][1] + y) * 2] != undefined &&
                ret[(directions[i][1] + y) * 2][(directions[i][0] + x) * 2] === 0) {
                alternatives.push(directions[i])
            }
        }
    
        if (alternatives.length === 0) {
            route.pop();
            if (route.length > 0) {
                loop();
            }
            return;
        }
    
        direction = alternatives[rand() * alternatives.length | 0];

        directionX = direction[0] + x;
        directionY = direction[1] + y;

        route.push([ directionX, directionY ]);

        ret[directionY * 2][directionX * 2] = 1;
        ret[direction[1] + (y * 2)][direction[0] + (x * 2)] = 1;
        
        loop();
    }
    loop();

    return ret;
}
