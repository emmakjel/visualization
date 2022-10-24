const margin = { top: 20, right: 30, bottom: 40, left: 90 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;
var zoomed = false;

function init() {
  createLineChart("#vi1", "lightblue", "pink");
  d3.select("#fiftys")
  .on("mouseover", selectRect)
  .on("mouseleave", selectRect)
  .on("click", () => {
    if (zoomed) {
      updateLineChart(1950, 2020);
      zoomed = false;
    } else {
      updateLineChart(1950, 1960);
      zoomed = true;
    }
  });
  d3.select("#sixtys")
  .on("mouseover", selectRect)
  .on("mouseleave", selectRect)
  .on("click", () => {
    if (zoomed) {
      updateLineChart(1950, 2020);
      zoomed = false;
    } else {
      updateLineChart(1960, 1970);
      zoomed = true;
    }
  });
  d3.select("#seventys")
  .on("mouseover", selectRect)
  .on("mouseleave", selectRect)
  .on("click", () => {
    if (zoomed) {
      updateLineChart(1950, 2020);
      zoomed = false;
    } else {
      updateLineChart(1970, 1980);
      zoomed = true;
    }
  });
  d3.select("#eightys")
  .on("mouseover", selectRect)
  .on("mouseleave", selectRect)
  .on("click", () => {
    if (zoomed) {
      updateLineChart(1950, 2020);
      zoomed = false;
    } else {
      updateLineChart(1980, 1990);
      zoomed = true;
    }
  });
  d3.select("#ninetys")
  .on("mouseover", selectRect)
  .on("mouseleave", selectRect)
  .on("click", () => {
    if (zoomed) {
      updateLineChart(1950, 2020);
      zoomed = false;
    } else {
      updateLineChart(1990, 2000);
      zoomed = true;
    }
  });
  d3.select("#twothousands")
  .on("mouseover", selectRect)
  .on("mouseleave", selectRect)
  .on("click", () => {
    if (zoomed) {
      updateLineChart(1950, 2020);
      zoomed = false;
    } else {
      updateLineChart(2000, 2010);
      zoomed = true;
    }
  });
  d3.select("#tens")
  .on("mouseover", selectRect)
  .on("mouseleave", selectRect)
  .on("click", () => {
    if (zoomed) {
      updateLineChart(1950, 2020);
      zoomed = false;
    } else {
      updateLineChart(2010, 2020);
      zoomed = true;
    }
  });
}

function selectLine() {
  if(d3.select(this).classed('selected')) {
    d3.selectAll('.line').classed('selected', false);
  } else {
    d3.selectAll('.line').classed('selected', false);
    d3.select(this)
      .classed('selected', true);
  }
}

function selectRect() {
    if(d3.select(this).classed('selected')) {
      d3.select(this).classed('selected', false);
    } else {
      d3.select(this)
        .classed('selected', true);
    }
}

function createLineChart(id, color1, color2) {
  const lineChartWidth = width + margin.left + margin.right;
  const lineChartHeight = height + margin.top + margin.bottom;
  const svg = d3
    .select(id)
    .attr("width", lineChartWidth)
    .attr("height", lineChartHeight)
    .append("g")
    .attr("id", "gLineChart")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const rectX = lineChartWidth/20;
    svg
    .append("rect")
    .attr("class", "rect")
    .attr("id", "fiftys")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", lineChartWidth/20)
    .attr("height", lineChartHeight);
    svg
    .append("rect")
    .attr("class", "rect")
    .attr("id", "sixtys")
    .attr("x", rectX)
    .attr("y", 0)
    .attr("width", lineChartWidth/8)
    .attr("height", lineChartHeight);
    svg
    .append("rect")
    .attr("class", "rect")
    .attr("id", "seventys")
    .attr("x", rectX+lineChartWidth/8)
    .attr("y", 0)
    .attr("width", lineChartWidth/8)
    .attr("height", lineChartHeight);
    svg
    .append("rect")
    .attr("class", "rect")
    .attr("id", "eightys")
    .attr("x", rectX+lineChartWidth/4)
    .attr("y", 0)
    .attr("width", lineChartWidth/8)
    .attr("height", lineChartHeight);
    svg
    .append("rect")
    .attr("class", "rect")
    .attr("id", "ninetys")
    .attr("x", rectX+3*lineChartWidth/8)
    .attr("y", 0)
    .attr("width", lineChartWidth/8)
    .attr("height", lineChartHeight);
    svg
    .append("rect")
    .attr("class", "rect")
    .attr("id", "twothousands")
    .attr("x", rectX+lineChartWidth/2)
    .attr("y", 0)
    .attr("width", lineChartWidth/8)
    .attr("height", lineChartHeight);
    svg
    .append("rect")
    .attr("class", "rect")
    .attr("id", "tens")
    .attr("x", rectX+5*lineChartWidth/8)
    .attr("y", 0)
    .attr("width", lineChartWidth/8)
    .attr("height", lineChartHeight);

    d3.csv("processed-Spotify-2000.csv").then(function(data) {
      var popularityLine = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Popularity); });
      
      var acousticnessLine = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Acousticness); });

      var valanceLine = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Valence); });
        
      var danceabilityLine = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Danceability); });

      var speechinessLine = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Speechiness); });

      const x = d3
      .scaleLinear()
      .domain(d3.extent(data, function(d) { return d.Year; }))
      .range([0, width]);  
      svg
      .append("g")
      .attr("id", "gXAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5).tickFormat((x) => x * 1));

      const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height, 0]);
      svg
      .append("g")
      .attr("id", "gYAxis")
      .call(d3.axisLeft(y));
    
      var dataMap = new Map();
      data.forEach((d) => {
        if (!dataMap.has(parseInt(d.Year))) {
          var attrList = [];
          attrList.push({
            "Popularity": parseInt(d.Popularity), 
            "Acousticness": parseInt(d.Acousticness), 
            "Valence": parseInt(d.Valence),
            "Danceability": parseInt(d.Danceability),
            "Speechiness": parseInt(d.Speechiness)
          });
          dataMap.set(parseInt(d.Year), attrList);
        } else {
          dataMap.get(parseInt(d.Year)).push({
            "Popularity": parseInt(d.Popularity), 
            "Acousticness": parseInt(d.Acousticness), 
            "Valence": parseInt(d.Valence),
            "Danceability": parseInt(d.Danceability),
            "Speechiness": parseInt(d.Speechiness)
          });
        }
      })
      
      var newMap = new Map();
      for (let y of dataMap.keys()) {
        let popSum = 0;
        let acoSum = 0;
        let valSum = 0;
        let danSum = 0;
        let speSum = 0;
        let elements = 0;
        dataMap.get(y).forEach((obj) => {
          popSum+=obj.Popularity;
          acoSum+=obj.Acousticness;
          valSum+=obj.Valence;
          danSum+=obj.Danceability;
          speSum+=obj.Speechiness;
          elements ++;
        })
        newMap.set(y, {
          "Popularity": popSum/elements, 
          "Acousticness": acoSum/elements, 
          "Valence": valSum/elements, 
          "Danceability": danSum/elements,
          "Speechiness": speSum/elements
        })
      }
    
      const dataList = [];
      for (let y of dataMap.keys()) {
        dataList.push({
          "Year": y, 
          "Popularity": newMap.get(y).Popularity, 
          "Acousticness": newMap.get(y).Acousticness, 
          "Valence": newMap.get(y).Valence,
          "Danceability": newMap.get(y).Danceability,
          "Speechiness": newMap.get(y).Speechiness
        });
      }
    
      // Add the valueline path.
      svg
        .append("path")
        .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
        .attr("class", "line")
        .attr("d", popularityLine)
        .attr("stroke", color1)
        .attr("id", 'popularity')
        .on('click', selectLine);
    
      svg
        .append("path")
        .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
        .attr("class", "line")
        .attr("d", acousticnessLine)
        .attr("stroke", color2)
        .attr("id", 'acousticness')
        .on('click', selectLine);
    
      svg.append("path")
          .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
          .attr("class", "line")
          .attr("d", valanceLine)
          .attr("stroke", "orange")
          .attr("id", 'valance')
          .on('click', selectLine);

      svg.append("path")
          .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
          .attr("class", "line")
          .attr("d", danceabilityLine)
          .attr("stroke", "lightgreen")
          .attr("id", 'danceability')
          .on('click', selectLine);

      svg.append("path")
          .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
          .attr("class", "line")
          .attr("d", speechinessLine)
          .attr("stroke", "purple")
          .attr("id", 'speechiness')
          .on('click', selectLine);
  });
}

function updateLineChart(start, finish) {
  d3.csv("processed-Spotify-2000.csv").then(function(data) {
    data = data.filter(function (elem) {
      return start <= parseInt(elem.Year) && parseInt(elem.Year) <= finish;
    });

    const svg = d3.select("#gLineChart");

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, function(d) { return d.Year; }))
      .range([0, width]);  
    svg
      .select("#gXAxis")
      .transition()
      .duration(1500)
      .call(d3.axisBottom(x)
      .ticks(5)
      .tickFormat((x) => x * 1));

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height, 0]);
    svg
      .select("#gYAxis")
      .call(d3.axisLeft(y));
  
    var dataMap = new Map();
    data.forEach((d) => {
      if (!dataMap.has(parseInt(d.Year))) {
        var attrList = [];
        attrList.push({
          "Popularity": parseInt(d.Popularity), 
          "Acousticness": parseInt(d.Acousticness), 
          "Valence": parseInt(d.Valence),
          "Danceability": parseInt(d.Danceability),
          "Speechiness": parseInt(d.Speechiness)
        });
        dataMap.set(parseInt(d.Year), attrList);
      } else {
        dataMap.get(parseInt(d.Year)).push({
          "Popularity": parseInt(d.Popularity), 
          "Acousticness": parseInt(d.Acousticness), 
          "Valence": parseInt(d.Valence),
          "Danceability": parseInt(d.Danceability),
          "Speechiness": parseInt(d.Speechiness)
        });
      }
    })
    
    var newMap = new Map();
    for (let y of dataMap.keys()) {
      let popSum = 0;
      let acoSum = 0;
      let valSum = 0;
      let danSum = 0;
      let speSum = 0;
      let elements = 0;
      dataMap.get(y).forEach((obj) => {
        popSum+=obj.Popularity;
        acoSum+=obj.Acousticness;
        valSum+=obj.Valence;
        danSum+=obj.Danceability;
        speSum+=obj.Speechiness;
        elements ++;
      })
      newMap.set(y, {
        "Popularity": popSum/elements, 
        "Acousticness": acoSum/elements, 
        "Valence": valSum/elements, 
        "Danceability": danSum/elements,
        "Speechiness": speSum/elements
      })
    }
  
    const dataList = [];
    for (let y of dataMap.keys()) {
      dataList.push({
        "Year": y, 
        "Popularity": newMap.get(y).Popularity, 
        "Acousticness": newMap.get(y).Acousticness, 
        "Valence": newMap.get(y).Valence,
        "Danceability": newMap.get(y).Danceability,
        "Speechiness": newMap.get(y).Speechiness
      });
    }
  
    // Update the valueline path.
    svg
      .select("#popularity")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .transition()
      .duration(1500)
      .attr("d", d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Popularity); }));

    svg
      .select("#acousticness")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .transition()
      .duration(1500)
      .attr("d", d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Acousticness); }));

    svg
      .select("#valance")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .transition()
      .duration(1500)
      .attr("d", d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Valence); }));

    svg
      .select("#danceability")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .transition()
      .duration(1500)
      .attr("d", d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Danceability); }));

    svg
      .select("speechiness")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .transition()
      .duration(1500)
      .attr("d", d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Speechiness); }));
});
}