import React, { Component } from 'react';
import TableRow from './TableComponents/TableRow';
import _ from 'lodash';

class EmployeeUtilizationTable extends Component {
    constructor(props) {
        super(props);    

    }

    dateHelper(mo, yr) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return (months[mo - 1] + '-' + yr);
    }

    getEmpMap() {
        var map = new Object();
        for (var i = 0; i < this.props.data.employees.length; i++){
            map[this.props.data.employees[i].id] = i;
            // map the id of the employee to the index of where the employee resides
        }
        return map;
    }

    getProjMap() {
        var map = new Object();
        for (var i = 0; i < this.props.data.projects.length; i++){
            map[this.props.data.projects[i].id] = i;
            // map the id of the project to the index of where the project resides
        }
        return map;
    }

    getDelMap() {
        var map = new Object();
        for (var i = 0; i < this.props.data.deliverables.length; i++){
            map[this.props.data.deliverables[i].id] = i;
            // map the id of the deliverable to the index of where the deliverable resides
        }
        return map;
    }

    getTaskMap() {
        var map = new Object();
        for (var i = 0; i < this.props.data.tasks.length; i++){
            map[this.props.data.tasks[i].id] = i;
            // map the id of the task to the index of where the task resides
        }
        return map;
    }

    render() {
        // Don't bother rendering the table if we don't have data
        if (!this.props.data) {
            return <div></div>;
        }

        var colHdrs = [];
        colHdrs.push(<th>Last Name</th>);
        colHdrs.push(<th>First Name</th>);
        var someMo = this.props.data.date_range[0].mo;
        var someYr = this.props.data.date_range[0].yr;
        var endMo = this.props.data.date_range[this.props.data.date_range.length - 1].mo;
        var endYr = this.props.data.date_range[this.props.data.date_range.length - 1].yr;
        colHdrs.push(<th>{this.dateHelper(someMo, someYr)}</th>);
        while (1) {
            if (someMo < 12) {
                someMo++;
            }
            else {
                someYr++;
                someMo = 1;
            }
            colHdrs.push(<th>{this.dateHelper(someMo, someYr)}</th>);
            if (someMo == endMo && someYr == endYr) {
                break;
            }
        }

        // ORDER BY employee_id, yr, mo, project_id, deliverable_id, task_id ASC;',
        var rows = [];
        var empMap = this.getEmpMap();
        var projMap = this.getProjMap();
        var delMap = this.getDelMap();
        var taskMap = this.getTaskMap();

        return (
            <div className="table-responsive">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        {colHdrs}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            </div>
        );
    }
}

export default EmployeeUtilizationTable;