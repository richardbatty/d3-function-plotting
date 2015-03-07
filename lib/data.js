Plotter.data = (function () {
  function createData(fun, xRange, sampleSize) {
    var scaleInputs = d3.scale.linear().domain([0, sampleSize]).range(xRange);
    return d3.range(sampleSize).map(function(d) {
        return {
          x: scaleInputs(d),
          y: fun(scaleInputs(d))
        };
      });
  }

  return {
    createData: createData
  };
})();


