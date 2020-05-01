//Grab the JSON data from the data folder

function plotData(y) {
    d3.json("./data/samples.json").then(function(data2) {

        console.log(data2);

        let otuID = data2.samples[0].otu_ids;

        let otuSampleSize = data2.samples[0].sample_values;

        let otuLabel =  data2.samples[0].otu_labels

    // https://stackoverflow.com/questions/39254218/js-get-top-5-max-elements-from-array
        
        let topOTUs = (data2.samples[0].otu_ids.slice(0, 10)).reverse();

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        
        var OTU_id = topOTUs.map(x => "OTU " + x);
        
        let otuLabels =  data2.samples[0].otu_labels.slice(0,10);

        // https://codepen.io/etpinard/pen/YEbWoO?editors=0010
        var bartrace = {
            x: topOTUs,
            y: OTU_id,
            text: otuLabels,
            type:"bar",
            orientation: "h",
            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'ascending'
              }]
        };

        var chartThisHBar = [bartrace];

        // https://plotly.com/javascript/figure-labels/

        var layoutHBar = {
            title: {text: "Top ten OTUs found"},
            xaxis: {
                title: {text: "volume"}
            },
            yaxis: {
                title: {text: "OTU ID #"},
            },

        };

        Plotly.newPlot("hplot", chartThisHBar, layoutHBar,);
    
    // https://plotly.com/javascript/bubble-charts/
    
        var bubbletrace = {
            x: otuID,
            y: otuSampleSize,
            mode: "markers",
            marker: {
                size: otuSampleSize,
                color: otuID
            },
            text: otuLabel
        };

        var layoutBubble = {
            xaxis: {title: "OTU ID"}
        }

        var chartThisBubble = [bubbletrace];

        Plotly.newPlot("bubblechart", chartThisBubble, layoutBubble);

    });

}

function writeData(y) {
    d3.json("./data/samples.json").then(function(data3) {
    
        let partData = data3.metadata;
        console.log(partData);
    
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

        let participant = partData.filter(thisVariable => thisVariable.id.toString() === y)[0];

        let participantInformation = d3.select("#participantDataBox");
        
        participantInformation.html("");

        Object.entries(participant).forEach((key) => {   

        participantInformation.append("h5").text(key[0] + ": " + key[1] + "\n");    
    });
    
    });
}


function choice(y) {
    plotData(y);
    writeData(y);
}

function kickoff() {
    let dropdown = d3.select("#dropDown");

    d3.json("./data/samples.json").then(function(data1) {
    
        data1.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        plotData(data1.names[0]);
        writeData(data1.names[0]);
    });
}

kickoff();