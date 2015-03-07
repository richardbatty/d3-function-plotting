Plotter.data = (function () {
  function isInfinite(n) {
    return (n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY);
  }

  function isValidNumber(n) {
    return !isInfinite(n) && !isNaN(n);
  }

  function createData(fun, xRange, sampleSize) {
    var scaleInputs = d3.scale.linear().domain([0, sampleSize]).range(xRange);
    return d3.range(sampleSize).map(function(d) {
        var y = fun(scaleInputs(d));

        return {
          x: scaleInputs(d),
          y: isValidNumber(y) ? y : undefined
        };
      });
  }

  return {
    createData: createData
  };
})();


