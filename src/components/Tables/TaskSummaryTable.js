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

    createDateStrings() {
        var date_range = this.props.data.date_range;
        var month = parseInt(date_range[0].mo);
        var year = parseInt(date_range[0].yr);
        var endMonth = parseInt(date_range[1].mo);
        var endYear = parseInt(date_range[1].yr);

        var dateStrings = [];
        while (year <= endYear && month <= endMonth) {
            dateStrings.push(month + '/' + year);
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
            s[item.mo + '/' + item.yr] = item.sum_man_mo;
            return s;
        },{});

        var thCells = [<td key="sow">SOW</td>];
        var values = [];
        dates.map( date => {
            values.push(sow_obj[date] ? sow_obj[date] : 0);
        });

        return <TableRow type="totals" title="SOW" values={values} />
    }

    // createEmployeeCells(dates) {

    // }


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
                        {this.createHeaderCells(this.createDateStrings())}
                    </tr>
                </thead>
                <tbody>
                    {this.createSOWCells(this.createDateStrings())}
                    {/*{this.createEmployeeCells(this.createDateStrings())}*/}
                </tbody>
            </table>
            </div>
        );
    }
}

export default TaskSummaryTable;