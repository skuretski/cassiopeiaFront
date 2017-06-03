import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTab from './NavTab';
import { Route, NavLink } from 'react-router-dom';
import _ from 'lodash';
import { addProject } from '../../actions';

class NavTabs extends Component{
    constructor(props){
        super(props);
    }
    renderOneTab(props){ 
        return _.map(props.tabList, tab => {
            return (
                <NavTab key={tab.id} tab={tab} isActive={props.isActive} type={props.type} projectId={props.projectId} delivId={props.delivId} taskId={props.taskId} />
            );
        });
    }
    renderHomeNav(){
        return(
            <div className="container-fluid">
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <ul className="nav nav-pills">
                        <li><NavLink exact={true} activeClassName="selected" to='/'><span className="glyphicon glyphicon-home"></span>  Home</NavLink></li>
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                            aria-expanded="false">Employees<span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><NavLink exact={true} activeClassName="selected" to="/employees/list">Employee List</NavLink></li>
                                <li><NavLink exact={true} activeClassName="selected" to="/employees/utilization">Employee Utilization</NavLink></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                            aria-expanded="false">Funding<span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><NavLink exact={true} activeClassName="selected" to="/funding/project">Funding By Project</NavLink></li>
                                <li><NavLink exact={true} activeClassName="selected" to="/funding/type">Funding By Type</NavLink></li>
                            </ul>
                        </li>
                        <li><NavLink exact={true} activeClassName="selected" to='/disciplines'>Disciplines</NavLink></li>
                    </ul>
                </nav>
            </div>
        );
    }
    renderTabs(){
        if(this.props.type == 'project'){
            return(
                <nav className="navbar navbar-default nav-justified" id="projectNavbar">
                    <div className="container-fluid">
                        <ul className="nav nav-tabs">
                            <li><h3 className="navbar-brand" id="navLabel"><strong>Projects</strong></h3></li>
                            {this.renderOneTab(this.props)}
                            <li className="pull-right"><button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bs-project-modal-lg">Add Project</button></li>
                        </ul>
                    </div>
                </nav>
            );
        }
        else if(this.props.type == 'deliverable'){
            return(
                    <nav className="navbar navbar-default">
                        <ul className= 'nav nav-tabs' id="verticalUL">
                            <li><h3 className="navbar-brand" id="navLabel"><strong>Deliverables</strong></h3></li>
                            {this.renderOneTab(this.props)}
                            <li><button type="button" className="btn btn-primary" id="verticalButton" data-toggle="modal" data-target=".bs-deliverable-modal-lg">Add Deliverable</button></li>
                        </ul>
                    </nav>
            );
        }
        else if(this.props.type == 'task'){
            return(
                <nav className="navbar navbar-default">
                        <ul className = 'nav nav-tabs' id="verticalUL">
                            <li><h3 className="navbar-brand" id="navLabel"><strong>Tasks</strong></h3></li>
                            {this.renderOneTab(this.props)}
                            <li><button type="button" className="btn btn-primary" id="verticalButton" data-toggle="modal" data-target=".bs-task-modal-lg">Add Task</button></li>
                        </ul>
                </nav>
            );
        }
    }

    render(){
        return(
            <div>
                {this.renderHomeNav()}
                {this.renderTabs()}
            </div>
        );
    }
}

export default NavTabs;