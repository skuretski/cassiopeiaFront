import React, { Component } from 'react';
import TableRow from './TableComponents/TableRow';
import AddEmployeeForm from '../Forms/AddEmployeeForm';
import UpdateEmployeeForm from '../Forms/UpdateEmployeeForm';
import DeleteEmployeeForm from '../Forms/DeleteEmployeeForm';
import _ from 'lodash';

class EmployeeListTable extends Component {
    constructor(props) {
        super(props);    
    
        this.EmployeeIdOrder = 0;
        this.LastNameOrder = 0; // 0 for ascending, 1 for descending
        this.FirstNameOrder = 0;
        this.DisciplineOrder = 0;
        this.ActiveOrder = 0;
        this.ActiveStartDateOrder = 0;
        this.ActiveEndDateOrder = 0;
        
        this.handleEmployeeIdClick = this.handleEmployeeIdClick.bind(this);
        this.handleLastNameClick = this.handleLastNameClick.bind(this);
        this.handleFirstNameClick = this.handleFirstNameClick.bind(this);
        this.handleDisciplineClick = this.handleDisciplineClick.bind(this);
        this.handleActiveClick = this.handleActiveClick.bind(this);
        this.handleActiveStartDateClick = this.handleActiveStartDateClick.bind(this);
        this.handleActiveEndDateClick = this.handleActiveEndDateClick.bind(this);
        this.handleUpdateEmployeeClick = this.handleUpdateEmployeeClick.bind(this);
        this.handleDeleteEmployeeClick = this.handleDeleteEmployeeClick.bind(this);

        this.idToDiscMap = new Object();
        for (var i = 0; i < this.props.data.disciplines.length; i++) {
            this.idToDiscMap[this.props.data.disciplines[i].id] = this.props.data.disciplines[i].title;
        }

        this.state = {
            updateId: 0,
            deleteId: 0
        }
    }

    dateHelper(date) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return (months[parseInt(date.substring(5, 7)) - 1] + '-' + date.substring(0, 4));
    }

    handleEmployeeIdClick() {
        if (this.EmployeeIdOrder == 0) {
            this.props.data.employees.sort(function(a, b) {return a.emp_id - b.emp_id});
            this.EmployeeIdOrder = 1;
        }
        else {
            this.props.data.employees.sort(function(a, b) {return b.emp_id - a.emp_id});
            this.EmployeeIdOrder = 0;
        }
        this.forceUpdate();
    }

    handleLastNameClick() {
        if (this.LastNameOrder == 0) {
            this.props.data.employees.sort(function(a, b) {return a.last.localeCompare(b.last)});
            this.LastNameOrder = 1;
        }
        else {
            this.props.data.employees.sort(function(a, b) {return b.last.localeCompare(a.last)});
            this.LastNameOrder = 0;
        }
        this.forceUpdate();
    }

    handleFirstNameClick() {
        if (this.FirstNameOrder == 0) {
            this.props.data.employees.sort(function(a, b) {return a.first.localeCompare(b.first)});
            this.FirstNameOrder = 1;
        }
        else {
            this.props.data.employees.sort(function(a, b) {return b.first.localeCompare(a.first)});
            this.FirstNameOrder = 0;
        }
        this.forceUpdate();
    }

    handleDisciplineClick() {
        if (this.DisciplineOrder == 0) {
            this.props.data.employees.sort(function(a, b) {return a.discipline.localeCompare(b.discipline)});
            this.DisciplineOrder = 1;
        }
        else {
            this.props.data.employees.sort(function(a, b) {return b.discipline.localeCompare(a.discipline)});
            this.DisciplineOrder = 0;
        }
        this.forceUpdate();
    }

    handleActiveClick() {
        if (this.ActiveOrder == 0) {
            this.props.data.employees.sort(function(a, b) {return a.active.localeCompare(b.active)});
            this.ActiveOrder = 1;
        }
        else {
            this.props.data.employees.sort(function(a, b) {return b.active.localeCompare(a.active)});
            this.ActiveOrder = 0;
        }
        this.forceUpdate();
    }

    handleActiveStartDateClick() {
        if (this.ActiveStartDateOrder == 0) {
            this.props.data.employees.sort(function(a, b) {return a.active_start_date.localeCompare(b.active_start_date)});
            this.ActiveStartDateOrder = 1;
        }
        else {
            this.props.data.employees.sort(function(a, b) {return b.active_start_date.localeCompare(a.active_start_date)});
            this.ActiveStartDateOrder = 0;
        }
        this.forceUpdate();
    }

    handleActiveEndDateClick() {
        if (this.ActiveEndDateOrder == 0) {
            this.props.data.employees.sort(function(a, b) {return a.active_end_date.localeCompare(b.active_end_date)});
            this.ActiveEndDateOrder = 1;
        }
        else {
            this.props.data.employees.sort(function(a, b) {return b.active_end_date.localeCompare(a.active_end_date)});
            this.ActiveEndDateOrder = 0;
        }
        this.forceUpdate();
    }

    handleUpdateEmployeeClick(event) {
        const {id} = event.target;
        this.setState({ updateId: id });
        $('.bs-update-modal-lg').modal('show');
    }

    handleDeleteEmployeeClick(event) {
        const {id} = event.target;
        this.setState({ deleteId: id });
        $('.bs-delete-modal-md').modal('show');
    }


    render() {
        // Don't bother rendering the table if we don't have data
        if (!this.props.data) {
            return <div></div>
        }

        var rows = [];
        for (var i = 0; i < this.props.data.employees.length; i++) {
            this.props.data.employees[i].discipline = this.idToDiscMap[this.props.data.employees[i].disc_id];
            rows.push(<tr key={this.props.data.employees[i].emp_id}>
                <td>{this.props.data.employees[i].emp_id}</td>
                <td>{this.props.data.employees[i].last}</td>
                <td>{this.props.data.employees[i].first}</td>
                <td>{this.props.data.employees[i].discipline}</td>
                <td>{this.props.data.employees[i].active}</td>
                <td>{this.dateHelper(this.props.data.employees[i].active_start_date)}</td>
                <td>{this.dateHelper(this.props.data.employees[i].active_end_date)}</td>
                <td><button className="btn btn-default sharp" id={this.props.data.employees[i].emp_id} onClick={this.handleUpdateEmployeeClick}>Update</button></td>
                <td><button className="btn btn-default sharp btn-danger-text" id={this.props.data.employees[i].emp_id} onClick={this.handleDeleteEmployeeClick}>Delete</button></td>
                </tr>);
        }

        return (
            <div>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th><button type="button" className="btn btn-default sharp" onClick={this.handleEmployeeIdClick}>Employee ID</button></th>
                            <th><button type="button" className="btn btn-default sharp" onClick={this.handleLastNameClick}>Last Name</button></th>
                            <th><button type="button" className="btn btn-default sharp" onClick={this.handleFirstNameClick}>First Name</button></th>
                            <th><button type="button" className="btn btn-default sharp" onClick={this.handleDisciplineClick}>Discipline</button></th>
                            <th><button type="button" className="btn btn-default sharp" onClick={this.handleActiveClick}>Active</button></th>
                            <th><button type="button" className="btn btn-default sharp" onClick={this.handleActiveStartDateClick}>Active Start Date</button></th>
                            <th><button type="button" className="btn btn-default sharp" onClick={this.handleActiveEndDateClick}>Active End Date</button></th>
                            <th colSpan="2">
                                <button type="button" className="btn btn-primary sharp" data-toggle="modal" data-target=".bs-employee-modal-lg">
                                    Add New Employee
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <div className="modal fade bs-employee-modal-lg" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="container-fluid">
                                <h2>Add an Employee</h2>
                                <AddEmployeeForm/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade bs-update-modal-lg" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="container-fluid">
                                <h2>Update an Employee</h2>
                                <UpdateEmployeeForm id={this.state.updateId}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade bs-delete-modal-md" role="dialog">
                    <div className="modal-dialog modal-md" role="document">
                        <div className="modal-content">
                            <div className="container-fluid">
                                <DeleteEmployeeForm id={this.state.deleteId}/>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}

export default EmployeeListTable;