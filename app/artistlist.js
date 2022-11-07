const margin = { top: 50, bottom: 50, left: 50, right: 50 };
const width = 430;
const height = 250;
const DECADE_INDEX_DICT = { "all": 0, "fifties": 2, "sixties": 4, "seventies": 6, "eighties": 8, "nineties": 10, "twothousands": 12, "twentytens": 14 };
const WORD_COLORS = {0: "#052350", 1: "#08306b", 2: "#08519c", 3: "#2171b5", 4: "#4292c6", 5: "#6baed6", 6: "#9ecae1", 7: "#c6dbef", 8: "#deebf7", 9: "#f7fbff"};

export function createArtistList(csv, id) {
    var idCropped = id.substring(1);
      d3.csv(csv).then(function (data) {
        var top_list = [];
          data.forEach(element => {
              let item = { "name": element.all, "count": parseInt(element.allCount) }
              top_list.push(item);
          });

        d3.layout.cloud().size([width - margin.left - margin.right, height - margin.top - margin.bottom])
        .timeInterval(20)
        .words(top_list)
        .fontSize(18)
        .text(function(d) { return d.name; })
        .rotate(0)
        .font("Impact")
        .on("end", draw)
        .start();
  
        function draw(words) {
          d3.select(id)
          .attr('width', width - margin.left - margin.right)
          .attr('height', height - margin.top - margin.bottom)
          .append("g")
          .attr("id", "gWordCloud" + idCropped)
          .attr("transform", "translate(" + [width - margin.left - margin.right >> 1, height - margin.top - margin.bottom >> 1] + ")")
          .selectAll("text")
          .data(words)
          .enter().append("text")
          .style("font-size", "18px")
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return WORD_COLORS[i]; })
          .style("stroke", "#5A6E82")
          .style("stroke-width", "0.5px")
          .style("stroke-opacity", 0.5)
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          
          .text(function(d) { return d.name; });
        }
        d3.layout.cloud().stop();
      })
  }

  export function updateArtistList(csv, decade) {
    var id = "#vi4"
      d3.csv(csv).then(function (data) {
          var top_list = [];
          data.forEach(element => {
              const decade_index = DECADE_INDEX_DICT[decade];
              let item = { "name": element[Object.keys(element)[DECADE_INDEX_DICT[decade]]], "count": parseInt(element[Object.keys(element)[decade_index + 1]]) }
              top_list.push(item);
          });

          console.log(top_list)
      d3.select("#gWordCloudvi4").remove();
  
      d3.layout.cloud().size([width - margin.left - margin.right, height - margin.top - margin.bottom])
      .timeInterval(20)
      .words(top_list)
      .fontSize(18)
      .text(function(d) { return d.name; })
      .rotate(0)
      .font("Impact")
      .on("end", draw)
      .start();
  
      function draw(words) {
        d3.select(id)
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .append("g")
        .attr("id", "gWordCloudvi4")
        .attr("transform", "translate(" + [width - margin.left - margin.right >> 1, height - margin.top - margin.bottom >> 1] + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", "18px")
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return WORD_COLORS[i]; })
        .style("stroke", "#5A6E82")
        .style("stroke-opacity", 0.5)
        .style("stroke-width", "0.5px")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.name; });
      }
      d3.layout.cloud().stop();
      })
  }
  
  