import React, { Component } from 'react';
import { Line } from "react-chartjs-2";
// https://github.com/gor181/react-chartjs-2
import _ from 'lodash';

export default class FundingViewByProjectChart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!_.isEmpty(this.props.data)) {
            Chart.defaults.global.title.fontSize = 24;
            Chart.defaults.global.defaultFontSize = 14;
            var chartInfo = this.fundingViewChartInfo(this.props.data, this.props.selType);
            if (!_.isEmpty(chartInfo.data)) {
                return (
                    <div>
                        <Line data={chartInfo.data} options={chartInfo.options} />
                    </div>
                );
            } else {
                return <div><br/><h3>No data available to provide plot.</h3><br/></div>;
            }
        } else {
            return <div></div>;
        }
    }

    // -----------------------------------------------------------------------------
    // Define Info For The Chart
    // -----------------------------------------------------------------------------
    fundingViewChartInfo(apiData, selType) {
        var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477',
            '#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
        var chartData = {};
        
        // -----------------------------------------------------------------------------
        // Get the beginning mo/yr and end mo/yr
        // -----------------------------------------------------------------------------
        if (apiData.date_range.length == 0) {
            return {data: {}, options: {}};
        }
        var beginMo;
        var beginYr;
        var endMo;
        var endYr;

        if (selType == -1) {
            beginMo = apiData.date_range[0].mo;
            beginYr = apiData.date_range[0].yr;
            endMo = apiData.date_range[apiData.date_range.length - 1].mo;
            endYr = apiData.date_range[apiData.date_range.length - 1].yr;
        }
        else {
            var cash = 9;
            for (var i = 0; i < apiData.by_type.length; i++) {
                if (apiData.by_project[i].fundingType_id == selType) {
                    beginMo = apiData.by_project[i].mo;
                    beginYr = apiData.by_project[i].yr;
                    break;
                }
            }
            for (var i = apiData.by_type.length - 1; i >= 0; i--) {
                if (apiData.by_project[i].fundingType_id == selType) {
                    endMo = apiData.by_project[i].mo;
                    endYr = apiData.by_project[i].yr;
                    break;
                }
            }
        }
        if (typeof beginMo == 'undefined' || typeof endMo == 'undefined' || typeof beginYr == 'undefined' || typeof endYr == 'undefined') {
            return {data: {}, options: {}};
        }

        // -----------------------------------------------------------------------------
        // Populate chart labels (x-axis points)
        // -----------------------------------------------------------------------------
        var someMo = beginMo;
        var someYr = beginYr;
        chartData.labels = [];
        chartData.labels.push(this.dateHelper(someMo, someYr));
        while (1) {
            if (someMo < 12) {
                someMo++;
            }
            else {
                someYr++;
                someMo = 1;
            }
            chartData.labels.push(this.dateHelper(someMo, someYr));
            
            if (someMo == endMo && someYr == endYr) {
                break;
            }
        }

        // -----------------------------------------------------------------------------
        // Create chart datasets for funding
        // -----------------------------------------------------------------------------
        chartData.datasets = [];
        var dsToProjMap = new Object();
        for (var i = 0; i < apiData.project.length; i++) {
            var dataset = new Object();
            dataset.label = 'Project: ' + apiData.project[i].title;
            dsToProjMap[apiData.project[i].id] = i;
            dataset.data = new Array(chartData.labels.length).fill(0);
            dataset.yAxisID = 'stacked';
            dataset.lineTension = 0;
            dataset.backgroundColor = this.hexToRGB(default_colors[i % default_colors.length], 0.5); // the color of the shading below the line
            dataset.borderColor = this.hexToRGB(default_colors[i % default_colors.length], 1); // the color of the line itself
            dataset.pointBackgroundColor = this.hexToRGB(default_colors[i % default_colors.length], 0.5); // the fill color of the points
            dataset.pointBorderColor = this.hexToRGB(default_colors[i % default_colors.length], 1); // the border color of the points
            //dataset.radius = 0; // this makes the points go away (negates the above 2 entries)
            chartData.datasets.push(dataset);
        }

        // -----------------------------------------------------------------------------
        // Get actual funding data (for each project) to be plotted into chart datasets
        // -----------------------------------------------------------------------------
        var someDate;
        var j = 0;
        for (var i = 0; i < apiData.by_project.length; i++) { // for each entry in apiData.sow
            if (selType == -1 || apiData.by_project[i].fundingType_id == selType) {
            someDate = this.dateHelper(apiData.by_project[i].mo, apiData.by_project[i].yr); // mo/yr of some entry in funding result in API
            while (someDate != chartData.labels[j]) {
                //console.log('j = ' + j);
                j++;
            }
            if (selType == -1 || selType == apiData.by_project[i].fundingType_id) {
                chartData.datasets[dsToProjMap[apiData.by_project[i].project_id]].data[j] += apiData.by_project[i].funding_amt;
                }
            }
        }
        dsToProjMap = null; // i'm going to unshift into the dataset below, which will break the map
        // -----------------------------------------------------------------------------
        // Align scales to be equal
        // -----------------------------------------------------------------------------
        var maxYValue = 0;
        for (var i = 0; i < chartData.labels.length; i++) { // for each mo/yr combo on the chart
            var sowSum = 0;
            for (var j = 0; j < chartData.datasets.length; j++) {
                sowSum += chartData.datasets[j].data[i];
            }
            maxYValue = Math.max(maxYValue, sowSum); // max value from combined (sandpiled) SOW
        }
        // console.log('maxYValue:' + maxYValue);
        if (maxYValue == Math.ceil(maxYValue / 10) * 10) {
            maxYValue += 10;
        }
        else {
            maxYValue = Math.ceil(maxYValue / 10) * 10; // TODO: make this a little smarter -> round to an appropriate max based on the value
        }
        if (maxYValue < 10) {
            maxYValue = 10;
        }

        // -----------------------------------------------------------------------------
        // Get display options for the chart
        // -----------------------------------------------------------------------------
        var chartOptions = {
            responsive: true,
            title: {
                display: false,
                text: 'does not matter not displaying title anyway'
            },
            scales: {
                yAxes: [
                    {
                    id: 'stacked', // this yAxes is used for the stacked area datasets
                    stacked: true,
                    type: 'linear',
                    ticks: {
                        min: 0,
                        max: maxYValue
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Man-Months'
                        }
                    }, {
                    id: 'default', // this yAxes is used for the basic line datasets
                    stacked: false,
                    type: 'linear',
                    ticks: {
                        min: 0,
                        max: maxYValue
                    },
                    scaleLabel: {
                        display: true,
                        labelString: '2nd axis that will not normally be displayed'
                        },
                    display: false // show 2nd y-axis (only on for visual debugging)
                }]
            },
            legend: {
                display: true,
                position: 'right',
                reverse: true,
                labels: {
                    boxWidth: 20
                }
            }
        };

        return {data: chartData, options: chartOptions};
    }

    // shamelessly borrowed from here:
    // http://stackoverflow.com/questions/21646738/convert-hex-to-rgba
    hexToRGB(hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }
    }

    // convert mo=2 and yr=2019 to "Feb-2019"
    dateHelper(mo, yr) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return (months[mo - 1] + '-' + yr);
    }
};
