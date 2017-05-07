import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedProject: '',
            selectedDeliverable: '',
            selectedTask: ''
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
    return {
        selectedProject: state.selectedProject,
        selectedDeliverable: state.selectedDeliverable,
        selectedTask: state.selectedTask
    }
}
export default connect(mapStateToProps)(App);