import React, { Component } from 'react';
import { Line } from "react-chartjs-2";
// https://github.com/gor181/react-chartjs-2
import _ from 'lodash';

export default class IndexViewChart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!_.isEmpty(this.props.data)) {
            Chart.defaults.global.title.fontSize = 24;
            Chart.defaults.global.defaultFontSize = 14;
            var chartInfo = this.indexViewChartInfo(this.props.data);
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
    indexViewChartInfo(apiData) {
        var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477',
            '#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
        var chartData = {};
        
        // -----------------------------------------------------------------------------
        // Get the beginning mo/yr and end mo/yr from earliest and latest of SOW, funding, and assigned employees
        // -----------------------------------------------------------------------------
        if (apiData.date_range.length == 0) {
            return {data: {}, options: {}};
        }
        var beginMo = apiData.date_range[0].mo;
        var beginYr = apiData.date_range[0].yr;
        var endMo = apiData.date_range[apiData.date_range.length - 1].mo;
        var endYr = apiData.date_range[apiData.date_range.length - 1].yr;
        
        // -----------------------------------------------------------------------------
        // Populate chart labels (x-axis points)
        // -----------------------------------------------------------------------------
        var someMo = [];
        someMo.push(beginMo);
        someMo.push(beginYr);

        chartData.labels = [];
        var cdlMo = []; var cdlYr = [];
        cdlMo.push(someMo[0]); cdlYr.push(someMo[1]);
        chartData.labels.push(this.dateHelper(someMo[0], someMo[1]));
        while (1) {
            someMo = this.nextMonth(someMo[0], someMo[1]);
            cdlMo.push(someMo[0]); cdlYr.push(someMo[1]);
            chartData.labels.push(this.dateHelper(someMo[0], someMo[1]));
            
            if (someMo[0] >= endMo && someMo[1] == endYr) {
                break;
            }
        }

        // -----------------------------------------------------------------------------
        // Create chart datasets for SOW
        // -----------------------------------------------------------------------------
        chartData.datasets = [];
        var dsToProjMap = new Object();
        for (var i = 0; i < apiData.titles.length; i++) {
            var dataset = new Object();
            dataset.label = 'SOW: ' + apiData.titles[i].title;
            dsToProjMap[apiData.titles[i].id] = i;
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
        // Get actual SOW data (for each project) to be plotted into chart datasets
        // -----------------------------------------------------------------------------
        var someDate;
        var j = 0;
        for (var i = 0; i < apiData.sow.length; i++) { // for each entry in apiData.sow
            //console.log(apiData.sow[i]);
            //console.log(apiData.sow[i].mo);
            someDate = this.dateHelper(apiData.sow[i].mo, apiData.sow[i].yr); // mo/yr of some entry in SOW result from api
            while (someDate != chartData.labels[j]) {
                j++;
            }
            chartData.datasets[dsToProjMap[apiData.sow[i].project_id]].data[j] += apiData.sow[i].sum_man_mo;
        }
        dsToProjMap = null; // i'm going to unshift into the dataset below, which will break the map

        // -----------------------------------------------------------------------------
        // Create chart datasets for funding
        // -----------------------------------------------------------------------------
        var fund_color = '#000000';
        var dataset = new Object();
        dataset.label = 'Total Funding';
        dataset.yAxisID = 'default';
        dataset.lineTension = 0;
        dataset.backgroundColor = 'transparent'; // the color of the shading below the line
        dataset.borderColor = this.hexToRGB(fund_color, 1); // the color of the line itself
        dataset.pointBackgroundColor = this.hexToRGB(fund_color, 0.5); // the fill color of the points
        dataset.pointBorderColor = this.hexToRGB(fund_color, 1); // the border color of the points
        dataset.pointStyle = 'rect';
        //dataset.radius = 0; // this makes the points go away (negates the above 2 entries)

        // -----------------------------------------------------------------------------
        // Get actual funding data to be plotted into chart datasets
        // -----------------------------------------------------------------------------
        dataset.data = new Array(chartData.labels.length).fill(0);
        var j = 0;
        for (var i = 0; i < apiData.funding.length; i++) { // for each entry in apiData.funding
            someDate = this.dateHelper(apiData.funding[i].mo, apiData.funding[i].yr); // mo/yr of some entry in funding result from api
            while (someDate != chartData.labels[j]) {
                j++;
            }
            dataset.data[j] += apiData.funding[i].funding_amt;
        }
        chartData.datasets.unshift(dataset);

        // -----------------------------------------------------------------------------
        // Create chart datasets for assigned employees
        // -----------------------------------------------------------------------------
        var ae_color = '#090F0E';
        var dataset = new Object();
        dataset.label = 'Total Assigned Employees';
        dataset.yAxisID = 'default';
        dataset.lineTension = 0;
        dataset.backgroundColor = 'transparent'; // the color of the shading below the line
        dataset.borderColor = this.hexToRGB(ae_color, 1); // the color of the line itself
        dataset.borderDash = [2, 2];
        dataset.pointBackgroundColor = this.hexToRGB(ae_color, 0.5); // the fill color of the points
        dataset.pointBorderColor = this.hexToRGB(ae_color, 1); // the border color of the points
        dataset.pointStyle = 'star';
        //dataset.radius = 0; // this makes the points go away (negates the above 2 entries)

        // -----------------------------------------------------------------------------
        // Get actual assigned employee data to be plotted into chart datasets
        // -----------------------------------------------------------------------------
        dataset.data = new Array(chartData.labels.length).fill(0);
        var j = 0;
        for (var i = 0; i < apiData.assigned_employees.length; i++) { // for each entry in apiData.funding
            someDate = this.dateHelper(apiData.assigned_employees[i].mo, apiData.assigned_employees[i].yr); // mo/yr of some entry in funding result from api
            while (someDate != chartData.labels[j]) {
                j++;
            }
            dataset.data[j] += apiData.assigned_employees[i].sum_effort;
        }
        chartData.datasets.unshift(dataset);

        // -----------------------------------------------------------------------------
        // Create chart datasets for active employees
        // -----------------------------------------------------------------------------
        var ae_color = '#090F0E';
        var dataset = new Object();
        dataset.label = 'Total Active Employees';
        dataset.yAxisID = 'default';
        dataset.lineTension = 0;
        dataset.backgroundColor = 'transparent'; // the color of the shading below the line
        dataset.borderColor = this.hexToRGB(ae_color, 1); // the color of the line itself
        dataset.borderDash = [6, 6];
        dataset.pointBackgroundColor = this.hexToRGB(ae_color, 0.5); // the fill color of the points
        dataset.pointBorderColor = this.hexToRGB(ae_color, 1); // the border color of the points
        dataset.pointStyle = 'cross';
        //dataset.radius = 0; // this makes the points go away (negates the above 2 entries)

        // -----------------------------------------------------------------------------
        // Get active employee data to be plotted into chart datasets
        // assumes all employees in database have active start <= active end
        // assumes all act_emp values returned from db will be >= 0 (non-negative)
        // -----------------------------------------------------------------------------
        dataset.data = new Array(chartData.labels.length).fill(0);

        var num_act_emp = 0;
        var aes = 0; var aee = 0; var cdl = 0;

        while (aes < apiData.active_employee_starts.length && cdl < cdlMo.length && aee < apiData.active_employee_ends.length) {
        // console.log('num_act_emp='+num_act_emp+'; cdl='+cdl+', '+cdlMo[cdl]+'_'+cdlYr[cdl]+'; aes='+aes+', '+apiData.active_employee_starts[aes].start_mo+'_'+apiData.active_employee_starts[aes].start_yr+'; aee='+aee+', '+apiData.active_employee_ends[aee].end_mo+'_'+apiData.active_employee_ends[aee].end_yr);
            if (this.dateCompare(apiData.active_employee_starts[aes].start_mo, apiData.active_employee_starts[aes].start_yr, cdlMo[cdl], cdlYr[cdl]) <= 1 &&
                this.dateCompare(apiData.active_employee_starts[aes].start_mo, apiData.active_employee_starts[aes].start_yr, apiData.active_employee_ends[aee].end_mo, apiData.active_employee_ends[aee].end_yr) <= 1) {
                    // the active_employee_starts mo/yr is the current earliest, so advance to next active_employee_starts mo/yr
                    num_act_emp += apiData.active_employee_starts[aes].act_emp;
                    aes++;
                }
            else if (this.dateCompare(cdlMo[cdl], cdlYr[cdl], apiData.active_employee_starts[aes].start_mo, apiData.active_employee_starts[aes].start_yr) <= 1 &&
                this.dateCompare(cdlMo[cdl], cdlYr[cdl], apiData.active_employee_ends[aee].end_mo, apiData.active_employee_ends[aee].end_yr) <= 1) {
                    // the chartDataLabel mo/yr is the current earliest, so advance to next chartDataLabel mo/yr
                    dataset.data[cdl] = num_act_emp;
                    cdl++;
                }
            else if (this.dateCompare(apiData.active_employee_ends[aee].end_mo, apiData.active_employee_ends[aee].end_yr, cdlMo[cdl], cdlYr[cdl]) <= 1 &&
                this.dateCompare(apiData.active_employee_ends[aee].end_mo, apiData.active_employee_ends[aee].end_yr, apiData.active_employee_starts[aes].start_mo, apiData.active_employee_starts[aes].start_yr) <= 1) {
                    // the active_employee_ends mo/yr is the current earliest, so advance to next active_employee_ends mo/yr
                    num_act_emp -= apiData.active_employee_ends[aee].act_emp;
                    aee++;
                }
        }

        while (aes < apiData.active_employee_starts.length && cdl < cdlMo.length) {
        // console.log('num_act_emp='+num_act_emp+'; cdl='+cdl+', '+cdlMo[cdl]+'_'+cdlYr[cdl]+'; aes='+aes+', '+apiData.active_employee_starts[aes].start_mo+'_'+apiData.active_employee_starts[aes].start_yr);
            if (this.dateCompare(apiData.active_employee_starts[aes].start_mo, apiData.active_employee_starts[aes].start_yr, cdlMo[cdl], cdlYr[cdl]) <= 1) {
                    // the active_employee_starts mo/yr is the current earliest, so advance to next active_employee_starts mo/yr
                    num_act_emp += apiData.active_employee_starts[aes].act_emp;
                    aes++;
                }
            else if (this.dateCompare(cdlMo[cdl], cdlYr[cdl], apiData.active_employee_starts[aes].start_mo, apiData.active_employee_starts[aes].start_yr)) {
                    // the chartDataLabel mo/yr is the current earliest, so advance to next chartDataLabel mo/yr
                    dataset.data[cdl] = num_act_emp;
                    cdl++;
                }
        }

        while (cdl < cdlMo.length && aee < apiData.active_employee_ends.length) {
            //console.log('num_act_emp='+num_act_emp+'; cdl='+cdl+', '+cdlMo[cdl]+'_'+cdlYr[cdl]+'; aee='+aee+', '+apiData.active_employee_ends[aee].end_mo+'_'+apiData.active_employee_ends[aee].end_yr);
            if (this.dateCompare(cdlMo[cdl], cdlYr[cdl], apiData.active_employee_ends[aee].end_mo, apiData.active_employee_ends[aee].end_yr) <= 1) {
                    // the chartDataLabel mo/yr is the current earliest, so advance to next chartDataLabel mo/yr
                    dataset.data[cdl] = num_act_emp;
                    cdl++;
                }
            else if (this.dateCompare(apiData.active_employee_ends[aee].end_mo, apiData.active_employee_ends[aee].end_yr, cdlMo[cdl], cdlYr[cdl]) <= 1) {
                    // the active_employee_ends mo/yr is the current earliest, so advance to next active_employee_ends mo/yr
                    num_act_emp -= apiData.active_employee_ends[aee].act_emp;
                    aee++;
                }
        }

        while (cdl < cdlMo.length) {
        // console.log('num_act_emp='+num_act_emp+'; cdl='+cdl+', '+cdlMo[cdl]+'_'+cdlYr[cdl]);
            dataset.data[cdl] = num_act_emp;
            cdl++;
        }

        chartData.datasets.unshift(dataset);

        // -----------------------------------------------------------------------------
        // Align scales to be equal
        // -----------------------------------------------------------------------------
        var maxYValue = Math.max(_.max(chartData.datasets[0].data), _.max(chartData.datasets[1].data), _.max(chartData.datasets[2].data)); // max value from funding, assigned employees, and active employees
        for (var i = 0; i < chartData.labels.length; i++) { // for each mo/yr combo on the chart
            var sowSum = 0;
            for (var j = 3; j < chartData.datasets.length; j++) {
                sowSum += chartData.datasets[j].data[i];
            }
            maxYValue = Math.max(maxYValue, sowSum); // max value from combined (sandpiled) SOW
        }
        //console.log('maxYValue:' + maxYValue);
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

    nextMonth(mo, yr) {
        if (mo == 12) {
            return [1, yr + 1];
        }
        else {
            return [mo + 1, yr];
        }
    }

    dateCompare(mo1, yr1, mo2, yr2) {
        // return 0 if same month, 1 if first month is earlier, 2 if second month is earlier
        if (yr1 < yr2) {
            return 1;
        }
        else if (yr2 < yr1) {
            return 2;
        }
        else if (mo1 < mo2) {
            return 1;
        }
        else if (mo2 < mo1) {
            return 2;
        }
        else {
            return 0;
        }
    }

};
