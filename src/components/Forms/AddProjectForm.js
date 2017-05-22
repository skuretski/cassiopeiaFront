import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addProject } from '../../actions';
import { Link } from 'react-router-dom';

class AddProjectForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            added: false
        }
    }
    renderField(field){
        const { meta: { touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                {touched ? error : ''}
                </div>
            </div>
        );
    }
    onSubmit(project){
        var projectId = '';
        this.props.dispatch(addProject(project)).then(() => {
            this.setState({added: true});
         //   this.props.history.push('/');
        });
    }
    render(){
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field
                    label="Project Title"
                    name="title"
                    component={this.renderField}
                    />
                <Field
                    label="Project Description"
                    name="description"
                    component={this.renderField}
                    />
                <button type="submit" className="btn btn-primary">
                    Add New Project
                </button>
                <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
            </form>
        )
    }
}

var validate = (formProps) => {
    var errors = {};
    if(!formProps.title){
        errors.title = "Project title is required.";
    }
    if(!formProps.description){
        errors.description = "Project description is required.";
    }
    return errors;
}
function mapStateToProps(state){
    return{
        projects: state.projects
    }  
}

export default reduxForm({
    form: 'AddProjectForm',
    fields: ['title', 'description'],
    validate: validate

}, mapStateToProps, null)(AddProjectForm);