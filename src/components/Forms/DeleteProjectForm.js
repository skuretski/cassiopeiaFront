import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { deleteProject, getProjects, getProjectViewData } from '../../actions';

class DeleteProjectForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: '',
            projectTitle: ''
        }
    }

    componentDidMount() {
        this.setState({
            message: '',
            projectTitle: this.props.projects[this.props.id].title
        })
    }

    componentDidUpdate(prevProps) {
        // New ID, update title info
        if (this.props.id != prevProps.id) {
            this.setState({
                projectTitle: this.props.projects[this.props.id].title,
                message: ''
            });
        }
    }

    onSubmit(){
        this.props.deleteProject(this.props.id).then(() => {
            if (this.props.deleteHasErrored) {
                this.setState({message: 'Unable to delete. Ensure that project \
                 does not have associated deliverables.'});
            } else {
                this.resetForm();
                // Re-fetch projects and project view data, since we've changed it
                this.props.dispatch(getProjectViewData);
                this.props.dispatch(getProjects);
                $('.bs-delete-project-modal-md').modal('hide');
                this.props.history.push('/')
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
                <h4>{this.state.projectTitle}</h4>
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

DeleteProjectForm = reduxForm({
    form: 'DeleteProjectForm',
})(DeleteProjectForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteProject,
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects,
        affectedRows: state.deleteProjectAffectedRows,
        deleteHasErrored: state.deleteProjectHasErrored
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeleteProjectForm));