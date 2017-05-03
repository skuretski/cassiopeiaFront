import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component{
    constructor(props){
        super(props);
        //This instantaniates an App with empty props. These will be filled
        //after necessary GET requests and actions.  
        this.state ={
            projects: [],
            deliverables: [],
            assignments: [],
            selectedProject: null,
            selectedAssign: null,
            selectedDeliv: null
        };
        //This will be called to get projects, deliverables, and assignments 
        // componentWillMount(){

        // }
    }
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}

//Need to mapStateToProps to get tab NavBar (This is why projects, deliverables, assignments, etc. 
//are "global" props)

//TO:DO - create App actions to propagate Project, Deliverable, and Task tab navigation
function mapStateToProps(state){
    return { 
        projects: state.projects,

    };
}

export default connect(mapStateToProps)(App);