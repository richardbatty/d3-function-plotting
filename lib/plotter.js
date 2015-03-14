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
      funcs = [function(x) { return x; }],
      axisNumbers = true,
      graph,
      id,
      line,
      lines_data;
      dimensions.width = 200 - dimensions.margins.left - dimensions.margins.right;
      dimensions.height = 200 - dimensions.margins.top - dimensions.margins.bottom;

    function chart() {
      lines_data = funcs.map(function(func) {
        return {
          data: types[type](func, polarSpan || xSpan || ySpan || defaultSpan, 700),
          name: func.name
        };
      });

      graph = Plotter.attacher.attachSvg(this, dimensions);

      var scales = Plotter.components.createScales(lines_data[0].data, dimensions, defaultSpan, xSpan, ySpan);

      var x = scales.x;
      var y = scales.y;

      line = Plotter.components.createLine(x, y);

      var xAxis = Plotter.components.createXAxis(x);
      var yAxis = Plotter.components.createYAxis(y);

      Plotter.attacher.attachXAxis(graph, y(0), xAxis, axisNumbers);
      Plotter.attacher.attachYAxis(graph, x(0), yAxis, axisNumbers);

      lines_data.forEach(function(line_data) {
        chart.addLine(line_data.data, line_data.name);
      });
    }

    chart.addLine = function(data, name) {
      var lineGraph = graph.selectAll('path#' + name)
          .data([data]);

      lineGraph.enter()
          .append("path")
          .attr("id", name);

      lineGraph.attr("d", line);
    };

    chart.update = function(func) {
      var data = types[type](func, polarSpan || xSpan || ySpan || defaultSpan, 700);

      var lineGraph = graph.selectAll('path#' + func.name)
          .data([data]);

      lineGraph.enter()
          .append("path")
          .attr('id', func.name);

      lineGraph.transition().duration(10).attr("d", line);
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

    chart.funcs = function(_) {
      if (!arguments.length) return funcs;
      funcs = (_ instanceof Array) ? _ : [_];
      return chart;
    };

    chart.axisNumbers = function(_) {
      if (!arguments.length) return axisNumbers;
      axisNumbers = _;
      return chart;
    };

    chart.id = function(_) {
      if (!arguments.length) return id;
      id = _;
      return chart;
    };

    return chart;
  }

  return {
    xy: xy
  };
})();


