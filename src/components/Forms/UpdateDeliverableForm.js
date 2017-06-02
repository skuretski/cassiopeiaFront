import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { getDeliverableById, updateDeliverable,
         getDeliverableViewData, getDeliverables } from '../../actions';

class UpdateDeliverableForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        this.props.getDeliverableById(this.props.id).then( () => {
            if (this.props.getHasErrored) {
                this.setState({message: 'Woops! Something went wrong. Try again.'});
            } else {
                this.initializeForm(this.props.deliverable);
            }
        });
    }

    componentDidUpdate(prevProps) {
        // New ID, fetch deliverable info
        if (this.props.id != prevProps.id) {
            this.props.getDeliverableById(this.props.id).then( () => {
                if (this.props.getHasErrored) {
                    this.setState({message: 'Woops! Something went wrong. Try again.'});
                } else {
                    this.initializeForm(this.props.deliverable);
                }
            });
        }
    }

    initializeForm(deliverable) {
        // Set form field values
        const {title, description } = deliverable;
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

    onSubmit(deliverable){
        const { title, description } = deliverable;
        const data = { 
            title,
            description,
            id: this.props.id,
            project_id: this.props.deliverable.project_id
        };
        this.props.updateDeliverable(data).then(() => {
            if (this.props.updateHasErrored) {
                this.setState({message: 'Woops! Something went wrong. Try again.'})
            } else {
                this.setState({message: ''})
                this.props.reset();
                // Update default form values with newly updated data, in case we
                // re-select the same deliverable immediately, since the logic won't
                // re-fetch based on ID.
                this.initializeForm(data);

                // // Re-fetch deliverables and deliverable view data, since we've changed it
                this.props.dispatch(getDeliverableViewData(this.props.id));
                this.props.dispatch(getDeliverables);
                $('.bs-update-deliverable-modal-md').modal('hide');
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
                    Update Deliverable
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

UpdateDeliverableForm = reduxForm({
    validate,
    form: 'UpdateDeliverableForm',
})(UpdateDeliverableForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getDeliverableById,
        updateDeliverable,
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        deliverable: state.getDeliverable,
        getHasErrored: state.getDeliverableHasErrored,
        updateHasErrored: state.updateDeliverableHasErrored
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDeliverableForm);