import { createLineChart, selectRect, updateLineChart} from './linechart.js';
import { createBarChart, changeDecadeBarChart, DECADES_DICT } from './barchart1.js';

var zoomed = false;

function init() {
  createLineChart("#vi1");
  createBarChart("#vi2");

  d3.select("#fiftys")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1950, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        zoomed = false;
      } else {
        updateLineChart(1950, 1960);
        changeDecadeBarChart(DECADES_DICT["fifties"]);
        zoomed = true;
      }
    });
  d3.select("#sixtys")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1950, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        zoomed = false;
      } else {
        updateLineChart(1960, 1970);
        changeDecadeBarChart(DECADES_DICT["sixties"]);
        zoomed = true;
      }
    });
  d3.select("#seventys")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1950, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        zoomed = false;
      } else {
        updateLineChart(1970, 1980);
        changeDecadeBarChart(DECADES_DICT["seventies"]);
        zoomed = true;
      }
    });
  d3.select("#eightys")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1950, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        zoomed = false;
      } else {
        updateLineChart(1980, 1990);
        changeDecadeBarChart(DECADES_DICT["eighties"]);
        zoomed = true;
      }
    });
  d3.select("#ninetys")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1950, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        zoomed = false;
      } else {
        updateLineChart(1990, 2000);
        changeDecadeBarChart(DECADES_DICT["nineties"]);
        zoomed = true;
      }
    });
  d3.select("#twothousands")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1950, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        zoomed = false;
      } else {
        updateLineChart(2000, 2010);
        changeDecadeBarChart(DECADES_DICT["twoThousands"]);
        zoomed = true;
      }
    });
  d3.select("#tens")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1950, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        zoomed = false;
      } else {
        updateLineChart(2010, 2020);
        changeDecadeBarChart(DECADES_DICT["twentyTens"]);
        zoomed = true;
      }
    });



}

window.addEventListener('load', init)