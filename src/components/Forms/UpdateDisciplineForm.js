import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { updateDiscipline, getDisciplines } from '../../actions';

class UpdateDisciplineForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidUpdate(prevProps) {
        // New ID, re-initialize form with discipline info
        if (this.props.id != prevProps.id) {
            const disc = this.props.disciplines.filter( d => {
                return d.id == this.props.id;
            });
            this.initializeForm(disc[0]);
        }
    }

    initializeForm(discipline) {
        this.props.initialize({
            title: discipline.title,
            description: discipline.description
        });
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
        discipline.id = this.props.id;
        this.props.updateDiscipline(discipline).then(() => {
            if (this.props.hasErrored) {
                this.setState({message: 'Woops! Something went wrong. Try again.'})
            } else {
                this.setState({message: ''});
                this.props.reset();
                // Update default form values with newly updated data, in case we
                // re-select the same discipline immediately, since the logic won't
                // re-fetch based on the ID.
                this.initializeForm(discipline);

                // Re-fetch the disciplines, since we've changed it
                this.props.dispatch(getDisciplines);
                $('.bs-update-disc-modal-lg').modal('hide');
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
                    Update Discipline 
                </button>
                <button className="btn btn-danger" data-dismiss="modal" onClick={() => reset()}>Cancel</button>
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


UpdateDisciplineForm = reduxForm({
    validate,
    form: 'UpdateDisciplineForm',
})(UpdateDisciplineForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateDiscipline
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        disciplines: state.disciplines,
        hasErrored: state.updateDisciplineHasErrored
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDisciplineForm);