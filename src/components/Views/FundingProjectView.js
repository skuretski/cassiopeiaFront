import React, { Component } from 'react';
import { connect } from 'react-redux';
import FundingViewByProjectChart from '../Charts/FundingViewByProjectChart';
import FundingByProjectSummaryTable from '../Tables/FundingByProjectSummaryTable';
import NavTabs from '../Navigation/NavTabs';
import { getFundingViewData } from '../../actions';

class FundingProjectView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }
    componentWillMount(){
        this.setState({loading: true});     
            this.props.dispatch(getFundingViewData).then(() =>{
            this.setState({loading: false});
        });               
    }
    render(){
        if(this.state.loading === true){
            return(
                <div className="container-fluid">
                    <div className="text-center load-spinner" />;
                </div>
            )
        }
        else{
            return (
                <div className="container">
                    <NavTabs/>
                    <div className="chart-title">
                        <h4><b>Funding Overview (By Project)</b></h4>
                    </div>
                    {<FundingViewByProjectChart data={this.props.fundingViewData}/>}
                    {<FundingByProjectSummaryTable data={this.props.fundingViewData}/>}                       
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return{
        fundingViewData: state.fundingViewData
    }
}

export default connect(mapStateToProps)(FundingProjectView);