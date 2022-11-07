const margin = { top: 50, bottom: 50, left: 50, right: 50 };
const width = 430;
const height = 250;
const DECADE_INDEX_DICT = { "all": 0, "fifties": 2, "sixties": 4, "seventies": 6, "eighties": 8, "nineties": 10, "twothousands": 12, "twentytens": 14 };
const DECADE_WORD_COUNT_DICT = {"all": 0.6, "fifties": 35, "sixties": 6, "seventies": 3, "eighties": 3, "nineties": 4, "twothousands": 6, "twentytens": 4}
const WORD_COLORS = {0: "#052350", 1: "#08306b", 2: "#08519c", 3: "#2171b5", 4: "#4292c6", 5: "#6baed6", 6: "#9ecae1", 7: "#c6dbef", 8: "#deebf7", 9: "#f7fbff"};


function createWordCloud(csv, id) {
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
      .fontSize(function(d) { return d.count * 0.6; })
      .text(function(d) { return d.name; })
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
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
        .style("font-size", function(d) { return d.count * 0.6 + "px"; })
        .style("font-family", "Impact")
        .style("stroke", "#5A6E82")
        .style("stroke-opacity", 0.5)
        .style("fill", function(d, i) { return WORD_COLORS[i]; })
        .style("stroke-width", "0.8px")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.name; });
      }
      d3.layout.cloud().stop();
    })
}

function updateTitleCloud(csv, decade) {
  var id = "#vi3"
    d3.csv(csv).then(function (data) {
        var top_list = [];
        data.forEach(element => {
            const decade_index = DECADE_INDEX_DICT[decade];
            let item = { "name": element[Object.keys(element)[DECADE_INDEX_DICT[decade]]], "count": parseInt(element[Object.keys(element)[decade_index + 1]]) }
            top_list.push(item);
        });
    d3.select("#gWordCloudvi3").remove();


    d3.layout.cloud().size([width - margin.left - margin.right, height - margin.top - margin.bottom])
    .timeInterval(20)
    .words(top_list)
    .fontSize(function(d) { return d.count * DECADE_WORD_COUNT_DICT[decade]; })
    .text(function(d) { return d.name; })
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .on("end", draw)
    .start();

    function draw(words) {
      d3.select(id)
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .append("g")
      .attr("id", "gWordCloudvi3")
      .attr("transform", "translate(" + [width - margin.left - margin.right >> 1, height - margin.top - margin.bottom >> 1] + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) { return d.count * DECADE_WORD_COUNT_DICT[decade] + "px"; })
      .style("font-family", "Impact")
      .style("stroke", "#5A6E82")
      .style("stroke-opacity", 0.5)
      .style("fill", function(d, i) { return WORD_COLORS[i]; })
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



export { createWordCloud, updateTitleCloud}




