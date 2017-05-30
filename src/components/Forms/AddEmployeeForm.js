import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { createEmployee, getEmployeeViewData } from '../../actions';

class AddEmployeeForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: '',
            added: false
        }
    }

    renderField(field){
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

    onSubmit(employee){
        this.props.createEmployee(employee).then(() => {
            if (this.props.hasErrored) {
                this.setState({message: 'Woops! Something went wrong. Try again.'})
            } else {
                this.setState({message: ''})
                this.props.reset();
                $('.bs-employee-modal-lg').modal('hide');
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
                <Field
                    label="Discipline"
                    name="discipline_id"
                    type="select"
                    selectOptions={this.renderDisciplineOptions()}
                    component={this.renderField}
                    />
                <button type="submit" className="btn btn-primary">
                    Add Employee
                </button>
                <button className="btn btn-danger" data-dismiss="modal" onClick={reset}>Cancel</button>
                <p>{this.state.message}</p>
            </form>
        )
    }
}

function validate(values){
    const errors = {};
    if(!values.first){
        errors.first = "First name is required.";
    }
    if(!values.last){
        errors.last = "Last name is required.";
    }
    if (values.discipline_id == 0) {
        errors.discipline_id = "Discipline is required.";
    }
    return errors;
}

AddEmployeeForm = reduxForm({
    validate,
    form: 'AddEmployeeForm',
})(AddEmployeeForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createEmployee,
        getEmployeeViewData
    }, dispatch);
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getDisciplines: () => dispatch(getDisciplines()),
//         createEmployee: (employee) => dispatch(createEmployee(employee)),
//         getEmployeeViewData: () => dispatch(getEmployeeViewData())
//     };
// }

const mapStateToProps = (state) => {
    return {
        disciplines: state.disciplines,
        employee_id: state.createEmployeeID,
        hasErrored: state.createEmployeeHasErrored,
        isSending: state.createEmployeeIsSending,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployeeForm);