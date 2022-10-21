// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time

// set the ranges
var x = d3.scaleLinear().range([0, width]);  
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Popularity); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("processed-Spotify-2000.csv").then(function(data) {

  var dataMap = new Map();
  data.forEach((d) => {
    if (!dataMap.has(parseInt(d.Year))) {
      var attrList = [];
      attrList.push(parseInt(d.Popularity));
      dataMap.set(parseInt(d.Year), attrList);
    } else {
      dataMap.get(parseInt(d.Year)).push(parseInt(d.Popularity));
    }
  })

  var newMap = new Map();
  for (let y of dataMap.keys()) {
    let sum = 0;
    let elements = 0;
    dataMap.get(y).forEach((val) => {
      sum+=val;
      elements ++;
    })
    newMap.set(y, sum/elements)
  }

  const dataList = [];
  for (let y of dataMap.keys()) {
    dataList.push({"Year": y, "Popularity": newMap.get(y)});
  }

  console.log(dataList);
  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) { return d.Popularity; })]);

  // Add the valueline path.
  svg.append("path")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
      

  // Add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});
