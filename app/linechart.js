function init() {
  createLineChart("#vi1");
}

function createLineChart(id) {
  var margin = { top: 10, right: 30, bottom: 70, left: 40 },
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var svg = d3
    .select(id)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("processed-Spotify-2000.csv").then(function (data) {
    var sumstat = d3.map(data, (d) => parseFloat(d.popularity));
    // Add X axis --> it is a date format
  var x = d3.scaleLinear()
  .domain(d3.extent(data, function(d) { return d.year; }))
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).ticks(5));

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 150])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y));

var res = sumstat.map(function(d){ return d.key }) // list of group names
var color = d3.scaleOrdinal()
  .domain(res)
  .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

  svg.selectAll(".line")
  .data(sumstat)
  .enter()
  .append("path")
    .attr("fill", "none")
    .attr("stroke", function(d){ return color(d.key) })
    .attr("stroke-width", 1.5)
      // FEILMELDING linje 47
    .attr("d", function(d){
      return d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.popularity); })
        (d.values)
    })
})
   
}





  