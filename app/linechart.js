import {lineBarHover, stopLineBarHover, selectLineBar} from "./barchart.js"

const margin = { top: 20, right: 30, bottom: 40, left: 90 };
const width = 1200 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;
const tooltip = { width: 100, height: 100, x: 10, y: -30 };

const bisectYear = () => d3.bisector(function(d) { return d.Year });


export function hoverLine() {
  lineBarHover((d3.select(this).attr("id").toUpperCase()));
  if (!d3.select(this).classed('hover') && !d3.select(this).classed('selected')) {
    d3.select(this).classed('hover', true);
  }
}

function stopHoverLine() {
  stopLineBarHover((d3.select(this).attr("id").toUpperCase()));
  if (d3.select(this).classed('hover')) {
    d3.select(this).classed('hover', false);
  }
}

export function barLineHover(id) {
  d3.select("#"+id.toLowerCase()).classed('hover', true);
}

export function stopBarLineHover(id) {
  d3.select("#"+id.toLowerCase()).classed('hover', false);
}

export function selectBarLine(id) {
  d3.select("#"+id).classed('selected', true);
}

export function selectLine() {
  selectLineBar(d3.select(this).attr("id"));
  if(d3.select(this).classed('selected')) {
    d3.selectAll('.line').classed('selected', false);
  } else {
    d3.selectAll('.line').classed('selected', false);
    d3.select(this)
      .classed('selected', true);
  }
}

export function selectRect() {
    if(d3.select(this).classed('selected')) {
      d3.select(this).classed('selected', false);
    } else {
      d3.select(this)
        .classed('selected', true);
    }
}

export function createLineChart(id) {
  const lineChartWidth = width + margin.left + margin.right;
  const lineChartHeight = height + margin.top + margin.bottom;
  const svg = d3
    .select(id)
    .attr("width", lineChartWidth)
    .attr("height", lineChartHeight)
    .append("g")
    .attr("id", "gLineChart")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const rectX = lineChartWidth/17;
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "fiftys")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", lineChartWidth/17)
    .attr("height", lineChartHeight);
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "sixtys")
    .attr("x", rectX)
    .attr("y", 0)
    .attr("width", lineChartWidth/7)
    .attr("height", lineChartHeight);
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "seventys")
    .attr("x", rectX+lineChartWidth/7)
    .attr("y", 0)
    .attr("width", lineChartWidth/7)
    .attr("height", lineChartHeight);
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "eightys")
    .attr("x", rectX+(lineChartWidth/7)*2)
    .attr("y", 0)
    .attr("width", lineChartWidth/7)
    .attr("height", lineChartHeight);
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "ninetys")
    .attr("x", rectX+3*lineChartWidth/7)
    .attr("y", 0)
    .attr("width", lineChartWidth/7)
    .attr("height", lineChartHeight);
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "twothousands")
    .attr("x", rectX+4*(lineChartWidth/7))
    .attr("y", 0)
    .attr("width", lineChartWidth/7)
    .attr("height", lineChartHeight);
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "tens")
    .attr("x", rectX+5*lineChartWidth/7)
    .attr("y", 0)
    .attr("width", lineChartWidth/7)
    .attr("height", lineChartHeight);

    d3.csv("processed-Spotify-2000.csv").then(function(data) {
      var popularityLine = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Popularity); });
  
      var acousticnessLine = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Acousticness); });

      var valenceLine = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Valence); });
        
      var danceabilityLine = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Danceability); });

      var speechinessLine = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Speechiness); });
            
      var BPMLine = d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y((d.BPM*100)/206); });

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
            "Speechiness": parseInt(d.Speechiness),
            "BPM": parseInt((d.BPM*100)/206)
          });
          dataMap.set(parseInt(d.Year), attrList);
        } else {
          dataMap.get(parseInt(d.Year)).push({
            "Popularity": parseInt(d.Popularity), 
            "Acousticness": parseInt(d.Acousticness), 
            "Valence": parseInt(d.Valence),
            "Danceability": parseInt(d.Danceability),
            "Speechiness": parseInt(d.Speechiness),
            "BPM": parseInt((d.BPM*100)/206)
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
        let BPMSum = 0;
        let lenSum = 0;
        let elements = 0;
        dataMap.get(y).forEach((obj) => {
          popSum+=obj.Popularity;
          acoSum+=obj.Acousticness;
          valSum+=obj.Valence;
          danSum+=obj.Danceability;
          speSum+=obj.Speechiness;
          BPMSum+=obj.BPM;
          elements ++;
        })
        newMap.set(y, {
          "Popularity": popSum/elements, 
          "Acousticness": acoSum/elements, 
          "Valence": valSum/elements, 
          "Danceability": danSum/elements,
          "Speechiness": speSum/elements,
          "BPM": BPMSum/elements
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
          "Speechiness": newMap.get(y).Speechiness,
          "BPM": newMap.get(y).BPM
        });
      }

      var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

      focus.append("circle")
      .attr("r", 5);
      
      focus.append("rect")
      .attr("class", "tooltip")
      .attr("width", 100)
      .attr("height", 50)
      .attr("x", 10)
      .attr("y", -22)
      .attr("rx", 4)
      .attr("ry", 4);

      focus.append("text")
      .attr("class", "tooltip-attribute")
      .attr("x", 18)
      .attr("y", -2);

      focus.append("text")
      .attr("x", 18)
      .attr("y", 18)
      .text("Likes:");

      focus.append("text")
      .attr("class", "tooltip-values")
      .attr("x", 60)
      .attr("y", 18);

      
      svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseout", function() { focus.style("display", null); })
      .on("mouseover", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

      function mousemove() {
        console.log("MOVE");
      }
    
      // Add the valueline path.
      svg
        .append("path")
        .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
        .attr("class", "line")
        .attr("d", popularityLine)
        .attr("stroke", "lightblue")
        .attr("id", 'popularity')
        .on('click', selectLine)
        .on('mouseover', hoverLine)
        .on('mouseout', stopHoverLine);
    
      svg
        .append("path")
        .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
        .attr("class", "line")
        .attr("d", acousticnessLine)
        .attr("stroke", "pink")
        .attr("id", 'acousticness')
        .on('click', selectLine)
        .on('mouseover', hoverLine)
        .on('mouseout', stopHoverLine);
    
      svg.append("path")
          .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
          .attr("class", "line")
          .attr("d", valenceLine)
          .attr("stroke", "orange")
          .attr("id", 'valence')
          .on('click', selectLine)
          .on('mouseover', hoverLine)
          .on('mouseout', stopHoverLine);

      svg.append("path")
          .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
          .attr("class", "line")
          .attr("d", danceabilityLine)
          .attr("stroke", "lightgreen")
          .attr("id", 'danceability')
          .on('click', selectLine)
          .on('mouseover', hoverLine)
          .on('mouseout', stopHoverLine);

      svg.append("path")
          .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
          .attr("class", "line")
          .attr("d", speechinessLine)
          .attr("stroke", "#CF9FFF")
          .attr("id", 'speechiness')
          .on('click', selectLine)
          .on('mouseover', hoverLine)
          .on('mouseout', stopHoverLine);

      svg.append("path")
          .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
          .attr("class", "line")
          .attr("d", BPMLine)
          .attr("stroke", "#F07470")
          .attr("id", 'bpm')
          .on('click', selectLine)
          .on('mouseover', hoverLine)
          .on('mouseout', stopHoverLine);
  });
}

export function updateLineChart(start, finish) {
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
          "Speechiness": parseInt(d.Speechiness),
          "BPM": parseInt((d.BPM*100)/206)
        });
        dataMap.set(parseInt(d.Year), attrList);
      } else {
        dataMap.get(parseInt(d.Year)).push({
          "Popularity": parseInt(d.Popularity), 
          "Acousticness": parseInt(d.Acousticness), 
          "Valence": parseInt(d.Valence),
          "Danceability": parseInt(d.Danceability),
          "Speechiness": parseInt(d.Speechiness),
          "BPM": parseInt((d.BPM*100)/206)
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
      let BPMSum = 0;
      let lenSum = 0;
      let elements = 0;
      dataMap.get(y).forEach((obj) => {
        popSum+=obj.Popularity;
        acoSum+=obj.Acousticness;
        valSum+=obj.Valence;
        danSum+=obj.Danceability;
        speSum+=obj.Speechiness;
        BPMSum+=obj.BPM;
        elements ++;
      })
      newMap.set(y, {
        "Popularity": popSum/elements, 
        "Acousticness": acoSum/elements, 
        "Valence": valSum/elements, 
        "Danceability": danSum/elements,
        "Speechiness": speSum/elements,
        "BPM": BPMSum/elements
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
        "Speechiness": newMap.get(y).Speechiness,
        "BPM": newMap.get(y).BPM
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
      .select("#valence")
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
      .select("#speechiness")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .transition()
      .duration(1500)
      .attr("d", d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Speechiness); }));
    svg
      .select("#bpm")
      .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
      .transition()
      .duration(1500)
      .attr("d", d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.BPM); }));
});
}