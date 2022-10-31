

const DECADE_INDEX_DICT = { "all": 0, "fifties": 2, "sixties": 4, "seventies": 6, "eighties": 8, "nineties": 10, "twothousands": 12, "twentytens": 14 };


//THIS FILE IS GOING TO WORK FOR BOTH OF THE WORD CLOUDS
//NOW IT ONLY CONSOLE LOGS THE LISTS

function createWordCloud(csv, id) {
    d3.csv(csv).then(function (data) {
        var top_list = [];
        data.forEach(element => {
            let item = { "name": element.all, "count": parseInt(element.allCount) }
            top_list.push(item);
            
        });
        //console.log(top_list);

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
       // console.log(top_list);
    })

}

export { createWordCloud, updateWordCloud }




