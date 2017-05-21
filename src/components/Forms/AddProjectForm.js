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
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(project){
        const { dispatch } = this.props;
        console.log(project);
        dispatch(actions.submit(addProject(project)));
    }
    render(){
        return(
            <Form model="project" onSubmit={this.handleSubmit}
                >
                <label>Project Name:</label>
                <Control.text model="project.title" />
                <br/>
                <label>Project Description:</label>
                <Control.text model="project.description" />
                <br/>
                <br/><br/>
                <button type="submit">
                    Add New Project
                </button>
            </Form>
        )
    }
}
AddProjectForm.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};

function mapStateToProps(state){
    return{
        projects: state.projects
    }  
}
export default connect(mapStateToProps)(AddProjectForm);