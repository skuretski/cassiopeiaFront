import React, { Component } from 'react';
import TableRow from './TableComponents/TableRow';
import _ from 'lodash';

class FundingByProjectSummaryTable extends Component {
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

    sumData(id, data, selType) {
        // Compute the sum for the provided id for funding amount 
        var funding_sum = this.sumHelper(data.by_project, id, 'project_id', selType, 'fundingType_id', 'funding_amt');

        return funding_sum;
    }

    renderTable() {
        // Determine the funding for each project, and the total funding
        var projectFunding = [];
        var fundingTotal = 0;
        const projects = this.props.data.project;
        projects.map( p => {
            const id = p.id;
            projectFunding[id] = this.sumData(id, this.props.data, this.props.selType);
            fundingTotal += projectFunding[id];
        })

        // Now that we know the total and each project, build table rows
        var tableRows = [];
        projects.map( p => {
            const id = p.id;
            const title = p.title;
            var values = [projectFunding[id], projectFunding[id]/fundingTotal * 100];
            values = values.map(v => _.round(v, 1));
            tableRows.push(<TableRow key={id} id={id} title={title} values={values} type="project"/>);
        })

        // Last row shows the totals, last value is 100 since total is always 100% of total
        tableRows.push(<TableRow key="totals" type="totals" title="TOTAL" values={[_.round(fundingTotal, 1), 100]}/>);
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
                        <th>Project</th>
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

export default FundingByProjectSummaryTable;