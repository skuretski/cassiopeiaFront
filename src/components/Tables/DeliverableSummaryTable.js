import React, { Component } from 'react';
import TableRow from './TableComponents/TableRow';
import _ from 'lodash';

class DeliverableSummaryTable extends Component {
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

    render() {
        // Don't bother rendering the table if we don't have data
        if (_.isEmpty(this.props.data)) {
            return <div></div>;
        }

        return (
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Statement of Work</th>
                        <th>Assigned Employees</th>
                    </tr>
                </thead>
                <tbody>
                    {/*For each task, pass the title and the sum of that tasks
                       SOW and assigned employees to TableRow as props*/}
                    {this.props.data.tasks.map( (task) => {
                        const url = this.props.url;
                        const id = task.id
                        const title = task.title;
                        const values = this.sumData(task.id, this.props.data);
                        return <TableRow key={id} id={id} toUrl={url} type="task" title={title} values={values} />
                    })}
                </tbody>
            </table>
        );
    }
}

export default DeliverableSummaryTable;