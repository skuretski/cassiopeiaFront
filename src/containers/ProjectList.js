import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions_projects';

class ProjectList extends Component {
    componentWillMount(){
        this.props.getProjects();
    }
    renderProject(project){
        return(
            <tr key={project.id}> 
                <td>{project.title}</td>
                 <td>{project.description}</td>
             </tr>               
        );
    }

    render(){
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Project Description</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.projects.map(this.renderProject)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state){
    return { 
        projects: state.projects 
    };
}

export default connect(mapStateToProps, actions)(ProjectList);