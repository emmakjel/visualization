import { createLineChart, selectRect, updateLineChart} from './linechart.js';
import { createWordCloud, updateWordCloud } from './wordcloud.js';
import { createBarChart, changeDecadeBarChart, DECADES_DICT } from './barchart.js';

export var zoomed = false;

function init() {
  //word cloud with words
  createWordCloud("processed-most-common-words.csv");
  //word cloud with artists
  createWordCloud("processed-most-common-artists.csv");
  createLineChart("#vi1");
  createBarChart("#vi2");

  d3.select("#fiftys")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1956, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        updateWordCloud("processed-most-common-words.csv", "all");
        updateWordCloud("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(1956, 1960);
        changeDecadeBarChart(DECADES_DICT["fifties"]);
        updateWordCloud("processed-most-common-words.csv", "fifties");
        updateWordCloud("processed-most-common-artists.csv", "fifties");
        zoomed = true;
      }
    });
  d3.select("#sixtys")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1956, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        updateWordCloud("processed-most-common-words.csv", "all");
        updateWordCloud("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(1960, 1970);
        changeDecadeBarChart(DECADES_DICT["sixties"]);
        updateWordCloud("processed-most-common-words.csv", "sixties");
        updateWordCloud("processed-most-common-artists.csv", "sixties");
        zoomed = true;
      }
    });
  d3.select("#seventys")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1956, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        updateWordCloud("processed-most-common-words.csv", "all");
        updateWordCloud("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(1970, 1980);
        changeDecadeBarChart(DECADES_DICT["seventies"]);
        updateWordCloud("processed-most-common-words.csv", "seventies");
        updateWordCloud("processed-most-common-artists.csv", "seventies");
        zoomed = true;
      }
    });
  d3.select("#eightys")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1956, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        updateWordCloud("processed-most-common-words.csv", "all");
        updateWordCloud("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(1980, 1990);
        changeDecadeBarChart(DECADES_DICT["eighties"]);
        updateWordCloud("processed-most-common-words.csv", "eighties");
        updateWordCloud("processed-most-common-artists.csv", "eighties");
        zoomed = true;
      }
    });
  d3.select("#ninetys")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1956, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        updateWordCloud("processed-most-common-words.csv", "all");
        updateWordCloud("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(1990, 2000);
        changeDecadeBarChart(DECADES_DICT["nineties"]);
        updateWordCloud("processed-most-common-words.csv", "nineties");
        updateWordCloud("processed-most-common-artists.csv", "nineties");
        zoomed = true;
      }
    });
  d3.select("#twothousands")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1956, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        updateWordCloud("processed-most-common-words.csv", "all");
        updateWordCloud("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(2000, 2010);
        changeDecadeBarChart(DECADES_DICT["twoThousands"]);
        updateWordCloud("processed-most-common-words.csv", "twothousands");
        updateWordCloud("processed-most-common-artists.csv", "twothousands");
        zoomed = true;
      }
    });
  d3.select("#tens")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1956, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        updateWordCloud("processed-most-common-words.csv", "all");
        updateWordCloud("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(2010, 2020);
        changeDecadeBarChart(DECADES_DICT["twentyTens"]);
        updateWordCloud("processed-most-common-words.csv", "twentytens");
        updateWordCloud("processed-most-common-artists.csv", "twentytens");
        zoomed = true;
      }
    });



}

window.addEventListener('load', init)