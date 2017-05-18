import React, { Component } from 'react';
import TableRow from './TableComponents/TableRow';
import _ from 'lodash';

class TaskSummaryTable extends Component {
    constructor(props) {
        super(props);
    }
    sumHelper(data, comparison_value, comparison_key, accum_key) {
        // Sum over the data only if data points comparison key value matches
        // the comparison value. In this case, it's project_id == id
        var sum = _.reduce(data, (total, point) => {
            if (point[comparison_key] == comparison_value) {
                return total + point[accum_key];
            } else {
                return total;
            }
        }, 0);

        // Return value rounded to 1 decimal place
        return _.round(sum, 1);
    }

    sumData(id, data) {
        // Compute the sum for the provided id for SOW, funding, and employees
        var sow_sum = this.sumHelper(data.sow, id, 'task_id', 'sum_man_mo');
        var employee_sum = this.sumHelper(data.assigned_employees, id, 'task_id', 'sum_effort');

        return [sow_sum, employee_sum];
    }

    calculateTotals(totals) {
        totals = totals.map(t => _.round(t, 1));
        return (
            <TableRow type="totals" title="TOTAL" values={totals}/>
        )
    }

    render() {
        // Don't bother rendering the table if we don't have data
        if (_.isEmpty(this.props.data)) {
            return <div></div>;
        }

        var totals = [];

        return (
            <div className="table-responsive">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Employee</th>
                        {this.props.data.sow.map( (sow) => {
                            const mo = sow.mo;
                            const yr = sow.yr;
                            const title = mo + '/' + yr;
                            return <th key={title}>{title}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {/* TODO: Add employee/assignment data to test table results */}
                    {/* This table is going to be a little more messy than the others.
                        Any given employee isn't guaranteed to be assigned in all months,
                        so there needs to be some logic to create blank <td> elements
                        for months without any assignment. Once I add test data I'll
                        swing back around to this... */}

                    {/*For each employee, pass the name and the SOW of that employee
                       to TableRow as props*/}
                    {/*
                    {this.props.data.assigned_employees.map( (emp) => {
                        const name = emp.first + ' ' + emp.last;
                        const url = this.props.url;
                        const id = emp.employee_id;
                        const values = emp.sum_effort;
                        totals = values.map((a, i) => typeof totals[i] == 'undefined' ? a : a + totals[i]);
                        return <TableRow key={id} id={id} toUrl={url} type="employee" title={title} values={values} />
                    })}
                    {this.calculateTotals(totals)}
                    */}
                </tbody>
            </table>
            </div>
        );
    }
}

export default TaskSummaryTable;