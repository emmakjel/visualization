
var margin = {top: 10, right: 10, bottom: 10, left: 10},
width = 450 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;
const DECADE_INDEX_DICT = { "all": 0, "fifties": 2, "sixties": 4, "seventies": 6, "eighties": 8, "nineties": 10, "twothousands": 12, "twentytens": 14 };


//THIS FILE IS GOING TO WORK FOR BOTH OF THE WORD CLOUDS
//NOW IT ONLY CONSOLE LOGS THE LISTS

function createWordCloud(csv, id) {
    var svg = d3.select(id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(csv).then(function (data) {
        var top_list = [];
        data.forEach(element => {
            let item = { "name": element.all, "count": parseInt(element.allCount) }
            top_list.push(item);

        var layout = d3.layout.cloud()
            .size([width, height])
            .words(top_list.map(function(d) { return {text: d.name}; }))
            .padding(10)
            .fontSize(function(d) { return d.count; })
            .on("end", draw);
          layout.start();
        
          function draw(words) {
            svg
              .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                  .data(words)
                .enter().append("text")
                  .style("font-size", function(d) { return d.count + "px"; })
                  .attr("text-anchor", "middle")
                  .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                  })
                  .text(function(d) { return d.text; });
          }
        });
        console.log(top_list);

    })

}



function updateWordCloud(csv, decade) {
    d3.csv(csv).then(function (data) {
        var top_list = [];
        data.forEach(element => {
            const decade_index = DECADE_INDEX_DICT[decade];
            let item = { "name": element[Object.keys(element)[DECADE_INDEX_DICT[decade]]], "count": parseInt(element[Object.keys(element)[decade_index + 1]]) }
            top_list.push(item);
        });
       console.log(top_list);
    })

}

export { createWordCloud, updateWordCloud }




