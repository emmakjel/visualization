

const margin = { top: 80, right: 2, bottom: 2, left: 80 },
    width = 430 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom;



function createRooftopMatrix(id) {
    // append the svg object to the body of the page
    const svg = d3.select("#vi5")
        .attr("id", "gRooftop")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 50)
        .attr("height", 15)
        .attr("id", "tooltip1")
        .attr("class", "hide")

    d3.csv("corr-all.csv").then(function (data) {
        // Labels of row and columns
        var musicFeatures = ['BPM', 'Danceability', 'Valence', 'Acousticness', 'Speechiness', 'Popularity']




        // Three function that change the tooltip when user hover / move / leave a cell
        // const mouseover = function (event, d) {
        //     d3.select(this)
        //         .style("stroke", "black")
        //         .style("stroke-width", 2)
        //         .style("opacity", 1)
        //         .style("cursor", "pointer");
            // var svg = d3.select("#gRooftop");
            // var x = parseInt(d3.select(this).attr("x"));
            // var y = parseInt(d3.select(this).attr("y")) - 25;

            // svg.append("text")
            //     .attr("x", x + 90)
            //     .attr("y", y + 135)
            //     .style("font-size", "17")
            //     .attr("id", "tooltext")
            //     .text(d.value);


        //}



        // const mouseout = function (event, d) {
        //     //d3.select("#tooltext").remove();
        //     d3.select(this)
        //         .style("stroke", "none")

        // }


        // Build X scales and axis:
        var x = d3.scaleBand()
            .range([0, width])
            .domain(musicFeatures)
            .padding(0.01);
        svg.append("g")
            //.attr("transform", "translate(0," + height + ")")
            //.call(d3.axisTop(x))
        

        

        // Build X scales and axis:
        var y = d3.scaleBand()
            .range([height, 0])
            .domain(musicFeatures)
            .padding(0.01);
        svg.append("g")
            //.call(d3.axisLeft(y));

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
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) { return myColor(d.value) })
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)





    });

}

export { createRooftopMatrix }