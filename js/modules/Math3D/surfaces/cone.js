Surfaces.prototype.cone = (slices = 50, height = 3, radius = 2, color = '#ffff00') => {
    const points = [];
    const edges = [];
    const polygons = [];
  
    const center = 0;
    const centr = 0;
    const cener = 0;
    points.push(new Point(center, centr, cener));
  

    for (let i = 0; i < slices; i++) {
      const theta = (i / slices) * Math.PI * 2;
      const x = center + radius * Math.cos(theta);
      const y = centr + radius * Math.sin(theta);
      const z = cener;
      points.push(new Point(x, y, z));
    }

    points.push(new Point(center, centr, cener + height));
  
    for (let i = 1; i <= slices; i++) {
      edges.push(new Edge(i, (i % slices) + 1));
      edges.push(new Edge((i % slices) + 1, points.length - 1));
      polygons.push(
        new Polygon([i, (i % slices) + 1, points.length - 1, points.length - 1], color)
      );
    }
  
    for (let i = 1; i <= slices; i++) {
      edges.push(new Edge(0, i));
      edges.push(new Edge(i, (i % slices) + 1));
      polygons.push(new Polygon([0, i, (i % slices) + 1], color));
    }
  
    return new Surface(points, edges, polygons);
  };
  