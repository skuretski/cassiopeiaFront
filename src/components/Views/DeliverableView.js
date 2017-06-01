import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../Navigation/NavTabs';
import { getDeliverableViewData, getTaskViewData } from '../../actions';
import DeliverableViewChart from '../Charts/DeliverableViewChart';
import AddProjectForm from '../Forms/AddProjectForm';
import AddDeliverableForm from '../Forms/AddDeliverableForm';
import AddTaskForm from '../Forms/AddTaskForm';
import DeliverableSummaryTable from '../Tables/DeliverableSummaryTable';
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
        if(this.state.loading === true){
            return(
                <div className="text-center load-spinner" />
            );
        } else{
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
                    {/* END ADD_PROJECT_FORM MODAL */}
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
                    {/* START ADD_TASK_FORM MODAL */}
                    <div className="container-fluid">
                        <div className="modal fade bs-task-modal-lg" tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="container-fluid">
                                    <h2>Add a Task to {this.props.deliverables[this.props.match.params.deliv_id].title}</h2>
                                    <AddTaskForm deliverableId={this.props.match.params.deliv_id} deliverables={this.props.deliverables} disciplines={this.props.disciplines}/>
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
                                    <h4><b>Project: {this.props.deliverableViewData.project[0].title}</b></h4>
                                    <h4><b>Deliverable: {this.props.deliverableViewData.deliverable[0].title}</b></h4>
                                </div>
                                <DeliverableViewChart data={this.props.deliverableViewData}/>
                                <DeliverableSummaryTable data={this.props.deliverableViewData} url={this.props.match.url}/>
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
                                            isActive={this.props.match.params.deliv_id}
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
        disciplines: state.disciplines
    }
}
export default connect(mapStateToProps)(DeliverableView);