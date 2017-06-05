import React, { Component } from 'react';
import TableRow from './TableComponents/TableRow';
import _ from 'lodash';

class FundingByTypeSummaryTable extends Component {
    constructor(props) {
        super(props);        
    }

    sumHelper(data, comparison_value_1, comparison_key_1, comparison_value_2, comparison_key_2, accum_key) {
        // Sum over the data only if data points comparison key value matches
        // the comparison value. In this case, it's project_id == id
        var sum = _.reduce(data, (total, point) => {
            if (comparison_value_2 == -1 && point[comparison_key_1] == comparison_value_1) {
                return total + point[accum_key];
            }
            else if (point[comparison_key_1] == comparison_value_1 && point[comparison_key_2] == comparison_value_2) {
                return total + point[accum_key];
            }
            else {
                return total;
            }
        }, 0);

        // Return value rounded to 1 decimal place
        return _.round(sum, 1);
    }

    sumData(id, data, selProj) {
        // Compute the sum for the provided id for SOW, funding, and employees
        var funding_sum = this.sumHelper(data.by_type, id, 'fundingType_id', selProj, 'project_id', 'funding_amt');

        return funding_sum;
    }

    renderTable() {
        // Determine the funding for each project type, and the total funding
        var typeFunding = [];
        var fundingTotal = 0;
        const types = this.props.data.type;
        types.map( t => {
            const id = t.id;
            typeFunding[id] = this.sumData(id, this.props.data, this.props.selProj);
            fundingTotal += typeFunding[id];
        })

        // Now that we know the total and each type, build table rows
        var tableRows = [];
        types.map( t => {
            const id = t.id;
            const title = t.title;
            const pctFunding = fundingTotal == 0 ? '--' : typeFunding[id]/fundingTotal * 100;
            var values = [typeFunding[id], pctFunding];
            values = values.map(v => isNaN(v) ? v : _.round(v, 1));
            tableRows.push(<TableRow key={id} id={id} title={title} values={values}/>)
        })

        // Last row shows the totals
        const pctTotal = fundingTotal == 0 ? '--' : 100;
        tableRows.push(<TableRow key="totals" type="totals" title="TOTAL" values={[_.round(fundingTotal, 1), pctTotal]}/>)
        return tableRows;
    }

    render() {
        // Don't bother rendering the table if we don't have data
        if (!this.props.data) {
            return <div></div>
        }

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
                    {this.renderTable()}
                </tbody>
            </table>
        );
    }
}

export default FundingByTypeSummaryTable;