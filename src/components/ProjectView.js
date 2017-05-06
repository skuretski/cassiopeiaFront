import React, { Component } from 'react';
import ProjectList from '../containers/ProjectList';

class ProjectView extends Component{
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