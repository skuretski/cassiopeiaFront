import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../Navigation/NavTabs';
import { getTaskViewData } from '../../actions';
import TaskViewChart from '../Charts/TaskViewChart';
import TaskSummaryTable from '../Tables/TaskSummaryTable';
import ModifyAssignmentForm from '../Forms/ModifyAssignmentForm';
import ModifySOWForm from '../Forms/ModifySOWForm';
import AddProjectForm from '../Forms/AddProjectForm';
import AddDeliverableForm from '../Forms/AddDeliverableForm';
import AddTaskForm from '../Forms/AddTaskForm';
import UpdateTaskForm from '../Forms/UpdateTaskForm';
import DeleteTaskForm from '../Forms/DeleteTaskForm';
import _ from 'lodash';

class TaskView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }
    componentWillMount(){
        this.setState({loading: true});
        this.props.dispatch(getTaskViewData(this.props.match.params.task_id)).then(()=> {
            this.setState({loading: false});
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.task_id != this.props.match.params.task_id){
            this.setState({loading: true});
                this.props.dispatch(getTaskViewData(nextProps.match.params.task_id)).then(()=> {
                    this.setState({loading: false});
            });
        }
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
        const { projects, deliverables, tasks, history, disciplines, taskViewData } = this.props;
        const { project_id, deliv_id, task_id } = this.props.match.params;
        //If fetching taskViewData
        if (this.state.loading === true) {
            return(
                <div className="text-center load-spinner" />
            );
        }
        //If project ID, deliverable ID, or task ID do not exist, redirect to 404
        else if(!projects[project_id] || !deliverables[deliv_id] || !tasks[task_id]){
            history.push("/404");
            return(
                <div></div>
            );
        //If project does not have that specified deliverable, redirect to 404
        } else if(!(this.getProjectDeliverables(project_id, deliverables))[deliv_id]){
            history.push("/404");
            return(
                <div></div>
            );
        //If deliverable does not have specified task, redirect to 404
        } else if(!(this.getDeliverableTasks(deliv_id, tasks))[task_id]){
            history.push("/404");
            return(
                <div></div>
            );
        }
        //Else, render TaskViewData 
        else {          
            return(
                <div>
                    <div className="container-fluid">
                        <NavTabs type='project' tabList={projects}/>
                    </div>
                    {/* START ADDPROJECTFORM MODAL */}
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
                    {/* END ADDPROJECTFORM MODAL */}
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
                    {/* START UPDATE_TASK_FORM MODAL */}
                    <div className="container-fluid">
                        <div className="modal fade bs-update-task-modal-md" role="dialog">
                            <div className="modal-dialog modal-md" role="document">
                                <div className="modal-content">
                                    <div className="container-fluid">
                                    <h2>Update Task</h2>
                                    <UpdateTaskForm id={task_id} />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* END UPDATE_TASK_FORM MODAL */}
                    {/* START DELETE_TASK_FORM MODAL */}
                    <div className="container-fluid">
                        <div className="modal fade bs-delete-task-modal-md" role="dialog">
                            <div className="modal-dialog modal-md" role="document">
                                <div className="modal-content">
                                    <div className="container-fluid">
                                    <DeleteTaskForm id={this.props.match.params.task_id} />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* END DELETE_TASK_FORM MODAL */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2">
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
                                    <h4><b>Project: {taskViewData.project[0].title}</b></h4>
                                    <h4><b>Deliverable: {taskViewData.deliverable[0].title}</b></h4>
                                    <h4>
                                        <b>Task: {taskViewData.task[0].title}</b>
                                        <a className="glyphicon glyphicon-pencil"
                                        onClick={() => $('.bs-update-task-modal-md').modal('show')}
                                        />
                                        <a className="glyphicon glyphicon-remove"
                                        onClick={() => $('.bs-delete-task-modal-md').modal('show')}
                                        />
                                    </h4>
                                    <h4><b>Responsible Discipline: {taskViewData.task[0].discipline}</b></h4>
                                </div>
                                <TaskViewChart data={taskViewData}/>
                                <TaskSummaryTable data={taskViewData} url={this.props.match.url}/>
                                <div className="row">
                                    <div className="col-md-5">
                                        <h3 className="text-center">ADD/UPDATE ASSIGNMENTS</h3>
                                        <ModifyAssignmentForm discipline_id={taskViewData.task[0].discipline_id}
                                                        task_id={parseInt(task_id)}
                                        />
                                    </div>
                                    <div className="col-md-5 col-md-offset-2">
                                        <h3 className="text-center">ADD/UPDATE STATEMENT OF WORK</h3>
                                        <ModifySOWForm task_id={parseInt(task_id)}/>
                                    </div>
                                </div>
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
                                            isActive={task_id}
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
        tasks: state.tasks,
        taskViewData: state.taskViewData,
        disciplines: state.disciplines
    }
}
export default connect(mapStateToProps)(TaskView);