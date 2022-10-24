import {createLineChart, selectRect, updateLineChart} from './linechart.js';

var zoomed = false;

function init() {
    createLineChart("#vi1");
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

window.addEventListener('load', init)