import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../containers/navigation/NavTabs';

class TaskView extends Component{
    render(){
        return(
            <div><h1>Tasks</h1>
            <div>
                <NavTabs type='project'tablist={this.props.projects}/>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        projects: state.projects
    }
}
export default connect(mapStateToProps)(TaskView);