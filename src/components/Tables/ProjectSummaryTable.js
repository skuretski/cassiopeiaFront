import React, { Component } from 'react';
import TableRow from './TableComponents/TableRow';
import _ from 'lodash';

class ProjectSummaryTable extends Component {
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
        var sow_sum = this.sumHelper(data.sow, id, 'deliverable_id', 'sum_man_mo');
        var employee_sum = this.sumHelper(data.assigned_employees, id, 'deliverable_id', 'sum_effort');

        return [sow_sum, employee_sum];
    }

    calculateTotals(totals) {
        totals = totals.map(t => _.round(t, 1));
        if (totals.length == 0) {
            totals = [0, 0];
        }
        return (
            <TableRow type="totals" title="TOTAL" values={totals}/>
        )
    }

    render() {
        // Don't bother rendering the table if we don't have data
        if (_.isEmpty(this.props.data)) {
            return <div></div>
        }

        var totals = [];

        return (
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Deliverable</th>
                        <th>Statement of Work</th>
                        <th>Assigned Employees</th>
                    </tr>
                </thead>
                <tbody>
                    {/*For each deliverable, pass the title and the sum of that deliverables
                       SOW and assigned employees to TableRow as props*/}
                    {this.props.data.deliverables.map( (deliverable) => {
                        const url = this.props.url;
                        const id = deliverable.id;
                        const title = deliverable.title;
                        const values = this.sumData(deliverable.id, this.props.data);
                        totals = values.map((a, i) => typeof totals[i] == 'undefined' ? a : a + totals[i]);
                        return <TableRow key={id} id={id} type="deliverable" toUrl={url} title={title} values={values} />
                    })}
                    {this.calculateTotals(totals)}
                </tbody>
            </table>
        );
    }
}

export default ProjectSummaryTable;