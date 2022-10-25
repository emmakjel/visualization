const width = 900;
const height = 450;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };
var twoIsSelected = false;
var alreadySelectedMusicAttribute;
var dataWithSelectedAttribute;


function createBarChart(id) {



    const svg = d3.select(id)
        .attr("id", "gBarChart")
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr("viewBox", [0, 0, width, height]);






    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top])


    //Bars color, funker ikke
    svg.append("g")
        .attr("fill", "#808080");

    //Give x-axis ID
    svg.append("g")
        .attr("id", "gXAxis")



    //Y-axis name and grids
    svg.append('g')
        .attr('transform', `translate(${margin.left})`)
        .attr("class", "grid")
        .call(d3.axisLeft(yScale).ticks(10)
            //.tickSize(-width, 0, 0) dont want the grids
        )
        .attr('font-size', '20px');

    //Label Y-axis
    svg.append('text')
        .attr('x', -(height / 2) - margin.top)
        .attr('y', margin.top / 5)
        .attr('transform', 'rotate(-90)')
        .attr('font-size', '20px')
        //.attr('fill', 'black')
        .text('Average value')

    //Label title
    svg.append('text')
        .attr('x', width / 4 + margin.left)
        .attr('y', 30)
        .attr('font-size', '30px')
        .text('Average values of music features')



    d3.csv("processed-average-per-decade.csv").then(function (data) {
        var all_years_list = [];
        data.forEach(element => {
            let item = { "name": element.musicFeature, "score": parseInt(element.all) }
            all_years_list.push(item);
        });

        var xScale = d3.scaleBand()
            .domain(d3.range(all_years_list.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)

        //X-axis name
        svg.append('g')
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .attr("class", "names")
            .call(d3.axisBottom(xScale)
                //  .tickFormat(index => all_years_list[index].name) //må fikse x-aksen
                //  .tickSizeOuter(0)
            )
            .attr('font-size', '15px'); //the music attributes 

        all_years_list.sort((a, b) => d3.descending(a.score, b.score))

        svg.append("g")
            .selectAll("rect.rectValue")
            .data(all_years_list)
            .join("rect")
            .attr("x", function (d, i) { return xScale(i); })
            .attr("y", function (d) { return yScale(d.score); })
            .attr("height", d => yScale(0) - yScale(d.score))
            .attr("width", xScale.bandwidth())
            .attr("class", "rectValue itemValue")
            .on("mouseover", function () {
                d3.select(this)
                    .attr('opacity', 0.7)
                    .style("cursor", "pointer")
            })
            .on("mouseout", function () {
                d3.select(this)
                    .attr('opacity', 1)
                    .style("cursor", "pointer")
            })
            .on("click", (event, d) => {
                updateOrderBarChart(d);
            })

        //svg.selectAll('.limit').remove()

    })


}

function changeDecadeBarChart(decade) {

}



function updateOrderBarChart(musicAttribute) {
    d3.csv("processed-average-per-decade.csv").then(function (data) {
        var all_years_list = [];
        data.forEach(element => {
            let item = { "name": element.musicFeature, "score": parseInt(element.all) }
            all_years_list.push(item);
        });



        //sorting here


        //order the data how I wanted it to be
        //   if (!alreadySelectedMusicAttribute) {
        //do the old thing
        var newData;

        newData = all_years_list.filter((val) => val.name != musicAttribute.name);

        newData = newData.sort((a, b) => d3.descending(a.score, b.score));
        newData.unshift(musicAttribute)
        console.log(newData)

        alreadySelectedMusicAttribute = musicAttribute;
        //dataWithSelectedAttribute = newData;
        twoIsSelected = false;

        //   } else {
        //just put the selected attribute in 2nd place
        // newData = dataWithSelectedAttribute;
        // newData = newData.filter((val) => val != (musicAttribute))
        // newData = newData.filter((val) => val != (alreadySelectedMusicAttribute));
        // newData.unshift(alreadySelectedMusicAttribute, musicAttribute);


        // alreadySelectedMusicAttribute = null;
        // dataWithSelectedAttribute = null;
        // twoIsSelected = true;
        //   }


        var xScale = d3.scaleBand()
            .domain(d3.range(newData.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)

        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height - margin.bottom, margin.top])

        const svg = d3.select("#gBarChart");

        svg.selectAll(".names").remove();
        svg.selectAll("rect").remove();

        //X-axis name
        svg.select("#gXAxis")
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .attr("class", "names")
            .call(d3.axisBottom(xScale)
                //  .tickFormat(index => all_years_list[index].name) //må fikse x-aksen
                //  .tickSizeOuter(0)
            )
            .attr('font-size', '15px'); //the music attributes 


        svg.append("g")
            .selectAll("rect.rectValue")
            .data(newData)
            .join("rect")
            .attr("x", function (d, i) { return xScale(i); })
            .attr("y", function (d) { return yScale(d.score); })
            .attr("height", d => yScale(0) - yScale(d.score))
            .attr("width", xScale.bandwidth())
            .attr("class", "rectValue itemValue")
            .transition()
            .duration(500)
            




        //svg.selectAll('.limit').remove()

    })

}



export { createBarChart }




