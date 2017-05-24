import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addDeliverable } from '../../actions';

class AddDeliverableForm extends Component{
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
    onSubmit(deliverable){
    //    console.log(errors);
    //     if(!errors){
    //         deliverable.project_id = this.props.projectId;
    //         this.props.dispatch(addDeliverable(deliverable)).then(() => {
    //             this.setState({added: true});
    //             this.props.reset();
    //           // this.props.history.push('/projects/');
    //        });          
    //    }

    }
    render(){
        const { handleSubmit } = this.props;
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
                    Add Deliverable to {this.props.projects[this.props.projectId].title}
                </button>
                <button className="btn btn-danger" data-dismiss="modal" onClick={this.props.reset}>Cancel</button>
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
        projects: state.projects,
        deliverables: state.deliverables
    }
}

export default reduxForm({
    form: 'AddDeliverableForm',
    validate: validateDelivs

}, mapStateToProps, null)(AddDeliverableForm);