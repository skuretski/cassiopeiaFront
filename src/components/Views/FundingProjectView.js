import React, { Component } from 'react';
import { connect } from 'react-redux';
import FundingViewByProjectChart from '../Charts/FundingViewByProjectChart';
import FundingByProjectSummaryTable from '../Tables/FundingByProjectSummaryTable';
import NavTabs from '../Navigation/NavTabs';
import { getFundingViewData } from '../../actions';
import _ from 'lodash';

class FundingProjectView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            selected_type: -1
        }
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
    }

    componentWillMount(){
        this.setState({loading: true});     
            this.props.dispatch(getFundingViewData).then(() =>{
            this.setState({loading: false});
        });               
    }

    handleDropDownChange(event) {
        this.setState({selected_type: event.target.value});
    }

    renderDropdown(types){
        return(
            <div>
                <select className="padded-select" value={this.state.selected_type} onChange={this.handleDropDownChange}>
                    <option value='-1'>All Funding Types</option>
                    {this.renderItem(types)}
                </select>
            </div>
        )
    }
    renderItem(types){
        return _.map(types, type => {
            return(
                <option key={type.id} value={type.id}>{type.title}</option>
            );
        })
    }
    render(){
        if(this.state.loading === true){
            return(
                <div className="container-fluid">
                    <div className="text-center load-spinner" />
                </div>
            )
        }
        else{
            return (
                <div className="container">
                    <NavTabs/>
                    {this.renderDropdown(this.props.fundingViewData.type)}
                    <div className="chart-title">
                        <h4><b>Funding Overview (By Project)</b></h4>
                    </div>
                    {<FundingViewByProjectChart data={this.props.fundingViewData} selType={this.state.selected_type}/>}
                    {<FundingByProjectSummaryTable data={this.props.fundingViewData} selType={this.state.selected_type}/>}                       
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return{
        fundingViewData: state.fundingViewData,
    }
}

export default connect(mapStateToProps)(FundingProjectView);