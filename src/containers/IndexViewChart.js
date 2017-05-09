import React, { Component } from 'react';
import { Line } from "react-chartjs-2";

export default class IndexViewChart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data) {
            return (
                <div>
                    <Line data={indexViewChartData(this.props.data)} options={indexViewChartOptions()} />
                </div>    
            );
        } else {
            return <div></div>;
        }
    }
};

// https://github.com/gor181/react-chartjs-2
function indexViewChartOptions() {
    var chartOptions = {
        responsive: true,
        title: {
            display: true,
            text: 'Business Plan Overview'
        },
        scales: {
            yAxes: [
                {
                id: 'stacked',
                stacked: true,
                type: 'linear',
                scaleLabel: {
                    display: true,
                    labelString: 'Man-months'
                    }
                }, {
                id: 'default',
                stacked: false,
                type: 'linear',
                scaleLabel: {
                    display: true,
                    labelString: 'remove this axis after figuring out how to set different axes to same scale'
                    },
                display: false // show 2nd y-axis (only on for visual debugging)
            }]
        }
    };

    return chartOptions;
}

function indexViewChartData(apiData) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477',
        '#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
    
    // get the beginning mo/yr and end mo/yr from earliest and latest of SOW, funding, and assigned employees
    var beginMo = 12;
    var beginYr = Number.MAX_VALUE;
    var endMo = 1;
    var endYr = Number.MIN_VALUE;
    

    // TODO: refactor this super shitty code to pass the data into a function and return the begin and end dates for each data set (sow, funding, assigned_employees)
    if (apiData.sow.length > 0) {
        if (parseInt(apiData.sow[0].yr) < beginYr || (parseInt(apiData.sow[0].yr) == beginYr && parseInt(apiData.sow[0].mo) < beginMo)) {
            beginMo = apiData.sow[0].mo;
            beginYr = apiData.sow[0].yr;
        }
        if (parseInt(apiData.sow[apiData.sow.length - 1].yr) > endYr || (parseInt(apiData.sow[apiData.sow.length - 1].yr) == endYr && parseInt(apiData.sow[apiData.sow.length - 1].mo) > endMo)) {
            endMo = apiData.sow[apiData.sow.length - 1].mo;
            endYr = apiData.sow[apiData.sow.length - 1].yr;
        }
    }
    if (apiData.funding.length > 0) {
        if (parseInt(apiData.funding[0].yr) < beginYr || (parseInt(apiData.funding[0].yr) == beginYr && parseInt(apiData.funding[0].mo) < beginMo)) {
            beginMo = apiData.funding[0].mo;
            beginYr = apiData.funding[0].yr;
        }
        if (parseInt(apiData.funding[apiData.funding.length - 1].yr) > endYr || (parseInt(apiData.funding[apiData.funding.length - 1].yr) == endYr && parseInt(apiData.funding[apiData.funding.length - 1].mo) > endMo)) {
            endMo = apiData.funding[apiData.funding.length - 1].mo;
            endYr = apiData.funding[apiData.funding.length - 1].yr;
        }
    }
    if (apiData.assigned_employees.length > 0) {
        if (parseInt(apiData.assigned_employees[0].yr) < beginYr || (parseInt(apiData.assigned_employees[0].yr) == beginYr && parseInt(apiData.assigned_employees[0].mo) < beginMo)) {
            beginMo = apiData.assigned_employees[0].mo;
            beginYr = apiData.assigned_employees[0].yr;
        }
        if (parseInt(apiData.assigned_employees[apiData.assigned_employees.length - 1].yr) > endYr || (parseInt(apiData.assigned_employees[apiData.assigned_employees.length - 1].yr) == endYr && parseInt(apiData.assigned_employees[apiData.assigned_employees.length - 1].mo) > endMo)) {
            endMo = apiData.assigned_employees[apiData.assigned_employees.length - 1].mo;
            endYr = apiData.assigned_employees[apiData.assigned_employees.length - 1].yr;
        }
    }    

    var someMo = beginMo;
    var someYr = beginYr;
    var chartData = {};

    // populate chart labels (x-axis points)
    chartData.labels = [];
    chartData.labels.push(months[parseInt(someMo) - 1] + '-' + parseInt(someYr));
    while (1) {
        if (someMo < 12) {
            someMo++;
        }
        else {
            someYr++;
            someMo = 1;
        }
        chartData.labels.push(months[parseInt(someMo) - 1] + '-' + parseInt(someYr));
        
        if (someMo == endMo && someYr == endYr) {
            break;
        }
    }

    // create chart datasets for SOW
    chartData.datasets = [];
    var dsToProjMap = new Object();
    for (var i = 0; i < apiData.titles.length; i++) {
        var dataset = new Object();
        dataset.label = 'SOW: ' + apiData.titles[i].title;
        dsToProjMap[apiData.titles[i].id] = i;
        dataset.data = [];
        dataset.yAxisID = 'stacked';
        dataset.lineTension = 0;
        dataset.backgroundColor = hexToRGB(default_colors[i % default_colors.length], 0.5); // the color of the shading below the line
        dataset.borderColor = hexToRGB(default_colors[i % default_colors.length], 1); // the color of the line itself
        dataset.pointBackgroundColor = hexToRGB(default_colors[i % default_colors.length], 0.5); // the fill color of the points
        dataset.pointBorderColor = hexToRGB(default_colors[i % default_colors.length], 1); // the border color of the points
        //dataset.radius = 0; // this makes the points go away (negates the above 2 entries)
        chartData.datasets.push(dataset);
    }

    // get actual SOW data to be plotted into chart datasets
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
                    chartData.datasets[j].data.push(sow[sowIndex].sum_man_mo);
                    sowIndex++;
                }
                else { // there is NOT a SOW entry for this mo/yr for this project
                    chartData.datasets[j].data.push(0);
                }
            }
            else { // there is NOT a SOW entry for this mo/yr for this project
                chartData.datasets[j].data.push(0);
            }
        }
    }

    // create chart datasets for assigned employees
    var dataset = new Object();
    dataset.label = 'Total Assigned Employees';
    dataset.yAxisID = 'default';
    dataset.lineTension = 0;
    dataset.backgroundColor = 'transparent'; // the color of the shading below the line
    dataset.borderColor = hexToRGB('#000000', 1); // the color of the line itself
    dataset.borderDash = [2, 2];
    dataset.pointBackgroundColor = hexToRGB('#000000', 0.5); // the fill color of the points
    dataset.pointBorderColor = hexToRGB('#000000', 1); // the border color of the points
    //dataset.radius = 0; // this makes the points go away (negates the above 2 entries)

    // get actual assigned employee data to be plotted into chart datasets
    dataset.data = new Array(chartData.labels.length).fill(0);
    var j = 0;
    for (var i = 0; i < apiData.assigned_employees.length; i++) { // for each entry in apiData.assigned_employees
        someDate = months[apiData.assigned_employees[i].mo - 1] + '-' + apiData.assigned_employees[i].yr; // mo/yr of some entry in assigned_employees result from api
        while (someDate != chartData.labels[j]) {
            j++;
        }
        dataset.data[j] += apiData.assigned_employees[i].effort;
    }
    chartData.datasets.unshift(dataset);

    // create chart datasets for funding
    var dataset = new Object();
    dataset.label = 'Total Funding';
    dataset.yAxisID = 'default';
    dataset.lineTension = 0;
    dataset.backgroundColor = 'transparent'; // the color of the shading below the line
    dataset.borderColor = hexToRGB('#000000', 1); // the color of the line itself
    dataset.pointBackgroundColor = hexToRGB('#000000', 0.5); // the fill color of the points
    dataset.pointBorderColor = hexToRGB('#000000', 1); // the border color of the points
    //dataset.radius = 0; // this makes the points go away (negates the above 2 entries)

    // get actual funding data to be plotted into chart datasets
    dataset.data = new Array(chartData.labels.length).fill(0);
    var j = 0;
    for (var i = 0; i < apiData.funding.length; i++) { // for each entry in apiData.funding
        someDate = months[apiData.funding[i].mo - 1] + '-' + apiData.funding[i].yr; // mo/yr of some entry in funding result from api
        while (someDate != chartData.labels[j]) {
            j++;
        }
        dataset.data[j] += apiData.funding[i].funding_amt;
    }
    chartData.datasets.unshift(dataset);

    // align scales to be equal
    var maxYValue = 0;
    for (var i = 0; i < chartData.labels.length; i++) { // for each mo/yr combo on the chart
        maxYValue = Math.max(maxYValue, chartData.datasets[0].data[i]); // max value from funding
        maxYValue = Math.max(maxYValue, chartData.datasets[1].data[i]); // max value from assigned employees
        var sowSum = 0;
        for (var j = 2; j < chartData.datasets.length; j++) {
            sowSum += chartData.datasets[j].data[i];
        }
        maxYValue = Math.max(maxYValue, sowSum); // max value from combined (sandpiled) SOW
    }
    maxYValue = Math.ceil(maxYValue / 10) * 10; // TODO: make this a little smarter -> round to an appropriate max based on the value
    Chart.scaleService.updateScaleDefaults('linear', {
        ticks: {
            max: maxYValue
        }
    })    

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