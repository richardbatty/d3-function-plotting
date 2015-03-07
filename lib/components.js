Plotter.components = (function () {
  function createXAxis(x) {
    return d3.svg.axis().scale(x);
  }

  function createYAxis(y) {
    return d3.svg.axis().scale(y).orient("left").tickFormat(d3.format('s'));
  }

  function createLine(x, y) {
    return d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });
  }

  return {
    createXAxis: createXAxis,
    createYAxis: createYAxis,
    createLine: createLine
  };
})();


