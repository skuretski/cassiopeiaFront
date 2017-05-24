import React, { Component } from 'react';
import { connect } from 'react-redux';
import FundingViewByTypeChart from '../Charts/FundingViewByTypeChart';
import FundingByTypeSummaryTable from '../Tables/FundingByTypeSummaryTable';
import NavTabs from '../Navigation/NavTabs';
import { getFundingViewData } from '../../actions';

class FundingTypeView extends Component{
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
                <h3>Loading...</h3>
                </div>
            )
        }
        else{
            return (
                <div className="container">
                    <NavTabs/>                     
                    <div className="chart-title">
                        <h4><b>Funding Overview (By Type)</b></h4>
                    </div>
                    {<FundingViewByTypeChart data={this.props.fundingViewData}/>}
                    {<FundingByTypeSummaryTable data={this.props.fundingViewData}/>}
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

export default connect(mapStateToProps)(FundingTypeView);