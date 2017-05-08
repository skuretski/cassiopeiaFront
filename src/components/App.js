import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            projects: [],
            deliverables: [],
            tasks: [],
            selectedTask: '',
            selectedDeliverable: '',
            selectedProject: ''
        }
    }
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        projects: state.projects,
        deliverables: state.deliverables,
        tasks: state.tasks,
        selectedDeliverable: state.selectedDeliverable,
        selectedProject: state.selectedProject,
        selectedTask: state.selectedTask
    }
}

export default connect(mapStateToProps)(App);