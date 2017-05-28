import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addTask } from '../../actions';

class AddTaskForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            added: false
        }
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
        if(task.title != '' && task.description != ''){
            task.deliverable_id = this.props.deliverableId;
            this.props.dispatch(addTask(task)).then(() => {
                this.setState({added: true});
                this.props.reset();
           });
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
                    label="Task Committed"
                    name="committed"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">
                    Add New Task
                </button>
                <button className="btn btn-danger" data-dismiss="modal" onClick={reset}>Cancel</button>
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
        tasks: state.tasks
    }  
}

export default reduxForm({
    form: 'AddTaskForm',
    validate: validate

}, mapStateToProps, null)(AddTaskForm);