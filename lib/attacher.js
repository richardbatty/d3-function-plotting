Plotter.attacher = (function () {
  function attachSvg(element, dimensions) {
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

  function attachXAxis(graph, yEqualsZero, xAxis, axisNumbers) {
    return graph.append("g")
        .attr("class", "x axis")
        .classed("showLabels", axisNumbers)
        .attr("transform", "translate(0," + yEqualsZero + ")")
        .call(xAxis);
  }

  function attachYAxis(graph, xEqualsZero, yAxis, axisNumbers) {
    return graph.append("g")
          .attr("class", "y axis")
          .classed("showLabels", axisNumbers)
          .attr("transform", "translate(" + xEqualsZero + ",0)")
          .call(yAxis);
  }

  return {
    attachSvg: attachSvg,
    attachXAxis: attachXAxis,
    attachYAxis: attachYAxis
  };
})();


