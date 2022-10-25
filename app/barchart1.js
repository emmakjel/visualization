import {barLineHover, stopBarLineHover, selectBarLine} from './linechart.js'

var twoIsSelected = false;
var alreadySelectedMusicAttribute;
var dataWithSelectedAttribute;


var selectedAttribute1;
var selectedAttribute2;



export const DECADES_DICT = { "all": 1, "fifties": 2, "sixties": 3, "seventies": 4, "eighties": 5, "nineties": 6, "twoThousands": 7, "twentyTens": 8 }
var selected_decade = DECADES_DICT["all"];




const width = 700;
const height = 400;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

function hoverBar() {
    barLineHover(d3.select(this).attr("id"));
    d3
        .select(this)
        .attr('opacity', 0.7)
        .style("cursor", "pointer");
}

function stopHoverBar() {
    stopBarLineHover(d3.select(this).attr("id"))
    d3
        .select(this)
        .attr('opacity', 1)
        .style("cursor", "pointer")
}

export function lineBarHover(id) {
    d3.select("#"+id).attr('opacity', 0.7)
}

export function stopLineBarHover(id) {
    d3.select("#"+id).attr('opacity', 1);
}

export function selectLineBar(id) {
    var d = d3.select("#" + id.toUpperCase());
    if (alreadySelectedMusicAttribute != d) { updateBarChartOrder(d) };
}


function selectBar(d) {
    if (alreadySelectedMusicAttribute != d) { selectBarLine(d.name.toLowerCase()); updateBarChartOrder(d) };
}


function createBarChart(id) {
    d3.csv("processed-average-per-decade.csv").then(function (data) {
        var all_years_list = [];
        data.forEach(element => {

            let item = { "name": element.musicFeature, "score": parseInt(element[Object.keys(element)[DECADES_DICT["all"]]]) }
            all_years_list.push(item);
        });


        const xScale = d3.scaleBand()
            .domain(d3.range(all_years_list.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)

        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height - margin.bottom, margin.top])


        const svg = d3.select(id)
            .attr("id", "gBarChart")
            .attr('width', width - margin.left - margin.right)
            .attr('height', height - margin.top - margin.bottom)
            .attr("viewBox", [0, 0, width, height]);


        //color
        const chart = svg
            .append("g")
            .attr("fill", '#808080');

        chart
            .append("g")
            .attr("id", "gXAxis")


        chart.append("g")
            .selectAll("rect.rectValue")
            .data(all_years_list.sort((a, b) => d3.descending(a.score, b.score)), d => d.name) //dummy data, the second par is the one to be bound to the element
            .join("rect")
            .attr("x", (data, index) => xScale(index))
            .attr("y", data => yScale(data.score))
            .attr('title', (data) => data.score)
            .attr("id", data => data.name.toUpperCase())
            .attr("height", d => yScale(0) - yScale(d.score))
            .attr("width", xScale.bandwidth())
            .attr("class", "rectValue itemValue")
            .on("mouseover", hoverBar)
            .on("mouseout", stopHoverBar)
            .on("click", (event, d) => {selectBar(d)});




        //svg.selectAll('.limit').remove()

        //x- axis name
        chart
            .append('g')
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .attr("class", "names")
            .call(d3.axisBottom(xScale)
                .tickFormat(index => all_years_list[index].name)
                .tickSizeOuter(0))
            .attr('font-size', '15px'); //the music attributes 




        //names and grids 
        chart.append('g')
            .attr('transform', `translate(${margin.left})`)
            .attr("class", "grid")
            .call(d3.axisLeft(yScale).ticks(null, all_years_list.format)
                //.tickSize(-width, 0, 0) dont want the grids
            )
            .attr('font-size', '20px'); // the numbers one y-axis

        //labels
        chart.append('text')
            .attr('x', -(height / 2) - margin.top)
            .attr('y', margin.top / 5)
            .attr('transform', 'rotate(-90)')
            .attr('font-size', '20px')
            .attr('fill', 'black')
            .text('Average value')

        //text
        chart.append('text')
            .attr('x', width / 4 + margin.left)
            .attr('y', 30)
            .attr('font-size', '15px')
            .attr('fill', 'black')
            .text('Average values of music features')
    })






}


function updateBarChartOrder(musicAttribute) {

    //start by importing the original dataset
    d3.csv("processed-average-per-decade.csv").then(function (data) {
        var all_years_list = [];
        data.forEach(element => {
            let item = { "name": element.musicFeature, "score": parseInt(element[Object.keys(element)[selected_decade]]) }
            all_years_list.push(item);
        });


        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height - margin.bottom, margin.top])

        var newData;

        //order the data how I wanted it to be
        if (!alreadySelectedMusicAttribute) {
            //do the old thing


            newData = all_years_list.filter((val) => val.name != musicAttribute.name);
            newData = newData.sort((a, b) => d3.descending(a.score, b.score));
            newData.unshift(musicAttribute)

            alreadySelectedMusicAttribute = musicAttribute;
            dataWithSelectedAttribute = newData;
            twoIsSelected = false;
            selectedAttribute2 = null;
            selectedAttribute1 = musicAttribute;

        } else {
            //just put the selected attribute in 2nd place
            newData = dataWithSelectedAttribute;
            newData = newData.filter((val) => val != (musicAttribute))
            newData = newData.filter((val) => val != (alreadySelectedMusicAttribute));
            newData.unshift(alreadySelectedMusicAttribute, musicAttribute);



            alreadySelectedMusicAttribute = null;
            dataWithSelectedAttribute = null;
            twoIsSelected = true;
            selectedAttribute2 = musicAttribute;
        }






        //enter, write code as the element where created the first time
        //update, the data that already exists


        const svg = d3.select("#gBarChart");

        const xScale = d3.scaleBand()
            .domain(d3.range(newData.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)


        svg.selectAll(".names").remove();

        svg
            .select("#gXAxis")
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale)
                .tickFormat(index => newData[index].name)
                .tickSizeOuter(0))
            .attr('font-size', '15px');




        svg
            .selectAll("rect.rectValue")
            .data(newData, d => d.name) //dummy data, the second par is the one to be bound to the element
            .join(
                (enter) => {
                    enter
                        .append("rect")
                        .attr("x", (data, index) => xScale(index))
                        .attr("y", data => yScale(data.score))
                        .attr('title', (data) => {data.score})
                        .attr("height", d => yScale(0) - yScale(d.score))
                        .attr("width", xScale.bandwidth())
                        .attr("class", "rectValue itemValue")
                        .attr("id", d => d.name.toUpperCase());
                },
                (update) => {
                    update
                        .transition()
                        .duration(500)
                        .attr("x", (data, index) => xScale(index))
                        .attr("y", data => yScale(data.score))
                        .attr("height", d => yScale(0) - yScale(d.score))
                        .attr("width", xScale.bandwidth())
                        .attr("fill", "#808080")
                        .attr("style", "outline: none")
                        .filter((d, i) => twoIsSelected ? (i == 0 || i == 1) : i == 0)
                        .attr("fill", "#89CFF0")
                        .attr("style", "outline: solid #0096FF;")

                },
                (exit) => {
                    exit.remove();
                }
            )


        if (alreadySelectedMusicAttribute) { svg.selectAll('.limit').remove() }

        //the line
        const line = svg.append('line')
            .attr('class', 'limit')
            .attr('x1', 0)
            .attr('y1', yScale(musicAttribute.score))
            .attr('x2', width)
            .attr('y2', yScale(musicAttribute.score))
            .attr('stroke', 'black')
            .style("stroke-width", 3)
            .style("stroke-dasharray", ("10, 10"));





    })






}

function changeDecadeBarChart(decade) {
    //start by importing the original dataset
    d3.csv("processed-average-per-decade.csv").then(function (data) {
        var all_years_list = [];
        data.forEach(element => {
            let item = { "name": element.musicFeature, "score": parseInt(element[Object.keys(element)[decade]]) }
            all_years_list.push(item);
        });

        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height - margin.bottom, margin.top])

        var newData = all_years_list.sort((a, b) => d3.descending(a.score, b.score));

        //if two music features are selected
        if (selectedAttribute2) {
            var temp = all_years_list.filter((val) => val.name != (selectedAttribute1.name));
            temp = temp.filter((val) => val.name != (selectedAttribute2.name));
            temp.unshift(selectedAttribute1, selectedAttribute2);
            newData = temp;


        }
        //if one music feature is selected
        else if (selectedAttribute1) {
            var temp = all_years_list.filter((val) => val.name != (selectedAttribute1.name));
            temp.unshift(selectedAttribute1);
            newData = temp;
        }




        //enter, write code as the element where created the first time
        //update, the data that already exists

        const svg = d3.select("#gBarChart");

        const xScale = d3.scaleBand()
            .domain(d3.range(newData.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)


        svg.selectAll(".names").remove();

        svg
            .select("#gXAxis")
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale)
                .tickFormat(index => newData[index].name)
                .tickSizeOuter(0))
            .attr('font-size', '15px');


        svg.selectAll('.limit').remove()

        svg
            .selectAll("rect.rectValue")
            .data(newData) 
            .join(
                (enter) => {
                    enter
                        .append("rect")
                        .attr("x", (data, index) => xScale(index))
                        .attr("y", data => yScale(data.score))
                        .attr('title', (data) => data.score)
                        .attr("height", d => yScale(0) - yScale(d.score))
                        .attr("width", xScale.bandwidth())
                        .attr("class", "rectValue itemValue")




                },
                (update) => {
                    update
                        .transition()
                        .duration(500)
                        .attr("x", (data, index) => xScale(index))
                        .attr("y", data => yScale(data.score))
                        .attr("height", d => yScale(0) - yScale(d.score))
                        .attr("width", xScale.bandwidth())
                        .attr("fill", "#808080")
                        .attr("style", "outline: none")
                        .filter((d, i) => selectedAttribute2 ? (i == 0 || i == 1) : selectedAttribute1 ? (i == 0) : i == null)
                        .attr("fill", "#89CFF0")
                        .attr("style", "outline: solid #0096FF;")

                },
                (exit) => {
                    exit.remove();
                }


            )

        if (selectedAttribute1) {
            //the line
            svg.append('line')
                .attr('class', 'limit')
                .attr('x1', 0)
                .attr('y1', yScale(selectedAttribute1.score))
                .attr('x2', width)
                .attr('y2', yScale(selectedAttribute1.score))
                .attr('stroke', 'black')
                .style("stroke-width", 3)
                .style("stroke-dasharray", ("10, 10"));

        }

        if (selectedAttribute2) {
            //the line
            svg.append('line')
                .attr('class', 'limit')
                .attr('x1', 0)
                .attr('y1', yScale(selectedAttribute2.score))
                .attr('x2', width)
                .attr('y2', yScale(selectedAttribute2.score))
                .attr('stroke', 'black')
                .style("stroke-width", 3)
                .style("stroke-dasharray", ("10, 10"));

        }










    })


}

export { createBarChart, changeDecadeBarChart }