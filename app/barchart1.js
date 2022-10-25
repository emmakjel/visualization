var twoIsSelected = false;
var alreadySelectedMusicAttribute;
var dataWithSelectedAttribute;



export const DECADES_DICT = { "all": 1, "fifties": 2, "sixties": 3, "seventies": 4, "eighties": 5, "nineties": 6, "twoThousands": 7, "twentyTens": 8 }
var selected_decade = DECADES_DICT["all"];




const width = 900;
const height = 450;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };


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
      .data(all_years_list, d => d.name) //dummy data, the second par is the one to be bound to the element
      .join("rect")
      .attr("x", (data, index) => xScale(index))
      .attr("y", data => yScale(data.score))
      .attr('title', (data) => data.score)
      .attr("height", d => yScale(0) - yScale(d.score))
      .attr("width", xScale.bandwidth())
      .attr("class", "rectValue itemValue")
      .on("mouseover", function (d, i) {
        d3.select(this)
          .attr('opacity', 0.7)
          .style("cursor", "pointer")
      })
      .on("mouseout", function () {
        d3
          .select(this)
          .attr('opacity', 1)
          .style("cursor", "pointer")
      })
      .on("click", (event, d) => {
        
       if (alreadySelectedMusicAttribute != d) { updateBarChartOrder(d) };
      });







    //svg.selectAll('.limit').remove()

    //x- axis name
    chart
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .attr("class", "names")
      .call(d3.axisBottom(xScale)
        .tickFormat(index => all_years_list[index].name)
        .tickSizeOuter(0))
      .attr('font-size', '20px'); //the music attributes 




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
      .attr('font-size', '30px')
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
      
    } else {
      //just put the selected attribute in 2nd place
      newData = dataWithSelectedAttribute;
      newData = newData.filter((val) => val != (musicAttribute))
      newData = newData.filter((val) => val != (alreadySelectedMusicAttribute));
      newData.unshift(alreadySelectedMusicAttribute, musicAttribute);



      alreadySelectedMusicAttribute = null;
      dataWithSelectedAttribute = null;
      twoIsSelected = true;
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
      .attr('font-size', '20px');




    svg
      .selectAll("rect.rectValue")
      .data(newData, d => d.name) //dummy data, the second par is the one to be bound to the element
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
    console.log("he")

}

export { createBarChart, changeDecadeBarChart }