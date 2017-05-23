import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getEmployeesByDiscipline } from '../../actions';

class AddAssignmentForm extends Component {
    componentDidMount() {
        this.props.getEmployeesByDiscipline(this.props.discipline_id);
        // this.props.dispatch(getEmployeesByDiscipline(this.props.discipline_id));
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type={field.type} {...field.input}/>
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
       );
    }

    onSubmit(values) {
        console.log(values);
    }

    render() {
        console.log(this.props);
        const { handleSubmit } = this.props;
        return (
            <fieldset>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <label>Employee</label>
                <div>
                    <Field name="assignmentEmployee" component="select">
                        {this.props.employees.map( e => {
                            return (
                                <option key={e.id} value={e.id}>{e.last + ', ' + e.first}</option>
                            )
                        })}
                    </Field>
                </div>
                <Field
                    label="Effort"
                    name="assignmentEffort"
                    type="text"
                    component={this.renderField}
                />
                <Field
                    label="Start Date"
                    name="assignmentStartDate"
                    type="month"
                    component={this.renderField}
                />
                <Field
                    label="End Date"
                    name="assignmentEndDate"
                    type="text"
                    component={this.renderField}
                /> 
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </fieldset>
        );
    }
}

function validate(values) {
    const errors = {};
    // Validate the inputs from 'values'
    if (!values.assignmentEmployee) {
        errors.assignmentEmployee = "Select an employee.";
    }

    if (!values.assignmentEffort) {
        errors.assignmentEffort = "Enter an effort amount.";
    }

    if (!values.assignmentStartDate) {
        errors.assignmentStartDate = "Enter a start date.";
    }

    if (!values.assignmentEndDate) {
        errors.assignmentEndDate = "Enter a end date.";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux-form assumes form is invalid
    return errors;

}

AddAssignmentForm = reduxForm({
    validate,
    form: 'AddAssignmentForm'
})(AddAssignmentForm)

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getEmployeesByDiscipline }, dispatch);
}

function mapStateToProps(state) {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAssignmentForm);