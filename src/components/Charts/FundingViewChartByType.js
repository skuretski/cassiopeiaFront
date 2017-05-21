import React, { Component } from 'react';
import { Line } from "react-chartjs-2";
// https://github.com/gor181/react-chartjs-2
import _ from 'lodash';

export default class FundingViewChartByType extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!_.isEmpty(this.props.data)) {
            Chart.defaults.global.title.fontSize = 24;
            Chart.defaults.global.defaultFontSize = 14;
            return (
                <div>
                    <Line data={fundingViewChartData(this.props.data)} options={fundingViewChartOptions(this.props.data)} />  
                </div>
            );
        } else {
            return <div></div>;
        }
    }
};

// -----------------------------------------------------------------------------
// Define Options For The Chart
// -----------------------------------------------------------------------------
function fundingViewChartOptions(apiData) {
    var chartOptions = {
    };
    return chartOptions;
}

// -----------------------------------------------------------------------------
// Define Data For The Chart
// -----------------------------------------------------------------------------
function fundingViewChartData(apiData) {
    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477',
        '#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
    var chartData = {};
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

// convert mo=2 and yr=2019 to "Feb-2019"
function dateHelper(mo, yr) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (months[mo - 1] + '-' + yr);
}