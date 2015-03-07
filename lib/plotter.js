var m = [20, 20, 20, 80];
var width = 500 - m[1] - m[3];
var height = 300 - m[0] - m[2];

var xmin = 0;
var xmax = 20;
var sample = 700;
    
function fun(x){
  return Math.pow(x, 2);
}

var scaleInputs = d3.scale.linear().domain([0, sample]).range([xmin, xmax]);
var data = d3.range(sample).map(function(d) {
    return {
      x: scaleInputs(d),
      y: fun(scaleInputs(d))
    };
  });

var x = d3.scale.linear().domain([xmin, xmax]).range([0, width]);
var y = d3.scale.linear()
    .domain(d3.extent(data.map(function(d){
      return d.y;
    })))
    .range([height, 0]);

var line = d3.svg.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

var graph = d3.select("#graph")
    .append("svg")
    .attr("width", width + m[1] + m[3])
    .attr("height", height + m[0] + m[2])
    .append("g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

var xAxis = d3.svg.axis().scale(x);

graph.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

var yAxisLeft = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format('s'));

graph.append("g")
    .attr("class", "y axis")
    .call(yAxisLeft);

graph.append("path").attr("d", line(data));
