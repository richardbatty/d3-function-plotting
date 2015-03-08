Plotter.components = (function () {
  function createXAxis(x) {
    return d3.svg.axis().scale(x);
  }

  function createYAxis(y) {
    return d3.svg.axis().scale(y).orient("left");
  }

  function createLine(x, y) {
    return d3.svg.line()
        .defined(function(d) { return !isNaN(d.y); })
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });
  }

  return {
    createXAxis: createXAxis,
    createYAxis: createYAxis,
    createLine: createLine
  };
})();


