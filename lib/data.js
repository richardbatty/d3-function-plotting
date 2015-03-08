Plotter.data = (function () {
  function isInfinite(n) {
    return (n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY);
  }

  function isValidNumber(n) {
    return !isInfinite(n) && !isNaN(n);
  }

  function createXYData(fun, ggg, sampleSize) {
    var noOfPoints = d3.range(0, 2 * Math.PI, ((2 * Math.PI)/sampleSize));
    var mathlist = noOfPoints.map(function(d) {
        var r = fun(d);
        return [r * Math.cos(d), r * Math.sin(d)]
      });

    return mathlist.map(function(d) {
      var x = d[0];
      var y = d[1];
      return {
        x: isValidNumber(x) ? x : undefined,
        y: isValidNumber(y) ? y : undefined
      };
    })

  }

  function createData(fun, xSpan, sampleSize) {
    var scaleInputs = d3.scale.linear().domain([0, sampleSize]).range(xSpan);
    return d3.range(sampleSize).map(function(d) {
        var y = fun(scaleInputs(d));

        return {
          x: scaleInputs(d),
          y: isValidNumber(y) ? y : undefined
        };
      });
  }

  return {
    createXYData: createXYData,
    createData: createData
  };
})();


