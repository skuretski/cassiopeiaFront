import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { getProjectById, updateProject,
         getProjectViewData, getProjects } from '../../actions';

class UpdateProjectForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        this.props.getProjectById(this.props.id).then( () => {
            if (this.props.getHasErrored) {
                this.setState({message: 'Woops! Something went wrong. Try again.'});
            } else {
                this.initializeForm(this.props.project);
            }
        });
    }

    componentDidUpdate(prevProps) {
        // New ID, fetch project info
        if (this.props.id != prevProps.id) {
            this.props.getProjectById(this.props.id).then( () => {
                if (this.props.getHasErrored) {
                    this.setState({message: 'Woops! Something went wrong. Try again.'});
                } else {
                    this.initializeForm(this.props.project);
                }
            });
        }
    }

    initializeForm(project) {
        // Set form field values
        const {title, description } = project;
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

    onSubmit(project){
        const { title, description } = project;
        const data = { title, description, id: this.props.id };
        
        this.props.updateProject(data).then(() => {
            if (this.props.updateHasErrored) {
                this.setState({message: 'Woops! Something went wrong. Try again.'})
            } else {
                this.setState({message: ''})
                this.props.reset();
                // Update default form values with newly updated data, in case we
                // re-select the same project immediately, since the logic won't
                // re-fetch based on ID.
                this.initializeForm(data);

                // // Re-fetch projects and project view data, since we've changed it
                this.props.dispatch(getProjectViewData(this.props.id));
                this.props.dispatch(getProjects);
                $('.bs-update-project-modal-md').modal('hide');
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
                    Update Project
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

UpdateProjectForm = reduxForm({
    validate,
    form: 'UpdateProjectForm',
})(UpdateProjectForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getProjectById,
        updateProject,
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        project: state.getProject,
        getHasErrored: state.getProjectHasErrored,
        updateHasErrored: state.updateProjectHasErrored
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProjectForm);