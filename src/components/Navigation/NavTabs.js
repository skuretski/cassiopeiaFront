import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTab from './NavTab';
import { Route, NavLink } from 'react-router-dom';
import _ from 'lodash';

class NavTabs extends Component{
    constructor(props){
        super(props);
    }
    renderOneTab(props){ 
        return _.map(props.tabList, tab => {
            return (
                <NavTab key={tab.id} tab={tab} isActive={props.isActive} type={props.type} projectId={props.projectId} delivId={props.delivId} />
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
                        </ul>
                    </div>
                </nav>
            );
        }
        else if(this.props.type == 'deliverable'){
            return(
                    <nav className="navbar navbar-default">
                        <ul className= 'nav nav-tabs'>
                            <li role="presentation" className="disabled"><NavLink to="#"><strong>Deliverables</strong></NavLink></li>
                            {this.renderOneTab(this.props)}
                        </ul>
                    </nav>
            );
        }
        else if(this.props.type == 'task'){
            return(
                <nav className="navbar navbar-default">
                        <ul className = 'nav nav-tabs'>
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