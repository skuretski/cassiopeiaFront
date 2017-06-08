import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addDeliverable, addAlert } from '../../actions';
import _ from 'lodash';
import AlertsContainer from '../Alerts/AlertsContainer';
import { withRouter } from 'react-router-dom';

class AddDeliverableForm extends Component{
    constructor(props){
        super(props);
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
    resetForm(){
        this.props.change('title', '');
        this.props.change('description', '');
        this.props.untouch('title', 'description');
    }
    onSubmit(deliverable){
        if(!_.isEmpty(deliverable)){
            if(deliverable.title != '' || deliverable.description != ''|| deliverable.title != null || deliverable.description != null){
                deliverable.project_id = this.props.projectId;
                this.props.dispatch(addDeliverable(deliverable)).then((id) => {
                    this.props.reset();
                    $('.bs-deliverable-modal-lg').modal('hide');
                    this.props.history.push("/projects/" + this.props.projectId + "/deliverables/" + id);
                }).catch((error) => {
                    this.props.dispatch(addAlert("Something went wrong..."));              
                });
            }
        } else {
            this.props.dispatch(addAlert("The form must be filled out."));
        }
    }
    render(){
        const { handleSubmit, reset, projectId, projects } = this.props;
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field
                    label="Deliverable Title"
                    name="title"
                    component={this.renderField}
                    />
                <Field
                    label="Deliverable Description"
                    name="description"
                    component={this.renderField}
                    />
                <button type="submit" className="btn btn-primary">
                    Add Deliverable to {projects[projectId].title}
                </button>
                <button className="btn btn-danger" data-dismiss="modal" onClick={() => this.resetForm()}>Cancel</button>
                <AlertsContainer/>
            </form>
        )
    }
}

var validateDelivs = (formProps) => {
    var errors = {};
    if(!formProps.title){
        errors.title = "Deliverable title is required.";
    }
    if(!formProps.description){
        errors.description = "Deliverable description is required.";
    }
    return errors;
}
function mapStateToProps(state){
    return{
        deliverables: state.deliverables,
        projects: state.projects,
        alerts: state.alerts
    }
}

export default withRouter(reduxForm({
    form: 'AddDeliverableForm',
    validate: validateDelivs

}, mapStateToProps, null)(AddDeliverableForm));