import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../Navigation/NavTabs';

class TaskView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h1>Tasks</h1>
                <div className="container">
                    <NavTabs type='project' tabList={this.props.projects}/>
                </div>
                <div className="container">
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