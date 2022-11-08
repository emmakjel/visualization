const margin = { top: 80/1.5, right: 2/1.5, bottom: 2/1.5, left: 80/1.5 },
    width = 430/1.5 - margin.left - margin.right,
    height = 430/1.5 - margin.top - margin.bottom;

const POSITION = [
    { rect: "#rect0", x: -227, y: -105 },
    { rect: "#rect1", x: -198, y: -79 },
    { rect: "#rect2", x: -172, y: -52 },
    { rect: "#rect3", x: -142, y: -25 },
    { rect: "#rect4", x: -115, y: 5 },
    { rect: "#rect5", x: -227, y: -52 },
    { rect: "#rect6", x: -200, y: -25 },
    { rect: "#rect7", x: -170, y: 4 },
    { rect: "#rect8", x: -142, y: 30 },
    { rect: "#rect9", x: -227, y: 4 },
    { rect: "#rect10", x: -197, y: 30 },
    { rect: "#rect11", x: -170, y: 59 },
    { rect: "#rect12", x: -227, y: 59 },
    { rect: "#rect13", x: -198, y: 86 },
    { rect: "#rect14", x: -225, y: 113 }
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
        .style("font-size", "10")
        .attr("id", "tooltext")
        .text(d3.select(id).attr("title"))
        .attr('transform', 'rotate(-135)');
}

function createRooftopMatrix(csv, id) {
    // append the svg object to the body of the page
    const svg = d3.select(id)
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
            .interpolator(d3.interpolateRdBu)
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
            .attr("stroke", "grey")
            .attr("id", function (d, i) { return "rect" + i })
            .attr('title', (d) => d.value)
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) { return myColor(d.value) })
    
    }
    );
    
}


function updateRooftop(csv) {
    // append the svg object to the body of the page
    const svg = d3.select("#gRooftop")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv(csv).then(function (data) {
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
            .interpolator(d3.interpolateRdBu)
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
            .attr("stroke", "grey")
            .attr("id", function (d, i) { return "rect" + i })
            .attr('title', (d) => d.value)
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) { return myColor(d.value) })
            .transition()
            .duration(1500)
    });
    
}

export { createRooftopMatrix, showCorrelationNumbers, updateRooftop }