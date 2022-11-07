const margin = { top: 80, right: 2, bottom: 2, left: 80 },
    width = 430 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom;

const POSITION = [
    { rect: "#rect0", x: -345, y: -160 },
    { rect: "#rect1", x: -300, y: -115 },
    { rect: "#rect2", x: -260, y: -75 },
    { rect: "#rect3", x: -220, y: -35 },
    { rect: "#rect18", x: -180, y: 5 },
    { rect: "#rect5", x: -345, y: -75 },
    { rect: "#rect6", x: -300, y: -35 },
    { rect: "#rect7", x: -260, y: 5 },
    { rect: "#rect8", x: -220, y: 45 },
    { rect: "#rect10", x: -345, y: 5 },
    { rect: "#rect11", x: -300, y: 45 },
    { rect: "#rect12", x: -260, y: 90 },
    { rect: "#rect14", x: -345, y: 90 },
    { rect: "#rect15", x: -300, y: 130 },
    { rect: "#rect17", x: -345, y: 170 }
];

function findPosition(id) {
    for (var i = 0; i < POSITION.length; ++i) {
        if (POSITION[i].rect === id)
            return POSITION[i];
    }
}

function showCorrelationNumbers(id) {
    const svg = d3.select("#gRooftop");
    svg.select(id).style("stroke", "black").attr("stroke-width", 2);
    svg.append("text")
        .attr("x", findPosition(id).x)
        .attr("y", findPosition(id).y)
        .style("font-size", "17")
        .attr("id", "tooltext")
        .text(d3.select(id).attr("title"))
        .attr('transform', 'rotate(-135)');
}

function createRooftopMatrix(id) {
    // append the svg object to the body of the page
    const svg = d3.select("#vi5")
        .attr("id", "gRooftop")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv("correlation/corr-all.csv").then(function (data) {
        var musicFeatures = ['BPM', 'Danceability', 'Valence', 'Acousticness', 'Speechiness', 'Popularity']

        // Build X scales and axis:
        var x = d3.scaleBand()
            .range([0, width])
            .domain(musicFeatures)
            .padding(0.01);
        svg.append("g")

        // Build X scales and axis:
        var y = d3.scaleBand()
            .range([height, 0])
            .domain(musicFeatures)
            .padding(0.01);
        svg.append("g");

        // Build color scale
        const myColor = d3.scaleSequential()
            .interpolator(d3.interpolateRdYlBu)
            .domain([-1, 1])

        //Read the data
        svg.selectAll()
            .data(data, function (d) { return d.musicFeature1 + ':' + d.musicFeature2; })
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.musicFeature1) })
            .attr("y", function (d) { return y(d.musicFeature2) })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("id", function (d, i) { return "rect" + i })
            .attr('title', (d) => d.value)
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) { return myColor(d.value) })
    });

}

export { createRooftopMatrix, showCorrelationNumbers }