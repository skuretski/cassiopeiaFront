import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { deleteTask, getTasks, getTaskViewData } from '../../actions';

class DeleteTaskForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: '',
            taskTitle: ''
        }
    }

    componentDidMount() {
        this.setState({
            message: '',
            taskTitle: this.props.tasks[this.props.id].title
        })
    }

    componentDidUpdate(prevProps) {
        // New ID, update title info
        if (this.props.id != prevProps.id) {
            this.setState({
                taskTitle: this.props.tasks[this.props.id].title,
                message: ''
            });
        }
    }

    onSubmit(){
        this.props.deleteTask(this.props.id).then(() => {
            if (this.props.deleteHasErrored) {
                this.setState({message: 'Unable to delete. Ensure that task \
                 does not have associated employees or statement of work.'});
            } else {
                this.resetForm();
                // Re-fetch tasks and task view data, since we've changed it
                this.props.dispatch(getTaskViewData);
                this.props.dispatch(getTasks);
                $('.bs-delete-task-modal-md').modal('hide');
                const { project_id, deliv_id } = this.props.match.params;
                this.props.history.push('/projects/' + project_id + '/deliverables/' + deliv_id)
            }
        })
    }

    resetForm() {
        this.props.reset();
        this.setState({message: ''});
    }

    render() {
        const { handleSubmit } = this.props; 
        return(
            <div className="text-center">
                <h3>You are about to delete:</h3>
                <h4>{this.state.taskTitle}</h4>
                <h3>Are you sure?</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                    <button type="submit" className="btn btn-danger">
                    DELETE
                    </button>
                    <button className="btn btn-primary" data-dismiss="modal" onClick={this.resetForm.bind(this)}>CANCEL</button>
                    <div className="danger-text">{this.state.message}</div>
                </form>
            </div>
        );
    }
}

DeleteTaskForm = reduxForm({
    form: 'DeleteTaskForm',
})(DeleteTaskForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteTask,
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        affectedRows: state.deleteTaskAffectedRows,
        deleteHasErrored: state.deleteTaskHasErrored
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeleteTaskForm));