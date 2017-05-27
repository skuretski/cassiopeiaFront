import React, { Component } from 'react';
import TableRow from './TableComponents/TableRow';
import _ from 'lodash';

class EmployeeListTable extends Component {
    constructor(props) {
        super(props);    

        this.LastNameOrder = 0; // 0 for ascending, 1 for descending
        this.FirstNameOrder = 0;
        this.DisciplineOrder = 0;
        this.ActiveOrder = 0;
        this.ActiveStartDateOrder = 0;
        this.ActiveEndDateOrder = 0;
        
        this.handleLastNameClick = this.handleLastNameClick.bind(this);
        this.handleFirstNameClick = this.handleFirstNameClick.bind(this);
        this.handleDisciplineClick = this.handleDisciplineClick.bind(this);
        this.handleActiveClick = this.handleActiveClick.bind(this);
        this.handleActiveStartDateClick = this.handleActiveStartDateClick.bind(this);
        this.handleActiveEndDateClick = this.handleActiveEndDateClick.bind(this);
        this.handleUpdateEmployeeClick = this.handleUpdateEmployeeClick.bind(this);
        this.handleDeleteEmployeeClick = this.handleDeleteEmployeeClick.bind(this);
        this.handleAddNewEmployeeClick = this.handleAddNewEmployeeClick.bind(this);

        this.idToDiscMap = new Object();
        for (var i = 0; i < this.props.data.disciplines.length; i++) {
            this.idToDiscMap[this.props.data.disciplines[i].id] = this.props.data.disciplines[i].title;
        }
    }

    dateHelper(date) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return (months[parseInt(date.substring(5, 7)) - 1] + '-' + date.substring(0, 4));
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
        console.log("update employee w/ id=" + id);
    }

    handleDeleteEmployeeClick(event) {
        const {id} = event.target;
        console.log("delete employee w/ id=" + id);
    }

    handleAddNewEmployeeClick() {
        console.log("add new employee");
    }

    render() {
        // Don't bother rendering the table if we don't have data
        if (!this.props.data) {
            return <div></div>;
        }

        var rows = [];
        for (var i = 0; i < this.props.data.employees.length; i++) {
            this.props.data.employees[i].discipline = this.idToDiscMap[this.props.data.employees[i].disc_id];
            rows.push(<tr key={this.props.data.employees[i].emp_id}>
                <td>{this.props.data.employees[i].last}</td>
                <td>{this.props.data.employees[i].first}</td>
                <td>{this.props.data.employees[i].discipline}</td>
                <td>{this.props.data.employees[i].active}</td>
                <td>{this.dateHelper(this.props.data.employees[i].active_start_date)}</td>
                <td>{this.dateHelper(this.props.data.employees[i].active_end_date)}</td>
                <td><button id={this.props.data.employees[i].emp_id} onClick={this.handleUpdateEmployeeClick}>Update</button></td>
                <td><button id={this.props.data.employees[i].emp_id} onClick={this.handleDeleteEmployeeClick}>Delete</button></td>
                </tr>);
        }

        return (
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th><button onClick={this.handleLastNameClick}>Last Name</button></th>
                        <th><button onClick={this.handleFirstNameClick}>First Name</button></th>
                        <th><button onClick={this.handleDisciplineClick}>Discipline</button></th>
                        <th><button onClick={this.handleActiveClick}>Active</button></th>
                        <th><button onClick={this.handleActiveStartDateClick}>Active Start Date</button></th>
                        <th><button onClick={this.handleActiveEndDateClick}>Active End Date</button></th>
                        <th colSpan="2"><button onClick={this.handleAddNewEmployeeClick}>Add New Employee</button></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

export default EmployeeListTable;