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
    showAddProjectModal(){

    }
    renderOneTab(props){ 
        return _.map(props.tabList, tab => {
            return (
                <NavTab key={tab.id} tab={tab} isActive={props.isActive} type={props.type} projectId={props.projectId} delivId={props.delivId} taskId={props.taskId} />
            );
        });
    }
    renderTabs(){
        if(this.props.type == 'project'){
            return(
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <ul className="nav nav-tabs">
                            <li><NavLink exact={true} activeClassName="selected" to='/'>Home</NavLink></li>
                        </ul>
                    </div>
                    <div className="container-fluid">
                        <ul className="nav nav-tabs">
                            <li role="presentation" className="disabled"><NavLink to="#"><strong>Projects</strong></NavLink></li>
                            {this.renderOneTab(this.props)}
                            <li><button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bs-project-modal-lg">Add Project</button></li>
                        </ul>
                    </div>
                </nav>
            );
        }
        else if(this.props.type == 'deliverable'){
            return(
                    <nav className="navbar navbar-default">
                        <ul className= 'nav nav-tabs' id="verticalUL">
                            <li role="presentation" className="disabled"><NavLink to="#"><strong>Deliverables</strong></NavLink></li>
                            {this.renderOneTab(this.props)}
                        </ul>
                    </nav>
            );
        }
        else if(this.props.type == 'task'){
            return(
                <nav className="navbar navbar-default">
                        <ul className = 'nav nav-tabs' id="verticalUL">
                            <li role="presentation" className="disabled"><NavLink to="#"><strong>Tasks</strong></NavLink></li>
                            {this.renderOneTab(this.props)}
                        </ul>
                </nav>
            );
        }
    }

    render(){
        return(
            <div>
                {this.renderTabs()}
            </div>
        );
    }
}

export default NavTabs;