import React, { Component } from 'react';
import ProjectList from '../containers/ProjectList';
import { connect } from 'react-redux';
import { fetchProjects, fetchDeliverables} from '../actions/actions_nav';

class ProjectView extends Component{
    constructor(props){
        super(props);
        this.state = {
            fetched: false,
            projects: [],
            deliverables: [],
            selectedProject: '',
            selectedDeliverable: ''
        }
    }
    render(){
        return(
            <div><h1>Projects</h1>
            <div>
                <ul className = "nav nav-tabs">
                    <li><a href='/'>Index</a></li>
                    <li className="active"><a href='/project'>Projects</a></li>
                    <li><a href='/deliverable'>Deliverables</a></li>
                    <li><a href='/task'>Tasks</a></li>
                    <li><a href='/form'>Add and Edit</a></li>
                </ul>    
            </div>
                <ProjectList />
            </div>
        );
    }
}

export default ProjectView;