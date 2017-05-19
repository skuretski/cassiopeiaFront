import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions, Field, Errors, Form, Control } from 'react-redux-form';
import { addProject } from '../../actions';

class AddProjectForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            added: false
        }
    }
    handleSubmit(project){
        console.log(project.title);
        // dispatch(addProject(project)).then(() => {
        //     this.setState({added: true});
        // });
    }
    render(){
        return(
            <Form model="projects"
                >
                <label>Project Name:</label>
                <Control.text model="projects.title" />
                <br/>
                <label>Project Description:</label>
                <Control.text model="projects.description" />
                <br/>
                <br/><br/>
                <button type="submit">
                    Add New Project
                </button>
            </Form>
        )
    }
}
function mapStateToProps(state){
    return{
        projects: state.projects,
        projectForm: state.projectForm
    }  
}
export default connect(mapStateToProps)(AddProjectForm);