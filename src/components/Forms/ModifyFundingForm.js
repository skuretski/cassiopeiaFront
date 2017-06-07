import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createFunding,
         updateFunding,
         deleteFunding,
         searchFunding,
         getFundingViewData } from '../../actions';

class ModifyFundingForm extends Component {
    constructor(props) {
        super(props);

        this.state = { message: '' };
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

    createFundingHelper(data, last_entry) {
        this.props.createFunding(data, (response) => {
            if (response.status === 200) {
                if (last_entry) {
                    this.refreshViewData();
                }
            } else {
                this.setState( {message: 'Something went wrong. STATUS ' + this.response.status});
            }
        });
    }

    updateFundingHelper(data, id, last_entry) {
        this.props.updateFunding({ amount: data.amount, acquired: data.acquired, id }, (response) => {
            if (response.status === 200) {
                if (last_entry) {
                    this.refreshViewData();
                }
            } else {
                this.setState( {message: 'Something went wrong. STATUS ' + this.response.status});
            }
        });
    }

    deleteFundingHelper(id, last_entry) {
        this.props.deleteFunding({ id }, (response) => {
            if (response.status === 200) {
                if (last_entry) {
                    this.refreshViewData();
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

    refreshViewData() {
        this.props.dispatch(getFundingViewData);
    }

    submitFunding(data_out, last_entry) {
        // See if there is an existing funding entry for this project/type/date
        this.props.searchFunding(data_out, (response, data_ret) => {
            if (response.data.length !== 0) { // Existing record
                const funding_id = response.data[0].id;
                if (data_ret.amount !== 0) { // UPDATE
                    this.updateFundingHelper(data_ret, funding_id, last_entry);
                } else { // DELETE
                    this.deleteFundingHelper(funding_id, last_entry);
                }
            } else { // No existing record
                if (data_ret.amount !== 0) { // CREATE
                    this.createFundingHelper(data_ret, last_entry);
                } else if (last_entry) { // Simply refresh on last entry
                    // This line beats the other requests back, so it re-renders too early
                    //this.refreshViewData();
                }
            }
        });
    }

    onSubmit(values) {
        var startMonth = parseInt(values.fundingStartMonth),
            startYear = parseInt(values.fundingStartYear),
            endMonth = parseInt(values.fundingEndMonth),
            endYear = parseInt(values.fundingEndYear),
            project_id = parseInt(values.fundingProject),
            type_id = parseInt(values.fundingType),
            amount = parseFloat(values.fundingAmount),
            acquired = 1;

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
            data.acquired = acquired; // default value for now
            data.amount = amount;
            data.project_id = project_id;
            data.type_id = type_id;
            if (month < 10) {
                data.start_date = year + '-0' + month + '-01';
                data.end_date = year + '-0' + month + '-' + this.numDaysInMonth(month);
            } else {
                data.start_date = year + '-' + month + '-01';
                data.end_date = year + '-' + month + '-' + this.numDaysInMonth(month);
            }

            // Create a shallow copy to pass around
            data_out = Object.assign({}, data);

            this.submitFunding(data_out, last_entry);

            // Increment date forward 1 month
            month += 1;
            if (month > 12) {
                month = 1;
                year += 1;
            }
        }
    }

    renderProjectOptions() {
        var projects = this.props.data.project;
        var opts = [];
        opts.push(<option key={0} value={0}>Select Project...</option>)
            projects.map( e => {
                opts.push(<option key={e.id} value={e.id}>{e.title}</option>)
            })
        return opts;
    }

    renderTypeOptions() {
        var types = this.props.data.type;
        var opts = [];
        opts.push(<option key={0} value={0}>Select Funding Type...</option>)
            types.map( e => {
                opts.push(<option key={e.id} value={e.id}>{e.title}</option>)
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
        if (!this.props.data) {
            return <div className="text-center load-spinner" />
        }
        return (
            <fieldset>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="row">
                    <div className="col-md-6">
                        {/* Project Field */}
                        <Field
                            label="Project"
                            name="fundingProject"
                            type="select"
                            selectOptions={this.renderProjectOptions()}
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-6">
                        {/* Type Field */}
                        <Field
                            label="Funding Type"
                            name="fundingType"
                            type="select"
                            selectOptions={this.renderTypeOptions()}
                            component={this.renderField}
                        />
                    </div>
                </div>

                <div className="row">
                    {/* Start Date Fields */}
                    <div className="col-md-6">
                        <Field
                            label="Start Month"
                            name="fundingStartMonth"
                            type="select"
                            selectOptions={this.renderMonthOptions()}
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            label="Start Year"
                            name="fundingStartYear"
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
                            name="fundingEndMonth"
                            type="select"
                            selectOptions={this.renderMonthOptions()}
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            label="End Year"
                            name="fundingEndYear"
                            type="select"
                            selectOptions={this.renderYearOptions()}
                            component={this.renderField}
                        />
                    </div>
                </div>
                    
                <div className="row">
                    <div className="col-md-12">
                        {/* Funding Field */}
                        <Field
                            label="Funding Amount"
                            name="fundingAmount"
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

    const startMonth = parseInt(values.fundingStartMonth);
    const startYear = parseInt(values.fundingStartYear);
    const endMonth = parseInt(values.fundingEndMonth);
    const endYear = parseInt(values.fundingEndYear);
    const project_id = parseInt(values.fundingProject);
    const type_id = parseInt(values.fundingType);
    const amount = values.fundingAmount;

    if (!project_id) {
        errors.fundingProject = "Select a project.";
    }

    if (!type_id) {
        errors.fundingType = "Select a funding type.";
    }

    if (!amount) {
        errors.fundingAmount = "Enter an funding amount.";
    } else if (amount < 0.0 || amount > 100.0) {
        errors.fundingAmount = "Must be between 0 and 100."
    }

    if (!startMonth) {
        errors.fundingStartMonth = "Select a start month.";
    }

    if (!startYear) {
        errors.fundingStartYear = "Select a start year.";
    }

    if (!endMonth) {
        errors.fundingEndMonth = "Select an end month.";
    }

    if (!endYear) {
        errors.fundingEndYear = "Select an end year.";
    }

    if (startMonth && startYear && endMonth && endYear) {
        if (startYear > endYear) {
            errors.fundingStartYear = "Start year must be before end year.";
            errors.fundingEndYear = "End year must be after start year.";
        } else if (startYear == endYear) {
            if (startMonth > endMonth) {
                errors.fundingStartMonth = "Start month must be before end month.";
                errors.fundingEndMonth = "End month must be after start month.";
            }
        }
    }

    return errors;
}

ModifyFundingForm = reduxForm({
    validate,
    form: 'ModifyFundingForm',
})(ModifyFundingForm)

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createFunding,
        updateFunding,
        deleteFunding,
        searchFunding }, dispatch);
}

function mapStateToProps(state) {
    return {
        funding: state.getFunding,
        isLoading: state.getFundingIsSending,
        result: state.funding
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyFundingForm);