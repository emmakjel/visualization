const margin = { top: 50, bottom: 50, left: 50, right: 50 };
const width = 430;
const height = 430;
const DECADE_INDEX_DICT = { "all": 0, "fifties": 2, "sixties": 4, "seventies": 6, "eighties": 8, "nineties": 10, "twothousands": 12, "twentytens": 14 };


//THIS FILE IS GOING TO WORK FOR BOTH OF THE WORD CLOUDS
//NOW IT ONLY CONSOLE LOGS THE LISTS

function updateWordClouds() {
updateTitleCloud();

}


function createWordCloud(csv, id) {

    d3.csv(csv).then(function (data) {

      var top_list = [];
        data.forEach(element => {
            let item = { "name": element.all, "count": parseInt(element.allCount) }
            top_list.push(item);
        });
        console.log(top_list);
      
      var fill = d3.schemeSet3

      var xScale = d3.scaleLinear()
      .domain([0, d3.max(top_list, function(d) {
        return d.count;
      })
     ])
      .range([10,100]);

      d3.layout.cloud().size([width - margin.left - margin.right, height - margin.top - margin.bottom])
      .timeInterval(20)
      .words(top_list)
      .fontSize(function(d) { return xScale(+d.count); })
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
        .attr("id", "gWordCloud")
        .attr("transform", "translate(" + [width - margin.left - margin.right >> 1, height - margin.top - margin.bottom >> 1] + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) { return xScale(d.count) + "px"; })
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
       console.log(top_list);
    
    d3.select("#gWordCloud").remove();

    var fill = d3.schemeSet3

    var xScale = d3.scaleLinear()
    .domain([0, d3.max(top_list, function(d) {
      return d.count;
    })
   ])
    .range([10,100]);

    d3.layout.cloud().size([width - margin.left - margin.right, height - margin.top - margin.bottom])
    .timeInterval(20)
    .words(top_list)
    .fontSize(function(d) { return xScale(+d.count); })
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
      .attr("id", "gWordCloud")
      .attr("transform", "translate(" + [width - margin.left - margin.right >> 1, height - margin.top - margin.bottom >> 1] + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) { return xScale(d.count) + "px"; })
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
       console.log(top_list);
    
    d3.select("#gWordCloud").remove();

    var fill = d3.schemeSet3

    var xScale = d3.scaleLinear()
    .domain([0, d3.max(top_list, function(d) {
      return d.count;
    })
   ])
    .range([10,100]);

    d3.layout.cloud().size([width - margin.left - margin.right, height - margin.top - margin.bottom])
    .timeInterval(20)
    .words(top_list)
    .fontSize(function(d) { return xScale(+d.count); })
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
      .attr("id", "gWordCloud")
      .attr("transform", "translate(" + [width - margin.left - margin.right >> 1, height - margin.top - margin.bottom >> 1] + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) { return xScale(d.count) + "px"; })
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




