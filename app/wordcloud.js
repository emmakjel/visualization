const margin = { top: 50, bottom: 50, left: 50, right: 50 };
const width = 430;
const height = 430;
const DECADE_INDEX_DICT = { "all": 0, "fifties": 2, "sixties": 4, "seventies": 6, "eighties": 8, "nineties": 10, "twothousands": 12, "twentytens": 14 };
const DECADE_WORD_COUNT_DICT = {"all": 1, "fifties": 40, "sixties": 10, "seventies": 4, "eighties": 4, "nineties": 6, "twothousands": 8, "twentytens": 5}
const DECADE_ARTIST_COUNT_DICT = {"all": 1, "fifties": 13, "sixties": 2, "seventies": 3, "eighties": 3, "nineties": 3, "twothousands": 4, "twentytens": 2.5}

function sixtiesArtistCount(size) {
  var result = 0;
  if (size > 20) {
    result = 40;
  } else if (size == 12) {
    result = 22
  } else if (size == 7) {
    result = 16
  } else if (size == 5) {
    result = 12
  } else if (size == 4) {
    result = 10
  }
  return result;
}


function createWordCloud(csv, id) {
  var idCropped = id.substring(1);

    d3.csv(csv).then(function (data) {

      var top_list = [];
        data.forEach(element => {
            let item = { "name": element.all, "count": parseInt(element.allCount) }
            top_list.push(item);
        });
      var fill = d3.schemeSet3

      d3.layout.cloud().size([width - margin.left - margin.right, height - margin.top - margin.bottom])
      .timeInterval(20)
      .words(top_list)
      .fontSize(function(d) { return d.count; })
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
        .style("font-size", function(d) { return d.count + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill[i]; })
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

    var fill = d3.schemeSet3

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
      .style("fill", function(d, i) { return fill[i]; })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.name; });
    }
    d3.layout.cloud().stop();
    })

}


function updateArtistCloud(csv, decade) {
  var id = "#vi4"
    d3.csv(csv).then(function (data) {
        var top_list = [];
        data.forEach(element => {
            const decade_index = DECADE_INDEX_DICT[decade];
            let item = { "name": element[Object.keys(element)[DECADE_INDEX_DICT[decade]]], "count": parseInt(element[Object.keys(element)[decade_index + 1]]) }
            top_list.push(item);
        });
    d3.select("#gWordCloudvi4").remove();

    var fill = d3.schemeSet3

    d3.layout.cloud().size([width - margin.left - margin.right, height - margin.top - margin.bottom])
    .timeInterval(20)
    .words(top_list)
    .fontSize(function(d) { return decade == "sixties" ? sixtiesArtistCount(d.count) : d.count * DECADE_ARTIST_COUNT_DICT[decade]; })
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
      .attr("id", "gWordCloudvi4")
      .attr("transform", "translate(" + [width - margin.left - margin.right >> 1, height - margin.top - margin.bottom >> 1] + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) { return decade == "sixties" ? sixtiesArtistCount(d.count) : d.count * DECADE_ARTIST_COUNT_DICT[decade] + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return fill[i]; })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.name; });
    }
    d3.layout.cloud().stop();
    })

}

export { createWordCloud, updateTitleCloud, updateArtistCloud}




