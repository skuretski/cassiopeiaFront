import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addTask, addAlert } from '../../actions';
import AlertsContainer from '../Alerts/AlertsContainer';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

class AddTaskForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            added: false
        }
    }
    renderDropDown(field){
        return(
            <div>
                <select className="padded-select" {...field.input}>
                    <option value="">Select Discipline</option>
                    {field.disciplines.map((discipline) => {
                        return(
                            <option key={discipline.id}value={discipline.id}>{discipline.title}</option>
                        );
                    })}
                </select>
            </div>
        )
    }
    resetForm(){
        this.props.change('title', '');
        this.props.change('description', '');
        this.props.change('discipline', '');
        this.props.untouch('title', 'description', 'discipline');
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
    onSubmit(task){
        if(!_.isEmpty(task)){
            if(task.title != '' && task.description != ''){
                task.deliverable_id = this.props.deliverableId;
                task.committed = 0;
                this.props.dispatch(addTask(task)).then((id) => {
                    this.setState({added: true});
                    this.props.reset();
                    $('.bs-task-modal-lg').modal('hide');
                }).catch((error) => {
                    this.props.dispatch(addAlert("Something went wrong...")).then(() => {
                        this.setState({ added: false});
                    });
                });
            }
        } else{
            this.props.dispatch(addAlert("The form must be filled out."));
        }

    }
    render(){
        const { handleSubmit, reset } = this.props; 
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field
                    label="Task Title"
                    name="title"
                    component={this.renderField}
                    />
                <Field
                    label="Task Description"
                    name="description"
                    component={this.renderField}
                    />
                <Field
                    label="Discipline"
                    name="discipline_id"
                    disciplines={this.props.disciplines}
                    component={this.renderDropDown}
                />
                <button type="submit" className="btn btn-primary">
                    Add New Task
                </button>
                <button className="btn btn-danger" data-dismiss="modal" onClick={() => this.resetForm()}>Cancel</button>
                <AlertsContainer />
            </form>
        )
    }
}

function validate(formProps){
    const errors = {};
    if(!formProps.title){
        errors.title = "Task title is required.";
    }
    if(!formProps.description){
        errors.description = "Task description is required.";
    }
    return errors;
}
function mapStateToProps(state){
    return{
        tasks: state.tasks,
        disciplines: state.disciplines,
        alerts: state.alerts
    }  
}

export default withRouter(reduxForm({
    form: 'AddTaskForm',
    validate: validate

}, mapStateToProps, null)(AddTaskForm));