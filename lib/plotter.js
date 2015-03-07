var Plotter = (function () {
  function createData(fun, xRange, sampleSize) {
    var scaleInputs = d3.scale.linear().domain([0, sampleSize]).range(xRange);
    return d3.range(sampleSize).map(function(d) {
        return {
          x: scaleInputs(d),
          y: fun(scaleInputs(d))
        };
      });
  }

  function createSvg(element, dimensions) {
    return element
        .append("svg")
        .attr("width",
          dimensions.width + dimensions.margins.left + dimensions.margins.right)
        .attr("height",
          dimensions.height + dimensions.margins.top + dimensions.margins.bottom)
        .append("g")
        .attr("transform",
          "translate(" + dimensions.margins.left + "," + dimensions.margins.top + ")");
  }

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

  function attachXAxis(graph, height, xAxis) {
    return graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
  }

  function attachYAxis(graph, width, yAxis) {
    return graph.append("g")
          .attr("class", "y axis")
          .call(yAxis);
  }

  function xy(fun, dimensions) {
    return function chart() {
      xSpan = [0, 20];
      var data = createData(fun, xSpan, 700);

      var graph = createSvg(this, dimensions);

      var x = d3.scale.linear().domain(xSpan).range([0, dimensions.width]);
      var y = d3.scale.linear()
          .domain(d3.extent(data.map(function(d){
            return d.y;
          })))
          .range([dimensions.height, 0]);

      var line = createLine(x, y);

      var xAxis = createXAxis(x);
      var yAxis = createYAxis(y);

      attachXAxis(graph, dimensions.height, xAxis);
      attachYAxis(graph, dimensions.width, yAxis);

      graph.append("path").attr("d", line(data));
    };
  }

  return {
    xy: xy
  };
})();


