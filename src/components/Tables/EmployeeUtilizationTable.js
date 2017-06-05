import React, { Component } from 'react';
import uuid from 'uuid';
import _ from 'lodash';

class EmployeeUtilizationTable extends Component {
    constructor(props) {
        super(props);    

        this.expandMap = new Object(); // 0 = collapse, 1 = expand
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    handleExpandClick(event) {
        const {id} = event.target;
        if (this.expandMap[id] == 0) {
            this.expandMap[id] = 1;
        }
        else {
            this.expandMap[id] = 0;
        }
        this.forceUpdate();
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

    getDiscMap() {
        var map = new Object();
        for (var i = 0; i < this.props.data.disciplines.length; i++){
            map[this.props.data.disciplines[i].id] = i;
            // map the id of the task to the index of where the task resides
        }
        return map;
    }

    getTaskDrillDown(curEmpID, curProjID, curDelID, mo, yr) {

        var rows = [];
        var taskMap = this.getTaskMap();
        var util = [];

        var curTaskID = -1;
        var i = 0; // task index
        var j = 0; // month/year index
        while (i < this.props.data.assignmentsByTask.length) {
            if (this.props.data.assignmentsByTask[i].employee_id != curEmpID ||
                this.props.data.assignmentsByTask[i].project_id != curProjID ||
                this.props.data.assignmentsByTask[i].deliverable_id != curDelID) {
                i++;
                continue;
            }
            if (curTaskID != this.props.data.assignmentsByTask[i].task_id) {
                if (util.length > 0) {
                    rows.push(<tr key={curTaskID}>{util}</tr>);
                    while (j < mo.length) {
                        util.push(<td key={uuid.v4()}>0</td>);
                        j++;             
                    }
                }
                util = []; j = 0;
                curTaskID = this.props.data.assignmentsByTask[i].task_id;
                util.push(<td className="left-align" colSpan="4" key={uuid.v4()}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;
                    Task: {this.props.data.tasks[taskMap[curTaskID]].title}
                    </td>);     
            }
            while (!(mo[j] == this.props.data.assignmentsByTask[i].mo && yr[j] == this.props.data.assignmentsByTask[i].yr)) {
                util.push(<td key={uuid.v4()}>0</td>);   
                j++;             
            }
            if (mo[j] == this.props.data.assignmentsByTask[i].mo && yr[j] == this.props.data.assignmentsByTask[i].yr) {
                util.push(<td key={uuid.v4()}>{this.props.data.assignmentsByTask[i].sum_effort}</td>);
                j++;            
            }
            i++;
        }
        rows.push(<tr key={curTaskID}>{util}</tr>);
        while (j < mo.length) {
            util.push(<td key={uuid.v4()}>0</td>);
            j++;             
        }

        return (rows);
    }


    getDeliverableDrillDown(curEmpID, curProjID, mo, yr) {

        var rows = [];
        var delMap = this.getDelMap();
        var util = [];

        var curDelID = -1;
        var expKey;
        var expCol;
        var i = 0; // deliverable index
        var j = 0; // month/year index
        while (i < this.props.data.assignmentsByDel.length) {
            if (this.props.data.assignmentsByDel[i].employee_id != curEmpID ||
                this.props.data.assignmentsByDel[i].project_id != curProjID) {
                i++;
                continue;
            }
            if (curDelID != this.props.data.assignmentsByDel[i].deliverable_id) {
                if (util.length > 0) {
                    rows.push(<tr key={curDelID}>{util}</tr>);
                    if (this.expandMap[expKey] == 1) {
                        rows.push(this.getTaskDrillDown(curEmpID, curProjID, curDelID, mo, yr));
                    }
                    while (j < mo.length) {
                        util.push(<td key={uuid.v4()}>0</td>);
                        j++;             
                    }
                }
                util = []; j = 0;
                curDelID = this.props.data.assignmentsByDel[i].deliverable_id;
                expKey = curEmpID + '_' + curProjID + '_' + curDelID;
                if (!(this.expandMap.hasOwnProperty(expKey))) {
                    this.expandMap[expKey] = 0;
                }
                if (this.expandMap[expKey] == 0) {
                    expCol = '[+]';
                }
                else {
                    expCol = '[-]';
                }
                util.push(<td className="left-align" colSpan="4" key={uuid.v4()}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-default sharp expcol" id={expKey} onClick={this.handleExpandClick}>{expCol}</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Del: {this.props.data.deliverables[delMap[curDelID]].title}
                    </td>);     
            }
            while (!(mo[j] == this.props.data.assignmentsByDel[i].mo && yr[j] == this.props.data.assignmentsByDel[i].yr)) {
                util.push(<td key={uuid.v4()}>0</td>);   
                j++;             
            }
            if (mo[j] == this.props.data.assignmentsByDel[i].mo && yr[j] == this.props.data.assignmentsByDel[i].yr) {
                util.push(<td key={uuid.v4()}>{this.props.data.assignmentsByDel[i].sum_effort}</td>);
                j++;            
            }
            i++;
        }
        rows.push(<tr key={curDelID}>{util}</tr>);
        if (this.expandMap[expKey] == 1) {
            rows.push(this.getTaskDrillDown(curEmpID, curProjID, curDelID, mo, yr));
        }
        while (j < mo.length) {
            util.push(<td key={uuid.v4()}>0</td>);
            j++;             
        }

        return (rows);
    }

    getProjectDrillDown(curEmpID, mo, yr) {

        var rows = [];
        var projMap = this.getProjMap();
        var util = [];

        var curProjID = -1;
        var expKey;
        var expCol;
        var i = 0; // project index
        var j = 0; // month/year index
        while (i < this.props.data.assignmentsByProj.length) {
            if (this.props.data.assignmentsByProj[i].employee_id != curEmpID) {
                i++;
                continue;
            }
            if (curProjID != this.props.data.assignmentsByProj[i].project_id) {
                if (util.length > 0) {
                    rows.push(<tr key={curProjID}>{util}</tr>);
                    if (this.expandMap[expKey] == 1) {
                        rows.push(this.getDeliverableDrillDown(curEmpID, curProjID, mo, yr));
                    }
                    while (j < mo.length) {
                        util.push(<td key={uuid.v4()}>0</td>);
                        j++;             
                    }
                }
                util = []; j = 0;
                curProjID = this.props.data.assignmentsByProj[i].project_id;
                expKey = curEmpID + '_' + curProjID;
                if (!(this.expandMap.hasOwnProperty(expKey))) {
                    this.expandMap[expKey] = 0;
                }
                if (this.expandMap[expKey] == 0) {
                    expCol = '[+]';
                }
                else {
                    expCol = '[-]';
                }
                util.push(<td className="left-align" colSpan="4" key={uuid.v4()}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-default sharp expcol" id={expKey} onClick={this.handleExpandClick}>{expCol}</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Proj: {this.props.data.projects[projMap[curProjID]].title}
                    </td>);     
            }
            while (!(mo[j] == this.props.data.assignmentsByProj[i].mo && yr[j] == this.props.data.assignmentsByProj[i].yr)) {
                util.push(<td key={uuid.v4()}>0</td>);   
                j++;             
            }
            if (mo[j] == this.props.data.assignmentsByProj[i].mo && yr[j] == this.props.data.assignmentsByProj[i].yr) {
                util.push(<td key={uuid.v4()}>{this.props.data.assignmentsByProj[i].sum_effort}</td>);
                j++;            
            }
            i++;
        }
        rows.push(<tr key={curProjID}>{util}</tr>);
        if (this.expandMap[expKey] == 1) {
            rows.push(this.getDeliverableDrillDown(curEmpID, curProjID, mo, yr));
        }
        while (j < mo.length) {
            util.push(<td key={uuid.v4()}>0</td>);
            j++;             
        }

        return (rows);
    }

    render() {
        // Don't bother rendering the table if we don't have data
        if (!this.props.data) {
            return <div></div>
        }

        var colHdrs = [];
        var mo = [];
        var yr = [];
        colHdrs.push(<th key={uuid.v4()}>+/-</th>);
        colHdrs.push(<th key={uuid.v4()}>Last Name</th>);
        colHdrs.push(<th key={uuid.v4()}>First Name</th>);
        colHdrs.push(<th key={uuid.v4()}>Discipline</th>);
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
        var discMap = this.getDiscMap();
        var util = [];

        var curEmpID = -1;
        var expKey;
        var i = 0; // assignment index
        var j = 0; // month/year index
        while (i < this.props.data.assignments.length) {
            if (curEmpID != this.props.data.assignments[i].employee_id) {
                if (util.length > 0) {
                    {/**rows.push(<tr key={uuid.v4()}><td colSpan={(mo.length + 4).toString()}><div className="spacer"></div></td></tr>);**/}
                    rows.push(<tr key={curEmpID}>{util}</tr>);
                    if (this.expandMap[expKey] == 1) {
                        rows.push(this.getProjectDrillDown(curEmpID, mo, yr));
                    }
                    while (j < mo.length) {
                        util.push(<td className="underutil" key={uuid.v4()}>0</td>);
                        j++;             
                    }
                }
                util = []; j = 0;
                curEmpID = this.props.data.assignments[i].employee_id;
                expKey = curEmpID;
                if (!(this.expandMap.hasOwnProperty(expKey))) {
                    this.expandMap[expKey] = 0;
                }
                if (this.expandMap[expKey] == 0) {
                    util.push(<td className="left-align" key={uuid.v4()}><button className="btn btn-default sharp expcol" id={expKey} onClick={this.handleExpandClick}>[+]</button></td>);     
                }
                else {
                    util.push(<td className="left-align" key={uuid.v4()}><button className="btn btn-default sharp expcol" id={expKey} onClick={this.handleExpandClick}>[-]</button></td>);     
                }
                util.push(<td key={uuid.v4()}>{this.props.data.employees[empMap[curEmpID]].last}</td>);     
                util.push(<td key={uuid.v4()}>{this.props.data.employees[empMap[curEmpID]].first}</td>);     
                util.push(<td key={uuid.v4()}>{this.props.data.disciplines[discMap[this.props.data.employees[empMap[curEmpID]].disc_id]].title}</td>);     
            }
            while (!(mo[j] == this.props.data.assignments[i].mo && yr[j] == this.props.data.assignments[i].yr)) {
                util.push(<td className="underutil" key={uuid.v4()}>0</td>);   
                j++;             
            }
            if (mo[j] == this.props.data.assignments[i].mo && yr[j] == this.props.data.assignments[i].yr) {
                if (this.props.data.assignments[i].sum_effort < 1) {
                    util.push(<td className="underutil" key={uuid.v4()}>{this.props.data.assignments[i].sum_effort}</td>);
                }
                else if (this.props.data.assignments[i].sum_effort == 1) {
                    util.push(<td className="levelutil" key={uuid.v4()}>{this.props.data.assignments[i].sum_effort}</td>);
                }
                else {
                    util.push(<td className="overutil" key={uuid.v4()}>{this.props.data.assignments[i].sum_effort}</td>);
                }
                j++;            
            }
            i++;
        }
        {/**rows.push(<tr key={uuid.v4()}><td colSpan={(mo.length + 4).toString()}><div className="spacer"></div></td></tr>);**/}
        rows.push(<tr key={curEmpID}>{util}</tr>);
        if (this.expandMap[expKey] == 1) {
            rows.push(this.getProjectDrillDown(curEmpID, mo, yr));
        }
        while (j < mo.length) {
            util.push(<td className="underutil" key={uuid.v4()}>0</td>);   
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