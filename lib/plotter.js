var Plotter = (function () {

  function xy(fun, dimensions) {
    return function chart() {
      xSpan = [0, 20];
      var data = Plotter.data.createData(fun, xSpan, 700);

      var graph = Plotter.attacher.attachSvg(this, dimensions);

      var x = d3.scale.linear().domain(xSpan).range([0, dimensions.width]);
      var y = d3.scale.linear()
          .domain(d3.extent(data.map(function(d){
            return d.y;
          })))
          .range([dimensions.height, 0]);

      var line = Plotter.components.createLine(x, y);

      var xAxis = Plotter.components.createXAxis(x);
      var yAxis = Plotter.components.createYAxis(y);

      Plotter.attacher.attachXAxis(graph, dimensions.height, xAxis);
      Plotter.attacher.attachYAxis(graph, dimensions.width, yAxis);

      graph.append("path").attr("d", line(data));
    };
  }

  return {
    xy: xy
  };
})();


