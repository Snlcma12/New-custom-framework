window.onload = function () {
    let canMove = false;
    let useInterpolation = false;
    const points = [];
    new UI({ addFunction, delFunction, setColor, startIntegral, endIntegral, setIntegral, inputZeros});
    
    const WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20,
    }
    const funcs = [{
        f: (x) => x * x,
        color: '#f0f',
        width: 2,
        a: 1,
        b: 3,
    }
    ];

    const ZOOM_STEP = 0.2;

    document.getElementById('setInterpolation').addEventListener('click', (event) => {
        useInterpolation = event.target.checked
        if (useInterpolation) {
            const div = document.getElementById('interpol');
            const result = document.createElement('span');
            result.setAttribute('id', 'result');
            const delInterpol = document.createElement('button');
            delInterpol.setAttribute('id', 'delInterpol');
            const delOnePoint = document.createElement('button');
            delOnePoint.setAttribute('id','delOnePoint')
            div.appendChild(delInterpol);
            div.appendChild(delOnePoint);
            div.appendChild(result);
            delInterpol.innerHTML = 'Удалить точки';
            delOnePoint.innerHTML = 'Удалить последнюю точку';
            delInterpol.addEventListener('click', () => {
                if (points.length > 0) {
                    points.length = 0;
                    render();
                }

            })

            delOnePoint.addEventListener('click', () => {
                if (points.length > 0) {
                    points.pop();
                    render();
                }
            });
          
        } else {
            const div = document.getElementById('interpol');
            const delInterpol = document.getElementById('delInterpol');
            const delOnePoint = document.getElementById('delOnePoint');
            div.removeChild(delInterpol);
            div.removeChild(delOnePoint);
        }
    });

    const graph = new Graph({
        id: 'canvas',
        width: 750,
        height: 750,
        WIN,
        callbacks: { wheel, mousemove, mousedown, mouseup, mouseleave }
    });

    const getIntegral = (f, a, b) => {
        const dx = (b - a) / 1000;
        let x = a;
        let s = 0;
        while (x <= b) {
            s += (Math.abs(f(x)) + Math.abs(f(x + dx))) / 2 * dx;
            x += dx;
        }
        return s;
    }


    function startIntegral(a, num) {
        funcs[num].a = a;
        render();
    }

    function endIntegral(b, num) {
        funcs[num].b = b;
        render();
    }
    function setIntegral(integral, num) {
        funcs[num].integral = integral;
        render();
    }
    
    function setColor(color, num) {
        funcs[num].color = color;
        render();
    }

    function inputZeros(zeros,num) {
        funcs[num].zeros = zeros;
        render();
    }

    function addFunction(f, num) {
        if (!funcs[num]) {
            funcs[num] = {
                f,
                color: '#f23',
                width: 3,
                a: 1,
                b:3,
                
            };
        } else {
            funcs[num].f = f;
        }
        render();
    }

    function delFunction(num) {
        funcs[num] = null;
        render();
    }

    function wheel(event) {
        var delta = (event.wheelDelta > 0) ? ZOOM_STEP : ZOOM_STEP
        if (WIN.WIDTH + delta > 0) {
            render();
            WIN.WIDTH += delta;
            WIN.HEIGHT += delta;
            WIN.LEFT -= delta / 2;
            WIN.BOTTOM -= delta / 2;
        }
    }
    function mouseup() {
        canMove = false;
    }

    function mouseleave() {
        canMove = false;
    }

    function mousedown(event) {
        if (useInterpolation) {
            const canvasRect = canvas.getBoundingClientRect();
            const realX = graph.sx(event.clientX - canvasRect.left)+WIN.LEFT;
            const realY = graph.sy(event.clientY - canvasRect.top)-WIN.BOTTOM;
            points.push({ x: realX, y: realY });        
            render();
            return;
        }
        canMove = true;
    }

    function mousemove(event) {
        if (canMove) {
            WIN.LEFT -= graph.sx(event.movementX);
            WIN.BOTTOM -= graph.sy(event.movementY);
            render();
        }
    }

    function coordOs() {
        for (let i = 0; i < WIN.LEFT + WIN.WIDTH; i++) {
            graph.line(i, WIN.BOTTOM, i, WIN.BOTTOM + WIN.WIDTH, 'gray');
        }
        for (let i = 0; i < WIN.HEIGHT + WIN.BOTTOM; i++) {
            graph.line(WIN.LEFT, i, WIN.LEFT + WIN.WIDTH, i, 'gray');
        }
        for (let i = 0; i > WIN.LEFT; i--) {
            graph.line(i, WIN.BOTTOM, i, WIN.BOTTOM + WIN.HEIGHT, 'gray');
        }
        for (let i = 0; i > WIN.BOTTOM; i--) {
            graph.line(WIN.LEFT, i, WIN.LEFT + WIN.WIDTH, i, 'gray');
        }

        graph.line(WIN.LEFT, 0, WIN.LEFT + WIN.WIDTH, 0, 'black');
        graph.line(0, WIN.BOTTOM, 0, WIN.HEIGHT + WIN.BOTTOM, 'black');
    }
    
    function getZero(f, a, b, eps = 0.0001) {
        if (f(a) * f(b) > 0) return null;
        
        if (f(a) === 0) return a;
        
        if (f(b) === 0) return b;
        
        if (Math.abs(f(a) - f(b)) <= eps)
            return (a + b) / 2;
        
        const half = (a + b) / 2;
        
        if (f(a) * f(half) <= 0)
            return getZero(f, a, half, eps);
        
        if (f(half) * f(b) <= 0)
            return getZero(f, half, b, eps);
    }
    function getZeros(f, n = 50) {
        
        const segments = [];
        const dx = WIN.WIDTH/n;
        let a = WIN.LEFT;
        let b = WIN.LEFT
        while (b <= WIN.WIDTH + WIN.LEFT) {
            b += dx;
            if (f(a) * f(b) < 0) {
                if (Math.abs(f(a)) + Math.abs(f(b)) < 1) {
                    segments.push({ a, b });
                } else {
                    a = b;
                }
            }
        }
        return segments.map(segment => ({ a: segment.a, b: segment.b }));
        
    }
    
    function printIntegral(f, a, b) {
        if (a != b) {
            const dx = (b - a) / 100;
            let x = a;
            const points = [{x,y:0}];
            while (x <= b) {
                points.push({ x, y: f(x) });
                x += dx;
            }
            points.push({ x: b, y: 0 });
            graph.polygon(points);
        }
    }
    
    function printFunction(f,color = newColor, width, n = 200){
        let x = WIN.LEFT
        const dx = WIN.WIDTH / n;
        while(x <= WIN.WIDTH+WIN.LEFT){
            graph.line(x, f(x), x+dx, f(x+dx),color,width);
            x += dx;
            if (f(x) * f(x + dx) <= 0) {
                graph.point(getZero(f, x, x + dx, 0.001), 0, 'green', 3);
            }
        }
    }

    function render() {
        graph.clear('#efe');
        coordOs();
        points.forEach(point => {
            graph.point(point.x, point.y, 'blue', 3); // Рисуем каждую точку синим цветом и размером 5
        });

        if (points.length >= 2) {
            for (i = 1; i < points.length; i++) {
                graph.line(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y)
            }
        }

        funcs.forEach(func => {
            if (func) {
                if (func.integral) {
                    printIntegral(func.f, func.a, func.b);
                }
                printFunction(func.f, func.color, func.width);
            }
        });
    }

    render();
}