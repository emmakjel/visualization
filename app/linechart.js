const margin = { top: 20, right: 30, bottom: 40, left: 90 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

function init() {
  createLineChart("#vi1", "lightblue", "pink");
  d3.select("#fifty").on("click", () => {
    updateLineChart(1950, 1960);
  });
  d3.select("#sixty").on("click", () => {
    updateLineChart(1960, 1970);
  });
  d3.select("#seventy").on("click", () => {
    updateLineChart(1970, 1980);
  });
  d3.select("#eighty").on("click", () => {
    updateLineChart(1980, 1990);
  });
  d3.select("#ninety").on("click", () => {
    updateLineChart(1990, 2000);
  });
  d3.select("#nullnull").on("click", () => {
    updateLineChart(2000, 2010);
  });
  d3.select("#ten").on("click", () => {
    updateLineChart(2010, 2020);
  });
  d3.select("#reset").on("click", () => {
    updateLineChart(1950, 2020);
  });
}

function selectLine() {
  d3.selectAll('.line').classed('selected', false);
  d3.select(this)
    .classed('selected', true);
}

function createLineChart(id, color1, color2) {
  const svg = d3
    .select(id)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "gLineChart")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
      .domain([0, d3.max(data, function(d) { return d.Popularity; })])
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
    svg.select("#gXAxis").call(d3.axisBottom(x).ticks(5).tickFormat((x) => x * 1));

    const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.Popularity; })])
    .range([height, 0]);
    svg
    .select("gYAxis")
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
      .duration(1000)
      .attr("d", d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Popularity); }));

    svg
      .select("#acousticness")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .transition()
      .duration(1000)
      .attr("d", d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Acousticness); }));

    svg
      .select("#valance")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .transition()
      .duration(1000)
      .attr("d", d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Valence); }));

    svg
      .select("#danceability")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .transition()
      .duration(1000)
      .attr("d", d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Danceability); }));

    svg
      .select("speechiness")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .transition()
      .duration(1000)
      .attr("d", d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Speechiness); }));
});
}