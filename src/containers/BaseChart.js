import React, { Component } from 'react';

var LineChart = require("react-chartjs").Line;

// React.createClass() is the alternative to 'class ABC extends XYZ'
// I don't know enough about React yet to understand the difference
// but .createClass() is what is used here: https://github.com/reactjs/react-chartjs
var BaseChart = React.createClass({
    render: function() {

        var chartData = data1();
        return <LineChart data={chartData} width="600" height="250"/>
        // return <LineChart data={chartData} options={chartOptions} width="600" height="250"/>
    }
});

// sample from view-source:https://reactcommunity.org/react-chartjs/index.html
function rand(min, max, num) {
    var rtn = [];
    while (rtn.length < num) {
        rtn.push((Math.random() * (max - min)) + min);
    }
    return rtn;
}

// sample from view-source:https://reactcommunity.org/react-chartjs/index.html
function data1() {
    return {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: rand(32, 100, 7)
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: rand(32, 100, 7)
            }
        ]   
    };
}

export default BaseChart;