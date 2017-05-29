import React, { Component } from 'react';
import uuid from 'uuid';
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
            map[this.props.data.employees[i].emp_id] = i;
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
        var mo = [];
        var yr = [];
        colHdrs.push(<th key={uuid.v4()}>Last Name</th>);
        colHdrs.push(<th key={uuid.v4()}>First Name</th>);
        var someMo = this.props.data.date_range[0].mo;
        var someYr = this.props.data.date_range[0].yr;
        var endMo = this.props.data.date_range[this.props.data.date_range.length - 1].mo;
        var endYr = this.props.data.date_range[this.props.data.date_range.length - 1].yr;
        colHdrs.push(<th key={uuid.v4()}>{this.dateHelper(someMo, someYr)}</th>);
        mo.push(someMo); yr.push(someYr);
        while (1) {
            if (someMo < 12) {
                someMo++;
            }
            else {
                someYr++;
                someMo = 1;
            }
            colHdrs.push(<th key={uuid.v4()}>{this.dateHelper(someMo, someYr)}</th>);
            mo.push(someMo); yr.push(someYr);
            if (someMo == endMo && someYr == endYr) {
                break;
            }
        }

        var rows = [];
        var empMap = this.getEmpMap();
        var projMap = this.getProjMap();
        var delMap = this.getDelMap();
        var taskMap = this.getTaskMap();
        var util = [];

        var curEmpID = -1;
        var i = 0; // assignment index
        var j = 0; // month/year index
        while (i < this.props.data.assignments.length) {
            if (curEmpID != this.props.data.assignments[i].employee_id) {
                if (util.length > 0) {
                    rows.push(<tr key={curEmpID}>{util}</tr>);
                    while (j < mo.length) {
                        util.push(<td key={uuid.v4()}>0</td>);   
                        j++;             
                    }
                }
                util = []; j = 0;
                curEmpID = this.props.data.assignments[i].employee_id;
                util.push(<td key={uuid.v4()}>{this.props.data.employees[empMap[curEmpID]].last}</td>);     
                util.push(<td key={uuid.v4()}>{this.props.data.employees[empMap[curEmpID]].first}</td>);     
            }
            while (!(mo[j] == this.props.data.assignments[i].mo && yr[j] == this.props.data.assignments[i].yr)) {
                util.push(<td key={uuid.v4()}>0</td>);   
                j++;             
            }
            if (mo[j] == this.props.data.assignments[i].mo && yr[j] == this.props.data.assignments[i].yr) {
                util.push(<td key={uuid.v4()}>{this.props.data.assignments[i].sum_effort}</td>);
                j++;            
            }
            i++;
        }
        rows.push(<tr key={curEmpID}>{util}</tr>);
        while (j < mo.length) {
            util.push(<td key={uuid.v4()}>0</td>);   
            j++;             
        }

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