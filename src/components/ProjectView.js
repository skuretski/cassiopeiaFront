import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectViewChart from '../containers/ProjectViewChart';
import ProjectList from '../containers/ProjectList';
import NavTabs from '../containers/navigation/NavTabs';
import { getProjectViewData } from '../actions/actions_projectview';

class ProjectView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.dispatch(getProjectViewData(this.props.routeParams.id));
    }
    render(){
        const project_id = this.props.routeParams.id;     
        return(
            <div className="container">
                <NavTabs type='project' tabList={this.props.projects} toUrl={'/projects/'} />
                <ProjectViewChart data={this.props.projectViewData}/>
                <div>
                    {/* <NavTabs type='deliverable' tabList={this.props.projectDeliverables} toUrl={'/projects/'+project_id+'/deliverables/'}/> */}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        deliverables: state.deliverables,
        projects: state.projects,
        projectDeliverables: state.projectDeliverables,
        projectViewData: state.projectViewData
    }
}
export default connect(mapStateToProps)(ProjectView);