import React, { Component } from 'react';
import { connect } from 'react-redux';
import FundingViewByProjectTypeChart from '../Charts/FundingViewByProjectTypeChart';
import FundingByProjectTypeSummaryTable from '../Tables/FundingByProjectTypeSummaryTable';
import NavTabs from '../Navigation/NavTabs';
import { getFundingViewData } from '../../actions';

class FundingProjectTypeView extends Component{
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
                        <h4><b>Funding Overview (By Project By Type)</b></h4>
                    </div>
                    {<FundingViewByProjectTypeChart data={this.props.fundingViewData}/>}
                    {<FundingByProjectTypeSummaryTable data={this.props.fundingViewData}/>}                       
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

export default connect(mapStateToProps)(FundingProjectTypeView);