import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectViewChart from '../Charts/ProjectViewChart';
import ProjectSummaryTable from '../Tables/ProjectSummaryTable';
import NavTabs from '../Navigation/NavTabs';
import { getProjectViewData } from '../../actions';
import AddProjectForm from '../Forms/AddProjectForm';
import AddDeliverableForm from '../Forms/AddDeliverableForm';
import UpdateProjectForm from '../Forms/UpdateProjectForm';
import DeleteProjectForm from '../Forms/DeleteProjectForm';
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
    getProjectDeliverables(projectId, deliverables){
        var projDelivs = [];
        _.map(deliverables, function(deliverable){
            if(deliverable.project_id == projectId){
                projDelivs.push(deliverable)
                return deliverable;
            }        
        });
        return _.mapKeys(projDelivs, 'id');
    }
    render(){
        const { projects, deliverables, projectViewData } = this.props;
        const { project_id, deliv_id } = this.props.match.params;
        //If still fetching data
        if(this.state.loading === true){
            return(
                <div className="container-fluid">
                    <div className="text-center load-spinner" />
                </div>
            )
        //If project doesn't exist, redirect to 404
        } else if(!this.props.projects[this.props.match.params.project_id]){
            this.props.history.push("/404");
        //Render ProjectView  
        } else {
            return(
                <div>
                    <div className="container-fluid">
                        <NavTabs type='project' tabList={this.props.projects}/>
                    </div>
                    {/* START ADDPROJECTFORM MODAL */}
                    <div className="container-fluid">
                        <div className="modal fade bs-project-modal-lg" tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="container-fluid">
                                    <h2>Add a Project</h2>
                                    <AddProjectForm/>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* END ADDPROJECTFORM MODAL */}
                    {/* START UPDATEPROJECTFORM MODAL */}
                    <div className="container-fluid">
                        <div className="modal fade bs-update-project-modal-md" role="dialog">
                            <div className="modal-dialog modal-md" role="document">
                                <div className="modal-content">
                                    <div className="container-fluid">
                                    <h2>Update Project</h2>
                                    <UpdateProjectForm id={this.props.match.params.project_id} />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* END ADDPROJECTFORM MODAL */}
                    {/* START DELETE_PROJECT_FORM MODAL */}
                    <div className="container-fluid">
                        <div className="modal fade bs-delete-project-modal-md" role="dialog">
                            <div className="modal-dialog modal-md" role="document">
                                <div className="modal-content">
                                    <div className="container-fluid">
                                    <DeleteProjectForm id={this.props.match.params.project_id} />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* END DELETE_PROJECT_FORM MODAL */}
                    {/* START ADD_DELIV_FORM MODAL */}
                    <div className="container-fluid">
                        <div className="modal fade bs-deliverable-modal-lg" tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="container-fluid">
                                    <h2>Add a Deliverable to {this.props.projects[this.props.match.params.project_id].title}</h2>
                                    <AddDeliverableForm projectId={this.props.match.params.project_id} projects={this.props.projects}/>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* END ADD_DELIV_FORM MODAL */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="sidebar-nav">
                                    <div className="well">
                                        <NavTabs 
                                            type='deliverable' 
                                            tabList={this.getProjectDeliverables(this.props.match.params.project_id, this.props.deliverables)} 
                                            projectId={this.props.match.params.project_id}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="chart-title">
                                    <h4>
                                        <b>Project: {this.props.projectViewData.project[0].title}</b>
                                        <a className="glyphicon glyphicon-pencil"
                                           onClick={() => $('.bs-update-project-modal-md').modal('show')}
                                        />
                                        <a className="glyphicon glyphicon-remove"
                                        onClick={() => $('.bs-delete-project-modal-md').modal('show')}
                                        />
                                    </h4>
                                </div>
                                <ProjectViewChart data={this.props.projectViewData}/>
                                <ProjectSummaryTable data={this.props.projectViewData} url={this.props.match.url}/>                        
                            </div>
                        </div>
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
        deliverables: state.deliverables,
        tasks: state.tasks
    }
}
export default connect(mapStateToProps)(ProjectView);