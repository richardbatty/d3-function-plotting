var Plotter = (function () {

  function xy() {
    var type = 'cartesian',
        types = {
          'cartesian': Plotter.data.createData,
          'parametric': Plotter.data.createXYData
        },
        dimensions = {
          margins: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 80
          }
        },
      xSpan,
      ySpan,
      polarSpan,
      defaultSpan = [-10, 10],
      fun = function(x) { return x; },
      axisNumbers = true,
      graph,
      line;
      dimensions.width = 500 - dimensions.margins.left - dimensions.margins.right;
      dimensions.height = 300 - dimensions.margins.top - dimensions.margins.bottom;
    
    function chart() {
      var data = types[type](fun, polarSpan || xSpan || ySpan || defaultSpan, 700);

      graph = Plotter.attacher.attachSvg(this, dimensions);

      var scales = Plotter.components.createScales(data, dimensions, defaultSpan, xSpan, ySpan);

      var x = scales.x;
      var y = scales.y;

      line = Plotter.components.createLine(x, y);

      var xAxis = Plotter.components.createXAxis(x);
      var yAxis = Plotter.components.createYAxis(y);

      Plotter.attacher.attachXAxis(graph, y(0), xAxis, axisNumbers);
      Plotter.attacher.attachYAxis(graph, x(0), yAxis, axisNumbers);

      var lineGraph = graph.selectAll('path.line')
          .data([data]);

      lineGraph.enter()
          .append("path")
          .attr("class", "line");

      lineGraph.attr("d", line);
    }

    chart.update = function(fun) {
      var data = types[type](fun, polarSpan || xSpan || ySpan || defaultSpan, 700);

      var lineGraph = graph.selectAll('path.line')
          .data([data]);

      lineGraph.enter()
          .append("path");

      lineGraph.transition().attr("d", line);
    };

    chart.type = function(_) {
      if (!arguments.length) return type;
      type = _;
      return chart;
    };

    chart.dimensions = function(_) {
      if (!arguments.length) return dimensions;
      dimensions = _;
      return chart;
    };

    chart.xSpan = function(_) {
      if (!arguments.length) return xSpan;
      xSpan = _;
      return chart;
    };

    chart.ySpan = function(_) {
      if (!arguments.length) return ySpan;
      ySpan = _;
      return chart;
    };

    chart.polarSpan = function(_) {
      if (!arguments.length) return polarSpan;
      polarSpan = _;
      return chart;
    };

    chart.fun = function(_) {
      if (!arguments.length) return fun;
      fun = _;
      return chart;
    };

    chart.axisNumbers = function(_) {
      if (!arguments.length) return axisNumbers;
      axisNumbers = _;
      return chart;
    };

    return chart;
  }

  return {
    xy: xy
  };
})();


