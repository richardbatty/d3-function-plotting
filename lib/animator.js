Plotter.animator = function() {
  function makeCounter(start, step) {
    var current = start || 0,
        step = step || 1;

    return function() {
      current = current + step;
      return current;
    }
  };

  function increment(start, stop, step, timeInterval, callback) {
    var counter = makeCounter(start, step);

    var intervalId = setInterval(function() {
      count = counter();
      callback(count);
      if (count >= stop) {
        clearInterval(intervalId);
      }
    }, timeInterval);
  };


  return {
    increment: increment
  }
}();

