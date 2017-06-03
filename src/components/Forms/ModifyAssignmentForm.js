import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createAssignment,
         updateAssignment,
         deleteAssignment,
         searchAssignments,
         getEmployeesByDiscipline,
         getTaskViewData } from '../../actions';

class ModifyAssignmentForm extends Component {
    constructor(props) {
        super(props);

        this.state = { message: '' };
    }

    componentDidMount() {
        // Get initial employee list
        this.props.getEmployeesByDiscipline(this.props.discipline_id);
    }

    componentWillUpdate(nextProps) {
        // New discipline --> refresh employee list
        if (this.props.discipline_id != nextProps.discipline_id) {
            this.props.getEmployeesByDiscipline(nextProps.discipline_id)
            .then(this.props.reset());
        }
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

    createAssignmentHelper(data, last_entry) {
        this.props.createAssignment(data, (response) => {
            if (response.status === 200) {
                if (last_entry) {
                    // Refresh chart data
                    this.props.getTaskViewData(this.props.task_id);
                }
            } else {
                this.setState( {message: 'Something went wrong. STATUS ' + this.response.status});
            }
        });
    }

    updateAssignmentHelper(data, id, last_entry) {
        this.props.updateAssignment({ effort: data.effort, id }, (response) => {
            if (response.status === 200) {
                if (last_entry) {
                    // Refresh chart data
                    this.props.getTaskViewData(this.props.task_id);
                }
            } else {
                this.setState( {message: 'Something went wrong. STATUS ' + this.response.status});
            }
        });
    }

    deleteAssignmentHelper(id, last_entry) {
        this.props.deleteAssignment({ id }, (response) => {
            if (response.status === 200) {
                if (last_entry) {
                    // Refresh chart data
                    this.props.getTaskViewData(this.props.task_id);
                }
            } else {
                this.setState( {message: 'Something went wrong. STATUS ' + this.response.status});
            }
        });
    }

    numDaysInMonth(month, year) {
        var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var days = daysInMonths[month - 1];
        // Account for leap years
        // Years divisible by 4 are leap years
        if ( (month === 2) && (year % 4 === 0)) {
            // But only if the years aren't divisible by 100
            if (year % 100 !== 0) {
                days += 1;
            } else {
                // Unless the year is also divisible by 400
                if (year % 400 === 0) {
                    days += 1;
                }
            }
        }
        return days;
    }

    submitAssignment(data_out, last_entry) {
        // See if there is an existing assignment for this employee/task/date
        this.props.searchAssignments(data_out, (response, data_ret) => {
            if (response.data.length !== 0) { // Existing record
                const assignment_id = response.data[0].id;
                if (data_ret.effort !== 0) { // UPDATE
                    this.updateAssignmentHelper(data_ret, assignment_id, last_entry);
                } else { // DELETE
                    this.deleteAssignmentHelper(assignment_id, last_entry);
                }
            } else { // No existing record
                if (data_ret.effort !== 0) { // CREATE
                    this.createAssignmentHelper(data_ret, last_entry);
                }
            }
        });
    }

    onSubmit(values) {
        var startMonth = parseInt(values.assignmentStartMonth),
            startYear = parseInt(values.assignmentStartYear),
            endMonth = parseInt(values.assignmentEndMonth),
            endYear = parseInt(values.assignmentEndYear),
            effort = parseFloat(values.assignmentEffort),
            employee_id = parseInt(values.assignmentEmployee),
            task_id = parseInt(this.props.task_id);

        var year = startYear;
        var month = startMonth;
        var data = {};
        var data_out = {};
        var last_entry = false;
        while (year <= endYear) {
            // Terminate once we're past the end date
            if (year === endYear) {
                if (month > endMonth) {
                    break;
                } else if (month === endMonth) {
                    last_entry = true;
                }
            }

            // Create object containing table entry data
            data.effort = effort;
            data.employee_id = employee_id;
            data.task_id = task_id;
            if (month < 10) {
                data.start_date = year + '-0' + month + '-01';
                data.end_date = year + '-0' + month + '-' + this.numDaysInMonth(month);
            } else {
                data.start_date = year + '-' + month + '-01';
                data.end_date = year + '-' + month + '-' + this.numDaysInMonth(month);
            }

            // Create a shallow copy to pass around
            data_out = Object.assign({}, data);

            this.submitAssignment(data_out, last_entry);

            // Increment date forward 1 month
            month += 1;
            if (month > 12) {
                month = 1;
                year += 1;
            }
        }
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
        if (!this.props.employees) {
            return <div className="text-center load-spinner" />
        }
        return (
            <fieldset>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="row">
                    <div className="col-md-6">
                        {/* Employee Field */}
                        <Field
                            label="Employee"
                            name="assignmentEmployee"
                            type="select"
                            selectOptions={this.renderEmployeeOptions()}
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-6">
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
                    <div className="col-md-6">
                        <Field
                            label="Start Month"
                            name="assignmentStartMonth"
                            type="select"
                            selectOptions={this.renderMonthOptions()}
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-6">
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
                    <div className="col-md-6">
                        <Field
                            label="End Month"
                            name="assignmentEndMonth"
                            type="select"
                            selectOptions={this.renderMonthOptions()}
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-6">
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
                <div>{this.state.message}</div>

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

ModifyAssignmentForm = reduxForm({
    validate,
    form: 'ModifyAssignmentForm',
})(ModifyAssignmentForm)

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getEmployeesByDiscipline,
        createAssignment,
        updateAssignment,
        deleteAssignment,
        searchAssignments,
        getTaskViewData }, dispatch);
}

function mapStateToProps(state) {
    return {
        employees: state.getEmployee,
        isLoading: state.getEmployeeIsSending,
        result: state.assignments
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyAssignmentForm);