import React, { Component } from 'react';
import TableRow from './TableComponents/TableRow';
import _ from 'lodash';

class TaskSummaryTable extends Component {
    constructor(props) {
        super(props);
    }

    // convert mo=2 and yr=2019 to "Feb-2019"
    dateHelper(mo, yr) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[mo - 1] + '-' + yr;
    }

    createDateStrings() {
        var date_range = this.props.data.date_range;
        var month = parseInt(date_range[0].mo);
        var year = parseInt(date_range[0].yr);
        var endMonth = parseInt(date_range[1].mo);
        var endYear = parseInt(date_range[1].yr);

        var dateStrings = [];
        while (year <= endYear) {
            if (year === endYear && month > endMonth) {
                break;
            }
            dateStrings.push(this.dateHelper(month, year));
            month += 1;
            if (month > 12) {
                month = 1;
                year += 1;
            }
        }
        return dateStrings;
    }

    createHeaderCells(dates) {
        var thCells = [];
        dates.map( date => { thCells.push(<th key={date}>{date}</th>); });
        return thCells;
    }

    createSOWCells(dates) {
        var sow_obj = this.props.data.sow.reduce((s, item) => {
            s[this.dateHelper(item.mo, item.yr)] = item.sum_man_mo;
            return s;
        },{});

        var values = [];
        dates.map( date => {
            values.push(sow_obj[date] ? sow_obj[date] : 0);
        });

        return <TableRow type="totals" title="SOW" values={values} />
    }

    createEmployeeCells(dates) {
        var employees = this.props.data.employees;
        var rows = [];

        // Loop through assigned employees, create map of ID and date to effort
        var assignments = this.props.data.assigned_employees.reduce((a, item) => {
            if (!(item.employee_id in a)) {
                a[item.employee_id] = {};
            }
            a[item.employee_id][this.dateHelper(item.mo, item.yr)] = item.sum_effort;
            return a;
        },{});
        
        var rows = [];
        employees.map( e => {
            var values = [];
            dates.map( date => {
                values.push(assignments[e.id][date] ? assignments[e.id][date] : 0);
            });

            rows.push(<TableRow key={e.id} title={e.last + ', ' + e.first} values={values}/>);
        })

        return rows;
    }


    render() {
        // Don't bother rendering the table if we don't have data
        if (_.isEmpty(this.props.data) || _.isEmpty(this.props.data.date_range)) {
            return <div></div>
        }

        var totals = [];

        return (
            <div className="table-responsive">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Employee</th>
                        {this.createHeaderCells(this.createDateStrings())}
                    </tr>
                </thead>
                <tbody>
                    {this.createSOWCells(this.createDateStrings())}
                    {this.createEmployeeCells(this.createDateStrings())}
                </tbody>
            </table>
            </div>
        );
    }
}

export default TaskSummaryTable;