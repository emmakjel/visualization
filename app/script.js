import { createLineChart, selectRect, updateLineChart} from './linechart.js';
import { createWordCloud, updateTitleCloud } from './wordcloud.js';
import { createBarChart, changeDecadeBarChart, DECADES_DICT } from './barchart.js';
import {createArtistList, updateArtistList} from './artistlist.js'

export var zoomed = false;

function init() {
  //word cloud with words
  createWordCloud("processed-most-common-words.csv", "#vi3");
  //word cloud with artists
  createArtistList("processed-most-common-artists.csv", "#vi4");
  createLineChart("#vi1");
  createBarChart("#vi2");

  d3.select("#fiftys")
    .on("mouseover", selectRect)
    .on("mouseleave", selectRect)
    .on("click", () => {
      if (zoomed) {
        updateLineChart(1956, 2020);
        changeDecadeBarChart(DECADES_DICT["all"]);
        updateTitleCloud("processed-most-common-words.csv", "all");
        updateArtistList("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(1956, 1960);
        changeDecadeBarChart(DECADES_DICT["fifties"]);
        updateTitleCloud("processed-most-common-words.csv", "fifties");
        updateArtistList("processed-most-common-artists.csv", "fifties");
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
        updateTitleCloud("processed-most-common-words.csv", "all");
        updateArtistList("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(1960, 1970);
        changeDecadeBarChart(DECADES_DICT["sixties"]);
        updateTitleCloud("processed-most-common-words.csv", "sixties");
        updateArtistList("processed-most-common-artists.csv", "sixties");
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
        updateTitleCloud("processed-most-common-words.csv", "all");
        updateArtistList("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(1970, 1980);
        changeDecadeBarChart(DECADES_DICT["seventies"]);
        updateTitleCloud("processed-most-common-words.csv", "seventies");
        updateArtistList("processed-most-common-artists.csv", "seventies");
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
        updateTitleCloud("processed-most-common-words.csv", "all");
        updateArtistList("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(1980, 1990);
        changeDecadeBarChart(DECADES_DICT["eighties"]);
        updateTitleCloud("processed-most-common-words.csv", "eighties");
        updateArtistList("processed-most-common-artists.csv", "eighties");
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
        updateTitleCloud("processed-most-common-words.csv", "all");
        updateArtistList("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(1990, 2000);
        changeDecadeBarChart(DECADES_DICT["nineties"]);
        updateTitleCloud("processed-most-common-words.csv", "nineties");
        updateArtistList("processed-most-common-artists.csv", "nineties");
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
        updateTitleCloud("processed-most-common-words.csv", "all");
        updateArtistList("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(2000, 2010);
        changeDecadeBarChart(DECADES_DICT["twoThousands"]);
        updateTitleCloud("processed-most-common-words.csv", "twothousands");
        updateArtistList("processed-most-common-artists.csv", "twothousands");
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
        updateTitleCloud("processed-most-common-words.csv", "all");
        updateArtistList("processed-most-common-artists.csv", "all");
        zoomed = false;
      } else {
        updateLineChart(2010, 2020);
        changeDecadeBarChart(DECADES_DICT["twentyTens"]);
        updateTitleCloud("processed-most-common-words.csv", "twentytens");
        updateArtistList("processed-most-common-artists.csv", "twentytens");
        zoomed = true;
      }
    });



}

window.addEventListener('load', init)