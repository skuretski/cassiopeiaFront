import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { createDiscipline, getDisciplines } from '../../actions';

class AddDisciplineForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: '',
            added: false
        }
    }

    componentWillMount() {
        this.props.initialize({title: '', description: ''});
    }

    resetForm() {
        this.props.change('title', '');
        this.props.change('description', '');
        this.props.untouch('title', 'description');
    }

    renderField(field){
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

    onSubmit(discipline){
        this.props.createDiscipline(discipline).then(() => {
            if (this.props.hasErrored) {
                this.setState({message: 'Woops! Something went wrong. Try again.'})
            } else {
                this.setState({message: ''})
                this.resetForm();
                // Re-fetch list of disciplines
                this.props.dispatch(getDisciplines);
                $('.bs-add-disc-modal-lg').modal('hide');
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
                    Add Discipline 
                </button>
                <button className="btn btn-danger" data-dismiss="modal" onClick={() => this.resetForm()}>Cancel</button>
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

AddDisciplineForm = reduxForm({
    validate,
    form: 'AddDisciplineForm',
})(AddDisciplineForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createDiscipline,
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        hasErrored: state.createDisciplineHasErrored
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDisciplineForm);