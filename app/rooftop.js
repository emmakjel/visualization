

const margin = { top: 80, right: 2, bottom: 30, left: 80 },
    width = 430 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom;



function createRooftopMatrix(id) {
    console.log(id);
    // append the svg object to the body of the page
    const svg = d3.select("#vi5")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv("corr-all.csv").then(function (data) {
        // Labels of row and columns
        var musicFeatures = ['BPM', 'Danceability', 'Valence', 'Acousticness', 'Speechiness', 'Popularity']
        

        // Build X scales and axis:
        var x = d3.scaleBand()
            .range([0, width])
            .domain(musicFeatures)
            .padding(0.01);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        // Build X scales and axis:
        var y = d3.scaleBand()
            .range([height, 0])
            .domain(musicFeatures)
            .padding(0.01);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Build color scale
        const myColor = d3.scaleSequential()
            .interpolator(d3.interpolatePRGn)
            .domain([-1, 1])

        //Read the data
        svg.selectAll()
            .data(data, function (d) { return d.musicFeature1 + ':' + d.musicFeature2; })
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.musicFeature1) })
            .attr("y", function (d) { return y(d.musicFeature2) })
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) { return myColor(d.value) })


    });

}

export { createRooftopMatrix }