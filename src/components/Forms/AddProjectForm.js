import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addProject, addAlert, deleteAlert } from '../../actions';
import Alert from '../Alerts/Alert';
import _ from 'lodash';

class AddProjectForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            added: false
        }
    }
    componentWillUnmount(){
        this.props.reset();
    }
    renderField(field){
        const { meta: { touched, error} } = field;
        const customClass = `form-group ${touched && error ? 'has-danger' : ''}`;
        return(
            <div className={customClass}>
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
        if(!_.isEmpty(project)){
            if(project.title != '' || project.description != '' || project.title != null || project.description != null){
                this.props.dispatch(addProject(project))
                    .then((project) => {
                        this.setState({added: true});
                        this.props.reset();
                        $('.bs-project-modal-lg').modal('hide');
                    })
                    .catch((error) => {
                        this.props.dispatch(addAlert(error));
                    });                     
            }
        } else{
            // console.log(this.props);
            // validate(project);
        }
    }
    render(){
        const { handleSubmit, reset } = this.props;
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
        );
    }
}

function validate(formProps){
    const errors = {};
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
        projects: state.projects,
        deliverables: state.deliverables,
        alerts: state.alerts
    }  
}

export default reduxForm({
    form: 'AddProjectForm',
    validate: validate

}, mapStateToProps)(AddProjectForm);