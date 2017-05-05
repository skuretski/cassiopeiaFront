import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjects } from '../actions/actions_projects';

class ProjectList extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }
    componentWillMount(){
        this.setState({loading: true});
        this.props.dispatch(getProjects).then(() => {
            this.setState({loading: false});
        });
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


export default connect(mapStateToProps)(ProjectList);