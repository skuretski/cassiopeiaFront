import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectViewChart from '../containers/ProjectViewChart';
import ProjectSummaryTable from '../components/ProjectSummaryTable';
import ProjectList from '../containers/ProjectList';
import NavTabs from '../containers/navigation/NavTabs';
import { getProjectViewData } from '../actions/actions_projectview';
import { getIndexViewData } from '../actions/actions_indexview';
import _ from 'lodash';

class ProjectView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }
    componentWillMount(){
        this.setState({loading: true});
        this.props.dispatch(getProjectViewData(this.props.match.params.project_id))
            .then(() => {
                if(_.isEmpty(this.props.indexViewData)){
                    this.props.dispatch(getIndexViewData).then(() => {
                        this.setState({loading:false})
                    });
            }
            this.setState({loading:false});
        });                  
    }
    render(){
        if(this.state.loading === true){
            return(
                <div>Loading...</div>
            )
        } else {
            return(
                <div className="container">
                    <NavTabs type='project' tabList={this.props.indexViewData.titles}/>
                    <ProjectViewChart data={this.props.projectViewData}/>
                    <ProjectSummaryTable data={this.props.projectViewData}/>
                    <div>
                        <NavTabs type='deliverable' tabList={this.props.projectViewData.deliverables} projectId={this.props.match.params.project_id}/>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return{
        projectViewData: state.projectViewData,
        indexViewData: state.indexViewData
    }
}
export default connect(mapStateToProps)(ProjectView);