const margin = { top: 20, right: 30, bottom: 40, left: 90 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

function init() {
  createLineChart("#vi1");
}

function createLineChart(id) {
  const svg = d3
  .select(id)
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("id", "gLineChart")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleLinear().range([0, width]);  
var y = d3.scaleLinear().range([height, 0]);

// define the lines
var popularityLine = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Popularity); });

var acousticnessLine = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Acousticness); });

var valanceLine = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Valence); });

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin


// Get the data
d3.csv("processed-Spotify-2000.csv").then(function(data) {

  var dataMap = new Map();
  data.forEach((d) => {
    if (!dataMap.has(parseInt(d.Year))) {
      var attrList = [];
      attrList.push({
        "Popularity": parseInt(d.Popularity), 
        "Acousticness": parseInt(d.Acousticness), 
        "Valence": parseInt(d.Valence)
      });
      dataMap.set(parseInt(d.Year), attrList);
    } else {
      dataMap.get(parseInt(d.Year)).push({
        "Popularity": parseInt(d.Popularity), 
        "Acousticness": parseInt(d.Acousticness), 
        "Valence": parseInt(d.Valence)
      });
    }
  })
  
  var newMap = new Map();
  for (let y of dataMap.keys()) {
    let popSum = 0;
    let acoSum = 0;
    let valSum = 0;
    let elements = 0;
    dataMap.get(y).forEach((obj) => {
      popSum+=obj.Popularity;
      acoSum+=obj.Acousticness;
      valSum+=obj.Valence;
      elements ++;
    })
    newMap.set(y, {"Popularity": popSum/elements, "Acousticness": acoSum/elements, "Valence": valSum/elements})
  }

  const dataList = [];
  for (let y of dataMap.keys()) {
    dataList.push({
      "Year": y, 
      "Popularity": newMap.get(y).Popularity, 
      "Acousticness": newMap.get(y).Acousticness, 
      "Valence": newMap.get(y).Valence
    });
  }

  console.log(dataList);
  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) { return d.Popularity; })]);

  // Add the valueline path.
  svg.append("path")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .attr("class", "line")
      .attr("d", popularityLine)
      .attr("stroke", "lightblue")
      .attr("id", 'popularity'); // assign an ID

  svg.append("path")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .attr("class", "line")
      .attr("d", acousticnessLine)
      .attr("stroke", "pink")
      .attr("id", 'acousticness'); // assign an ID

  svg.append("path")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .attr("class", "line")
      .attr("d", valanceLine)
      .attr("stroke", "orange")
      .attr("id", 'valance'); // assign an ID

  // Add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
      

  // Add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
});

}