Surfaces.prototype.Elipsoid = (scale = 6, segments = 34, radiusX = 1, radiusY = 2, radiusZ = 3) => {
    const points = [];
    const edges = [];
    const polygons = [];
  
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI;
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI * 2;
        const x = radiusX * Math.sin(theta) * Math.cos(phi);
        const y = radiusY * Math.sin(theta) * Math.sin(phi);
        const z = radiusZ * Math.cos(theta);
        points.push(new Point(x * scale, y * scale, z * scale));
      }
    }
  
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const p1 = i * (segments + 1) + j;
        const p2 = p1 + 1;
        const p3 = (i + 1) * (segments + 1) + j;
        const p4 = p3 + 1;
        edges.push(new Edge(p1, p2));
        edges.push(new Edge(p1, p3));
        polygons.push(new Polygon([p2, p1, p3, p4]));
        if (j === segments - 1) {
          edges.push(new Edge(p2, p4));
        }
        if (i === segments - 1) {
          edges.push(new Edge(p3, p4));
        }
      }
    }
  
    return new Surface(points, edges, polygons);
  };
  