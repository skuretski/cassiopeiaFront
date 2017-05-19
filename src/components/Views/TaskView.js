import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../Navigation/NavTabs';
import { getTaskViewData } from '../../actions';
// import TaskViewChart from '../Charts/TaskViewChart';
import TaskSummaryTable from '../Tables/TaskSummaryTable';

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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="sidebar-nav-fixed affix">
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
                            {/*<TaskViewChart data={this.props.taskViewData}/>*/}
                            <TaskSummaryTable data={this.props.taskViewData} url={this.props.match.url}/>
                        </div>
                        <div className="col-md-2">
                            <div className="sidebar-nav-fixed pull-right affix">
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