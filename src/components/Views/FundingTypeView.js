import React, { Component } from 'react';
import { connect } from 'react-redux';
import FundingViewByTypeChart from '../Charts/FundingViewByTypeChart';
import FundingByTypeSummaryTable from '../Tables/FundingByTypeSummaryTable';
import ModifyFundingForm from '../Forms/ModifyFundingForm';
import NavTabs from '../Navigation/NavTabs';
import { getFundingViewData } from '../../actions';

class FundingTypeView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            selected_project: -1,
            title: "All"
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
        this.setState({selected_project: event.target.value});
        if (event.target.value == - 1){
            this.setState({title: "All"});
        }
        else 
        {
            for (var i = 0; i < this.props.fundingViewData.project.length; i++) {
                if (this.props.fundingViewData.project[i].id == event.target.value) {
                    this.setState({title: this.props.fundingViewData.project[i].title});
                    break;
                }
            }
        }
    }

    renderDropdown(projects){
        return(
            <div>
                <select className="padded-select" value={this.state.selected_project} onChange={this.handleDropDownChange}>
                    <option value='-1'>All Projects</option>
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
                    {this.renderDropdown(this.props.fundingViewData.project)}
                    <div className="chart-title">
                        <h4><b>{this.state.title} Funding (By Type)</b></h4>
                    </div>
                    {<FundingViewByTypeChart data={this.props.fundingViewData} selProj={this.state.selected_project}/>}
                    {<FundingByTypeSummaryTable data={this.props.fundingViewData} selProj={this.state.selected_project}/>}
                    <div className="row">
                        <div className="col-md-5">
                            <h3 className="text-center">ADD/UPDATE FUNDING</h3>
                            <ModifyFundingForm data={this.props.fundingViewData}/>
                        </div>
                    </div>
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