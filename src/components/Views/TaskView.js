import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../Navigation/NavTabs';
import { getTaskViewData } from '../../actions';
// import TaskViewChart from '../Charts/TaskViewChart';
// import TaskSummaryTable from '../Tables/TaskSummaryTable';

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
    render(){
        if (this.state.loading === true) {
            return(
                <div>Loading...</div>
            );
        }

        return(
            <div>
                <div className="container">
                    <NavTabs type='project' tabList={this.props.projects}/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col col-md-10">
                            {/*<TaskViewChart data={this.props.taskViewData}/>*/}
                            {/*<TaskSummaryTable data={this.props.taskViewData} url={this.props.match.url}/>*/}
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