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
            loading: true
        }
    }
    componentWillMount(){
        this.setState({loading: true});     
            this.props.dispatch(getFundingViewData).then(() =>{
            this.setState({loading: false});
        });               
    }
    renderDropdown(projects){
        return(
            <div>
                <select className="padded-select">
                    <option value="">Select Project</option>
                    {this.renderItem(projects)}
                </select>
            </div>
        )
    }
    renderItem(projects){
        return _.map(projects, project => {
            return(
                <option key={project.id} value={project.id}>{project.title}</option>
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
                    {this.renderDropdown(this.props.projects)}
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
        fundingViewData: state.fundingViewData,
        projects: state.projects
    }
}

export default connect(mapStateToProps)(FundingProjectView);