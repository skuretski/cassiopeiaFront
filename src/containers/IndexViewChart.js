import React, { Component } from 'react';
import { Line } from "react-chartjs";

export default class IndexViewChart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data) {
            return (
                <div>
                    <Line data={indexViewChartData(this.props.data)} width="700" height="350" />
                </div>    
            );
        } else {
            return <div></div>;
        }
    }
};

// sample from view-source:https://reactcommunity.org/react-chartjs/index.html
function rand(min, max, num) {
    var rtn = [];
    while (rtn.length < num) {
        rtn.push((Math.random() * (max - min)) + min);
    }
    return rtn;
}

// sample from view-source:https://reactcommunity.org/react-chartjs/index.html
function indexViewChartData(apiData) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477',
        '#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
    
    var beginMo = parseInt(apiData.sow[0].mo);
    var beginYr = parseInt(apiData.sow[0].yr);
    var endMo = parseInt(apiData.sow[apiData.sow.length - 1].mo);
    var endYr = parseInt(apiData.sow[apiData.sow.length - 1].yr);
    // TODO: also consider funding and assigned employees in determination of beginDate and endDate

    var someMo = beginMo;
    var someYr = beginYr;
    
    var chartData = {};

    // populate chart labels (x-axis points)
    chartData.labels = [];
    chartData.labels.push(months[parseInt(someMo) - 1] + '-' + parseInt(someYr));
    console.log(months[parseInt(someMo) - 1] + '-' + parseInt(someYr));
    while (1) {
        if (someMo < 12) {
            someMo++;
        }
        else {
            someYr++;
            someMo = 1;
        }
        chartData.labels.push(months[parseInt(someMo) - 1] + '-' + parseInt(someYr));
        console.log(months[parseInt(someMo) - 1] + '-' + parseInt(someYr));
        
        if (someMo == endMo && someYr == endYr) {
            break;
        }
    }

    // create chart datasets
    chartData.datasets = [];
    console.log(apiData.titles.length);
    var dsToProjMap = new Object();
    for (var i = 0; i < apiData.titles.length; i++) {
        var dataset = new Object();
        dataset.label = apiData.titles[i].title;
        dsToProjMap[apiData.titles[i].id] = i;
        dataset.data = [];
        dataset.label = 'StackedArea';
        dataset.fillColor = hexToRGB(default_colors[i % default_colors.length], 0.5);
        dataset.strokeColor = hexToRGB(default_colors[i % default_colors.length], 1); // the color of the line itself
        dataset.pointColor = hexToRGB(default_colors[i % default_colors.length], 0.5); // the fill color of the points
        dataset.pointStrokeColor = hexToRGB(default_colors[i % default_colors.length], 1); // the border color of the points
        chartData.datasets.push(dataset);
    }

    // get actual data to be plotted into chart datasets
    var sow = apiData.sow;
    var sowIndex = 0;
    var someDate;
    for (var i = 0; i < chartData.labels.length; i++) { // for each mo/yr combo on the chart
        for (var j = 0; j < chartData.datasets.length; j++) { // for each project (each project has its own dataset)
            // is there a SOW entry for this mo/yr for this project?
            // !!! this depends on the sow being in order by mo/yr/project !!!
            if (sowIndex < sow.length) {
                someDate = months[sow[sowIndex].mo - 1] + '-' + sow[sowIndex].yr;
                if (someDate == chartData.labels[i] && dsToProjMap[sow[sowIndex].project_id] == j) {
                    // to make a stacked area chart, we have make each line the sum of its own data plus the data underneath it
                    if (j == 0) {
                        chartData.datasets[j].data.push(sow[sowIndex].sum_man_mo);
                    }
                    else {
                        chartData.datasets[j].data.push(sow[sowIndex].sum_man_mo + chartData.datasets[j - 1].data[i]);
                    }
                    sowIndex++;
                }
                else { // there is NOT a SOW entry for this mo/yr for this project
                    if (j == 0) {
                        chartData.datasets[j].data.push(0);
                    }
                    else {
                        chartData.datasets[j].data.push(chartData.datasets[j - 1].data[i]);
                    }
                }
            }
            else { // there is NOT a SOW entry for this mo/yr for this project
                if (j == 0) {
                    chartData.datasets[j].data.push(0);
                }
                else {
                    chartData.datasets[j].data.push(chartData.datasets[j - 1].data[i]);
                }
            }
        }
    }

    // reverse datasets so the biggest will be drawn in back and the smaller values will be drawn in front
    var i = 0;
    var j = chartData.datasets.length - 1;
    while (i < j) {
        var tempDataSet = chartData.datasets[i];
        chartData.datasets[i] = chartData.datasets[j];
        chartData.datasets[j] = tempDataSet;
        i++;
        j--;
    }

    return chartData;
}

// shamelessly borrowed from here:
// http://stackoverflow.com/questions/21646738/convert-hex-to-rgba
function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}