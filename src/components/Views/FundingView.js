import React, { Component } from 'react';
import { connect } from 'react-redux';
import FundingViewChartByProject from '../Charts/FundingViewChartByProject';
import FundingViewChartByType from '../Charts/FundingViewChartByType';
import NavTabs from '../Navigation/NavTabs';
import { getFundingViewData } from '../../actions';

class FundingView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }
    componentWillMount(){
        this.setState({loading: true});     
            this.props.dispatch(getFundingViewData()).then(() =>{
            this.setState({loading: false});
        });               
    }
    render(){
        return(
            <div className="container">
                <NavTabs type='project' tabList={this.props.projects}/>
                <div className="chart-title">
                    <h4><b>Funding Overview (By Project)</b></h4>
                </div>
                {<FundingViewChartByProject data={this.props.fundingViewData}/>}
                <div className="chart-title">
                    <h4><b>Funding Overview (By Type)</b></h4>
                </div>
                {<FundingViewChartByType data={this.props.fundingViewData}/>}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        fundingViewData: state.fundingViewData
    }
}

export default connect(mapStateToProps)(FundingView);