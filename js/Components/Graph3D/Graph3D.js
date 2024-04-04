window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
})

class Graph3D extends Component {
    constructor(options) {
        super(options);
        this.WIN = {
            LEFT: -5,
            BOTTOM: -5,
            WIDTH: 10,
            HEIGHT: 10,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -40)
        }
        this.graph = new Graph({
            id: "graph3",
            width: 600,
            height: 600,
            WIN: this.WIN,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mousemove: (event) => this.mousemove(event),
                mouseup: (event) => this.mouseup(event),
                mousedown: (event) => this.mousedown(event),

            }
        });
        this.math3D = new Math3D(this.WIN);
        this.surfaces = new Surfaces();
        this.scene = this.SolarSystem();
        this.zoomStep = 1.5;
        this.canMove = false;
        this.color = "#ff2a00";
        this.polygonsOnly = true;
        this.pointOnly = true;
        this.edgesOnly = true;
        this.animationActive = true;
        this.LIGHT = new Light(-30, 30, -40, 1000);
        
        setInterval(() => {
            this.scene.forEach(surface => surface.doAnimation(this.math3D));
        }, 40);

        let FPS = 0;
        let counterFPS = 0;
        let timestamp = Date.now();

        const renderLoop = () => {
            counterFPS++;
            const currentTimestamp = Date.now();
            if (currentTimestamp - timestamp >= 1000) {
                FPS = counterFPS;
                counterFPS = 0;
                timestamp = currentTimestamp;
            }
            this.renderScene(FPS);
            requestAnimationFrame(renderLoop);
        }
        renderLoop();
    }

    SolarSystem() {
        const Earth = this.surfaces.sphere();
        Earth.addAnimation('rotateOy', 0.1);
        const Moon = this.surfaces.cube();
        Moon.addAnimation('rotateOx', 0.2);
        Moon.addAnimation('rotateOx', 0.05);
        return [Earth, Moon];
    }

    addEventListeners() {
        document.getElementById("SelectSurface")
            .addEventListener("change", (event) => {
                this.scene = [(new Surfaces)[event.target.value]()];
            });
        document.querySelectorAll('.surfaceCustom').forEach(input =>
            input.addEventListener("input", (event) => {
                this[event.target.dataset.custom] = event.target.checked;
            })
        );
        document.getElementById("meshColor").addEventListener("input", (event) => {
            this.color = event.target.value;
            this.renderScene();
          });
      
        document.getElementById("animationActive").addEventListener("change", (event) => {
            this.animationActive = event.target.checked;
            if (this.animationActive) {
                
            }
        });
    }

    mouseup() {
        this.canMove = false;
    }

    mousedown() {
        this.canMove = true;
    }

    wheel(event) {
        event.preventDefault();
        const delta = (event.wheelDelta > 0) ? 0.9 : 1.1;
        const matrix = this.math3D.zoom(delta);
        this.scene.forEach(surface => {
            surface.points.forEach(point => this.math3D.transform(matrix, point));
            this.math3D.transform(matrix, surface.center);
        });
    }

    mousemove(event) {
        if (this.canMove) {
            const gradus = Math.PI / 180 / 4;
            const matrix = this.math3D.getTransform(this.math3D.rotateOx((this.dy - event.offsetY) * gradus, this.math3D.rotateOy((this.dx - event.offsetX) * gradus)));
            this.scene.forEach(surface => {
                surface.points.forEach(point => {
                    this.math3D.transform(this.math3D.rotateOx((this.dy - event.offsetY) * gradus), point);
                    this.math3D.transform(this.math3D.rotateOy((this.dx - event.offsetX) * gradus), point);
                });
                this.math3D.transform(matrix, surface.center);
            })
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }

    renderScene(FPS) {
        this.graph.clear();

        const polygons = [];
        this.scene.forEach((surface, index) => {
            this.math3D.calcCenter(surface);
            this.math3D.calcRadius(surface);
            this.math3D.calcDistance(surface, this.WIN.CAMERA, "distance");
            this.math3D.calcDistance(surface, this.LIGHT, "lumen");
            surface.polygons.forEach(polygon => {
                polygon.index = index;
                polygons.push(polygon);
            });
        });

        if (this.pointOnly) {
            this.scene.forEach((surface) =>
                surface.points.forEach((point) => {
                    this.graph.point(
                        this.math3D.xs(point),
                        this.math3D.ys(point),
                    );
                })
            );
        }
        if (this.edgesOnly) {
            this.scene.forEach((surface) =>
                surface.edges.forEach((edge) => {
                    const point1 = surface.points[edge.p1];
                    const point2 = surface.points[edge.p2];
                    this.graph.line(
                        this.math3D.xs(point1),
                        this.math3D.ys(point1),
                        this.math3D.xs(point2),
                        this.math3D.ys(point2),
                        this.color
                    );
                })
            );
        }

        if (this.polygonsOnly) {
            const polygons = [];
            this.scene.forEach((surface, index) => {
                this.math3D.calcDistance(surface, this.WIN.CAMERA, "distance");
                this.math3D.calcDistance(surface, this.LIGHT, "lumen");
                this.math3D.calcVisibility(surface, this.WIN.CAMERA);
                surface.polygons.forEach(polygon => {
                    polygon.index = index;
                    polygons.push(polygon);
                })
            })

            this.math3D.sortByArtistAlgorithm(polygons);
            polygons.forEach(polygon => {
                if (polygon.visibility) {
                    const points = polygon.points.map(index => new Point(
                        this.math3D.xs(this.scene[polygon.index].points[index]),
                        this.math3D.ys(this.scene[polygon.index].points[index])
                    ));
                    let { r, g, b } = polygon.color;
                    const { isShadow, dark } = this.math3D.calcShadow(polygon, this.scene, this.LIGHT);
                    const lumen = this.math3D.calcIllumination(polygon.lumen, this.LIGHT.lumen) * (isShadow ? dark : 1);
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);
                    this.graph.polygon(points, polygon.rgbToHex(r, g, b));
                }
            });
            this.graph.text('FPS:' + FPS, -5, 4, 'red');
            this.graph.point(
                this.math3D.xs(this.LIGHT), 
                this.math3D.ys(this.LIGHT), 'yellow', 2)
        }
    }
}