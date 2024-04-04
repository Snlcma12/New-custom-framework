Surfaces.prototype.sphere = (radius = 10, count = 20) => {
    const points = [];
    const edges = [];
    const polygons = [];

    for (var lat = 0; lat <= count; lat++) {
        var theta = (lat * Math.PI) / count;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var lon = 0; lon <= count; lon++) {
            var phi = (lon * 2 * Math.PI) / count;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;

            points.push(new Point(radius * x, radius * y, radius * z));
        }
    }

    for (var lat = 0; lat < count; lat++) {
        for (var lon = 0; lon < count; lon++) {
            var first = lat * (count + 1) + lon;
            var second = first + count + 1;
            edges.push(new Edge(first, second));
            edges.push(new Edge(first + 1, second));
            edges.push(new Edge(second + 1, first + 1));
        }
    }

    for (let i = 0; i < points.length; i++) {
        if (points[i + 1 + count]) {
            polygons.push(new Polygon([
                i,
                i + 1,
                i + 1 + count,
                i + count
            ], '#00ffee'));
        }
    }
    return new Surface(points, edges, polygons);
};
