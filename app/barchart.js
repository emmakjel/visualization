import { barLineHover, stopBarLineHover, selectBarLine } from './linechart.js'

export var twoIsSelected = false;
var alreadySelectedMusicAttribute;
var dataWithSelectedAttribute;


var selectedAttribute1;
var selectedAttribute2;


const COLORS = ["lightblue", "#F07470", "lightgreen", "orange", "pink", "#CF9FFF"]
const COLORS_DICT = { "popularity": "lightblue", "bpm": "#F07470", "danceability": "lightgreen", "valence": "orange", "acousticness": "pink", "speechiness": "#CF9FFF" }
export const DECADES_DICT = { "all": 1, "fifties": 2, "sixties": 3, "seventies": 4, "eighties": 5, "nineties": 6, "twoThousands": 7, "twentyTens": 8 }
var selected_decade = DECADES_DICT["all"];



const margin = { top: 50, bottom: 50, left: 50, right: 50 };
const width = 430;
const height = 410;

function hoverBar() {
    showToolTip(this);
    barLineHover(d3.select(this).attr("id"));
    d3
        .select(this)
        .attr('opacity', 1)
        .style("cursor", "pointer");
}

function stopHoverBar() {
    hideToolTip();
    var id = d3.select(this).attr("id");
    if (selectedAttribute1 != null && selectedAttribute2 == null) {
        if (selectedAttribute1.name.toUpperCase() != id) {
            d3
                .select(this)
                .attr('opacity', 0.7)
                .style("cursor", "pointer")
        }
    } else if (selectedAttribute2 != null && selectedAttribute1 == null) {
        if (selectedAttribute2.name.toUpperCase() != id) {
            d3
                .select(this)
                .attr('opacity', 0.7)
                .style("cursor", "pointer")
        }
    } else if (selectedAttribute1 != null && selectedAttribute2 != null) {
        if (selectedAttribute1.name.toUpperCase() != id && selectedAttribute2.name.toUpperCase() != id) {
            d3
                .select(this)
                .attr('opacity', 0.7)
                .style("cursor", "pointer")
        }
    } else {
        d3
            .select(this)
            .attr('opacity', 0.7)
            .style("cursor", "pointer")
    }
    stopBarLineHover(id)
}

export function lineBarHover(id) {
    d3.select("#" + id).attr('opacity', 1)
}

export function stopLineBarHover(id) {
    var bar = d3.select("#" + id);
    if (!d3.select("#" + id.toLowerCase()).classed("selected")) {
        bar.attr('opacity', 0.7);
    }
}

export function selectLineBar(id) {
    var d = d3.select("#" + id.toUpperCase());
    var attribute = { name: id, score: d.attr("title") }
    if (alreadySelectedMusicAttribute != attribute) { updateBarChartComparison(attribute) };
}


function selectBar(d) {
    if (alreadySelectedMusicAttribute != d) {
        selectBarLine(d.name.toLowerCase());
        updateBarChartComparison(d)
    }
}

function barchartAreaClick() {
    updateBarChartComparison(null);
}

function showToolTip(bar) {
    var tooltip = d3.select("#tooltip");
    var svg = d3.select("#gBarChart");
    var x = parseInt(d3.select(bar).attr("x"));
    var y = parseInt(d3.select(bar).attr("y")) - 25;
    tooltip
        .attr("x", x)
        .attr("y", y)
        .attr("class", "tool-tip");
    svg.append("text")
        .attr("x", x)
        .attr("y", y + 12)
        .style("font-size", "12")
        .attr("id", "tooltext")
        .text("Value: " + d3.select(bar).attr("title"));
}

function hideToolTip() {
    d3.select("#tooltip").attr("class", "hide");
    d3.select("#tooltext").remove();
}

function getColor(attribute) {
    if (attribute == "acousticness") {
        return COLORS_DICT.acousticness
    } else if (attribute == "popularity") {
        return COLORS_DICT.popularity
    } else if (attribute == "speechiness") {
        return COLORS_DICT.speechiness
    } else if (attribute == "bpm") {
        return COLORS_DICT.bpm
    } else if (attribute == "valence") {
        return COLORS_DICT.valence
    } else if (attribute == "danceability") {
        return COLORS_DICT.danceability
    } else {
        return "#000"
    }
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
            .attr("viewBox", [0, 0, width, height])

        svg
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr('width', "100%")
            .attr('height', "100%")
            .attr("id", "barchartarea")
            .attr("fill", "transparent")
            .on("click", barchartAreaClick);

        svg
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 50)
            .attr("height", 15)
            .attr("id", "tooltip")
            .attr("class", "hide")


        //color
        const chart = svg
            .append("g")
        //.attr("fill", '#808080');

        chart
            .append("g")
            .attr("id", "gXAxis")


        chart.append("g")
            .selectAll("rect.rectValue")
            .data(all_years_list.sort((a, b) => d3.descending(a.score, b.score)), d => d.name) //dummy data, the second par is the one to be bound to the element
            .join("rect")
            .attr("x", (data, index) => xScale(index))
            .attr("y", data => yScale(data.score))
            .attr("fill", (data, index) => COLORS[index])
            .attr('opacity', 0.7)
            .attr('title', (data) => data.score)
            .attr("id", data => data.name.toUpperCase())
            .attr("height", d => yScale(0) - yScale(d.score))
            .attr("width", xScale.bandwidth())
            .attr("class", "rectValue itemValue")
            .attr('ry', 5)
            .on("mouseover", hoverBar)
            .on("mouseout", stopHoverBar)
            .on("click", (event, d) => { selectBar(d) });


        //svg.selectAll('.limit').remove()

        //x- axis name
        chart
            .append('g')
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .attr("class", "names")
            .call(d3.axisBottom(xScale)
                .tickFormat(index => all_years_list[index].name)
                .tickSizeOuter(0))
            .attr('font-size', 10) //the music attributes 
            .selectAll("text")
            .attr('x', -40)
            .attr("transform", function (d) {
                return "rotate(-30)";
            });



        //names and grids 
        chart.append('g')
            .attr('transform', `translate(${margin.left})`)
            .attr("class", "grid")
            .call(d3.axisLeft(yScale).ticks(null, all_years_list.format)
                //.tickSize(-width, 0, 0) dont want the grids
            )
            .attr('font-size', 12); // the numbers one y-axis

        //labels
        chart.append('text')
            .attr('x', -(height / 2) - margin.top)
            .attr('y', 15)
            .attr('transform', 'rotate(-90)')
            .attr('font-size', 16)
            .attr('fill', 'black')
            .text('Average value')

        //text
        chart.append('text')
            .attr('x', width / 8 + margin.left)
            .attr('y', 30)
            .attr('font-size', 18)
            .attr('fill', 'black')
            .text('Average values of music features')
    })
}


export function updateBarChartComparison(musicAttribute) {
    const svg = d3.select("#gBarChart");
    if (musicAttribute == null) {
        svg.selectAll("rect").attr("stroke", "none");
        selectBarLine(null);
        svg.selectAll('.limit').remove();
        svg.selectAll('rect').attr("opacity", 0.7);
        selectedAttribute1 = null;
        selectedAttribute2 = null;
        alreadySelectedMusicAttribute = null;
    } else {
        const svg = d3.select("#gBarChart");


        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height - margin.bottom, margin.top])


        if (!alreadySelectedMusicAttribute) {
            //do the old thing
            alreadySelectedMusicAttribute = musicAttribute;
            twoIsSelected = false;
            selectedAttribute2 = null;
            selectedAttribute1 = musicAttribute;
            svg.selectAll("rect").attr("stroke", "none")
            svg.select("#" + musicAttribute.name.toUpperCase()).attr("stroke", "grey")
        } else {
            //just put the selected attribute in 2nd place
            svg.select("#" + musicAttribute.name.toUpperCase()).attr("stroke", "grey")
            alreadySelectedMusicAttribute = null;
            twoIsSelected = true;
            selectedAttribute2 = musicAttribute;
        }


        if (alreadySelectedMusicAttribute) { svg.selectAll('.limit').remove() }

        //the line
        const line = svg.append('line')
            .attr('class', 'limit')
            .attr('x1', 50)
            .attr('y1', yScale(musicAttribute.score))
            .attr('x2', width)
            .attr('y2', yScale(musicAttribute.score))
            .attr('stroke', getColor(musicAttribute.name.toLowerCase()))
            .style("stroke-width", 4)
            .style("stroke-dasharray", ("10, 10"));
    }
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

        /*
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
        */

        //enter, write code as the element where created the first time
        //update, the data that already exists

        const svg = d3.select("#gBarChart");
        svg.selectAll('.limit').remove();

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
            .attr('font-size', '10px')
            .selectAll("text")
            .attr('x', -40)
            .attr("transform", function (d) {
                return "rotate(-30)";
            });;

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
                        .attr('rx', 5)
                        .attr('rx', 5);

                },
                (update) => {
                    update
                        .transition()
                        .duration(500)
                        .attr("x", (data, index) => xScale(index))
                        .attr("y", data => yScale(data.score))
                        .attr("title", (data) => data.score)
                        .attr("height", d => yScale(0) - yScale(d.score))
                        .attr("width", xScale.bandwidth())
                        .attr("fill", d => getColor((d.name).toLowerCase()))
                        .attr("stroke", "none")
                        .attr("id", d => d.name.toUpperCase());
                    // Trenger vi linjene under?
                    //.attr("style", "outline: none")
                    //.filter((d, i) => selectedAttribute2 ? (i == 0 || i == 1) : selectedAttribute1 ? (i == 0) : i == null)
                    //.attr("fill", d => getColor((d.name).toLowerCase()))
                    //.attr("style", "outline: solid #black;")
                },
                (exit) => {
                    exit.remove();
                }


            )

        if (selectedAttribute1) {
            //the line
            svg.append('line')
                .attr('class', 'limit')
                .attr('x1', 50)
                .attr('y1', yScale(selectedAttribute1.score))
                .attr('x2', width)
                .attr('y2', yScale(selectedAttribute1.score))
                .attr('stroke', getColor(selectedAttribute1.name.toLowerCase()))
                .attr('stroke-opacity', 0.5)
                .style("stroke-width", 4)
                .style("stroke-dasharray", ("10, 10"));

        }

        if (selectedAttribute2) {
            //the line
            svg.append('line')
                .attr('class', 'limit')
                .attr('x1', 50)
                .attr('y1', yScale(selectedAttribute2.score))
                .attr('x2', width)
                .attr('y2', yScale(selectedAttribute2.score))
                .attr('stroke', getColor(selectedAttribute2.name.toLowerCase()))
                .attr('stroke-opacity', 0.5)
                .style("stroke-width", 4)
                .style("stroke-dasharray", ("10, 10"));
        }
    })


}

export { createBarChart, changeDecadeBarChart }