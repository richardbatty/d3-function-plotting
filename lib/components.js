Plotter.components = (function () {
  function scale(xSpan, ySpan, rangeMax) {
    return {
      x: d3.scale.linear().domain(xSpan).range([0, rangeMax]),
      y: d3.scale.linear().domain(ySpan).range([0, rangeMax])
    };
  }

  function createScales(data, dimensions, defaultSpan, xSpan, ySpan) {
    var span,
        rangeMax = d3.min([dimensions.width, dimensions.height]),
        scales;

    if (xSpan && ySpan) {
      scales = scale(xSpan, ySpan, rangeMax);
    } else if (xSpan || ySpan) {
      span = xSpan || ySpan;
      scales = scale(span, span.slice().reverse(), rangeMax);
    } else {
      xSpan = d3.extent(data.map(function(d){
          return d.x;
        }));
      ySpan = d3.extent(data.map(function(d){
          return d.y;
        }));

      span = d3.extent(xSpan.concat(ySpan));

      if (span[0] < defaultSpan[0] || span[1] > defaultSpan[1]) {
        span = defaultSpan;
      }

      scales = scale(span, span.slice().reverse(), rangeMax);
    }
    return scales;
  }

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
    createScales: createScales,
    createXAxis: createXAxis,
    createYAxis: createYAxis,
    createLine: createLine
  };
})();


