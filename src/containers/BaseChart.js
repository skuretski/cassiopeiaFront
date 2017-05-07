import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIndexViewData } from '../actions/actions_indexview';
import { Line } from "react-chartjs";

// React.createClass() is the alternative to 'class ABC extends XYZ'
// I don't know enough about React yet to understand the difference
// but .createClass() is what is used here: https://github.com/reactjs/react-chartjs

// nevermind, switched to extends using this example: https://github.com/reactjs/react-chartjs/issues/35
class BaseChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentWillMount(){
        this.setState({loading: true});
        this.props.dispatch(getIndexViewData).then(() => {
            this.setState({loading: false});
        });
    }    

    renderIndexViewChart(indexViewChartData) {
        return(
            <Line data={sampleChartData()} width="600" height="250" />
        );
    }

    render() {
        return (
            <div>
                {this.renderIndexViewChart(sampleChartData())}
            </div>    
        );
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

function mapStateToProps(state){
    return { 
        indexViewData: state.indexViewData 
    };
}


export default connect(mapStateToProps)(BaseChart);

// sample from view-source:https://reactcommunity.org/react-chartjs/index.html
function sampleChartData() {
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
