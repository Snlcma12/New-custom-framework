Surfaces.prototype.MobiusStrip = (scale = 1, radius = 2) => {
  const points = [];
  const edges = [];
  const polygons = [];

  const delta = Math.PI / 30;
  const numDelta = Math.floor((2 * Math.PI) / delta);

  for (let u = 0; u < 2 * Math.PI; u += delta) {
    for (let v = 0; v < 2 * Math.PI; v += delta) {
        const x = (radius + Math.cos(0.5 * u) * Math.sin(v) - Math.sin(0.5 * u) * Math.sin(2 * v)) * Math.cos(u);
        const y = (radius + Math.cos(0.5 * u) * Math.sin(v) - Math.sin(0.5 * u) * Math.sin(2 * v)) * Math.sin(u);
        const z = Math.sin(0.5 * u) * Math.sin(v) + Math.cos(0.5 * u) * Math.sin(2 * v);
        points.push(new Point(x * scale, y * scale, z * scale));
    }
}

  for (let i = 0; i < points.length; i++) {
    if (i % numDelta !== 0) {
      edges.push(new Edge(i, i + 1));
    }
    if (i + numDelta < points.length) {
      edges.push(new Edge(i, i + numDelta));
      polygons.push(new Polygon([i, i + 1, i + numDelta, i + numDelta - 1]));
    }
  }

  return new Surface(points, edges, polygons);
}
