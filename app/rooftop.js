import { selectBar, updateBarChartComparison} from "./barchart.js";

const RECT_ARROW_DICT = {   "arrow1arrow2": "rect0", 
                            "arrow1arrow3": "rect1", 
                            "arrow1arrow4": "rect2", 
                            "arrow1arrow5": "rect3", 
                            "arrow1arrow6": "rect4",
                            "arrow2arrow3": "rect5",
                            "arrow2arrow4": "rect6",
                            "arrow2arrow5": "rect7",
                            "arrow2arrow6": "rect8",
                            "arrow3arrow4": "rect9",
                            "arrow3arrow5": "rect10",
                            "arrow3arrow6": "rect11",
                            "arrow4arrow5": "rect12",
                            "arrow4arrow6": "rect13",
                            "arrow5arrow6": "rect14"
                        }

const margin = { top: 80, right: 2, bottom: 2, left: 80 },
    width = 430 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom;

var selectedFeature;
var twoSelectedFeatures = false;
var selectedByBar = false;

const POSITION = [
    { rect: "#rect0", x: -345, y: -160 },
    { rect: "#rect1", x: -300, y: -115 },
    { rect: "#rect2", x: -260, y: -75 },
    { rect: "#rect3", x: -220, y: -35 },
    { rect: "#rect4", x: -180, y: 5 },
    { rect: "#rect5", x: -345, y: -75 },
    { rect: "#rect6", x: -300, y: -35 },
    { rect: "#rect7", x: -260, y: 5 },
    { rect: "#rect8", x: -220, y: 45 },
    { rect: "#rect9", x: -345, y: 5 },
    { rect: "#rect10", x: -300, y: 45 },
    { rect: "#rect11", x: -260, y: 90 },
    { rect: "#rect12", x: -345, y: 90 },
    { rect: "#rect13", x: -300, y: 130 },
    { rect: "#rect14", x: -345, y: 170 }
];

export function setSelectedByBar(val) {
    selectedByBar = val;
}

function findPosition(id) {
    for (var i = 0; i < POSITION.length; ++i) {
        if (POSITION[i].rect === id)
            return POSITION[i];
    }
}

function showCorrelationNumbers(id) {
    const svg = d3.select("#gRooftop");
    d3.select("#"+id).style("stroke", "black").attr("stroke-width", 2);
    svg.append("text")
        .attr("x", findPosition("#"+id).x)
        .attr("y", findPosition("#"+id).y)
        .style("font-size", "17")
        .attr("id", "tooltext"+id)
        .attr("pointer-events", "none")
        .text(d3.select("#"+id).attr("title"))
        .attr('transform', 'rotate(-135)');
}

function hideCorrelationNumbers(id) {
    d3.select("#tooltext"+id).remove();
    d3.select("#"+id).style("stroke", "none");
}

function hideAllCorrelationNumbers() {
    var svg = d3.select("#gRooftop")
    svg.selectAll("text").remove();
    svg.selectAll("rect").style("stroke", "none");
}

function selectCorrAttributes() {
    if (d3.select(this).classed("attribute-button-selected")) {
        updateBarChartComparison(null);
        hideAllCorrelationNumbers();
        d3.selectAll("button").classed("attribute-button-selected", false);
        twoSelectedFeatures = false;
        selectedFeature = null;
    } else {
        d3.select(this).classed("attribute-button-selected", true);
        if (d3.select(this).attr("id") == "arrow1") {
            var bar = {name: "BPM", score: d3.select("#BPM").attr("title")}
            if (!selectedByBar) {
                selectBar(bar)
            }
            if (selectedFeature == null && !twoSelectedFeatures) {
                selectedFeature = "arrow1";
                showCorrelationNumbers("rect0");
                showCorrelationNumbers("rect1");
                showCorrelationNumbers("rect2");
                showCorrelationNumbers("rect3");
                showCorrelationNumbers("rect4");
            } else if (!twoSelectedFeatures && selectedFeature != null) {
                hideAllCorrelationNumbers();
                twoSelectedFeatures = true;
                var arrowRect = RECT_ARROW_DICT["arrow1"+selectedFeature];
                showCorrelationNumbers(arrowRect);
                selectedFeature = null;
            } else {
                hideAllCorrelationNumbers();
                d3.selectAll("button").classed("attribute-button-selected", false);
                d3.select(this).classed("attribute-button-selected", true);
                twoSelectedFeatures = null;
                selectedFeature = "arrow1";
                showCorrelationNumbers("rect0");
                showCorrelationNumbers("rect1");
                showCorrelationNumbers("rect2");
                showCorrelationNumbers("rect3");
                showCorrelationNumbers("rect4");
            }
            selectedByBar = false;
        }
        else if (d3.select(this).attr("id") == "arrow2") {
            var bar = {name: "Danceability", score: d3.select("#DANCEABILITY").attr("title")}
            if (!selectedByBar) {
                selectBar(bar)
            }
            if (selectedFeature == null && !twoSelectedFeatures) {
                selectedFeature = "arrow2";
                showCorrelationNumbers("rect0");
                showCorrelationNumbers("rect5");
                showCorrelationNumbers("rect6");
                showCorrelationNumbers("rect7");
                showCorrelationNumbers("rect8");
            } else if (!twoSelectedFeatures && selectedFeature != null) {
                hideAllCorrelationNumbers();
                twoSelectedFeatures = true;
                var arrowRect;
                if (selectedFeature == "arrow1") {
                    arrowRect = RECT_ARROW_DICT[selectedFeature+"arrow2"];
                } else {
                    arrowRect = RECT_ARROW_DICT["arrow2"+selectedFeature];
                }
                showCorrelationNumbers(arrowRect);
                selectedFeature = null;
            } else {
                hideAllCorrelationNumbers();
                d3.selectAll("button").classed("attribute-button-selected", false);
                d3.select(this).classed("attribute-button-selected", true);
                twoSelectedFeatures = null;
                selectedFeature = "arrow2";
                showCorrelationNumbers("rect0");
                showCorrelationNumbers("rect5");
                showCorrelationNumbers("rect6");
                showCorrelationNumbers("rect7");
                showCorrelationNumbers("rect8");
            }
            selectedByBar = false;
        }
        else if (d3.select(this).attr("id") == "arrow3") {
            var bar = {name: "Valence", score: d3.select("#VALENCE").attr("title")}
            if (!selectedByBar) {
                selectBar(bar)
            }
            if (selectedFeature == null && !twoSelectedFeatures) {
                selectedFeature = "arrow3";
                showCorrelationNumbers("rect1");
                showCorrelationNumbers("rect5");
                showCorrelationNumbers("rect9");
                showCorrelationNumbers("rect10");
                showCorrelationNumbers("rect11");
            } else if (!twoSelectedFeatures && selectedFeature != null) {
                hideAllCorrelationNumbers();
                twoSelectedFeatures = true;
                var arrowRect;
                if (selectedFeature == "arrow1" || selectedFeature == "arrow2") {
                    arrowRect = RECT_ARROW_DICT[selectedFeature+"arrow3"];
                } else {
                    arrowRect = RECT_ARROW_DICT["arrow3"+selectedFeature];
                }
                showCorrelationNumbers(arrowRect);
                selectedFeature = null;
            } else {
                hideAllCorrelationNumbers();
                d3.selectAll("button").classed("attribute-button-selected", false);
                d3.select(this).classed("attribute-button-selected", true);
                twoSelectedFeatures = null;
                selectedFeature = "arrow3";
                showCorrelationNumbers("rect1");
                showCorrelationNumbers("rect5");
                showCorrelationNumbers("rect9");
                showCorrelationNumbers("rect10");
                showCorrelationNumbers("rect11");
            }
            selectedByBar = false;
        }
        else if (d3.select(this).attr("id") == "arrow4") {
            var bar = {name: "Acousticness", score: d3.select("#ACOUSTICNESS").attr("title")}
            if (!selectedByBar) {
                selectBar(bar)
            }
            if (selectedFeature == null && !twoSelectedFeatures) {
                selectedFeature = "arrow4";
                showCorrelationNumbers("rect2");
                showCorrelationNumbers("rect6");
                showCorrelationNumbers("rect9");
                showCorrelationNumbers("rect12");
                showCorrelationNumbers("rect13");
            } else if (!twoSelectedFeatures && selectedFeature != null) {
                hideAllCorrelationNumbers();
                twoSelectedFeatures = true;
                var arrowRect;
                if (selectedFeature == "arrow5" || selectedFeature == "arrow6") {
                    arrowRect = RECT_ARROW_DICT["arrow4" + selectedFeature];
                } else {
                    arrowRect = RECT_ARROW_DICT[selectedFeature + "arrow4"];
                }
                showCorrelationNumbers(arrowRect);
                selectedFeature = null;
            } else {
                hideAllCorrelationNumbers();
                d3.selectAll("button").classed("attribute-button-selected", false);
                d3.select(this).classed("attribute-button-selected", true);
                twoSelectedFeatures = null;
                selectedFeature = "arrow4";
                showCorrelationNumbers("rect2");
                showCorrelationNumbers("rect6");
                showCorrelationNumbers("rect9");
                showCorrelationNumbers("rect12");
                showCorrelationNumbers("rect13");
            }
            selectedByBar = false;
        }
        else if (d3.select(this).attr("id") == "arrow5") {
            var bar = {name: "Speechiness", score: d3.select("#SPEECHINESS").attr("title")}
            if (!selectedByBar) {
                selectBar(bar)
            }
            if (selectedFeature == null && !twoSelectedFeatures) {
                selectedFeature = "arrow5";
                showCorrelationNumbers("rect3");
                showCorrelationNumbers("rect7");
                showCorrelationNumbers("rect10");
                showCorrelationNumbers("rect12");
                showCorrelationNumbers("rect14");
            } else if (!twoSelectedFeatures && selectedFeature != null) {
                hideAllCorrelationNumbers();
                twoSelectedFeatures = true;
                var arrowRect;
                if (selectedFeature == "arrow6") {
                    arrowRect = RECT_ARROW_DICT["arrow5" + selectedFeature];
                } else {
                    arrowRect = RECT_ARROW_DICT[selectedFeature + "arrow5"];
                }
                showCorrelationNumbers(arrowRect);
                selectedFeature = null;
            } else {
                hideAllCorrelationNumbers();
                d3.selectAll("button").classed("attribute-button-selected", false);
                d3.select(this).classed("attribute-button-selected", true);
                twoSelectedFeatures = null;
                selectedFeature = "arrow5";
                showCorrelationNumbers("rect3");
                showCorrelationNumbers("rect7");
                showCorrelationNumbers("rect10");
                showCorrelationNumbers("rect12");
                showCorrelationNumbers("rect14");
            }
            selectedByBar = false;
        }
        else if (d3.select(this).attr("id") == "arrow6") {
            var bar = {name: "Popularity", score: d3.select("#POPULARITY").attr("title")}
            if (!selectedByBar) {
                selectBar(bar)
            }
            if (selectedFeature == null && !twoSelectedFeatures) {
                selectedFeature = "arrow6";
                showCorrelationNumbers("rect4");
                showCorrelationNumbers("rect8");
                showCorrelationNumbers("rect11");
                showCorrelationNumbers("rect13");
                showCorrelationNumbers("rect14");
            } else if (!twoSelectedFeatures && selectedFeature != null) {
                hideAllCorrelationNumbers();
                twoSelectedFeatures = true;
                var arrowRect = RECT_ARROW_DICT[selectedFeature + "arrow6"]
                showCorrelationNumbers(arrowRect);
                selectedFeature = null;
            } else {
                hideAllCorrelationNumbers();
                d3.selectAll("button").classed("attribute-button-selected", false);
                d3.select(this).classed("attribute-button-selected", true);
                twoSelectedFeatures = null;
                selectedFeature = "arrow6";
                showCorrelationNumbers("rect4");
                showCorrelationNumbers("rect8");
                showCorrelationNumbers("rect11");
                showCorrelationNumbers("rect13");
                showCorrelationNumbers("rect14");
            }
            selectedByBar = false;
        }
    }
}

export function resetMatrix() {
    hideAllCorrelationNumbers();
    twoSelectedFeatures = false;
    selectedFeature = null;
    selectedByBar = false;
    d3.selectAll("button").classed("attribute-button-selected", false);
}

function createRooftopMatrix(id) {
    // append the svg object to the body of the page
    const svg = d3.select("#vi5")
        .attr("id", "gRooftop")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .on("click", hideAllCorrelationNumbers)
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

        d3.select("#arrow1").on("click", selectCorrAttributes);
        d3.select("#arrow2").on("click", selectCorrAttributes);
        d3.select("#arrow3").on("click", selectCorrAttributes);
        d3.select("#arrow4").on("click", selectCorrAttributes);
        d3.select("#arrow5").on("click", selectCorrAttributes);
        d3.select("#arrow6").on("click", selectCorrAttributes);

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