import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectViewChart from '../Charts/ProjectViewChart';
import ProjectSummaryTable from '../Tables/ProjectSummaryTable';
import NavTabs from '../Navigation/NavTabs';
import { getProjectViewData } from '../../actions';

class ProjectView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }
    componentWillMount(){
        this.setState({loading: true});     
            this.props.dispatch(getProjectViewData(this.props.match.params.project_id)).then(() =>{
            this.setState({loading: false});
        });               
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.project_id != this.props.match.params.project_id){
            this.props.dispatch(getProjectViewData(nextProps.match.params.project_id)).then(() =>{
                 this.setState({loading: false});
            }); 
        }
    }
    componentWillUnmount(){
        this.setState({loading: true});
    }
    render(){
        if(this.state.loading === true){
            return(
                <div className="container">Loading...</div>
            )
        } else {
            return(
                <div>
                    <div className="container">
                        <NavTabs type='project' tabList={this.props.projects}/>
                   </div>
                   <div className="container">
                        <div className="row">
                            <div className="col col-md-2">
                                <NavTabs type='deliverable' tabList={this.props.projectViewData.deliverables} projectId={this.props.match.params.project_id}/>
                            </div>
                            <div className="col col-md-10">
                                <ProjectViewChart data={this.props.projectViewData}/>
                            </div>
                        </div>
                            <ProjectSummaryTable data={this.props.projectViewData} url={this.props.match.url}/>                        
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return{
        projectViewData: state.projectViewData,
        projects: state.projects,
        indexLoaded: state.indexLoaded,
    }
}
export default connect(mapStateToProps)(ProjectView);