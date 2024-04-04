class Graph2D extends Component {
    constructor(options) {
        super(options);
            const WIN = {
                LEFT: -10,
                BOTTOM: -10,
                WIDTH: 20,
                HEIGHT: 20,
            };
        
            const ZOOM_STEP = 0.8;
        
            function wheel(event) {
                const delta = (event.wheelDelta > 0) ? - ZOOM_STEP : ZOOM_STEP;
                WIN.WIDTH += delta;
                WIN.HEIGHT += delta;
                WIN.LEFT -= delta / 2;
                WIN.BOTTOM -= delta / 2;
                render();
            }
        
            let canMove = false;
        
            const mouseup = () => {
                canMove = false;
            }
        
            const mouseleave = () => {
                canMove = false;
            }
        
            const mousedown = () => {
                canMove = true;
            }
        
            const mousemove = (event) => {
                if (canMove) {
                    WIN.LEFT -= graph.sx(event.movementX);
                    WIN.BOTTOM -= graph.sy(event.movementY);
                    render();
                }
            }
        
            const graph = new Graph({
                id: "canvas",
                width: 650,
                height: 650,
                WIN,//старый стиль:WIN: WIN 
                callbacks: { wheel, mousemove, mouseleave, mouseup, mousedown },
            });
        
            function printOXY() {
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
        
            const funcs = [];
        
            const ui = new UI({ addFunction, delFunction, setColor, setWidth, printIntegrtal,
            });
            function addFunction(f, num) {
                funcs[num] = {
                    f,
                    color: '#f00',
                    width: 3
                };
                render();
            }
        
            function delFunction(num) {
                funcs[num] = null;
                render();
            }
        
            function setColor(color, num) {
                if (funcs[num]) {
                    funcs[num].color = color;
                    render();
                }
            }
        
            function setWidth(width, num){
                if (funcs[num]) {
                    funcs[num].width = width;
                    render();
                }
            }
        
            function printIntegrtal(f, a, b, num){
                if(a != b && funcs[num]){
                    const dx = (b - a)/1000;
                    let x = a;
                    const points = [{x, y:0}];
                    while (x <= b){
                        points.push({x, y:f(x)});
                        x += dx;
                    }
                    points.push({x:b, y:0});
                    graph.polypon(points);
                    render();
                }
            }
        
        
            /*const getDerivative = (f, x0, dx = 0.0001) = {
                return (f(x0 + dx) - f(x0)) / dx;
            }
            const getAsimptote = (f, x0) =>{
                const k = getDerivative(f, x0);
                const b = f(x0) - k*x0;
                return(x) => k*x + b;
            }*/
        
            const detIntegral = (f, a, b) => {
                if (a != b){
                    const dx = (b - a) / 1000;
                    let x = a;
                    let s = 0;
                    while (x <= b) {
                        s += (Math.abs(f(x)) + Math.abs(f(x + dx))) / 2 * dx;
                        x += dx;
                    }
                    return s;
                }
            }
        
            function getZero(f, a, b, eps = 0.0001) {
                if (f(a) * f(b) > 0) return null;
                if (Math.abs(f(a) - f(b)) <= eps) return (a + b) / 2;
                const half = (a + b) / 2;
                if ((f(a) * f(half)) <= 0) return getZero(f, a, half, eps);
                if ((f(half) * f(b)) <= 0) return getZero(f, half, b, eps);
            }
        
            function printFunction(f, n, color, width) {
                let x = WIN.LEFT;
                let dx = WIN.WIDTH / n;
                while (x <= WIN.WIDTH + WIN.LEFT) {
                    graph.line(x, f(x), x + dx, f(x + dx), color, width);
                    x += dx;
                }
                printOXY();
            }
        
            function render() {
                graph.clear();
                printOXY();
                funcs.forEach(func => func && printFunction(func.f, 100, func.color, func.width));
            }
            render();
        
        }
}