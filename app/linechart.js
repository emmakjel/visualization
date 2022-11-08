import {lineBarHover, stopLineBarHover, selectLineBar, twoIsSelected, updateBarChartComparison} from "./barchart.js"
import { outsideHoverButton, outsideStopHoverButton, setSelectedByBar, resetMatrix } from "./rooftop.js";
import {zoomed} from "./script.js"

const margin = { top: 20, right: 30, bottom: 40, left: 90 };
const width = 900 - margin.left - margin.right;
const height = 200 - margin.top - margin.bottom;

var xAxis;
var yAxis;


export function hoverLine() {
  showToolTip(d3.select(this))
  lineBarHover((d3.select(this).attr("id").toUpperCase()));
  outsideHoverButton(d3.select(this).attr("id"));
  if (!d3.select(this).classed('hover') && !d3.select(this).classed('selected')) {
    d3.select(this).classed('hover', true);
  }
}

function stopHoverLine() {
  hideToolTip(d3.select(this));
  stopLineBarHover((d3.select(this).attr("id").toUpperCase()));
  outsideStopHoverButton(d3.select(this).attr("id"));
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
  if (id == null) {
    d3.selectAll(".line").classed("selected", false);
  } else {
    if (!twoIsSelected) {
      d3.selectAll(".line").classed("selected", false);
    }
    d3.select("#"+id).classed('selected', true);
  }
}

export function selectMatrixLine(id) {
  if (id == null) {
    d3.selectAll(".line").classed("selected", false);
  } else {
    if (twoIsSelected) {
      d3.selectAll(".line").classed("selected", false);
    }
    d3.select("#"+id).classed('selected', true);
  }
}

export function selectLineMatrix(id) {
  if (id == null) {
      resetMatrix();
  } else {
    setSelectedByBar(true);
    var e = document.createEvent('UIEvents');
     e.initUIEvent('click', true, true, /* ... */);
     if (id == "BPM") {
      d3.select("#arrow1").node().dispatchEvent(e);
    } else if (id == "DANCEABILITY") {
      d3.select("#arrow2").node().dispatchEvent(e);
    } else if (id == "VALENCE") {
      d3.select("#arrow3").node().dispatchEvent(e);
    } else if (id == "ACOUSTICNESS") {
      d3.select("#arrow4").node().dispatchEvent(e);
    } else if (id == "SPEECHINESS") {
      d3.select("#arrow5").node().dispatchEvent(e);
    } else if (id == "POPULARITY") {
      d3.select("#arrow6").node().dispatchEvent(e);
    }
}
}

export function selectLine() {
  selectLineBar(d3.select(this).attr("id"));
  selectLineMatrix(d3.select(this).attr("id").toUpperCase());
  if(d3.select(this).classed('selected')) {
    d3.selectAll('.line').classed('selected', false);
    updateBarChartComparison(null);
    resetMatrix();
  } else {
    if (!twoIsSelected) {
      d3.selectAll(".line").classed("selected", false);
    }
    d3.select(this)
      .classed('selected', true);
  }
}


export function selectRect() {
  d3.selectAll("rect").classed("selected", false);
  if (!zoomed) { 
    if(d3.select(this).classed('selected')) {
    d3.select(this).classed('selected', false);
  } else {
    d3.select(this)
      .classed('selected', true);
  }} else {
    d3.selectAll("rect").classed("selected", false);
  }
}

function unSelectRect() {
  d3.selectAll("rect").classed("selected", false);
}

function showToolTip(line) {
  var x0 = d3.pointer(event, this)[0];
  var y0 = d3.pointer(event, this)[1];
  d3.select("#featuretext").text(line.attr("id"));
  d3.select("#valuetext").text(yAxis.invert(y0));
  d3.select("#yeartext").text(xAxis.invert(x0));
}

function updateToolTip() {
  var x0 = d3.pointer(event, this)[0];
  var y0 = d3.pointer(event, this)[1];
  d3.select("#valuetext").text(Math.round(yAxis.invert(y0)));
  d3.select("#yeartext").text(Math.round(xAxis.invert(x0)));
}

function hideToolTip() {
  d3.select("#featuretext").text("");
  d3.select("#valuetext").text("");
  d3.select("#yeartext").text("");
}

export function createLineChart(id) {
  const lineChartWidth = width + margin.left + margin.right;
  const lineChartHeight = height + margin.top + margin.bottom;
  const svg = d3
    .select(id)
    .attr("width", lineChartWidth)
    .attr("height", lineChartHeight)
    .on("mouseleave", unSelectRect)
    .append("g")
    .attr("id", "gLineChart")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", 600)
      .attr("y", 2)
      .text("Music feature: ")
    svg
      .append("text")
      .attr("x", 665)
      .attr("y", 2)
      .attr("id", "featuretext");

    svg
      .append("text")
      .attr("x", 640)
      .attr("y", 20)
      .text("Year: ")

    svg
      .append("text")
      .attr("x", 665)
      .attr("y", 20)
      .attr("id", "yeartext");

    svg
      .append("text")
      .attr("x", 635)
      .attr("y", 35)
      .text("Value: ")

    svg
      .append("text")
      .attr("x", 665)
      .attr("y", 35)
      .attr("id", "valuetext");


    const rectX = lineChartWidth/17;
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "fiftys")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", lineChartWidth/17)
    .attr("height", lineChartHeight)
    .attr('rx', 5);
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "sixtys")
    .attr("x", rectX)
    .attr("y", 0)
    .attr("width", lineChartWidth/7.5)
    .attr("height", lineChartHeight)
    .attr('rx', 5);
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "seventys")
    .attr("x", rectX+lineChartWidth/7.5)
    .attr("y", 0)
    .attr("width", lineChartWidth/7.2)
    .attr("height", lineChartHeight)
    .attr('rx', 5);
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "eightys")
    .attr("x", rectX+(lineChartWidth/7.4)*2)
    .attr("y", 0)
    .attr("width", lineChartWidth/7.2)
    .attr("height", lineChartHeight)
    .attr('rx', 5);
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "ninetys")
    .attr("x", rectX+3*lineChartWidth/7.3)
    .attr("y", 0)
    .attr("width", lineChartWidth/7.2)
    .attr("height", lineChartHeight)
    .attr('rx', 5);
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "twothousands")
    .attr("x", rectX+4*(lineChartWidth/7.3))
    .attr("y", 0)
    .attr("width", lineChartWidth/7.2)
    .attr("height", lineChartHeight)
    .attr('rx', 5);
    svg
    .append("rect")
    .attr("class", "line-chart-rect")
    .attr("id", "tens")
    .attr("x", rectX+5*lineChartWidth/7.3)
    .attr("y", 0)
    .attr("width", lineChartWidth/7.5)
    .attr("height", lineChartHeight)
    .attr('rx', 5);

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

      xAxis = x;

      const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height, 0]);
      svg
      .append("g")
      .attr("id", "gYAxis")
      .call(d3.axisLeft(y));

      yAxis = y;
    
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
        .on('mousemove', updateToolTip)
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
        .on('mousemove', updateToolTip)
        .on('mouseout', stopHoverLine);
    
      svg.append("path")
          .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
          .attr("class", "line")
          .attr("d", valenceLine)
          .attr("stroke", "orange")
          .attr("id", 'valence')
          .on('click', selectLine)
          .on('mouseover', hoverLine)
          .on('mousemove', updateToolTip)
          .on('mouseout', stopHoverLine);

      svg.append("path")
          .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
          .attr("class", "line")
          .attr("d", danceabilityLine)
          .attr("stroke", "lightgreen")
          .attr("id", 'danceability')
          .on('click', selectLine)
          .on('mouseover', hoverLine)
          .on('mousemove', updateToolTip)
          .on('mouseout', stopHoverLine);

      svg.append("path")
          .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
          .attr("class", "line")
          .attr("d", speechinessLine)
          .attr("stroke", "#CF9FFF")
          .attr("id", 'speechiness')
          .on('click', selectLine)
          .on('mouseover', hoverLine)
          .on('mousemove', updateToolTip)
          .on('mouseout', stopHoverLine);

      svg.append("path")
          .data([dataList.sort((a, b) => d3.ascending(a.Year, b.Year))])
          .attr("class", "line")
          .attr("d", BPMLine)
          .attr("stroke", "#F07470")
          .attr("id", 'bpm')
          .on('click', selectLine)
          .on('mouseover', hoverLine)
          .on('mousemove', updateToolTip)
          .on('mouseout', stopHoverLine);
  });
}

export function updateLineChart(start, finish) {
  d3.csv("processed-Spotify-2000.csv").then(function(data) {
    data = data.filter(function (elem) {
      return start <= parseInt(elem.Year) && parseInt(elem.Year) <= finish;
    });
    const svg = d3.select("#gLineChart");

    d3.selectAll(".line").classed("selected", false);

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
      .y(function(d) { return y((d.BPM*100)/206); }));
});
}