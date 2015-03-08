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
      defaultXSpan = [-20, 20],
      ySpan,
      fun = function(x) { return x; };
      dimensions.width = 500 - dimensions.margins.left - dimensions.margins.right;
      dimensions.height = 300 - dimensions.margins.top - dimensions.margins.bottom;
    
    function chart() {
      var data = types[type](fun, xSpan || defaultXSpan, 700);

      var graph = Plotter.attacher.attachSvg(this, dimensions);
      var x;
      var y;
      var viewportSquareWidth = d3.min([dimensions.width, dimensions.height]);

      if (xSpan && ySpan) {
        x = d3.scale.linear().domain(xSpan).range([0, viewportSquareWidth]);
        y = d3.scale.linear().domain(ySpan.reverse()).range([0, viewportSquareWidth]);
      } else if (xSpan || ySpan) {
        x = d3.scale.linear().domain(xSpan || ySpan).range([0, viewportSquareWidth]);
        y = x;
      } else {
        xSpan = d3.extent(data.map(function(d){
            return d.x;
          }));
        ySpan = d3.extent(data.map(function(d){
            return d.y;
          }));

        var span = d3.extent(xSpan.concat(ySpan));

        if (false) {//(xMax > 100 || yMax > 100) {
          // ?????
        } else {
          x = d3.scale.linear().domain(span).range([0, viewportSquareWidth]);
          y = x;
        }
      }

      var line = Plotter.components.createLine(x, y);

      var xAxis = Plotter.components.createXAxis(x);
      var yAxis = Plotter.components.createYAxis(y);

      Plotter.attacher.attachXAxis(graph, y(0), xAxis);
      Plotter.attacher.attachYAxis(graph, x(0), yAxis);

      graph.append("path").attr("d", line(data));
    }

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

    chart.fun = function(_) {
      if (!arguments.length) return fun;
      fun = _;
      return chart;
    };

    return chart;
  }

  return {
    xy: xy
  };
})();


