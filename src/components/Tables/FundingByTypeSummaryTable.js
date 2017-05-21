import React, { Component } from 'react';
import TableRow from './TableComponents/TableRow';
import _ from 'lodash';

class FundingByTypeSummaryTable extends Component {
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
        var funding_sum = this.sumHelper(data.by_type, id, 'fundingType_id', 'funding_amt');

        return [funding_sum, funding_sum];
    }

    calculateTotals(totals){
        totals = totals.map(t => _.round(t, 1));
        return (
            <TableRow type="totals" title="TOTAL" values={totals}/>
        );
    }
    render() {
        // Don't bother rendering the table if we don't have data
        if (!this.props.data) {
            return <div></div>;
        }

        var totals = [];

        return (
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Funding Type</th>
                        <th>Funding (mm)</th>
                        <th>Funding (% of total)</th>
                    </tr>
                </thead>
                <tbody>
                    {/*For each project, pass the title and the sum of that projects
                       SOW, funding, and assigned employees to TableRow as props*/}
                    {this.props.data.type.map( (type) => {
                        const id = type.id;
                        const title = type.title;
                        const values = this.sumData(type.id, this.props.data);
                        totals = values.map((a, i) => typeof totals[i] == 'undefined' ? a : a + totals[i]);
                        return <TableRow key={id} id={id} type="type" title={title} values={values}/>
                    })}
                    {this.calculateTotals(totals)}
                </tbody>
            </table>
        );
    }
}

export default FundingByTypeSummaryTable;