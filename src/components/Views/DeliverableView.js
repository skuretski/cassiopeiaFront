import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../Navigation/NavTabs';
import { getDeliverableViewData, getTaskViewData } from '../../actions';
import DeliverableViewChart from '../Charts/DeliverableViewChart';
import AddProjectForm from '../Forms/AddProjectForm';
import AddDeliverableForm from '../Forms/AddDeliverableForm';
import AddTaskForm from '../Forms/AddTaskForm';
import DeliverableSummaryTable from '../Tables/DeliverableSummaryTable';
import UpdateDeliverableForm from '../Forms/UpdateDeliverableForm';
import DeleteDeliverableForm from '../Forms/DeleteDeliverableForm';
import _ from 'lodash';

class DeliverableView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
        }
    }
    componentWillMount(){
        this.setState({loading: true});                  
        this.props.dispatch(getDeliverableViewData(this.props.match.params.deliv_id)).then(()=> {
            this.setState({loading: false});
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.deliv_id != this.props.match.params.deliv_id){
            this.props.dispatch(getDeliverableViewData(nextProps.match.params.deliv_id)).then(()=> {
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
    getDeliverableTasks(delivId, tasks){
        var delivTasks = [];
        _.map(tasks, function(task){
            if(task.deliverable_id == delivId){
                delivTasks.push(task);
                return task;
            }
        });
        return _.mapKeys(delivTasks, 'id');
    }
    render(){
        const { projects, deliverables, tasks, history, deliverableViewData, disciplines } = this.props;
        const { project_id, deliv_id, task_id } = this.props.match.params;
        //If fetching deliverable view data
        if(this.state.loading === true){
            return(
                <div className="text-center load-spinner" />
            );
        //If project ID or deliverable ID do not exist, redirect to 404
        } else if(!projects[project_id] || !deliverables[deliv_id]){
            history.push("/404");
            return(
                <div></div>
            );
        //If project does not have that specified deliverable, redirect to 404
        } else if(!(this.getProjectDeliverables(project_id, deliverables))[deliv_id]){
            history.push("/404");
            return (
                <div></div>
            );
        //Else, render DeliverableView data
        } else{
            return(
                <div>
                    <div className="container-fluid">
                        <NavTabs type='project' tabList={projects}/>
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
                    {/* END ADD_PROJECT_FORM MODAL */}
                    {/* START ADD_DELIV_FORM MODAL */}
                    <div className="container-fluid">
                        <div className="modal fade bs-deliverable-modal-lg" tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="container-fluid">
                                    <h2>Add a Deliverable to {projects[project_id].title}</h2>
                                    <AddDeliverableForm projectId={project_id} projects={projects}/>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* END ADD_DELIV_FORM MODAL */}
                    {/* START UPDATE_DELIV_FORM MODAL */}
                    <div className="container-fluid">
                        <div className="modal fade bs-update-deliverable-modal-md" role="dialog">
                            <div className="modal-dialog modal-md" role="document">
                                <div className="modal-content">
                                    <div className="container-fluid">
                                    <h2>Update Deliverable</h2>
                                    <UpdateDeliverableForm id={deliv_id} />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* END UPDATE_DELIV_FORM MODAL */}
                    {/* START DELETE_DELIV_FORM MODAL */}
                    <div className="container-fluid">
                        <div className="modal fade bs-delete-deliverable-modal-md" role="dialog">
                            <div className="modal-dialog modal-md" role="document">
                                <div className="modal-content">
                                    <div className="container-fluid">
                                    <DeleteDeliverableForm id={this.props.match.params.deliv_id} />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* END DELETE_DELIV_FORM MODAL */}
                    {/* START ADD_TASK_FORM MODAL */}
                    <div className="container-fluid">
                        <div className="modal fade bs-task-modal-lg" tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="container-fluid">
                                    <h2>Add a Task to {deliverables[deliv_id].title}</h2>
                                    <AddTaskForm deliverableId={deliv_id} deliverables={deliverables} disciplines={disciplines}/>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* END ADD_TASK_FORM MODAL */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className= "col-md-2">
                                <div className="sidebar-nav">
                                    <div className="well">
                                        <NavTabs 
                                            type='deliverable' 
                                            tabList={this.getProjectDeliverables(project_id, deliverables)}
                                            projectId={project_id}
                                            delivId={deliv_id}
                                            isActive={deliv_id}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="chart-title">
                                    <h4><b>Project: {deliverableViewData.project[0].title}</b></h4>
                                    <h4>
                                        <b>Deliverable: {deliverableViewData.deliverable[0].title}</b>
                                        <a className="glyphicon glyphicon-pencil"
                                           onClick={() => $('.bs-update-deliverable-modal-md').modal('show')}
                                        />
                                        <a className="glyphicon glyphicon-remove"
                                        onClick={() => $('.bs-delete-deliverable-modal-md').modal('show')}
                                        />
                                    </h4>
                                </div>
                                <DeliverableViewChart data={deliverableViewData}/>
                                <DeliverableSummaryTable data={deliverableViewData} url={this.props.match.url}/>
                            </div>
                            <div className="col-md-2">
                                <div className="sidebar-nav pull-right">
                                    <div className="well">
                                        <NavTabs 
                                            type='task' 
                                            tabList={this.getDeliverableTasks(deliv_id, tasks)}
                                            projectId={project_id}
                                            delivId={deliv_id}
                                            taskId={task_id}
                                            isActive={deliv_id}
                                        />
                                    </div>
                                </div>
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
        projects: state.projects,
        deliverables: state.deliverables,
        deliverableViewData: state.deliverableViewData,
        tasks: state.tasks,
        disciplines: state.disciplines,
    }
}
export default connect(mapStateToProps)(DeliverableView);