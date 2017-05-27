import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getEmployeesByDiscipline } from '../../actions';
import { createAssignment } from '../../actions';

class AddAssignmentForm extends Component {
    componentDidMount() {
        this.props.getEmployeesByDiscipline(this.props.discipline_id);
        // Add task_id to the fields values
        this.props.change('assignmentTaskID', this.props.task_id);
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        if (field.type === 'select') {
            return (
                <div className={className}>
                    <label>{field.label}</label>
                    <select className="form-control" {...field.input}>
                        {field.selectOptions}
                    </select>
                    <div className="text-help">
                        {touched ? error : ''}
                    </div>
                </div>
            );
        } else if (field.type === 'number') {
            return (
                <div className={className}>
                    <label>{field.label}</label>
                    <input className="form-control"
                        type={field.type}
                        min={field.min}
                        step={field.step}
                        max={field.max}
                        {...field.input}/>
                    <div className="text-help">
                        {touched ? error : ''}
                    </div>
                </div>
            );
        } else {
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
    }

    // TODO:
    // * Clear form on submit
    // * Figure out if submit was successful? How can I know...?
    onSubmit(values) {
        console.log('Values:', values);
        var startMonth = parseInt(values.assignmentStartMonth),
            startYear = values.assignmentStartYear,
            endMonth = parseInt(values.assignmentEndMonth),
            endYear = values.assignmentEndYear,
            effort = values.assignmentEffort,
            emp_id = values.assignmentEmployee,
            task_id = values.assignmentTaskID;
             
        if (startMonth < 10) {
            startMonth = '0' + startMonth.toString();
        }
        if (endMonth < 10) {
            endMonth = '0' + endMonth.toString();
        }
        var data = {};
        // Date format is YYYY-MM-DD
        data.start_date = startYear + '-' + startMonth + '-01';
        data.end_date = endYear + '-' + endMonth + '-01';
        data.effort = effort;
        data.employee_id = emp_id;
        data.task_id = task_id;

        this.props.createAssignment(data);
    }

    renderEmployeeOptions() {
        var employees = this.props.employees;
        var opts = [];
        opts.push(<option key={0} value={0}>Select Employee...</option>)
        employees.map( e => {
            opts.push(<option key={e.id} value={e.id}>{e.last + ', ' + e.first}</option>)
        })
        return opts;
    }

    renderMonthOptions() {
        var opts = [];
        opts.push(<option key={0} value={0}>Select Month...</option>)
        const months = ['January','February','March','April','May','June','July',
         'August','September','October','November','December'];
        months.map( (name, num) => {
            opts.push(<option key={num+1} value={num+1}>{name}</option>)
        });
        return opts;
    }

    renderYearOptions() {
        var yr = new Date().getFullYear();
        var opts = [];
        opts.push(<option key={0} value={0}>Select Year...</option>)
        for (var i = 0; i <= 10; ++i) {
            opts.push(<option key={yr+i} value={yr+i}>{yr+i}</option>);
        }
        return opts;
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <fieldset>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="row">
                    <div className="col-md-2">
                        {/* Employee Field */}
                        <Field
                            label="Employee"
                            name="assignmentEmployee"
                            type="select"
                            selectOptions={this.renderEmployeeOptions()}
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-2">
                        {/* Effort Field */}
                        <Field
                            label="Effort"
                            name="assignmentEffort"
                            type="number"
                            min="0.0"
                            step="0.1"
                            max="1.0"
                            component={this.renderField}
                        />
                    </div>
                </div>

                <div className="row">
                    {/* Start Date Fields */}
                    <div className="col-md-2">
                        <Field
                            label="Start Month"
                            name="assignmentStartMonth"
                            type="select"
                            selectOptions={this.renderMonthOptions()}
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-2">
                        <Field
                            label="Start Year"
                            name="assignmentStartYear"
                            type="select"
                            selectOptions={this.renderYearOptions()}
                            component={this.renderField}
                        />
                    </div>
                </div>

                {/* End Date Fields */}
                <div className="row">
                    <div className="col-md-2">
                        <Field
                            label="End Month"
                            name="assignmentEndMonth"
                            type="select"
                            selectOptions={this.renderMonthOptions()}
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-2">
                        <Field
                            label="End Year"
                            name="assignmentEndYear"
                            type="select"
                            selectOptions={this.renderYearOptions()}
                            component={this.renderField}
                        />
                    </div>
                </div>
                    
                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
            </fieldset>
        );
    }
}

function validate(values) {
    const errors = {};
    //TODO:
    // * Validate that input start date is in today's month/year or later
    // * Validate that end date is after start date
    // * Validate that effort is in range [0, 1]
    // Validate the inputs from 'values'
    const employee = parseInt(values.assignmentEmployee);
    const effort = values.assignmentEffort;
    const startMonth = parseInt(values.assignmentStartMonth);
    const startYear = parseInt(values.assignmentStartYear);
    const endMonth = parseInt(values.assignmentEndMonth);
    const endYear = parseInt(values.assignmentEndYear);

    if (!employee) {
        errors.assignmentEmployee = "Select an employee.";
    }

    if (!effort) {
        errors.assignmentEffort = "Enter an effort amount.";
    } else if (effort < 0.0 || effort > 1.0) {
        errors.assignmentEffort = "Must be between 0 and 1."
    }

    if (!startMonth) {
        errors.assignmentStartMonth = "Select a start month.";
    }

    if (!startYear) {
        errors.assignmentStartYear = "Select a start year.";
    }

    if (!endMonth) {
        errors.assignmentEndMonth = "Select an end month.";
    }

    if (!endYear) {
        errors.assignmentEndYear = "Select an end year.";
    }

    if (startMonth && startYear && endMonth && endYear) {
        if (startYear > endYear) {
            errors.assignmentStartYear = "Start year must be before end year.";
            errors.assignmentEndYear = "End year must be after start year.";
        } else if (startYear == endYear) {
            if (startMonth > endMonth) {
                errors.assignmentStartMonth = "Start month must be before end month.";
                errors.assignmentEndMonth = "End month must be after start month.";
            }
        }
    }

    return errors;
}

AddAssignmentForm = reduxForm({
    validate,
    form: 'AddAssignmentForm',
})(AddAssignmentForm)

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getEmployeesByDiscipline,
        createAssignment }, dispatch);
}

function mapStateToProps(state) {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAssignmentForm);