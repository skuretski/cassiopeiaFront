import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../Navigation/NavTabs';
import { getTaskViewData } from '../../actions';
import TaskViewChart from '../Charts/TaskViewChart';
import TaskSummaryTable from '../Tables/TaskSummaryTable';
import AddAssignmentForm from '../Forms/AddAssignmentForm';
import AddProjectForm from '../Forms/AddProjectForm';

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
        return projDelivs;
    }
    getDeliverableTasks(delivId, tasks){
        var delivTasks = [];
        _.map(tasks, function(task){
            if(task.deliverable_id == delivId){
                delivTasks.push(task);
                return task;
            }
        });
        return delivTasks;
    }
    render(){
        if (this.state.loading === true) {
            return(
                <div>Loading...</div>
            );
        }

        return(
            <div>
                <div className="container-fluid">
                    <NavTabs type='project' tabList={this.props.projects}/>
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="sidebar-nav">
                                <div className="well">
                                    <NavTabs 
                                        type='deliverable' 
                                        tabList={this.getProjectDeliverables(this.props.match.params.project_id, this.props.deliverables)}
                                        projectId={this.props.match.params.project_id}
                                        delivId={this.props.match.params.deliv_id}
                                        isActive={this.props.match.params.deliv_id}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="chart-title">
                                <h4><b>Project: {this.props.taskViewData.project[0].title}</b></h4>
                                <h4><b>Deliverable: {this.props.taskViewData.deliverable[0].title}</b></h4>
                                <h4><b>Task: {this.props.taskViewData.task[0].title}</b></h4>
                                <h4><b>Responsible Discipline: {this.props.taskViewData.task[0].discipline}</b></h4>
                            </div>
                            <TaskViewChart data={this.props.taskViewData}/>
                            <TaskSummaryTable data={this.props.taskViewData} url={this.props.match.url}/>
                            <AddAssignmentForm discipline_id={this.props.taskViewData.task[0].discipline_id}
                                               task_id={parseInt(this.props.match.params.task_id)}
                            />
                        </div>
                        <div className="col-md-2">
                            <div className="sidebar-nav pull-right">
                                <div className="well">
                                    <NavTabs 
                                        type='task' 
                                        tabList={this.getDeliverableTasks(this.props.match.params.deliv_id, this.props.tasks)}
                                        projectId={this.props.match.params.project_id}
                                        delivId={this.props.match.params.deliv_id}
                                        taskId={this.props.match.params.task_id}
                                        isActive={this.props.match.params.task_id}
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

function mapStateToProps(state){
    return{
        projects: state.projects,
        deliverables: state.deliverables,
        tasks: state.tasks,
        taskViewData: state.taskViewData,
    }
}
export default connect(mapStateToProps)(TaskView);