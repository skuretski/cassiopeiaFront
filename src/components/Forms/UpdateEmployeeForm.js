import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { getEmployeeById, updateEmployee, getEmployeeViewData } from '../../actions';

class UpdateEmployeeForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidUpdate(prevProps) {
        // New ID, fetch employee info
        if (this.props.id != prevProps.id) {
            this.props.getEmployeeById(this.props.id).then( () => {
                if (this.props.hasErrored) {
                    this.setState({message: 'Woops! Something went wrong. Try again.'});
                } else {
                    this.initializeForm(this.props.employee);
                }
            });
        }
    }

    initializeForm(employee) {
        var startDate = new Date(employee.active_start_date);
        var endDate = new Date(employee.active_end_date);
        // Set form field values
        const {first, last, discipline_id} = employee;
        var data = { first, last, discipline_id,
            startMonth: startDate.getUTCMonth() + 1,
            startYear: startDate.getUTCFullYear(),
            endMonth: endDate.getUTCMonth() + 1,
            endYear: endDate.getUTCFullYear()
        }
        this.props.initialize(data);
    }

    renderField(field) {
        const { meta: { touched, error} } = field;
        const customClass = `form-group ${touched && error ? 'has-danger' : ''}`;
        if (field.type === 'select') {
            return (
                <div className={customClass}>
                    <label>{field.label}</label>
                    <select className="form-control" {...field.input}>
                        {field.selectOptions}
                    </select>
                    <div className="text-help">
                        {touched ? error : ''}
                    </div>
                </div>
            );
        } else {
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
    }

    renderDisciplineOptions() {
        var disciplines = this.props.disciplines;
        var opts = [];
        opts.push(<option key={0} value={0}>Select Discipline...</option>);
        disciplines.map( d => {
            opts.push(<option key={d.id} value={d.id}>{d.title}</option>);
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
        for (var i = yr - 40; i <= yr + 40; ++i) {
            opts.push(<option key={i} value={i}>{i}</option>);
        }
        return opts;
    }

    onSubmit(employee){
        var { first, last, discipline_id, startMonth, startYear, endMonth, endYear } = employee;
        var data = { first, last, discipline_id };
        if (startMonth < 10) {
            startMonth = '0' + startMonth;
        }
        if (endMonth < 10) {
            endMonth = '0' + endMonth;
        }

        data.active_start_date = startYear + '-' + startMonth + '-01';
        data.active_end_date = endYear + '-' + endMonth + '-01';
        data.id = this.props.id;
        
        this.props.updateEmployee(data).then(() => {
            if (this.props.updateHasErrored) {
                this.setState({message: 'Woops! Something went wrong. Try again.'})
            } else {
                this.setState({message: ''})
                this.props.reset();
                // Update default form values with newly updated data, in case we
                // re-select the same employee immediately, since the logic won't
                // re-fetch based on ID.
                this.initializeForm(data);

                // Re-fetch the employee view data, since we've changed it
                this.props.dispatch(getEmployeeViewData);
                $('.bs-update-modal-lg').modal('hide');
            }
        })
    }

    render() {
        const { handleSubmit, reset } = this.props; 
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            label="First Name"
                            name="first"
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            label="Last Name"
                            name="last"
                            component={this.renderField}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            label="Discipline"
                            name="discipline_id"
                            type="select"
                            selectOptions={this.renderDisciplineOptions()}
                            component={this.renderField}
                        />
                    </div>
                </div>
                {/* Start Date Fields */}
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            label="Active Start Month"
                            name="startMonth"
                            type="select"
                            selectOptions={this.renderMonthOptions()}
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            label="Active Start Year"
                            name="startYear"
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
                            label="Active End Month"
                            name="endMonth"
                            type="select"
                            selectOptions={this.renderMonthOptions()}
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            label="Active End Year"
                            name="endYear"
                            type="select"
                            selectOptions={this.renderYearOptions()}
                            component={this.renderField}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Employee
                </button>
                <button className="btn btn-danger" data-dismiss="modal" onClick={reset}>Cancel</button>
                <p>{this.state.message}</p>
            </form>
        )
    }
}

function validate(values){
    const errors = {};
    const { first, last, discipline_id,
        startMonth, startYear, endMonth, endYear } = values;
    if(!first){
        errors.first = "First name is required.";
    }
    if(!last){
        errors.last = "Last name is required.";
    }
    if (discipline_id == 0) {
        errors.discipline_id = "Discipline is required.";
    }
    if (!startMonth) {
        errors.startMonth = "Start month is required.";
    }
    if (!startYear) {
        errors.startYear = "Start year is required.";
    }
    if (!endMonth) {
        errors.endMonth = "End month is required.";
    }
    if (!endYear) {
        errors.endYear = "End year is required.";
    }
    if (startMonth && startYear && endMonth && endYear) {
        if (startYear > endYear) {
            errors.startYear = "Start year must be before end year.";
            errors.endYear = "End year must be after start year.";
        } else if (startYear == endYear) {
            if (startMonth > endMonth) {
                errors.startMonth = "Start month must be before end month.";
                errors.endMonth = "End month must be after start month.";
            }
        }
    }

    return errors;
}

UpdateEmployeeForm = reduxForm({
    validate,
    form: 'UpdateEmployeeForm',
})(UpdateEmployeeForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getEmployeeById,
        getEmployeeViewData,
        updateEmployee
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        disciplines: state.disciplines,
        employee: state.getEmployee,
        hasErrored: state.getEmployeeHasErrored,
        updateHasErrored: state.updateEmployeeHasErrored
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployeeForm);