Surfaces.prototype.EllipticalCylinder = (radiusX = 20, radiusY= 20, height= 100, slices=20, stacks= 30) => {
    const points = [];
    const edges = [];
    const polygons = [];

    // Generate vertices
    for (let i = 0; i <= stacks; i++) {
        const stackHeight = height / stacks * i;
        for (let j = 0; j <= slices; j++) {
            const sliceAngle = (2 * Math.PI / slices) * j;
            const x = radiusX * Math.cos(sliceAngle);
            const y = radiusY * Math.sin(sliceAngle);
            points.push(new Point(x, y, stackHeight));
        }
    }

    // Generate edges
    for (let i = 0; i < stacks; i++) {
        for (let j = 0; j < slices; j++) {
            const currentPoint = i * (slices + 1) + j;
            const nextPoint = currentPoint + (slices + 1);

            edges.push(new Edge(currentPoint, nextPoint));
            edges.push(new Edge(currentPoint + 1, nextPoint + 1));
            edges.push(new Edge(currentPoint, nextPoint + 1));
            edges.push(new Edge(currentPoint + 1, nextPoint));
        }
    }

    // Generate polygons
    for (let i = 0; i < stacks; i++) {
        for (let j = 0; j < slices; j++) {
            const base = i * (slices + 1) + j;
            const top = base + (slices + 1);

            polygons.push(new Polygon([
                base, base + 1, top + 1, top
            ]));
        }
    }



    return new Surface(points, edges, polygons);
};