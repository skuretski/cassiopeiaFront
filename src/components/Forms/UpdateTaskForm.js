import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { getTaskById, updateTask,
         getTaskViewData, getTasks } from '../../actions';

class UpdateTaskForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        this.props.getTaskById(this.props.id).then( () => {
            if (this.props.getHasErrored) {
                this.setState({message: 'Woops! Something went wrong. Try again.'});
            } else {
                this.initializeForm(this.props.task);
            }
        });
    }

    componentDidUpdate(prevProps) {
        // New ID, fetch task info
        if (this.props.id != prevProps.id) {
            this.props.getTaskById(this.props.id).then( () => {
                if (this.props.getHasErrored) {
                    this.setState({message: 'Woops! Something went wrong. Try again.'});
                } else {
                    this.initializeForm(this.props.task);
                }
            });
        }
    }

    initializeForm(task) {
        // Set form field value
        const {title, description } = task;
        const data = { title, description };
        this.props.initialize(data);
    }

    renderField(field) {
        const { label, type, meta: { touched, error} } = field;
        const customClass = `form-group ${touched && error ? 'has-danger' : ''}`;
        if (type == "textarea") {
            return(
                <div className={customClass}>
                    <label>{label}</label>
                    <textarea className="form-control" {...field.input}/>
                    <div className="text-help">
                        {touched ? error : ''}
                    </div>
                </div>
            );
        } else {
            return(
                <div className={customClass}>
                    <label>{label}</label>
                    <input className="form-control"
                        type={type}
                        {...field.input}
                    />
                    <div className="text-help">
                        {touched ? error : ''}
                    </div>
                </div>
            );
        }
    }

    onSubmit(task){
        const { title, description } = task;
        const { discipline_id, committed, deliverable_id } = this.props.task;
        const data = { 
            title,
            description,
            discipline_id,
            committed,
            deliverable_id,
            id: this.props.id,
        };
        this.props.updateTask(data).then(() => {
            if (this.props.updateHasErrored) {
                this.setState({message: 'Woops! Something went wrong. Try again.'})
            } else {
                this.setState({message: ''})
                this.props.reset();
                // Update default form values with newly updated data, in case we
                // re-select the same task immediately, since the logic won't
                // re-fetch based on ID.
                this.initializeForm(data);

                // // Re-fetch task and task view data, since we've changed it
                this.props.dispatch(getTaskViewData(this.props.id));
                this.props.dispatch(getTasks);
                $('.bs-update-task-modal-md').modal('hide');
            }
        })
    }

    render() {
        const { handleSubmit, reset } = this.props; 
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field
                    label="Title"
                    name="title"
                    type="text"
                    component={this.renderField}
                />
                <Field
                    label="Description"
                    name="description"
                    type="textarea"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">
                    Update Task
                </button>
                <button className="btn btn-danger" data-dismiss="modal" onClick={reset}>Cancel</button>
                <p>{this.state.message}</p>
            </form>
        )
    }
}

function validate(values){
    const errors = {};
    const { title, description } = values;

    if(!title){
        errors.title = "Title is required.";
    }
    if(!description){
        errors.description = "Description is required.";
    }

    return errors;
}

UpdateTaskForm = reduxForm({
    validate,
    form: 'UpdateTaskForm',
})(UpdateTaskForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTaskById,
        updateTask,
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        task: state.getTask,
        getHasErrored: state.getTaskHasErrored,
        updateHasErrored: state.updateTaskHasErrored,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTaskForm);