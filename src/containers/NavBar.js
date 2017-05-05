import React, { Component } from 'react';
import { connect } from 'react-redux';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedProject = this.props.selectedProject,
            selectedTask = this.props.selectedTask,
            selectedDeliverable = this.props.selectedDeliverable,
            projects = this.props.projects,
            deliverables = this.props.deliverables,
            tasks = this.props.tasks
        }
    }
    render(){
        return (
            <div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { 
        projects: state.projects,
        tasks: state.tasks,
        deliverables: state.deliverables,
        selectedDeliverable: state.selectedDeliverable,
        selectedProject: state.selectedProject,
        selectedTask: state.selectedTask 
    };
}

export default connect(mapStateToProps)(NavBar);