import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createSOW,
         updateSOW,
         deleteSOW,
         searchSOW,
         getTaskViewData } from '../../actions';

class ModifySOWForm extends Component {
    constructor(props) {
        super(props);

        this.state = { message: '' };
    }

    componentDidMount() {
        // Add task_id to the fields values
        this.props.change('SOWTaskID', this.props.task_id);
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

    createSOWHelper(data, last_entry) {
        this.props.createSOW(data, (response) => {
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

    updateSOWHelper(data, id, last_entry) {
        this.props.updateSOW({ man_mo: data.man_mo, id }, (response) => {
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

    deleteSOWHelper(id, last_entry) {
        this.props.deleteSOW({ id }, (response) => {
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

    // TODO:
    onSubmit(values) {
        var startMonth = parseInt(values.SOWStartMonth),
            startYear = parseInt(values.SOWStartYear),
            endMonth = parseInt(values.SOWEndMonth),
            endYear = parseInt(values.SOWEndYear),
            manMonths = parseFloat(values.SOWManMonths),
            task_id = parseInt(values.SOWTaskID);

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
            data.man_mo = manMonths;
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

            // See if there is an existing SOW for this task/date
            this.props.searchSOW(data_out, (response, data_ret) => {
                if (response.data.length !== 0) { // Existing record
                    const sow_id = response.data[0].id;
                    if (data_ret.man_mo !== 0) { // UPDATE
                        this.updateSOWHelper(data_ret, sow_id, last_entry);
                    } else { // DELETE
                        this.deleteSOWHelper(sow_id, last_entry);
                    }
                } else { // No existing record
                    if (data_ret.man_mo !== 0) { // CREATE
                        this.createSOWHelper(data_ret, last_entry);
                    }
                }
            });

            // Increment date forward 1 month
            month += 1;
            if (month > 12) {
                month = 1;
                year += 1;
            }
        }
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
                    {/* Start Date Fields */}
                    <div className="col-md-6">
                        <Field
                            label="Start Month"
                            name="SOWStartMonth"
                            type="select"
                            selectOptions={this.renderMonthOptions()}
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            label="Start Year"
                            name="SOWStartYear"
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
                            name="SOWEndMonth"
                            type="select"
                            selectOptions={this.renderMonthOptions()}
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            label="End Year"
                            name="SOWEndYear"
                            type="select"
                            selectOptions={this.renderYearOptions()}
                            component={this.renderField}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {/* Man-Months Field */}
                        <Field
                            label="Man-Months"
                            name="SOWManMonths"
                            type="number"
                            min="0.0"
                            step="0.1"
                            max="100.0"
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
    const manMonths = values.SOWManMonths;
    const startMonth = parseInt(values.SOWStartMonth);
    const startYear = parseInt(values.SOWStartYear);
    const endMonth = parseInt(values.SOWEndMonth);
    const endYear = parseInt(values.SOWEndYear);

    if (!manMonths) {
        errors.SOWManMonths = "Enter a man-months amount.";
    } else if (manMonths < 0.0 || manMonths > 100.0) {
        errors.SOWManMonths = "Must be between 0 and 100.";
    }

    if (!startMonth) {
        errors.SOWStartMonth = "Select a start month.";
    }

    if (!startYear) {
        errors.SOWStartYear = "Select a start year.";
    }

    if (!endMonth) {
        errors.SOWEndMonth = "Select an end month.";
    }

    if (!endYear) {
        errors.SOWEndYear = "Select an end year.";
    }

    if (startMonth && startYear && endMonth && endYear) {
        if (startYear > endYear) {
            errors.SOWStartYear = "Start year must be before end year.";
            errors.SOWEndYear = "End year must be after start year.";
        } else if (startYear == endYear) {
            if (startMonth > endMonth) {
                errors.SOWStartMonth = "Start month must be before end month.";
                errors.SOWEndMonth = "End month must be after start month.";
            }
        }
    }

    return errors;
}

ModifySOWForm = reduxForm({
    validate,
    form: 'ModifySOWForm',
})(ModifySOWForm)

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createSOW,
        updateSOW,
        deleteSOW,
        searchSOW,
        getTaskViewData }, dispatch);
}

export default connect(null, mapDispatchToProps)(ModifySOWForm);