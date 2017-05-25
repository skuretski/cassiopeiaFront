import React, { Component } from 'react';
import TableRow from './TableComponents/TableRow';
import _ from 'lodash';

class EmployeeSummaryTable extends Component {
    constructor(props) {
        super(props);        
    }

    render() {
        // Don't bother rendering the table if we don't have data
        if (!this.props.data) {
            return <div></div>;
        }

        var rows = [];
        for (var i = 0; i < this.props.data.employees.length; i++) {
            rows.push(<tr key={this.props.data.employees[i].id}>
                <td>{this.props.data.employees[i].last}</td>
                <td>{this.props.data.employees[i].first}</td>
                <td>{this.props.data.employees[i].discipline}</td>
                <td>Yes</td>
                <td>{this.props.data.employees[i].active_start_date}</td>
                <td>{this.props.data.employees[i].active_end_date}</td>
                </tr>);
        }

        return (
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Discipline</th>
                        <th>Active</th>
                        <th>Active Start Date</th>
                        <th>Active End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

export default EmployeeSummaryTable;